# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.11.0-buster

ENV PORT_NUM=8000


# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install NC and locales
RUN \
  apt-get update && \
  apt-get install -y netcat locales libpq-dev

# Add Canadian locales
RUN \
  sed -i -e 's/# en_CA.UTF-8 UTF-8/en_CA.UTF-8 UTF-8/' /etc/locale.gen && \
  sed -i -e 's/# fr_CA.UTF-8 UTF-8/fr_CA.UTF-8 UTF-8/' /etc/locale.gen && \
  dpkg-reconfigure --frontend=noninteractive locales

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN \
  adduser -u 5678 --disabled-password --gecos "" appuser && \
  mkdir /env && \
  chown appuser /env

# Install e2e test dependencies
RUN \
  apt-get update && \
  curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
  apt-get install -yqq \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    nodejs \
    xauth \
    xvfb && \
  rm -rf /var/lib/apt/lists/* && \
  mkdir /e2e && \
  mkdir /tox && \
  chown appuser /e2e && \
  chown appuser /tox

USER 5678

# Install npm requirements (for e2e testing)
WORKDIR /e2e

COPY --chown=5678 e2e_tests/package.json e2e_tests/package-lock.json ./
RUN \
  npm install

WORKDIR /phacend

# Install pip requirements
COPY --chown=5678 requirements.txt requirements_formatting.txt requirements_dev.txt tox.ini ./
RUN \
  python -m pip install tox && \
  python -mvenv /env && \
  /env/bin/python -m pip install -r requirements.txt && \
  /env/bin/python -m pip install -r requirements_dev.txt


# Make our virtual env the default python
ENV PATH="/env/bin:/home/appuser/.local/bin:$PATH"

# Preinstall e2e python requirements in /tox
RUN tox -e py311 --workdir /tox -n

# Set the TMP variable to move pytest_cache outside of our working directory
ENV TMP=/tmp

EXPOSE ${PORT_NUM}

# run entrypoint.sh
ENTRYPOINT ["/phacend/entrypoint.sh"]

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
