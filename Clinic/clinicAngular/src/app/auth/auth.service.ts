import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Admin } from './auth.model'

@Injectable()
export class AuthService {

    url: string;
    constructor(private readonly http: HttpClient){
        this.url = 'http://localhost:8080/';
    }

    login(data: Admin){
        return this.http.post<Admin>(this.url + 'admin', data);
    }
}