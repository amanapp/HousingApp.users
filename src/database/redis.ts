import { logger } from "../middleware/winsdon.middleware";
import { createClient } from "redis";
export const client = createClient()
client.on("error", (err) => logger.log({level:"error",message:"Redis Client Error"}));
client.connect();