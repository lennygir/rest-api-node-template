/*

    MIDDLEWARE EXAMPLE

import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log('do something...');
    next();
  }
}
*/