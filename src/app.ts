import express, { Express } from 'express';

class App {
	server: Express;
	port: number | string;

	constructor(port: number | string) {
		this.port = port;
		this.server = express();
		this.loadMiddleware();
		this.start();
	}

	loadMiddleware() {
		this.server.use(express.json());
	}

	start() {
		this.server.listen(this.port, () => console.log(`Running on port ${this.port}`));
	}
}

export default App;
