require('dotenv/config');
import App from './app';

const PORT = process.env.PORT || 3333;
const app = new App(PORT);
export default app.server;
