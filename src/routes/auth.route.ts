import express from "express";
import {
  SignUpUser,
  SignUpOwner,
  logInUser,
  logInOwner,
  LogoutUser,
} from "../controllers/auth.controller";
import { basic_auth } from "../middleware/basic.middleware";
import { acessToken, referaceToken } from "../middleware/auth.middleware";
import { UserView } from "../controllers/view.controller";
import { loginJoiMiddleware, signUpJoiMiddleware } from "../middleware/joi.middleware";

const routes = express.Router();

routes.post("/user/signup", signUpJoiMiddleware,basic_auth, SignUpUser);
routes.post("/owner/signup", signUpJoiMiddleware,basic_auth, SignUpOwner);
routes.post("/user/login", loginJoiMiddleware,logInUser);
routes.post("/owner/login", loginJoiMiddleware,logInOwner);
routes.post("/user/view-restrict", acessToken, UserView);
routes.post("/logout/user", acessToken, LogoutUser);

export default routes;
