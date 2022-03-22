import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    private display: Subject<'open' | 'close'> = 
    new Subject();


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
