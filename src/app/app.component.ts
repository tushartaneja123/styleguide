import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataStoreService } from './services/data-store.service';
import { MDMService } from './shared/services/mdm.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

   userName: string = "";
   role: string = "";
   officeName: string = "";
   todaysDate = new Date();
   isHidden: boolean = false;
   currentDate = new Date();

   constructor(private dataStore: DataStoreService, private router: Router, private MDMService: MDMService) {

   }
   title = 'IFMS | Department of Finance - Government of India';
   path = ["Home", "Menu"];


   ngAfterViewInit(): void {
      this.router.events.subscribe(event => {
         if (event instanceof NavigationEnd) {
            console.log(event.url)
            this.updateBreadCrumb();
         }
      })
   }

   updateBreadCrumb(): void {
      this.userName = localStorage["userName"];
      this.role = localStorage["roleName"];
      // this.officeName = localStorage["ON"];
      // let data = { "AType": "Admin", "AValue": 72 };
      // let data = { aid: "Admin", aValue: 72 };
      // let data = { aType: 1, aValue: 72 };
      let data = { aType: parseInt(localStorage["aType"]), aValue: localStorage["aValue"] }
      this.MDMService.getUserInfo(data).subscribe(res => {
         this.officeName = res.data.nameEng + " (" + res.data.nameHin + ")";
      },
         (err) => { console.log("error loading office/department/division name - getinfo api ") })
   }





}
