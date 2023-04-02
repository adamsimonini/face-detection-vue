// import { Controller, Route, Get, Tags } from "tsoa";

interface PingResponse {
	message: string;
}

export default class PingController {
	public async getMessage(): Promise<PingResponse> {
		return {
			message: "pong"
		};
	}
}
