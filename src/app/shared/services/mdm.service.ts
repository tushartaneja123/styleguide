import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})

export class MDMService {
  constructor(private http: HttpClient) { }

  public taskTransId: any;
  public requestId: any;



  private sessionData: any = {
    "userInfo": {
      "userId": 101,  ////This can used in Workflow JSON as assignee_id
      "loginId": "IFMS.TEST",
      "lastLogonDate": null,
      "sso_mail_id": null,
      "mobile_number": null,
      "sso_mobile_no": null,
      "user_name": null, //This can used in Workflow JSON as assignee_name
      "sso_user_name": null,
      "email_id": null,
      "ssoId": "IFMS.TEST",
      "finYearId": 1,
      "finYear": null,
      "finYearType": null,
      "app_module_ID": 1
    },
    "AssignInfo": [
      {
        "Aid": 143,   ////This can used in Workflow JSON as assignement_id
        "AType": "officeid",
        "AValue": 1452,
        "role_id": "1", //////This can used in Workflow JSON as role_id
        "role_Desc": "DDO"
      }
    ]
  }

  getRequestId() {
    return this.requestId;
  }

  setRequestId(requestId: string) {
    this.requestId = requestId;
  }

  getDepartmentRequestDetails(data: any) {
    // return this.http.get<any>('./assets/models/departmentDetails.json');
    return this.http.post<any>(environment.taskUrl, data)
  };
  getListInboxRequestDetailes(data: any) {
    // return this.http.get<any>('./assets/models/USERckeckerDetails.json');
    return this.http.post<any>(environment.baseUrlWFBudgetInbox, data)
  };

  getDraftRequestDetails(reqId: string) {
    return this.http.get<any>('./assets/models/draft.json');

  }

  getRemarkswithRequestId(data: any) {
    return this.http.post<any>(`${environment.baseUrlWFBudgetRemarkReqId}`, data);

  }


  getTasks(data: any) {
    // return this.http.post<any>(`${environment.baseUrlWFBudgetInbox}`, data, httpOptions);
    return this.http.post<any>(`${environment.baseUrlWFBudgetInbox}`, data);
  }



  // @author - Animesh Pareek  @Dated - 20-08-2022  @Description  - for getting suggested remarks on the ui commenting to merge code
  //   getSuggestedRemarks(data: any) {
  //     return this.http.post<any>(environment.GetSuggestedRemarks, data);
  //   }

  // @Author - animesh @Change Description -  getuserinfo api integration for fetching department/Office/division name 
  getUserInfo(data: any) {


    return this.http.post<any>(environment.GetInfo, data);
  }
}





