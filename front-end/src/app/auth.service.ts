import { PasswordService } from './password.service';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl, httpOptions} from './serverData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    token: any;
    user: any;

  constructor(private http: HttpClient) {}

   addUser(account: User): Observable<any>{
        return this.http.post<User>(`${serverUrl}reg`, account,httpOptions);
    }

    authUser(account: any): Observable<any>{
        return this.http.post(`${serverUrl}auth`, account,httpOptions);
    }

    storeUser(token:any, user:any){
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
        this.token = token;   
    }
    logout(){
        this.user = null;
        this.token = null;
        localStorage.clear();
    }

    isLoggedIn(){        
        return new Promise((resolve, reject) => {
            if (this.token) {
                resolve(true);
            }
            else{
                resolve(false)
            }
        })
    }

}
