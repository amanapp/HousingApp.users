import express from 'express'
import { acessToken } from '../middleware/auth.middleware';
import { RevokeSubscription, ShowSubscription, SubscriptionPlan } from '../controllers/subscription.controller';
import { AddSubscriptionPlan } from '../controllers/add_subscription.controller';
import { subscriptionJoiMiddleware } from '../middleware/joi.middleware';



const routes =express.Router();

routes.post('/add/subscription',subscriptionJoiMiddleware,SubscriptionPlan)
routes.post('/user/subscription',subscriptionJoiMiddleware,acessToken,AddSubscriptionPlan)
routes.get('/subscription/show',ShowSubscription)
routes.post('/subscription/revoke',acessToken,RevokeSubscription)


export default routes;