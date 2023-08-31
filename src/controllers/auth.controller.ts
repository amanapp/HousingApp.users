import { Response, Request } from "express";
import {
  LogInOwner,
  LogInUser,
  logoutUser,
  signUpOwner,
  signUpUser,
} from "../services/auth.services";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

/**
 * @description add the user
 * @param req 
 * @param res 
 */
export const SignUpUser = async (req: Request, res: Response) => {
  try {

    const { name, email, password, phone_no } = req.body;
    const result = await signUpUser(name, email, password, phone_no);

    res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.USER_SIGNUP });
  } catch (e) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
  }
};


/**
 * @description add the owner
 * @param req 
 * @param res 
 */
export const SignUpOwner = async (req: Request, res: Response) => {
  try {

    const { name, email, password, phone_no } = req.body;
    const user = await signUpOwner(name, email, password, phone_no);
    res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.OWNER_SIGNUP });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};

/**
 * @description
 * @param req 
 * @param res 
 * @returns if email is not exist in db then return the customized message
 */
export const logInUser = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;
    if (!email) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ExceptionMessage.INVALID_CREDINTIALS});
    }
    const user = await LogInUser(email, password);
    res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.LOGIN_USER, referaceToken: user.referaceTokenResult,acessToken:user.acessTokenResult });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};
/**
 * @description login owner
 * @param req 
 * @param res 
 * @returns if email is not exist in db then return the customized message
 */
export const logInOwner = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ExceptionMessage.INVALID_CREDINTIALS });
    }
    const user = await LogInOwner(email, password);
    res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.LOGIN_USER ,referaceToken: user.referaceTokenResult,acessToken:user.acessTokenResult });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};


/**
 * @description logout user
 * @param req 
 * @param res 
 */
export const LogoutUser=async(req:Request,res:Response)=>{
  try {
    const {email,jti}=req.body;
    const result = await logoutUser(email,jti);
    res.status(HttpStatusCode.CREATED).json({message:ExceptionMessage.USER_LOGOUT,result});
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });

  }
}