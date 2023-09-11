import express from "express";
import "./config/env";
import routes from "./routes/index.routes";
import { connection } from "./database/dbconnection";
import { logger } from "./middleware/winsdon.middleware";

// import * as swaggerDocument from './swagger/swagger.json';
// import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3001;

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  connection();
  logger.log({
    level: "info",
    message: `Server started on ${port}`,
  });
});
