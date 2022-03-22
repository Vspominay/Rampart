import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralModal {
  constructor() { }
    blockOverflow(isBlock: boolean){
        let srollWidth = window.innerWidth - document.body.offsetWidth;

        if(isBlock){
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${srollWidth}px`
        }
        else{
            setTimeout(() => {
                document.body.style.paddingRight = `0px`
                document.body.style.overflow = "auto";   
            }, 300);
        }
    }
}
