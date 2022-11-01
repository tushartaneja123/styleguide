import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MDMService } from 'src/app/shared/services/mdm.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { DataStoreService } from 'src/app/services/data-store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-user-checker-preview',
  templateUrl: './user-checker-preview.component.html',
  styleUrls: ['./user-checker-preview.component.css']
})
export class UserCheckerPreviewComponent implements OnInit {

  pageRemark: string = environment.DefaultRemark;
  pageData: any;
  roles: any;
  assignmentId: string = '';
  requestId: string = '';
  taskId: string = ""
  remarks = new Array();
  remarkForm!: FormGroup;
  documents = new Array();
  actions = new Array();
  previousPage = localStorage.getItem("previousPage");
  isInitiated: boolean = true;
  isRejected: boolean = false;
  breadcrumb = new Array();
  classIconMap: string = "";
  isActionShown: boolean = false;
  suggestedRemarks = [];
  taskTransId: number = parseInt(<string>localStorage.getItem("taskTransId"));
  requestId1: string = localStorage["requestId"];
  additionalData = new Object();
  noSuggestedRemarks: boolean = false;
  subscription: any;

  constructor(public global: GlobalService, private _route: ActivatedRoute, private fb: FormBuilder, private dataStore: DataStoreService, private api: ApiService, private route: ActivatedRoute, private router: Router, private http: HttpClient, private MDMService: MDMService) {


    //console.log("Constructing preview component");



    let navigation = this.router.getCurrentNavigation()?.extras.state
    if (navigation != null) {
      // this.taskTransId = navigation['taskTranId'];
      // this.requestId = navigation['requestId'];
      // this.processId = navigation['processId'];
    }



  }

