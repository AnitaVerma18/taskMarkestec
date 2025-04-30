import express from 'express';
import * as Controller from './bootstrap.controller';
const router = express.Router();

router.post('/product', Controller.addProducts);
router.post('/city', Controller.addCity); // add city before adding airport to the database
router.post('/airport', Controller.addAirports);


export default router;