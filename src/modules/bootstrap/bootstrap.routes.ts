import express from 'express';
import * as Controller from './bootstrap.controller';
const router = express.Router();

router.post('/product', Controller.addProducts)


export default router;