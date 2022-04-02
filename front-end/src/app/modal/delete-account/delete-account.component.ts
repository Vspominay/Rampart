import { GeneralModal } from './../general-modal';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DeleteAccountService } from './../delete-account.service';
import { PasswordService } from './../../password.service';
import { PromptDeleteService } from './../prompt-delete.service';
import { Account } from './../../models/account';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {


    display$: Observable<'open' | 'close'>;
    currentPassword: Account;
    
    constructor(private promptService:DeleteAccountService,
        private passwordService:PasswordService,
        private authService:AuthService,
        private router: Router,
        private generalModal:GeneralModal) { }

    ngOnInit(): void {
        this.display$ = this.promptService.watch();
    }

    close(){
        this.promptService.close();
        this.generalModal.blockOverflow(false);
    }

    deleteUser(){
        const id = this.authService.user.id;
        this.passwordService.deleteAccount(id)
            .subscribe(res => {       

          this.generalModal.blockOverflow(false);
                if (res.success) {
                    this.close();
                    this.authService.logout();
                    this.router.navigate(['auth']);
                }
            })
    }
}
