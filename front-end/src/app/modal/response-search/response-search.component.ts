import { GeneralModal } from './../general-modal';
import { PasswordService } from './../../password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './../search.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-response-search',
  templateUrl: './response-search.component.html',
  styleUrls: ['./response-search.component.scss']
})
export class ResponseSearchComponent implements OnInit {
    display$: Observable<'open' | 'close'>;
    currentText: string;


  constructor(private searchService:SearchService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private passwordService:PasswordService,
    private generalModal:GeneralModal) { }

  ngOnInit(): void {
    this.display$ = this.searchService.watch();
    this.currentText = this.passwordService.term.getValue();
  }

  close(){
      this.searchService.close();
      this.generalModal.blockOverflow(false);
  }
  open(){
      this.searchService.open();
      this.generalModal.blockOverflow(true);
  }
  search(term:string):void{      
    if (this.activatedRoute.snapshot.routeConfig?.path != "storage") {
        this.router.navigate(["storage"]);
    }
    this.passwordService.term.next(term);
  }

}
