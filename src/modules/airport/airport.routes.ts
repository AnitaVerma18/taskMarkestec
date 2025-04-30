import express from 'express';
import * as Controller from './airport.controller';
import { authorization } from '../../middleware/authorization';
const router = express.Router();

router.get('/', authorization, Controller.airports); // nearby airports 

export default router;