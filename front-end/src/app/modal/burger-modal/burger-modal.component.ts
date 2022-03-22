import { GeneralModal } from './../general-modal';
import { ActivatedRoute } from '@angular/router';
import { MenuStatusService } from './../../menu/menu-status.service';
import { BurgerService } from './../burger.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-burger-modal',
  templateUrl: './burger-modal.component.html',
  styleUrls: ['./burger-modal.component.scss']
})
export class BurgerModalComponent implements OnInit {
    display$: Observable<'open' | 'close'>;

    constructor(private burgerService:BurgerService,
        private generalModal:GeneralModal) { }
    

    close(){
        this.burgerService.close();
        this.generalModal.blockOverflow(false);
    }

  menu = [
      {icon: "add-item", content: "+", router: "/create", text: "Create a new login"},
      {icon: "icon-storage", content: "", router: "/storage", text: "Storage"},
  ]


  ngOnInit(): void {
    this.display$ = this.burgerService.watch();
  }
  selectMenuItem(){
      this.burgerService.close();
      this.generalModal.blockOverflow(false);
  }


}
