const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.ts"]; // Replace with your route files

swaggerAutogen(outputFile, endpointsFiles);
