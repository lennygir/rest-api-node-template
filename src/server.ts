import 'reflect-metadata';
import { createExpressServer, useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';

import environment from './environment';
import path from 'path';
import bodyParser from 'body-parser';

import express from 'express';

import swaggerSpec from './swagger';
import swaggerUi from 'swagger-ui-express';

// Configuration for typedi injection
useContainer(Container);

// Create a new express application instance
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Create a new routing-controller instance
const app = useExpressServer(server, {
  controllers: [path.join(__dirname, '/controllers/**/*')],
  middlewares: [path.join(__dirname, '/middlewares/**/*')],
  interceptors: [path.join(__dirname, '/interceptors/**/*')]
});

// Swagger configuration
app.use(environment.documentationPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;