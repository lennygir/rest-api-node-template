import { Controller, All } from 'routing-controllers';
import { Service } from 'typedi';
import environment from '../environment';

@Controller()
@Service()
export class HomeController {
    @All('/')
    public home(): string {
        return 'Welcome to ' + environment.appName + ' ' + environment.version + ' API';
    }
}