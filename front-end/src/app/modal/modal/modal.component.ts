import { GeneralModal } from './../general-modal';
import { PasswordService } from './../../password.service';
import { Account } from './../../models/account';
import { ModalService } from './../modal.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    display$: Observable<'open' | 'close'>;
    currentPassword: Account;
    
    constructor(private modalService:ModalService,
        private passwordService:PasswordService,
        private generalModal:GeneralModal) { }

    ngOnInit(): void {
        this.display$ = this.modalService.watch();
        this.form = new FormControl();

       
        this.modalService.currentPassword.subscribe(res => {
            if (res) {
                this.formGroup = this.formGroup = new FormGroup({
                    img: new FormControl('../assets/img/youTube.png',[]),
                    title: new FormControl(res.title,[Validators.minLength(3), Validators.required, Validators.maxLength(40)]),
                    email: new FormControl(res.email,[Validators.minLength(4), Validators.required,  Validators.maxLength(40)]),
                    url: new FormControl(res.url,[]),
                    password: new FormControl(res.password,[Validators.required]),
                    description: new FormControl(res.description,[]),
                })
            }
            this.currentPassword = res;
        });
    }

    close(){
        this.modalService.close();
        this.generalModal.blockOverflow(false);
    }
    
    formGroup: FormGroup;
    

    form: FormControl;
    
    get _title() {
        return this.formGroup.get('title');
    }
    get _email() {
        return this.formGroup.get('email');
    } 
    get _password() {
        return this.formGroup.get('password');
    } 
    update(){
        this.passwordService.updatePassword(this.currentPassword).subscribe(result => console.log(result));
        this.modalService.close();
    }

}
