import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi';
import environment from '../environment';

@Controller()
@Service()
export class HomeController {
    /**
     * @swagger
     * /:
     *   get:
     *     summary: API status
     *     description: Is my API working ?
     */
    @Get('/')
    public home(): string {
        return 'Welcome to ' + environment.appName + ' ' + environment.version + ' API';
    }
}