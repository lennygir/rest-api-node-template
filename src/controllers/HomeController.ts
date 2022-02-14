import { Controller, Param, Body, Get, Post, Put, Delete, All } from 'routing-controllers';
import environment from '../environment';

@Controller()
export class HomeController {
    @All('/')
    public home(): string {
        return 'Welcome to ' + environment.appName + ' ' + environment.version + ' API';
    }
}