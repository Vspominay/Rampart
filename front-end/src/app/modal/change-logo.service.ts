import { serverResponse } from './../models/serverResonse';
import { Logo } from './../models/logo';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {serverUrl as passwordUrl, httpOptions} from '../serverData';
import handleError from '../errorHendler';


@Injectable({
  providedIn: 'root'
})
export class ChangeLogoService {
    private display: Subject<'open' | 'close'> = 
    new Subject();

    currentPage:BehaviorSubject<number> = new BehaviorSubject<number>(1);
    term:BehaviorSubject<string> = new BehaviorSubject<string>('');
    selectedAccount:BehaviorSubject<number> = new BehaviorSubject<number>(-1);

    watch(): Observable<'open' | 'close'>{
        return this.display.asObservable();
    }

    open(){
        this.display.next('open');
    }
    close(){
        this.display.next('close');
    }

    getAllImages(): Observable<serverResponse | any>{
        return this.http.get(`${passwordUrl}logo`, httpOptions)
            .pipe(
                catchError(handleError<serverResponse>('getImages'))
            );
    }


    getLogsPerPage(): Observable<serverResponse | any>{ 
        return this.http.get(`${passwordUrl}logo?page=${this.currentPage.getValue()}`, httpOptions)
            .pipe(
                catchError(handleError<serverResponse>('get logs per page'))
            );
    }

    updateLogo(selectedLogo:Logo):Observable<serverResponse>{            
        return this.http.put<serverResponse>(`${passwordUrl}logo`,selectedLogo,httpOptions).pipe(
            tap(_ => console.log(`updated logo: ${selectedLogo._id}`)),
            catchError(handleError<serverResponse>('updatePass'))
          );
    }
    
    searchLogo(title: string):Observable<serverResponse | any>{
        if (!title.trim()) {     
            this.currentPage.next(1);       
            return this.getLogsPerPage();
        }
        return this.http.get(`${passwordUrl}logo?title=${title}`, httpOptions);
    }
  constructor(private http: HttpClient) { }
}
