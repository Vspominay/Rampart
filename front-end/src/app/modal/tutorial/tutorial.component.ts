import { Observable } from 'rxjs';
import { TutorialService } from './../tutorial.service';
import { GeneralModal } from './../general-modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
    display$: Observable<'open' | 'close'>;

    constructor(private tutorialService:TutorialService,
        private generalModal:GeneralModal) { }
    
        ngOnInit(): void {
            this.display$ = this.tutorialService.watch();
        }

  close(){
    this.tutorialService.close();
    this.generalModal.blockOverflow(false);
}
}
