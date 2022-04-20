import { Credential } from "../shared/dto/Credential.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Service } from "typedi";
import environment from "../environment";
import GenericRepository from "./GenericRepository";
import { User } from "../shared/dto/User.model";
import bcrypt from 'bcrypt';

@Service()
export default class AuthRepository extends GenericRepository<User> {
    constructor() {
        super("user");
    }

    public login(credential: Credential): Promise<string> {
        // Check if user is in the database
        return new Promise((resolve, reject) => {
            this.where(['username'], [credential.username]).then(users => {
                if(users.length === 0) {
                    resolve(null);
                }
                // Check if password is correct
                this.comparePassword(credential.password, users[0].password).then(isPasswordMatch => {
                    if(!isPasswordMatch) {
                        resolve(null);
                    }
                    // Generate jwt token
                    delete users[0].password;
                    resolve(jwt.sign(users[0], environment.jwt_secret, {
                        algorithm: environment.jwt_algorithm as jwt.Algorithm,
                        expiresIn: environment.jwt_expiresIn
                    }));
                })
            })
        });
    }

    public verify(token: string): string | JwtPayload {
        return jwt.verify(token, environment.jwt_secret);
    }

    public async create(user: User): Promise<User> {
        user.password = await this.cryptPassword(user.password);
        return super.create(user);
    }

    private async cryptPassword(password: string): Promise<string> {
        return await new Promise((resolve, reject) => {
            bcrypt.genSalt(environment.pwd_salt, (err, salt) => {
                if (err)
                    throw err;

                bcrypt.hash(password, salt, (err2, hash) => {
                    if(err2)
                        throw err2;
                    resolve(hash);
                });
            });
        });
    }

    private async comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            bcrypt.compare(password, encryptedPassword, (err, isPasswordMatch) => {
                if(err)
                    throw err;
                resolve(isPasswordMatch);
            });
        });
     };
}
