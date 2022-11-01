import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
// import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  // baseUrl = "http://localhost:3000/";
  //baseUrlSou = "http://172.22.32.36:8080/mdm/v1.0/";
  baseUrlSou = environment.baseUrl;
  baseUrlWf = environment.baseUrlWF;



  // session data
  getSession() {
    return this.http.get<any>('./assets/models/userLoginData.json');
  }
  // post session to update id
  postUpdateProcessId(data: any) {
    return this.http.post<any>('./assets/models/userLoginData.json', data)
  }

  //
  getRequestCount(aId: string) {
    let data = { assignmentId: parseInt(aId) };
    return this.http.post<any>(environment.GetRequestCount, data);
  }

  // session data
  getWorkFlowId(data: any) {
    return this.http.post<any>(environment.processURL, data);
  }

  getDocumentType() {
    return this.http.post<any>(environment.GetDocumentType, null);
  }
  getDesignation(data: any) {
    // let url = "http://localhost:3000/getDesignation";
    return this.http.post<any>(`${this.baseUrlSou}` + "getDesignation", data);

  }



  // task trans id
  getTaskById(taskId: any) {
    // 172.22.32.100:5003/wf/v1.0/budget/task
    return this.http.post<any>(this.baseUrlWf, taskId);


  }

  getrequestedPayload() {
    // let url = "http://localhost:3000/requestedPayload";
    return this.http.get<any>(`${this.baseUrlSou}` + "requestedPayload");
  }


  getAdminDepartment(adminDeptId: any) {
    return this.http.post<any>(`${this.baseUrlSou}` + "getAdminDepartment", adminDeptId);

  }
  getDepartment(adminDeptId: any) {
    return this.http.post(`${this.baseUrlSou}` + `getDepartment`, adminDeptId);
  }

  // 
  getExpenditureDivision(data: any) {
    return this.http.post<any>(environment.expenditureDivision, data);
  }

  // get major head
  getMajorHead() {
    return this.http.get<any>(`${this.baseUrlSou}` + 'getMajorHead');
  }


  // get sub major head data
  getSubMajorHead(majorHeadCode: number) {
    let params = new HttpParams().set('majorHeadCode', majorHeadCode);
    return this.http.get<any>(`${this.baseUrlSou}` + 'getSubMajorHead/', { params })
  }

  // get minor head
  getMinorHead(subMajorHeadCode: number) {
    let params = new HttpParams().set('subMajorHeadCode', subMajorHeadCode);
    return this.http.get<any>(`${this.baseUrlSou}` + 'getMinorHead/', { params })
  }

  // get minor head
  getSubMinorHead(minorHeadCode: number) {
    let params = new HttpParams().set('minorHeadCode', minorHeadCode);
    return this.http.get<any>(`${this.baseUrlSou}` + 'getSubMinorHead/', { params })
  }

  // get group head
  getGroupHead(subMinorHeadCode: number) {
    let params = new HttpParams().set('minorHeadCode', subMinorHeadCode);
    return this.http.get<any>(`${this.baseUrlSou}` + 'getSubGroupHead/', { params })
  }

  // get inbox workflow and tasktransid
  getWorkflowInbox(data: any) {
    return this.http.post<any>(this.baseUrlWf + 'inbox', data)
  }

  // submit api
  postSubmit(data: any) {
    return this.http.post<any>(this.baseUrlWf + 'action', data);
  }



  getTokenDetails() {
    return this.http.post<any>("http://172.22.32.36:9090/SanctionLandingSvc/login", {
      "token": "token",
      "jsonData": ["Name", "City"]
    }
    )
  }

  // suggested remarks
  getSuggestedRemarks(data:any){
    return this.http.post<any>(this.baseUrlWf + 'getRemarksSuggestion',data);
  }

}