import express from 'express'
import { acessToken } from '../middleware/auth.middleware';
import { WishlistProperty } from '../controllers/wishlist.controller';
import { GetPropertyShow } from '../controllers/whishlisted_property.controller';


const routes =express.Router();

routes.get('/user/wishlist-show',acessToken,WishlistProperty)
routes.post('/user/wishlisted',acessToken,GetPropertyShow)


export default routes;