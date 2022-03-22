import { GeneralModal } from './../general-modal';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { RegistrationService } from './../registration.service';
import { Observable } from 'rxjs';
import { Account } from './../../models/account';
import { PasswordService } from './../../password.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalService } from '../modal.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
    display$: Observable<'open' | 'close'>;
    _emailError = {
        isError: false,
        msg: ""
    }

    constructor(private modalService:RegistrationService,
        private authService:AuthService,
        private fb:FormBuilder,
        private generalModal: GeneralModal) {
         }


        newAccountForm = this.fb.group(
            {
                name: ['',[Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
                email: ['',[Validators.required, Validators.email, Validators.minLength(4),Validators.maxLength(40)]],
                password: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
                passwordRepeat: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(40)]]
            }
        )

    ngOnInit(): void {
        this.display$ = this.modalService.watch();
    }

    close(){
    this.generalModal.blockOverflow(false);
        this.modalService.close();
    }
    
    get _email() {
        return this.newAccountForm.get('email');
    }
    get _name() {
        return this.newAccountForm.get('name');
    } 
    get _password() {
        return this.newAccountForm.get('password');
    } 
    get _passwordRepeat() {
        return this.newAccountForm.get('passwordRepeat');
    } 
    
    signUp(){
        this.authService.addUser(this.newAccountForm.value)
            .subscribe(res => {
               if (res._id) {
                this.close();   
                this.newAccountForm.reset();                
               }
               else{
                   this._emailError.msg = res.msg;
                   this._emailError.isError = !res.success;
               }
            });
    }
}
