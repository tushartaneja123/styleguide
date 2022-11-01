// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



// const baseUrl ="http://172.22.32.36:8080/mdm/v1.0/";
// const baseUrl = "http://172.22.32.100:5003/SanctionSvc/mdm/v1.0/";
//const baseUrlWF = "http://172.22.32.100:5001/wf/v1.0/budget/";
const baseUrl = "http://172.22.32.100:5003/SanctionSvc/mdm/v1.0/";
const baseUrlWF = "http://172.22.32.100:5003/SanctionSvc/wf/v1.0/";

export const environment = {
  production: false,
  baseUrl: baseUrl,
  baseUrlWF: baseUrlWF,
  pageSize: 5,
  baseUrlWFBudgetInbox: baseUrlWF + "inbox",
  baseUrlWFBudgetTask: baseUrlWF + "task",
  baseUrlWFBudgetRemarkReqId: baseUrlWF + "getRemarkByRequestId",
  taskUrl: baseUrlWF + "task",
  processURL: baseUrlWF + "getWorkflowID",
  expenditureDivision: "http://172.22.32.100:5003/SanctionSvc/mdm/v1.0/getExpenditureDivision",
  Module: "Budget",
  Inbox: "Inbox",
  Drafts: "Drafts",
  GetRequestCount: baseUrlWF + "getRequestCount",
  GetDocumentType: baseUrl + "getDocumentType",
  GetInfo: baseUrl + 'getInfo',
  Roles: {
    "1001": "Admin Maker",
    "1002": "Admin Checker",
    "1003": "Admin Approver",
    "2001": "FD Maker",
    "2002": "FD Checker",
    "2003": "FD Approver"

  },
  GetSuggestedRemarks: baseUrlWF + "getRemarksSuggestion",
  DefaultRemark: "Sent to next level after verification",
  SuggestedRemarks: ["Submitted by Maker for Next level Approval.", "Modified by Checker for Next level Approval.", "Submitted by Checker for Next level Approval.",
    "Modified by Checker for Next level Approval."],
  pageSizeOptions: [5, 10, 25, 100]
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import "zone.js/plugins/zone-error";  // Included with Angular CLI.

