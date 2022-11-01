const baseUrl ="http://172.22.32.36:8080/mdm/v1.0/";
const baseUrlWF = "172.22.32.100:5001/wf/v1.0/";
const baseUrlMDM="172.22.32.100:5003/SanctionSvc/mdm/v1.0/";

export const environment = {
  production: false,
  baseUrl : baseUrl,
  baseUrlWF :baseUrlWF,
  baseUrlWFBudgetInbox : baseUrlWF+"budget/inbox",
  baseUrlWFBudgetTask:baseUrlWF+"budget/task",
  baseUrlWFBudgetRemarkReqId:baseUrlWF+"budget/getRemarkByRequestId",
  taskUrl : baseUrl+"budget/task",
  processURL:baseUrl+"getWorkflowID",
  Module:'Budget',
  Inbox:'Inbox',
  Drafts:'Drafts',
  GetDocumentType:baseUrlMDM+'getDocumentType',
  Roles:[
    {"1001":"Admin Maker"},
    {"1002":"Admin Checker"},
    {"1003":"Admin Approver"}
  ]
};