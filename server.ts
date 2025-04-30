import express from 'express';
import http from 'http';
import cors from 'cors';
import user from './src/modules/auth/auth.routes';
import bootstrap from './src/modules/bootstrap/bootstrap.routes';
import product from './src/modules/product/product.routes';
import airport from './src/modules/airport/airport.routes';
import { dbConnect } from './src/config/db';
import { config } from 'dotenv';
config();
const { PORT } = process.env;

(async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: "*" }));
    app.use('/user', user);
    app.use('/bootstrap', bootstrap);
    app.use('/user/product', product);
    app.use('/user/airport', airport);

    await dbConnect();
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
})();


