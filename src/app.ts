import express, { Express } from 'express';
import { routes } from './routes';
import Swagger from './infra/swagger';
import database from './infra/database/mongooseConnection';
import { logger } from './utils/Logger';

class App {
	server: Express;
	port: number | string;

	constructor(port: number | string) {
		this.port = port;
		this.server = express();
		logger('Loading server...');
		this.loadDatabase();
		this.loadMiddleware();
		this.loadRoutes();
	}

	loadMiddleware() {
		this.server.use(express.json());
		this.server.use('/api-docs', Swagger.serve, Swagger.setup);
	}

	loadDatabase() {
		logger('Loading database connection...');
		database
			.start()
			.then(() => {
				this.start();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	loadRoutes() {
		for (const route of routes) {
			this.server.use(route);
		}
	}
	start() {
		this.server.listen(this.port, () => logger(`Running on port ${this.port}`));
	}
}

export default App;
