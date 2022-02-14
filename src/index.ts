import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';

import environment from './environment';
import path from 'path';

const app = createExpressServer({
  controllers: [path.join(__dirname, '/controllers/**/*.ts')],
  middlewares: [path.join(__dirname, '/middlewares/**/*.ts')],
  interceptors: [path.join(__dirname, '/interceptors/**/*.ts')]
});

app.listen(environment.port);