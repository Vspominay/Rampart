import { TutorialService } from './../modal/tutorial.service';
import { GeneralModal } from './../modal/general-modal';
import { DeleteAccountService } from './../modal/delete-account.service';
import { DeleteAccountComponent } from './../modal/delete-account/delete-account.component';
import { SearchService } from './../modal/search.service';
import { BurgerService } from './../modal/burger.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { PasswordService } from './../password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    personName: string = "User";
    currentText: string;

  constructor(private passwordService:PasswordService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private burgerService:BurgerService,
    private searchService:SearchService,
    private deleteAccount:DeleteAccountService,
    private generalModal:GeneralModal,
    private tutorialService:TutorialService) { }

    ngOnInit(): void {
        this.currentText = this.passwordService.term.getValue();
        this.personName = this.authService.user?.name;
        
    }
    search(term:string):void{      
        if (this.activatedRoute.snapshot.routeConfig?.path != "storage") {
            this.router.navigate(["storage"]);
        }
        this.passwordService.term.next(term);
    }

    logout(){
    this.authService.logout();
    this.router.navigate(['auth']);
    }
    openBurger(){
    this.burgerService.open();
    this.generalModal.blockOverflow(true);

    }
    closeBurger(){
        this.burgerService.close();
    }
    openSearchBar(){
        this.searchService.open();
    }

    showModalDelete(){
        this.deleteAccount.open();
        this.generalModal.blockOverflow(true);
    }
    opentutorial(){
        this.tutorialService.open();
        // this.generalModal.blockOverflow(true);
    }

    showSubMenu(){
    let submenu = document.querySelector('.submenu');
    
    function clickListener(e:any){  
        
        if (!e.target.closest('.submenu-link')) {
            submenu?.classList.remove('active');     
            document.removeEventListener('click',clickListener);                            
        }

    }
        submenu?.classList.add('active');
        document.addEventListener('click',clickListener);
    }

}
