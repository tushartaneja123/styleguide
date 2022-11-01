import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
   providedIn: 'root'
})
export class DataStoreService {
   getDepartmentType(): any {
      return this.sessionData.AssignInfo.DepartmentType;
   }


   usersData: any = [];
   constructor(private http: HttpClient, private router: Router) {
      this.http.get("../assets/models/users.json").subscribe((res: any) => {
         this.usersData = res;
         this.sessionData = res[parseInt(<string>localStorage.getItem("currentUser"))].sessionData;
      })
   }
   private sessionData: any;

   setSessionData(index: number): Observable<Boolean> {
      this.sessionData = this.usersData[index].sessionData;
      localStorage["aType"] = this.sessionData.AssignInfo.AType;
      localStorage["aValue"] = this.sessionData.AssignInfo.AValue;
      // this.setRoleName(this.sessionData.AssignInfo.role_Desc);
      // this.setUserName(this.sessionData.UserInfo.user_name);

      return of(true);
   }

   setAdminDepartmentId(id: number) {
      if (this.sessionData.AssignInfo.AType == 1)
         this.sessionData.AssignInfo.AValue = id;
      localStorage.setItem("adminDeptId", id.toString());
   }

   setDepartmentId(id: number) {
      this.sessionData.AssignInfo.AValue = id;
      localStorage.setItem("DeptId", id.toString());

   }

   setAssignmentId(assignmentId: string): Boolean {
      this.sessionData.AssignInfo.Aid = assignmentId;
      return true;
   }

   getAssignmentId(): string {
      return this.sessionData.AssignInfo.Aid;
   }


   getOfficeId(officeId: string): string {
      return this.sessionData.AssignInfo.AType;
   }

   getOfficeName(): string {
      // return this.sessionData.AssignInfo.; 

      return this.sessionData.AssignInfo.AValue;
   }

   setRoleName(roleName: string): Boolean {
      localStorage.setItem("roleName", roleName);
      this.sessionData.AssignInfo.AValue = roleName;
      return true;
   }
   getRoleName(): string {
      return this.sessionData.AssignInfo.role_Desc ? this.sessionData.AssignInfo.role_Desc : localStorage.getItem("roleName");
   }

   getRoleId(): string {
      return this.sessionData.AssignInfo.role_id ? this.sessionData.AssignInfo.role_id : localStorage.getItem("roleId");;
   }

   setRoleId(roleId: string): Boolean {
      localStorage.setItem("roleId", roleId);
      this.sessionData.AssignInfo.role_id = roleId;
      return true;
   }

   setUserId(userId: string): Boolean {
      localStorage.setItem("userId", userId);
      this.sessionData.userInfo.userId = <string>userId;
      return true;

   }

   setUserName(userName: string): Boolean {
      localStorage.setItem("userName", userName); // new change 
      this.sessionData.userInfo.user_name = <string>userName;
      return true;
   }

   getUserName(): string {
      return this.sessionData.userInfo.user_name ? this.sessionData.userInfo.user_name : <string>localStorage.getItem("userName");
   }

   getUserId(): string {

      return this.sessionData.userInfo.userId ? this.sessionData.userInfo.userId : localStorage["UserId"];
   }

   getDivision(): string {
      return "3";
   }
   getSSOId(): string {

      return this.sessionData.AssignInfo.ssoId ? this.sessionData.AssignInfo.ssoId : localStorage["SSOId"];
   }
   logOut(): string {

      // logOutfromSSO():Observable{};
      localStorage.clear();
      this.router.navigateByUrl('/Login');
      return "Successfully logged out";

      // else 
      // return "Error Logging Out. Please try again.";
   }





}
