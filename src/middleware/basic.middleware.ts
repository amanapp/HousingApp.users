import base64 from "base-64";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";
import "../config/env";

function decodeCredentials(authHeader) {
  // authHeader: Basic YWRtaW46YWRtaW4=
  const encodedCredentials = authHeader.trim().replace(/Basic\s+/i, "");

  const decodedCredentials = base64.decode(encodedCredentials);
  return decodedCredentials.split(":");
}

export const basic_auth = function authMiddleware(req, res, next) {
  const [username, password] = decodeCredentials(
    req.headers.authorization || ""
  );
  if (username === process.env.USERNAMES && password === process.env.PASSWORD) {
    return next();
  }
  res.set("WWW-Authenticate", 'Basic realm="user_pages"');
  res.status(HttpStatusCode.UNAUTHORIZED).send(ExceptionMessage.UNAUTHORIZED);
};
