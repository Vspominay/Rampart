import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuStatusService } from './menu-status.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

    activeItem: string = "";

    menu = [
        {icon: "add-item", content: "+", router: "/create", text: "Create a new login"},
        {icon: "icon-storage", content: "", router: "/storage", text: "Storage"},
        // {icon: "icon-security", content: "", router: "/analysis", text: "Safety analysis"},
        // {icon: "icon-delete", content: "", router: "/deletedLogins", text: "Deleted logins"},
    ]

    constructor(private menuStatus:MenuStatusService,
        private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
        this.menuStatus.activeItem.next(`/${this.activatedRoute.snapshot.routeConfig?.path}` || "/storage");
        this.activeItem = this.menuStatus.activeItem.getValue();
    }

}
