import { GeneralModal } from './../general-modal';
import { PasswordService } from './../../password.service';
import { Observable, debounceTime, switchMap, distinctUntilChanged, Subject } from 'rxjs';
import { AuthService } from './../../auth.service';
import { ChangeLogoService } from './../change-logo.service';
import { Component, OnInit } from '@angular/core';
import { Logo } from 'src/app/models/logo';

@Component({
  selector: 'app-change-logo',
  templateUrl: './change-logo.component.html',
  styleUrls: ['./change-logo.component.scss']
})
export class ChangeLogoComponent implements OnInit {
    display$: Observable<'open' | 'close'>;
    subject = new Subject<string>();
    dataIsNotFound:boolean;


    LogoImages:Logo[] = [];
    selectedImage = {
        isSelect: false,
        src: "",
        id: -1
    }

  constructor(private logoService:ChangeLogoService,
    private passwordService:PasswordService,
    private generalModal:GeneralModal) { }

  ngOnInit(): void {
    this.display$ = this.logoService.watch();
    this.logoService.getLogsPerPage()
        .subscribe(images => {    
            
            if (images.success) {
                this.LogoImages = images.logo;
            }
            else{
                console.log(images.msg);
            }
        })

    this.subject.pipe(
        debounceTime(300),
        switchMap((title: string) => this.logoService.searchLogo(title))
    ).subscribe(res => {
        if (res.success) {
            this.dataIsNotFound = res.logo.length ? false : true;
            this.LogoImages = res.logo;
        }
        else{
            console.log(res.msg);
        }
    })

  }
  close(){
    this.logoService.close();
    this.generalModal.blockOverflow(false);
}

selectLogo(logo:any){
    this.selectedImage.id = logo._id;
    this.selectedImage.isSelect = true;
    this.selectedImage.src = logo.src;
}
        setLogo(){
            this.close();
            let [src, _id] = [this.selectedImage.src, this.logoService.selectedAccount.getValue() + ""];
            this.logoService.updateLogo({src, _id})
                .subscribe(res => {
                    this.generalModal.blockOverflow(false);

                    if (res.success) {
                        this.passwordService.term.next("");                
                    }
                    else{
                        console.log(res.msg);
                    }            
                })}

        searchLogo(title: string){          
                    this.subject.next(title);
        }

        infititeLoad(){
            if (!this.dataIsNotFound) {
                let currentPage = this.logoService.currentPage;
                let currentPageValue:number = currentPage.getValue(); 
                    
                currentPage.next(++currentPageValue); 
                    
                this.logoService.getLogsPerPage()
                    .subscribe(res => {                        
                        if (res.success) {
                            this.LogoImages = this.LogoImages.concat(res.logo);
                        }
                    });
            }            
        }
}


