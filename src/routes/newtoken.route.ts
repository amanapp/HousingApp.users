import express from 'express'
import { acessToken, referaceToken } from '../middleware/auth.middleware';
import { ReferaceToAcessTokenCreation } from '../controllers/referace_to_acress_token_creation.controller';


const routes =express.Router();

routes.post('/newtoken',referaceToken,ReferaceToAcessTokenCreation)

export default routes;