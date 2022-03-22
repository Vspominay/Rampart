import { Account } from './../models/account';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

    private display: Subject<'open' | 'close'> = 
    new Subject();

    newAccount:BehaviorSubject<User> = new BehaviorSubject<User>({
        _id: 0,
        email: "",
        name: "",
        password: "",
    });

    watch(): Observable<'open' | 'close'>{
        return this.display.asObservable();
    }

    open(){
        this.display.next('open');
    }
    close(){
        this.display.next('close');
    }
  constructor() { }
}
