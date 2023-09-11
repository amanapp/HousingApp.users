
import { Response, Request } from "express";
import { referaceToAcessTokenCreation } from "../services/referace_to_acress_token_creation.service";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

/**
 * @description create the acesses token by used of referace token
 * @param req 
 * @param res 
 */
export const ReferaceToAcessTokenCreation= async(req:Request,res:Response)=>{
    try {
        const { email,jti }=req.body;
        const result= await referaceToAcessTokenCreation(email,jti);
        res.status(HttpStatusCode.CREATED).json({message:ExceptionMessage.ACESSES_kEY,newAcessToken:result.acessToken})

    } catch (e) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({message:e.message})

    }
}