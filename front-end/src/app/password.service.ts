import { Account } from './models/account';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import handleError from './errorHendler';
import {serverUrl as passwordUrl, httpOptions} from './serverData';
import { serverResponse } from './models/serverResonse';

@Injectable({
    providedIn: 'root'
})
export class PasswordService {

    // private passwordsUrl = 'http://localhost:3000';

    currentPage:BehaviorSubject<number> = new BehaviorSubject<number>(1);
    term:BehaviorSubject<string> = new BehaviorSubject<string>('');


    constructor(private http: HttpClient) { }

    searchPasswords(term: string):Observable<Account[]>{
        if (!term.trim()) {     
            this.currentPage.next(1);       
            return this.getPasswordsPerPage();
        }
        let userId = this.getUserId();
        return this.http.get<Account[]>(`${passwordUrl}storage?title=${term}&usrid=${userId}`, httpOptions);
    }

    getPasswords(): Observable<Account[]>{
        let userId = this.getUserId();        
        return this.http.get<Account[]>(`${passwordUrl}storage?usrid=${userId}`, httpOptions)
            .pipe(
                catchError(handleError<Account[]>('getPasswords',[]))
            );
    }

    getPasswordsPerPage(): Observable<Account[]>{ 
        let userId = this.getUserId();        
        return this.http.get<Account[]>(`${passwordUrl}storage?page=${this.currentPage.getValue()}&usrid=${userId}`, httpOptions)
            .pipe(
                catchError(handleError<Account[]>('getPasswords',[]))
            );
    }

    addService(password: Account): Observable<Account>{
        console.log(password);
        
        return this.http.post<Account>(`${passwordUrl}create`,password,httpOptions)
        .pipe(
            catchError(handleError<Account>('addService'))
        );
    }

    deltePassword(id:number): Observable<Account>{
        return this.http.delete<Account>(`${passwordUrl}storage?id=${id}`, httpOptions)
        .pipe(
            catchError(handleError<Account>('deletePassword'))
        );
    }
        
    updatePassword(password:Account):Observable<any>{ 
                       
        return this.http.put(`${passwordUrl}storage`,password,httpOptions).pipe(
            tap(_ => console.log(`updated pass id=${password}`)),
            catchError(handleError<any>('updatePass'))
          );
    }

    getUserId(){
        return JSON.parse(localStorage.getItem("user") || "").id;
    }

    deleteAccount(id:string):Observable<serverResponse>{
        return this.http.delete<serverResponse>(`${passwordUrl}delete?id=${id}`,httpOptions)
        .pipe(
            catchError(handleError<serverResponse>('deleteAccount'))
        );
    }

}
