import { BodyParam, Controller, Post } from 'routing-controllers';
import { AuthRepository } from '../repositories/AuthRepository';
import { Service } from 'typedi';
import { JwtPayload } from 'jsonwebtoken';

@Controller()
@Service()
export class HomeController {

    constructor(private authRepository: AuthRepository) { }

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: login to API
     *     description: Return a jwt token if given credentials are correct
     */
    @Post('/auth/login')
    public login(): string {
         return this.authRepository.login({login: '', password: ''});
     }

     /**
     * @swagger
     * /auth/verify:
     *   post:
     *     summary: verify the jwt token
     *     description: Return the payload of the jwt token if the given token is valid
     */
    @Post('/auth/verify')
    public verify(@BodyParam('token') token: string): string | JwtPayload {
        console.log(token);
        return this.authRepository.verify(token);
    }
}