import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import environment from './environment';
import path from 'path';

useContainer(Container);

const app = createExpressServer({
  controllers: [path.join(__dirname, '/controllers/**/*.ts')],
  middlewares: [path.join(__dirname, '/middlewares/**/*.ts')],
  interceptors: [path.join(__dirname, '/interceptors/**/*.ts')]
});

app.listen(environment.port);