import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobalService } from "src/app/services/global.service";
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MDMService } from 'src/app/shared/services/mdm.service';
import { DataStoreService } from 'src/app/services/data-store.service';




@Component({
  selector: 'app-department-creation',
  templateUrl: './department-creation.component.html',
  styleUrls: ['./department-creation.component.css']
})


export class DepartmentCreationComponent implements OnInit {


  myfunction() {
    console.log("refreshed");
  }
  departmentCreationForm !: FormGroup;
  pageData: any;
  dataToModify: any;
  // suggestedRemarks: any;
  showPreviousRemarksLink: boolean = false;
  noHindiTextError: boolean = false;
  remarks: any;
  actions = new Array();
  previousPage = localStorage.getItem("previousPage");
  isTrue: boolean = true;
  isActionAvailable: boolean = false;
  requestedPayload: any;
  adminDeptId: number = parseInt(<string>localStorage.getItem("aValue"));

  noSuggestedRemarks: boolean = false;
  breadcrumb = [
    { iconClass: "fa fa-home", text: "Home", url: "/Login" },
    { iconClass: "fa fa-menu", text: "Menu", url: "/Main" },
    { iconClass: "fa fa-office", text: "Department Creation", url: "/DepartmentCreation" }];

  constructor(private mdm: MDMService, private activatedRoute: ActivatedRoute, private api: ApiService,
    private formBuilder: FormBuilder, public global: GlobalService, public router: Router, private dataStore: DataStoreService) {







    if (localStorage["isModifying"] == "true") {
      let pageData = this.router.getCurrentNavigation()?.extras.state;

      console.log("its a pagedata");
      console.log(pageData);

      if (pageData) {
        this.dataToModify = pageData["data"];
        this.adminDeptId = this.dataToModify.admin_dept_id
        this.actions = pageData["additionalData"];
        if (this.actions.length >= 0)
          this.isActionAvailable = true;

        this.documents = this.dataToModify['documentDetails'].document == undefined ? this.dataToModify['documentDetails'][0].document : this.dataToModify['documentDetails'].document;
        if (this.documents.length > 0)
          this.isTableActive = true;
        this.data1 = {
          "admin_dept_id": this.adminDeptId
        };

      }



    }
  }

  showMe: boolean = false;

  setRemark(r: string) {
    this.departmentCreationForm.controls["remarks"].setValue(r);
  }





  showFeedback: boolean = false;
  validateHindiText(text: string) {
    var numberOfHindiCharacters = 128;
    var unicodeShift = 0x0900;
    var hindiAlphabet = new Array();

    this.symbol = "bi bi-x-circle-fillf";
    for (var i = 0; i < numberOfHindiCharacters; i++) {
      hindiAlphabet.push("\\u0" + (unicodeShift + i).toString(16));
    }
    var regex = new RegExp("(?:^|\\s)[" + hindiAlphabet.join("") + "]+?(?:\\s|$)");
    if (text && text != '') {
      var match = text.match(regex)
      if (!match) {
        this.noHindiTextError = true;
        this.symbol = "text-danger bi bi-x-circle-fill";

      }
      else {
        this.symbol = "text-success bi bi-check-circle-fill";
        this.noHindiTextError = false;
      }
      this.showFeedback = true;
    }
    else {
      this.symbol = " bi bi-x-circle-fillf";
      this.noHindiTextError = false;
      this.showFeedback = false;

    }
  }




