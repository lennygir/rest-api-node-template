import 'reflect-metadata';
import { Action, createExpressServer, useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';

import environment from './environment';
import path from 'path';
import bodyParser from 'body-parser';

import express from 'express';

import swaggerSpec from './swagger';
import swaggerUi from 'swagger-ui-express';
import AuthRepository from './repositories/AuthRepository';

// Configuration for typedi injection
useContainer(Container);

// Create a new express application instance
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Create a new routing-controller instance
const app = useExpressServer(server, {
  authorizationChecker: async (action: Action, roles: string[]) => {
    const token = action.request.headers['authorization'];

    const user = await (new AuthRepository()).verify(token);
    console.log(user);
    if (user) return true;
    return false;
  },
  currentUserChecker: async (action: Action) => {
    const token = action.request.headers['authorization'];
    return (new AuthRepository()).verify(token);
  },
  controllers: [path.join(__dirname, '/controllers/**/*')],
  middlewares: [path.join(__dirname, '/middlewares/**/*')],
  interceptors: [path.join(__dirname, '/interceptors/**/*')]
});

// Swagger configuration
app.use(environment.documentationPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;