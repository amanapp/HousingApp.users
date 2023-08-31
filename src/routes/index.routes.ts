import express, { Router } from 'express';
import auth from './auth.route';
import newtoken from './newtoken.route';
import property from './property.route';
import subscription from './subscription.routes';
import verify from './verify.routes';
import wishlist from './wishlist.route';

const router: Router = express.Router();

router.use(auth,newtoken,property,subscription,verify,wishlist);

export default router;