import mongoose from 'mongoose';
import { logger } from '../../utils/Logger';

class MongooseConnection {
	mongoUri: string;
	constructor() {
		this.mongoUri =
			process.env.MONGO_URI ||
			`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
	}
	async start() {
		try {
			await mongoose.connect(this.mongoUri);
			logger('Database was connected!');
		} catch (error) {
			console.log(error);
		}
	}
}

export default new MongooseConnection();
