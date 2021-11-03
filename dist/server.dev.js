"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var cors = require("cors");

var app = express();

require('./db/mongoose');

var swaggerUi = require('swagger-ui-express');

var swaggerJsDoc = require('swagger-jsdoc');

var routes = require('./routes/routes.ws');

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions)); // parse requests of content-type - application/json
// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());
var swaggerOptions = {
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
      }
    },
    "host": "localhost:3000",
    "basePath": "/api/v1",
    "tags": [{
      "name": "User",
      "description": "All API end point for user"
    }, {
      "name": "Category",
      "description": "All API for Categorys"
    }],
    "servers": [{
      "url": "https://app-ws-mypiol.herokuapp.com/api/v1",
      // url
      "description": "Api Server" // name

    }],
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"]
  },
  apis: ["./routes/routes.ws.js"]
};
var options = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: "JWT",
        schema: {
          type: "apiKey",
          "in": "header",
          name: "Authorization",
          description: ""
        },
        value: "Bearer <JWT>"
      }
    }
  }
};
var swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options)); // simple route

app.get("/", function (req, res) {
  res.json({
    message: "Welcome to my-piol application."
  });
});
app.use('/api/v1', routes); // set port, listen for requests

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT, "."));
});