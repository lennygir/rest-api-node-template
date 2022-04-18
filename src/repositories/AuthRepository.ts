import { Credential } from "../shared/dto/Credential.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Service } from "typedi";
import environment from "../environment";
import GenericRepository from "./GenericRepository";
import { User } from "../shared/dto/User.model";

@Service()
export default class AuthRepository extends GenericRepository<User> {
    constructor() {
        super("user");
    }

    public login(credential: Credential): string {
        // Check if user is in the database
        const user = { username: 'just_testing' };

        // Generate the jwt
        return jwt.sign(user, environment.jwt_secret, {
            algorithm: environment.jwt_algorithm as jwt.Algorithm,
            expiresIn: environment.jwt_expiresIn
        });
    }

    public verify(token: string): string | JwtPayload {
        console.log(token);
        return jwt.verify(token, environment.jwt_secret);
    }
}
