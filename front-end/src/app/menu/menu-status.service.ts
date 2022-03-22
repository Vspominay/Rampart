import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuStatusService {

    activeItem:BehaviorSubject<string> = new BehaviorSubject<string>("/storage");

  constructor() { }
}
