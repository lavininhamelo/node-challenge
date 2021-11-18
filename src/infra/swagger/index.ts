import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const options = {
	explorer: true,
};

export default {
	serve: swaggerUi.serve,
	setup: swaggerUi.setup(swaggerDocument, options),
};