  @HostListener("window:beforeunload") unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    alert(" The data may be lost. Are you sure you want to refresh? Please save your work .")
  }

  ngOnInit(): void {


    this.getSuggestedRemarks();

    // console.log("Inside preview Component , Component initialised");
    // this.taskId = this.taskId;
    this.classIconMap = "{'fa fa-check-outline text-success':'INITIATE' , 'fa fa fa-arrow-circle-o-right text-danger': 'REJECT', 'fa fa-check text-green':'COMPLETE','fa fa-arrow-circle-o-down text-green':'FORWARD'}";

    this.breadcrumb = [
      { iconClass: "fa fa-home", text: "Home", url: "/Login" },
      { iconClass: "", text: "Menu", url: "/Main" },
      { iconClass: "", text: this.previousPage, url: `/Menu/${this.previousPage}` },
      { iconClass: "", text: 'Request Details', url: "/RequestDetails" }];

    this.remarkForm = this.fb.group({
      remark: ["", Validators.required]
    });


    let data = { "taskId": this.taskTransId };



    this.MDMService.getDepartmentRequestDetails(data).subscribe((response: any) => {
      // console.clear();
      console.log("Inside preview Component ")
      // console.log("Data Received from the api", response);
      this.pageData = response.data.payload;
      console.log("check here below")

      console.log(response.data.payload);
      //expDivName = response.data.payload.bfcUnitData.expenditureDivName;

      this.actions = response.data.actionData;
      if (localStorage.getItem("previousPage") != "Outbox") {
        this.isActionShown = true;
      }

      this.remarkForm.controls["remark"].setValue(this.pageData.remark);
      this.documents = this.pageData['documentDetails'][0].document;
      // console.log("documents array", this.documents);
      // console.log("action array", this.actions);
      this.getRemarks();
    },
      (err: HttpErrorResponse) => {
        let errorObj = {
          errorCode: '',
          status: err.status,
          message: err.message,
          request: data,
          response: err,
          Action: '',
          HTTPResponseErrorName: err.name,
          Meaning: ''
        };

        console.log("error is", errorObj);

      });

  }



  // --------- suggested remark list -------------------
  getSuggestedRemarks() {

    // let roleId = parseInt(this.dataStore.getRoleId());
    let roleId = parseInt(<string>localStorage["roleId"]);
    if (roleId == undefined) {
      if (localStorage["Role"].toLowerCase() == "maker")
        roleId = 100;
      else if (localStorage["Role"].toLowerCase() == "checker")
        roleId = 200;
      else
        roleId = 300;

    }
    let data = { "roleId": roleId };

    this.api.getSuggestedRemarks(data).subscribe({
      next: (res) => {
        this.suggestedRemarks = res.data.map(res => res.remarks);

      },
      error: (err) => {
        this.noSuggestedRemarks = true;
        console.log(err);

      }
    })

  }
  // --------- suggested remark list -------------------
  // navigation back button
  backNavigation(previousPage) {
    this.router.navigate(["/Menu/" + previousPage]);
  }
  // navigation back button

  // initiator name
  initiator: any = '';
  getUserData() {
    let data = { assignmentId: `${localStorage["assignmentID"]}`, type: `${this.previousPage}` }
    this.MDMService.getListInboxRequestDetailes(data).subscribe({
      next: (res: any) => {
        this.initiator = res.data[0].initiator;
      }
    })
  }
  // initiator name

  // getDepartmentRequestDetails(reqId: string) {
  //   return this.http.get<any>('./assets/models/departmentDetails.json');
  // }

  getRemarks(): void {
    let requestId = parseInt(<string>localStorage.getItem("requestId"));
    this.MDMService.getRemarkswithRequestId({ "requestId": requestId }).subscribe((res) => {

      // console.log("Inside preview Component ");
      // console.log("calling Remarks API with request Id", requestId);
      this.remarks = res.data;
      console.log("API called successfully , remarks received from api", this.remarks);

    }, (err => {

      console.log("Error while calling get remarks with request api with request id", requestId);
      console.log("error message is ", err);
    }));
  }

  modify(): void {

    localStorage.setItem("isModifying", "true");
    // localStorage.setItem("previousPage", "RequestDetails");
    localStorage.setItem("actions", this.actions.toString());
    this.router.navigate(['DepartmentCreation'], { state: { data: this.pageData, additionalData: this.actions } });
  }

  onSubmit(data: any) {

    this.global.msg = ``;

    // return false;

    if (data.action.toLowerCase() === 'modify') {
      this.modify();
      return;
    }


    let division = this.dataStore.getDivision();
    let date = new Date();
    let n = date.toDateString();
    let time = date.toLocaleTimeString();
    this.assignmentId = localStorage['assignmentID'];
    let timeStamp = n + ' ' + time;
    let roleName = localStorage["roleName"];
    let initiator = localStorage['assignmentID'];
    let wfProcessId = `${localStorage['wfProcessId']}`;
    let taskTransId = `${localStorage['taskTransId']}`;
    let requestId = `${localStorage['requestId']}`;
    let requestDesc = `${data.action} from ${localStorage['roleName']}`;
    let personId = this.dataStore.getUserId();
    let personName = this.dataStore.getUserName();
    console.log(localStorage);
    let adminDeptId = this.pageData.departmentData.adminDeptId;
    let requestedPayload = {
      "request_data": {
        "processId": `${wfProcessId}`,
        "taskSeq": "",
        "processTaskSeq": "",
        "taskTranId": `${taskTransId}`,
        "requestId": `${requestId}`,
        "requestDesc": "",
        "initiator": `${initiator}`,
        "person_id": `${personId}`,
        "person_name": `${personName}`,
        "action": data.action,
        "remarks": this.remarkForm.controls["remark"].value,
        "adminDeptId": adminDeptId,
        "division": division,
        "assignmentId": `${this.assignmentId}`
      },
      "payload": {
        "departmentData": this.pageData.departmentData,
        "bcoData": this.pageData.bcoData,
        "bfcUnitData": this.pageData.bfcUnitData,
        "remarks": this.pageData.remarks,
        "documentDetails": this.pageData.documentDetails
      }
    };


    console.log("requestData prepared ,Logging........Below");
    console.log("requestedPayload", requestedPayload);


    this.api.postSubmit(requestedPayload).subscribe({
      next: (res) => {
        this.requestId = res.request_id;
        this.taskId = res.task_tran_id;
        console.log("task_trans_id", res.task_tran_id);
        //alert("data saved successfully request id" + res.request_id + " task Id" + res.task_tran_id);
        console.log(" Reference no is" + res.request_id)
        console.log("task transaction id" + res.task_tran_id);
        // localStorage['taskTransId'] = res.task_tran_id;
        // localStorage['requestId'] = res.request_id;

        // modal cndn
        this.global.reqId = res.request_id;
        if (data.action == 'FORWARD') {
          this.global.msg = `Application forwarded Successfully.<br> Request id : ${this.global.reqId}`;
          // this.global.alertWithSuccess();
        } else if (data.action == 'RETURN') {
          this.global.msg = `Application Return Successfully.<br> Request id : ${this.global.reqId}`;
          // this.global.alertWithSuccess();
        } else if (data.action == 'APPROVE') {
          this.global.msg = `Application Approved Successfully.<br> Request id : ${this.global.reqId}`;
          // this.global.alertWithSuccess();
        } else if (data.action == 'REJECT') {
          this.global.msg = ` <span class ="text-danger">  Application Rejected .<br> Request id : ${this.global.reqId}`;
          // this.global.alertWithSuccess();
        } else if (data.action == 'INITIATE') {
          this.global.msg = `Application forwarded Successfully.<br> Request id : ${this.global.reqId}`;
          // this.global.alertWithSuccess();
        }
        // alert( this.global.reqId);
        this.global.alertWithSuccess();
        this.router.navigateByUrl('/Main');

      },

      error: () => {
        // alert("error while storing data ");
        this.global.alertForApiDown()
      }
    })
  }
}

