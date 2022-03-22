import { GeneralModal } from './../modal/general-modal';
import { ChangeLogoService } from './../modal/change-logo.service';
import { ModalService } from './../modal/modal.service';
import { PasswordService } from './../password.service';
import { Account } from './../models/account';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap, tap } from 'rxjs';
import { PromptDeleteService } from '../modal/prompt-delete.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

    passwords:Account[] = [];
    activeId: number;
    dataIsNotFound: boolean;
    passwordsTempArray:Account[] = [];
    readyForSearch:boolean = false;


    constructor(private passwordService:PasswordService,
        private modalService:ModalService,
        private promptService: PromptDeleteService,
        private changeLogoService:ChangeLogoService,
        private generalModal:GeneralModal) {
     }

    setActive(activated:number):void{
        this.activeId = activated;
    }
    setUnActive():void{
        this.activeId = -1;
    }
    getPasswords():void {
        this.passwordService.getPasswordsPerPage()
            .subscribe(pass => {                               
                this.passwords = this.passwords.concat(pass);
            });
    }
    ngOnInit(): void {
        this.changeLogoService.watch();

        this.passwordService.term.pipe(
            debounceTime(300),
            // distinctUntilChanged(),
            switchMap((term: string) => this.passwordService.searchPasswords(term))
          ).subscribe(pass => {                         
                this.dataIsNotFound = pass.length ? false : true;
                this.passwords  = pass; 
        });
        
    }


    copyInputMessage(inputElement:any){
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
        }

    openModal(password:Account){
        this.openModalBlock(password, this.modalService);
        }
    openPrompt(password:Account){
        this.openModalBlock(password, this.promptService);
    }

    openModalBlock(password:Account, service: ModalService | PromptDeleteService){
        service.open();
        service.currentPassword.next(password);
        this.generalModal.blockOverflow(true);
    }

    infititeLoad(){
        if (!this.dataIsNotFound) {
            let currentPage = this.passwordService.currentPage;
            let currentPageValue:number = currentPage.getValue(); 
                
            currentPage.next(++currentPageValue); 
                
            this.getPasswords();
        }
    }

    changeLogo(password:Account){        
        this.changeLogoService.open();
        this.changeLogoService.selectedAccount.next(password._id);        
        this.generalModal.blockOverflow(true);
    }
}
