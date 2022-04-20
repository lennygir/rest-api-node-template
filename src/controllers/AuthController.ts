import { Body, BodyParam, Controller, OnNull, Post } from 'routing-controllers';
import AuthRepository from '../repositories/AuthRepository';
import { Service } from 'typedi';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../shared/dto/User.model';
import { Credential } from '../shared/dto/Credential.model';

@Controller('/auth')
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
    @OnNull(401)
    @Post('/login')
    public login(@Body() credentials: Credential): Promise<string> {
        return this.authRepository.login(credentials);
    }

    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: register to API
     *     description: return the user created
     *     parameters:
     *       - in: body
     *         schema:
     *             basePath: './'
     *             $ref: './user.yml'
     */
    @Post('/register')
    public register(@Body() user: User): Promise<User> {
        return this.authRepository.create(user);
    }

    /**
     * @swagger
     * /auth/verify:
     *   post:
     *     summary: verify the jwt token
     *     description: Return the payload of the jwt token if the given token is valid
     */
    @Post('/verify')
    public verify(@BodyParam('token') token: string): string | JwtPayload {
        try {
            return this.authRepository.verify(token);
        } catch (error) {
            return error;
        }
    }
}