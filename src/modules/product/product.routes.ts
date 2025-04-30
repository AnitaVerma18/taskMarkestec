import express from 'express';
import * as Controller from './product.controller';
import { authorization } from '../../middleware/authorization';
const router = express.Router();

router.get('/', authorization, Controller.products); // product list
router.post('/cart', authorization, Controller.addCart); 
router.delete('/cart/:_id', authorization, Controller.removeCart);
router.get('/cart', authorization, Controller.cartList)

export default router;