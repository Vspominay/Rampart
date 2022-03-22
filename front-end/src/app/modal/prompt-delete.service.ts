import { Account } from './../models/account';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptDeleteService {
    private display: Subject<'open' | 'close'> = 
    new Subject();

    currentPassword:BehaviorSubject<Account> = new BehaviorSubject<Account>(
        {_id: 0 ,img: '', title: "",email: '', url: '', password: '', description: "",user_id: 1}
    );

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
