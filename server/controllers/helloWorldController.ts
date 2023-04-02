import { Controller, Route, Get, Tags } from "tsoa";

interface HelloWorldInterface {
	message: string;
}

@Route("HelloWorld") // route name => localhost:xxx/helloWorld
@Tags("HelloWorldController") // => Under HelloWorldController tag
export default class HelloWorldController extends Controller {
	@Get() //specify the request type
	public hello(imageParams: any): HelloWorldInterface {
		console.log(imageParams.query);
		return { message: `Your image is called ${imageParams.query.name}` };
	}
}
