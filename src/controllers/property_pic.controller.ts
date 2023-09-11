import { Response, Request } from "express";
import { addSubscriptionPlan } from "../services/add_subscription.services";
import { propertyPicAdd } from "../services/property_pic.services";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

/**
 * @description upload the pic of property 
 * @param req 
 * @param res 
 */
export const PropertyPicAdd= async(req: Request, res: Response)=>{
    try{

        const{buffer }=req.file;
        const {email}=req.body;
        const result =await propertyPicAdd(buffer,email.email)
        res.status(HttpStatusCode.CREATED).json({message:ExceptionMessage.PROPERTY_PIC})

    }catch(e){
        res.status(HttpStatusCode.UNAUTHORIZED).json({message:e.message})
    }
}