  ngOnInit(): void {




    if (this.adminDeptId == NaN)
      alert("Error loading admin department id");

    // this.suggestedRemarks = environment.SuggestedRemarks;
    this.getSuggestedRemarks();
    this.getDocumentType();
    this.getSessionData();
    // let adminDeptId:Number = 1;
    this.getDesignation();
    this.getDepartment();
    // we need to pass AID as assignment id.
    // instead of 72 we need to pass avalue.to get admindepartment
    // 
    this.getAdminDepartment(this.adminDeptId);
    // bfc division name
    this.getExpenditureDivison();
    // all major heads
    // this.getMajorHead();
    // requestedPayload

    // filter
    // @Review Comment @Author-animesh 
    // no mycontrol value found after merge.Please review and update 
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value: any) => this._filter(value || '')),
    // );
    // filter






    this.departmentCreationForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      departmentNameHi: ['', Validators.required],
      adminDeptId: [''],
      adminDeptName: ['', Validators.required],
      adminDeptHi: ['', Validators.required],
      bfcDivisionIdNumber: ['', Validators.required],
      bfcDivisionNameEn: ['', Validators.required],
      designationOfHod: ['', Validators.required],
      bcoStatus: [''],
      bcoName: [''],
      budgetHead: [''],
      docDescription: [''],
      uploadDocument: [''],
      remarks: ['', Validators.required],
      majorHead: [''],
      subMajorHead: [''],
      minorHead: [''],
      groupHead: [''],
      subMinorHead: ['']
    })

    // let designationOfHod:any;
    if (localStorage["isModifying"] == "true") {

      if (this.dataToModify) {
        let departmentData = this.dataToModify['departmentData'];
        let bfcUnitData = this.dataToModify['bfcUnitData'];
        this.adminDeptId = departmentData.admin_dept_id;
        // this.obj.BFC_DIV_TYPE_ID=this.adminDeptId;
        // this.documents=this.dataToModify['documentDetails'].document;
        this.departmentCreationForm.patchValue({
          departmentName: departmentData.departmentName,
          departmentNameEng: departmentData.departmentName,
          departmentNameHi: departmentData.departmentNameHi,
          adminDeptId: departmentData.adminDeptId,
          adminDeptName: departmentData.adminDeptName,
          adminDeptHi: departmentData.adminDeptNameHi,
          designationId: departmentData.designationId,
          bfcDivisionIdNumber: bfcUnitData.expenditureDivId,
          designationOfHod: departmentData.designationName




          ,
          // myControl: departmentData.designationName

          // bfcDivisionIdNumber: this.dataToModify['departmentData'].bfcDivisionIdNumber
        });
        // this.obj = { bfcDivTypeId: parseInt(departmentData.division), adminDeptId: this.adminDeptId }
        // this.departmentCreationForm.controls["bfcDivisionIdNumber"].setValue(departmentData.division);
        // this.departmentCreationForm.controls["myControl"].setValue(departmentData.designationName);
        this.showPreviousRemarksLink = true;
        this.getRemarks();

      }

    }
    //console.log('This is init method');

  }




  //function that gets suggested remarks on the basis of Role ,RoleId




  //to get previous remarks 
  getRemarks(): void {
    let requestId = parseInt(<string>localStorage.getItem("requestId"));
    this.mdm.getRemarkswithRequestId({ "requestId": requestId }).subscribe((res: { data: any; }) => {

      // console.log("Inside preview Component ");
      // console.log("calling Remarks API with request Id", requestId);
      this.remarks = res.data;
      //console.log("API called successfully , remarks received from api", this.remarks);

    }, ((err: any) => {
      //console.log("Error while calling get remarks with request api with request id",requestId);
      //console.log("error message is ",err);
    }));
  }

  // --------- suggested remark list -------------------
  suggestedRemarks = [];
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

  isDisplay: boolean = true;
  isCARActive: boolean = true;
  showDetails() {
    this.showMe = !this.showMe;
    this.isCARActive = !this.isCARActive;
  }
  // =========================== department details ================================================
  // get designation

  // get department
  deptArray: any[] = [];
  getDepartment() {
    let requestedData: any = { "adminDeptId": 1 }
    this.api.getDepartment(requestedData).subscribe({
      next: ((res) => {
        //console.log("Get department");

        let data = Object.values(res);

        for (let i = 0; i < data[1].length; i++) {
          //this.deptArray.push(data[1][i]['departmentNameEng'].toLowerCase().replace(/,/g,'').trim());
          this.deptArray.push(data[1][i]['departmentNameEng'].replace(/,/g, '').replace(/-/g, '').replace(/ /g, '').toLowerCase().trim());
        }
        //console.log(this.deptArray)
        //Land Settlement Department, Jaipur
        //agriculture department jaipur
        //this.deptArray.push(res);
        //console.log(data[1][0]['departmentNameEng'])

      }
      )
    })
  }


  hindiValidation(event: any) {
    // alert(event.target.value);
    let arregex = /[\u0000-\u007F]/;

    let match = event.target.value.trim().replace(/ /g, '');
    let flag = arregex.test(match);

    if (event.target.value == '') {
      // alert("yes")
      this.noHindiTextError = false;
      this.showFeedback = false;
      this.symbol = "";
    }
    else if (flag == true) {
      this.noHindiTextError = true;
      this.showFeedback = true;
      this.symbol = "text-danger bi bi-x-circle-fill";
    } else if (flag == false) {
      this.noHindiTextError = false;
      this.showFeedback = true;
      this.symbol = "text-success bi bi-check-circle-fill";
    } else {
      // alert("else")
      this.noHindiTextError = false;
      this.showFeedback = false;
      this.symbol = "";
    }

  }



  symbol: string = "";
  // compare dept
  isCheck: boolean = false;
  isShow: boolean = false;
  isHindi: boolean = false;
  compareDept(event: any) {
    //alert(event.target.value);
    // hindi character unicode check 
    let arregex = /[\u0900-\u097F]/;
    // hindi charactercheck
    // string manipulation as per demand
    let match = event.target.value.replace(/,/g, '').replace(/ /g, '').replace(/-/g, '').toLowerCase().trim();
    let flag = arregex.test(match);
    let check = this.deptArray.includes(match);

    //console.log(check);

    if (match == "") {
      // alert("correct");
      this.symbol = "";
      this.isCheck = false;
      this.isShow = false;
      this.isHindi = false;
    } else if (flag == true) {
      this.isShow = true;
      this.isCheck = false;
      this.isHindi = true;
      this.symbol = "text-danger bi bi-x-circle-fill";
    } else if (check == true) {
      this.isCheck = true;
      this.symbol = "text-danger bi bi-x-circle-fill";
      this.isShow = true;
    } else if (check == false) {
      this.isCheck = false;
      this.isShow = true;
      this.isHindi = false;

      this.symbol = "text-success bi bi-check-circle-fill";
    } else {
      this.symbol = "";
    }

  }
  data: any = [];
  data1: any;

  // search filter========
  options: any[] = [];
  optionsId: any[] = [];
  filteredOptions!: Observable<any[]>;


  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  // filter===========

  // object map created
  hodDesigData = new Map<string, string>();

  getDesignation() {
    this.api.getDesignation(this.data1).subscribe({
      next: (res) => {
        console.table(res.data[0]);

        let length = res.data.length;
        for (let i = 0; i < length; i++) {
          this.options.push(res.data[i].designationDesEn);

          //  inserting data into map
          this.hodDesigData.set(res.data[i].designationDesEn.toString().toLowerCase(), res.data[i].designationId.toString());
        }
        this.data = res.data;
      },
      error: (err: { message: any; }) => {
        let errorObj = {
          message: err.message,
          err: err,
          request: this.data1,
          response: err
        }
      }
    })
  }


  desgHodId: any = '';
  desgHodName: any = '';

  getValue(event: any) {
    //  alert(event.target.value);
    let hodDesgName = event.target.value.toLowerCase();
    let desgId = this.hodDesigData.get(hodDesgName);
    this.desgHodId = desgId;
    this.desgHodName = event.target.value;

  }

  // getting admin department
  adminDeptData: any[] = [];
  adminDeptName: any;
  getAdminDepartment(adminDeptId: number) {
    let request = {
      "adminDeptId": adminDeptId
    }
    this.api.getAdminDepartment(request).subscribe({
      next: (res) => {
        //console.table(res);
        this.departmentCreationForm.controls['adminDeptName'].setValue(res.data.adminNameEng);
        this.departmentCreationForm.controls['adminDeptHi'].setValue(res.data.adminNameHin);
        this.departmentCreationForm.controls['adminDeptId'].setValue(res.data.adminDeptId);
      },
      error: (err: any) => {
        // alert("error while fatching admin department");
        let errorObj = {
          errorMessage: "error while fetching admin department",
          request: request,
          response: err
        }

        console.log("error while fatching admin department", errorObj);
      }
    });
  }

  //get Document Type 
  documentTypes: any;
  getDocumentType(): void {
    this.api.getDocumentType().subscribe((res) => {
      this.documentTypes = res.data;
      this.departmentCreationForm.controls["docDescription"].setValue("default");
      // console.log("response from api is ",res);
      // console.log("descriptions from api are ",res.data);
      // console.log("error from api is ",res.error);
    }, (err) => {
      // openModal()
      // console.log("Problem loading descriptions");
      // console.log("error from the framework is",err);
    });
  }

  // get expenditure division

  bfcDivName: any[] = [];
  obj = {
    "bfcDivTypeId": 1,
    "adminDeptId": this.adminDeptId
  }

  getExpenditureDivison() {

    this.api.getExpenditureDivision(this.obj).subscribe({
      next: (res: { length: number; data: string | any[]; }) => {
        length = res.length;
        length = res.data.length;
        for (let i = 0; i < length; i++) {
          this.bfcDivName.push(res.data[i]);
        }
        // console.log(this.bfcDivName)
      }
    })
  }
  // =========================== department details =========================

  // =========================== bco details =============================

  majorHead: string[] = [];
  getMajorHead() {
    this.api.getMajorHead().subscribe({
      next: (res: any) => {
        // console.table(res);
        let data = JSON.stringify(res);
        let data1 = JSON.parse(data);
        let length = data1.length;
        for (let majorHead = 0; majorHead < length; majorHead++) {
          this.majorHead.push(data1[majorHead].majorHeadCode);
        }
      },
      error: () => {
        alert("error while fetching major head data");
      }
    })
  }

  // sub major head
  subMajorHead: string[] = [];
  subMajorDiv: boolean = false;
  getSubMajorHead(event: number) {
    // alert(event);
    this.api.getSubMajorHead(event).subscribe({
      next: (res: any) => {
        // console.table(res);
        let data = JSON.stringify(res);
        let data1 = JSON.parse(data);
        let length = data1.length;

        for (let subMajorHead = 0; subMajorHead < length; subMajorHead++) {
          this.subMajorHead.push(data1[subMajorHead].subMajorHeadCode);
        }
        this.subMajorDiv = true;
      },
      error: () => {
        alert("error getting sub major head data");
      }
    });
  }

  // get minor head
  minorHead: string[] = [];
  minorHeadDiv: boolean = false;
  getMinorHead(event: number) {

    this.api.getMinorHead(event).subscribe({
      next: (res: any) => {
        // console.table(res);
        let data = JSON.stringify(res);
        let data1 = JSON.parse(data);
        let length = data1.length;

        for (let minorHead = 0; minorHead < length; minorHead++) {
          this.minorHead.push(data1[minorHead].minorHeadCode);
        }
        this.minorHeadDiv = true;
      },
      error: () => {
        alert("error getting minor head data");
      }
    });
  }

  //  get sub minor head
  subMinorHead: string[] = [];
  subMinorDiv: boolean = false;
  getSubMinorHead(event: number) {
    // alert(event);
    this.api.getSubMinorHead(event).subscribe({
      next: (res: any) => {
        //  console.table(res);
        this.subMinorDiv = true;

        let data = JSON.stringify(res);
        let data1 = JSON.parse(data);
        let length = data1.length;

        for (let subMinorHead = 0; subMinorHead < length; subMinorHead++) {
          this.subMinorHead.push(data1[subMinorHead].minorHeadCode);
        }
        this.subMinorDiv = true;
      },
      error: () => {
        alert("error getting minor head data");
      }
    });
  }

  // group head
  groupHeadDiv: boolean = false;
  groupHead: string[] = [];
  getGroupHead(event: number) {
    this.api.getGroupHead(event).subscribe({
      next: (res: any) => {
        // console.table(res);
        let data = JSON.stringify(res);
        let data1 = JSON.parse(data);
        let length = data1.length;

        for (let groupHead = 0; groupHead < length; groupHead++) {
          this.groupHead.push(data1[groupHead].groupSubHeadCode);
        }
        this.groupHeadDiv = true;
      },
      error: () => {
        alert("error getting minor head data");
      }
    });
  }

  isActive: boolean = true;
  isMajorDiv: boolean = false;
  activateNewBco() {
    // let value = this.departmentCreationForm.controls['bcoStatus'].value;
    this.isActive = false;
    this.isMajorDiv = !this.isMajorDiv;
  }
  // =========================== bco details =============================

  // =========================== document details ========================

  imagePreview = "../../../../assets/images/doc_preview_default.jpg";

  isImagePreviewDiv: boolean = false;
  isTableActive: boolean = false;
  fileName!: string;
  documents = new Array();

  onSelectFile(e: any) {
    let file = {
      id: 0,                       //id of the document 
      name: "",                   // name of the document
      description: "",
      assignmentId: "",
      timeStamp: "",
      data: e.target.result        // desscription entered by user of the document
    };
    let date = new Date();
    let n = date.toDateString();
    let time = date.toLocaleTimeString();
    let timeStamp = n + ' ' + time;
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.fileName = e.target.files[0].name;

      reader.onload = (event: any) => {
        this.imagePreview = event.target.result;
      }
      file = {
        id: parseInt((Math.random() * 1000000).toString()),        //id of the document 
        name: this.fileName,
        description: this.departmentCreationForm.controls
        ["docDescription"].value,
        "assignmentId": localStorage["assignmentID"],
        "timeStamp": timeStamp,
        "data": e.target.data                           // desscription entered by user of the document

      };
    }
    //this.isImagePreviewDiv = !this.isImagePreviewDiv;
    this.isTableActive = true;
    this.departmentCreationForm.controls['docDescription'].reset();
    this.departmentCreationForm.controls['uploadDocument'].reset();
    var length = this.documents.unshift(file);
    this.fileName = '';
  }
  ImageUpload(event: any) {
    alert(event);
  }
  deleteFile(index: number) {
    this.documents.splice(index, 1);
    if (this.documents.length === 0)
      this.isTableActive = false;
  }

  isImagePreview() {
    this.isImagePreviewDiv = !this.isImagePreviewDiv;
  }

  // =========================== document details end ========================

  clickedbBtnName: string = '';
  // on preview click
  isDepartmentCreation: boolean = true;
  isPreview: boolean = false;
  onPreviewBtnClick() {
    this.isDepartmentCreation = !this.isDepartmentCreation;
    this.isPreview = !this.isPreview;
    // this.clickedbBtnName = event.target.id;
  }

  onBtnClick(event: any) {
    // alert(event.target.id);
    this.clickedbBtnName = event.target.id;
  }

  // session data 
  assignmentId: any;
  admin_dept_id: any;
  getSessionData() {
    this.api.getSession().subscribe({
      next: (res: any) => {
        //console.log("session");
        let session = res;
        this.assignmentId = session.AssignInfo.Aid;
        this.admin_dept_id = session.AssignInfo.AValue;
      }
    })
  }

  // submit button
  onSubmit(clickedbBtnName: any) {
    //  alert(clickedbBtnName);return false;
    // let obj=this.departmentCreationForm.value;

    let action: string = '';
    let actionMsg: string = "";
    let index: number = -1;
    if (clickedbBtnName == 'draft') {
      action = "DRAFT";
      actionMsg = 'Application Saved as draft successfully.<br> Request id :';
    }
    else if (clickedbBtnName == 'submit' && localStorage["isModifying"] === true || clickedbBtnName == 'FORWARD') {
      action = "FORWARD";
      actionMsg = 'Application forwarded Successfully.<br> Request id :';
    }
    else if (clickedbBtnName == 'submit') {
      action = "INITIATE";
      actionMsg = 'Application submitted Successfully.<br> Request id :';
    }
    else if (clickedbBtnName == 'RETURN') {
      action = "RETURN";
      actionMsg = 'Application returned Successfully.<br> Request id :';
    }
    else if (clickedbBtnName == 'REJECT') {
      action = "REJECT";
      actionMsg = '<span class ="text-danger">  Application Rejected .<br> Request id :';
    }
    else if (clickedbBtnName == 'APPROVE') {
      action = "APPROVE";
      actionMsg = '<span class ="text-danger">  Application Approved Successfully .<br> Request id :';
    }
    else if ((index = this.actions.findIndex(i => i.action == clickedbBtnName)) >= 0) {
      action = this.actions[index].action;
      actionMsg = `Action ${action} completed successfully on Request. <br> Request Id :`

    }

    let date = new Date();
    let n = date.toDateString();
    let time = date.toLocaleTimeString();
    let timeStamp = n + ' ' + time;
    let docId = "docId";
    let processId = localStorage['wfProcessId'];
    let initiator = `${localStorage['assignmentID']}`;
    let requestId = `${localStorage['requestId']}`;
    let wfProcessId = `${localStorage['wfProcessId']}`;
    let taskTransId = `${localStorage['taskTransId']}`;
    if (taskTransId == 'undefined') taskTransId = '';
    if (requestId == 'undefined') requestId = '';


    // console.log(localStorage);
    let adminDeptId = this.departmentCreationForm.controls['adminDeptId'].value;

    if (this.desgHodId == undefined) {
      this.desgHodId = this.hodDesigData.get(this.departmentCreationForm.controls["designationOfHod"].value.toLowerCase());
      this.desgHodName = this.departmentCreationForm.controls["designationOfHod"].value;
    }
    // console.clear();
    // console.log(this.desgHodId, this.desgHodName);

    let requestedPayload = {
      "request_data": {
        "processId": processId,
        "taskSeq": "",
        "processTaskSeq": "",
        "taskTranId": `${taskTransId}`,
        "requestId": requestId,
        "requestDesc": `${action} from ${localStorage['roleName']}`,
        "initiator": `${initiator}`,
        "person_id": localStorage["userId"],
        "person_name": localStorage["userName"],
        "action": action,
        "remarks": this.departmentCreationForm.controls['remarks'].value,
        "adminDeptId": adminDeptId,
        "division": this.departmentCreationForm.controls['bfcDivisionIdNumber'].value,
        "assignmentId": localStorage["assignmentID"],
      },
      "payload": {
        "departmentData": {
          "departmentName": this.departmentCreationForm.controls['departmentName'].value,
          "departmentNameEng": this.departmentCreationForm.controls['departmentName'].value,
          "departmentNameHi": this.departmentCreationForm.controls['departmentNameHi'].value,
          "adminDeptId": adminDeptId,
          "adminDeptName": this.departmentCreationForm.controls['adminDeptName'].value,
          "adminDeptNameHi": this.departmentCreationForm.controls['adminDeptHi'].value,
          "designationId": this.desgHodId,
          "designationName": this.desgHodName
        },
        "bcoData": {
          "bcoName": "",
          "departmentID": "",
          "departmentName": ""
        },
        "bfcUnitData": {
          "bfcUnitName": "",
          "bfcTypeId": "",
          "bfcTypeName": "",
          "expenditureDivId": this.departmentCreationForm.controls['bfcDivisionIdNumber'].value,
          "expenditureDivName": this.departmentCreationForm.controls['bfcDivisionNameEn'].value,
          "budgetHeadId": "",
          "budgetHeadCode": ""
        },
        "remarks": [
          {
            "assignmentId": '',
            "comment": '',
            "timestamp": ''
          }
        ],
        "documentDetails": [
          {
            document: this.documents
          }
        ]
      }
    }
    this.requestedPayload = requestedPayload;


    requestedPayload.request_data.adminDeptId = adminDeptId;
    console.log(requestedPayload);




    this.global.msg = actionMsg;


    // console.table(requestedPayload);
    this.api.postSubmit(requestedPayload).subscribe({
      next: (res: { task_tran_id: any; request_id: string; }) => {
        //console.log(res.task_tran_id);
        //alert("data saved successfully request id" + res.request_id + " task transaction id" + res.task_tran_id);
        localStorage['taskTransId'] = res.task_tran_id;
        // localStorage['requestId'] = res.request_id;
        this.global.reqId = res.request_id;
        this.global.msg += res.request_id;
        // this.router.navigate(['/department-creation-preview']);

        // console.log('after local ');
        // console.log(localStorage);
        // console.table(res);
        localStorage["isModifying"] = false;
        localStorage.removeItem["actions"];

        // alert("You will now be redirected to the main page. Click ok to continue.")

        // modalmessage logic
        this.global.reqId = res.request_id;

        //this.global.alertWithSuccess();

        this.global.alertWithSuccess();
        this.router.navigateByUrl('/Main');

      },
      error: (err: any) => {
        console.clear();
        this.global.alertForApiDown();
        //console.log("error is ", err);
      }
    })
  }

}