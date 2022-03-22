import { GeneralModal } from './../modal/general-modal';
import { ChangeLogoService } from './../modal/change-logo.service';
import { BurgerService } from './../modal/burger.service';
import { RegistrationService } from './../modal/registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {

    _loginError = {
        isError: false,
        msg: ""
    };
    _passError = {
        isError: false,
        msg: ""
    };

    authForm = this.fb.group(
        {
            login: ['',[Validators.required, Validators.email, Validators.minLength(4),Validators.maxLength(40)]],
            password: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(40)]]
        }
    )

    constructor(private fb:FormBuilder,
        private registrationService:RegistrationService,
        private authService:AuthService,
        private router: Router,
        private generalModal:GeneralModal
        ) { }

    get _email() {
        return this.authForm.get('login');
    } 

    get _password() {
        return this.authForm.get('password');
    } 


  ngOnInit(): void {
  }

  onSubmit(){
      const account = {
          email: this._email?.value,
          password: this._password?.value
      }
    
         this.authService.authUser(account).subscribe(res => {
            //  console.log(res);
             if (res.success) {
                 this.router.navigate(['storage']);
                 this.authService.storeUser(res.token,res.user);
             }
             else{
                 switch (res.typeError) {
                     case "account": 
                        this._loginError.msg = res.msg; 
                        this._loginError.isError = true;
                        break;
                     case "password":
                        this._passError.msg = res.msg;
                        this._passError.isError = true; 
                        break;
                 }
             }
             
         });
  };

  openRegistration(){            
    this.registrationService.open();
    this.generalModal.blockOverflow(true);
  }
}
