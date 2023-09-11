import express from 'express'
import { acessToken } from '../middleware/auth.middleware';
import { propertyPost } from '../controllers/post.controller';
import { PropertyPicAdd } from '../controllers/property_pic.controller';
import { upload } from '../middleware/multer.middleware';
import { propertyPostJoiMiddleware } from '../middleware/joi.middleware';


const routes =express.Router();

routes.post('/owner/post',propertyPostJoiMiddleware,acessToken,propertyPost)
routes.post('/property/pic',upload.single('image'),acessToken,PropertyPicAdd)


export default routes;