const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require('./db/mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc');

const routes = require('./routes/routes.ws')


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    "openapi": "3.0.3",
    "info": {
      "version": "1.0.0",
      "title": "MY-PIOL WS-API",
      "description": "Project Application API WS",
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    },
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      },
    },
    "host": "localhost:3000",
    "basePath": "/api/v1",
    "tags": [
      {
        "name": "User",
        "description": "All API end point for user"
      },
      {
        "name": "Category",
        "description": "All API for Categorys"
      },
      {
        "name": "Property",
        "description": "All API for Property"
      }
    ],
    "servers": [
      {
        "url": "https://app-ws-mypiol.herokuapp.com/api/v1", // url
        "description": "Api Server", // name
      },
    ],
    "schemes": [
      "http"
    ],
    "consumes": [
      "application/json"
    ],
    "produces": [
      "application/json"
    ],

  },
  apis: ["./routes/routes.ws.js"]
}
var options = {
  swaggerOptions: {
    authAction: { JWT: { name: "JWT", schema: { type: "apiKey", in: "header", name: "Authorization", description: "" }, value: "Bearer <JWT>" } }
  }
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(
  '/api-docs',
  swaggerUi.serve, swaggerUi.setup(swaggerDocs, options)
);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my-piol application." });
});

app.use('/api/v1', routes)
// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});