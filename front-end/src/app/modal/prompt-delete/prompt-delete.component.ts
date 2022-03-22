import { GeneralModal } from './../general-modal';
import { PasswordService } from './../../password.service';
import { Account } from './../../models/account';
import { ModalService } from './../modal.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PromptDeleteService } from '../prompt-delete.service';

@Component({
  selector: 'app-prompt-delete',
  templateUrl: './prompt-delete.component.html',
  styleUrls: ['./prompt-delete.component.scss']
})
export class PromptDeleteComponent implements OnInit {

    display$: Observable<'open' | 'close'>;
    currentPassword: Account;
    
    constructor(private promptService:PromptDeleteService,
        private passwordService:PasswordService,
        private generalModal:GeneralModal) { }

    ngOnInit(): void {
        this.display$ = this.promptService.watch();
        this.promptService.currentPassword.subscribe(pass => this.currentPassword = pass);
    }

    close(){
        this.promptService.close();
        this.generalModal.blockOverflow(false);
    }

    deleteAccount(){
        let id = this.currentPassword._id;                
        this.passwordService.deltePassword(id).subscribe(acc => {
            this.passwordService.term.next('');
        });/*the subscription starts updating the list, but in order to bypass the distinctUntilChanged() function, I pass a tab as a parameter  */
        this.promptService.close();
    }
}
