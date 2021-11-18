import express, { Express } from 'express';
import database from './infra/database/mongooseConnection';
import { routes } from './routes';

class App {
	server: Express;
	port: number | string;

	constructor(port: number | string) {
		this.port = port;
		this.server = express();
		this.loadMiddleware();
		this.loadRoutes();
		this.loadDatabase();
	}

	loadMiddleware() {
		this.server.use(express.json());
	}

	loadRoutes() {
		for (const route of routes) {
			this.server.use(route);
		}
	}

	loadDatabase() {
		console.log('Loading database connection...');
		database
			.start()
			.then(() => {
				this.start();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	start() {
		this.server.listen(this.port, () => console.log(`Running on port ${this.port}`));
	}
}

export default App;
