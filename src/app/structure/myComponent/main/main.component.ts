import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataStoreService } from 'src/app/services/data-store.service';
import { ApiService } from "../../../services/api.service";
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {

  constructor(public api: ApiService, public router: Router, private dataStore: DataStoreService, public global: GlobalService) {


  }

  assignmentId: any;
  admin_dept_id: any;
  ngOnInit(): void {
    this.router.navigate(['/Main']);
    this.getSessionData();
    this.getRequestCount();
    this.getWorkFlowId();
    localStorage["previousPage"] = '';
  }

  // session data 

  getSessionData() {
    this.api.getSession().subscribe({
      next: (res) => {
        console.log("session");
        console.log(localStorage);
        let session = res;
        console.log(session.AssignInfo.Aid);
        console.log(localStorage['assignmentID']);
        // this.assignmentId = this.dataStore.getAssignmentId()
        this.assignmentId = localStorage["assignmentID"];
        this.admin_dept_id = session.AssignInfo.AValue;
      },
      error: () => {
        this.global.alertForApiDown();
      }
    });
  }


  count = { "draftCount": "", "inboxCount": "", "outboxCount": "" };
  getRequestCount() {
    this.api.getRequestCount(localStorage["assignmentID"]).subscribe((res) => {
      //this.count=res.data;
      this.count.draftCount = res.data.draftCount;
      this.count.outboxCount = res.data.outboxCount;
      this.count.inboxCount = res.data.inboxCount;
      console.log(res);
    });
  }

  getWorkFlowId() {
    //  alert(this.assignmentId);return false;
    let requestData = {
      "formID": 1,
      "assignmentId": this.assignmentId
    }
    this.api.getWorkFlowId(requestData).subscribe({
      next: (res) => {
        // // process id
        //Commented since api was not working 
        console.log("workflow id api response received");
        console.log(res);
        // // res.data.wfProcessId  = 0 ; //test parameter
        if (res.data.wfProcessId == 0) {
          // alert("Access Denied!");
          this.global.alertWithError()
        } else {
          console.clear();
          localStorage.setItem("assignmentID", this.assignmentId);
          localStorage.setItem("wfProcessId", res.data.wfProcessId);
          console.log("data from workflow process api is ");
          console.log("assignment Id", this.assignmentId);
          console.log("assignment Id", res.data.wfProcessId);
          console.log("_______________________log ends");
          //alert("Error moving to the next page");
          localStorage.setItem("previousPage", "Menu")
          this.router.navigate(['/DepartmentCreation']); // temp fix since api not working 
        }
      }
      ,
      error: (err) => { console.log(err); }
    })
  }
  isPlusClick: boolean = false;
  officeMgnt() {
    this.isPlusClick = !this.isPlusClick;
  }
}