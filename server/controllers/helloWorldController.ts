import { Controller, Route, Get, Tags } from "tsoa";

interface HelloWorldInterface {
	message: string;
}

@Route("HelloWorld") // route name => localhost:xxx/helloWorld
@Tags("HelloWorldController") // => Under HelloWorldController tag
export default class HelloWorldController extends Controller {
	@Get() //specify the request type
	hello(): HelloWorldInterface {
		return { message: "Hello World controller return!" };
	}
}
