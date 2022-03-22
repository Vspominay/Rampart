import { PasswordService } from './../password.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class NewLoginComponent implements OnInit {

    formGroup: FormGroup;
    
    buttonCreateText = "Create";
    sliderProgress = 18;
    password = "";
    passwordInputType = "password";
    userId = null;
    form: FormControl;

    checkboxes = [{
        option: 'uppercase',
        text: 'Include Uppercase',
        checked: true
      }, {
        option: 'lowercase',
        text: 'Include Lowercase',
        checked: true
      }, {
        option: 'number',
        text: 'Include Numbers',
        checked: true
      }, {
        option: 'symbol',
        text: 'Include Symbols',
        checked: false
      }];

    constructor(private passwordService: PasswordService) { }

    ngOnInit(): void {
        this.form = new FormControl();
        this.form.valueChanges.subscribe(value => this.sliderProgress = value);
        this.userId = this.passwordService.getUserId();

        this.formGroup = new FormGroup({
            img: new FormControl('default',[]),
            title: new FormControl('',[Validators.minLength(3), Validators.required, Validators.maxLength(40)]),
            email: new FormControl('',[Validators.minLength(4), Validators.required,  Validators.maxLength(40)]),
            url: new FormControl('',[]),
            password: new FormControl('',[Validators.required]),
            description: new FormControl('',[]),
            user_id: new FormControl(this.userId,[Validators.required]),
        })
    }

    

    get _title() {
        return this.formGroup.get('title');
    }
    get _email() {
        return this.formGroup.get('email');
    } 
    get _password() {
        return this.formGroup.get('password');
    } 
    get _url() {
        return this.formGroup.get('url');
    } 

    getRandomLower():string {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    getRandomUpper():string {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    getRandomNumber():string {
        return String.fromCharCode(Math.floor((window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1)) * 10) + 48);
    }
    getRandomSymbol():string {
        const symbols = '~!@#$%^&*()_+{}":?><;.,';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    randomFunc:any = {
        "lower": this.getRandomLower,
        "upper": this.getRandomUpper,
        "number": this.getRandomNumber,
        "symbol": this.getRandomSymbol,
    };

    onGenerate(){
        this._password?.setValue(this.generatePassword(this.sliderProgress, this.checkboxes[1].checked, this.checkboxes[0].checked ,this.checkboxes[2].checked,this.checkboxes[3].checked));
        this.passwordInputType = "text";
        setTimeout(() => {
            this.passwordInputType = "password";
        }, 10000);
    }


    generatePassword(length: number, lower:boolean, upper:boolean, number:boolean, symbol:boolean) {
        let generatedPassword = "";
        const typesCount = +lower + +upper + +number + +symbol;
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
        if (typesCount === 0) {
            return "";
        }
        for (let i = 0; i < length; i++) {
            typesArr.forEach(type => {
                const funcName:string = Object.keys(type)[0];
                generatedPassword += this.randomFunc[funcName]();
            });
        }
        return generatedPassword.slice(0, length)
            .split('').sort(() => Math.random() - 0.5)
            .join('');

        }
    
    copyInputMessage(inputElement:any){
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
        }

    createAccount():void{
        this.passwordService.addService(this.formGroup.value)
            .subscribe(result => console.log(result));
        this.resetForm();
        this.buttonCreateText = '✓';
        setTimeout(() => {
            this.buttonCreateText = 'Create';
        }, 1000);
    }

    resetForm(){
        this._title?.reset();
        this._email?.reset();
        this._password?.reset();
        this._url?.reset();
    }
}
