import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';

import { Router } from '@angular/router';
import { DataStoreService } from 'src/app/services/data-store.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private http: HttpClient, private router: Router, private dataStore: DataStoreService) {

  }
  isHidden: boolean = true;
  users = new Array();
  userRole: string = "";
  userName: string = "";
  currentUser: any = 0;

  getTokenDetails(): void {
    this.apiService.getTokenDetails().subscribe(res => { console.log(res) });

  }

  setSessionData(index: string): void {
    this.dataStore.setSessionData(parseInt(index)).subscribe((res) => {
      if (res)
        this.init();
      else
        alert("setting session failed");
    });

  }

  setAssignmentId(assignmentId: string): void {

    localStorage.setItem("assignmentID", assignmentId);

  }

  redirect(path: string) {
    this.router.navigateByUrl(path);
  }

  init(): void {
    this.setAssignmentId(this.dataStore.getAssignmentId());
    localStorage["userId"] = this.dataStore.getUserId();
    localStorage["userName"] = this.dataStore.getUserName();
    localStorage["Role"] = this.dataStore.getRoleName();
    this.dataStore.setRoleId(this.dataStore.getRoleId());
  }

  setData(): void {
    localStorage.setItem("currentUser", this.currentUser);
    this.setAssignmentId(this.dataStore.getAssignmentId());
    this.dataStore.setUserName(this.dataStore.getUserName());
    this.dataStore.setRoleName(this.dataStore.getRoleName());
    localStorage["ON"] = this.dataStore.getDepartmentType();
  }

  ngOnInit(): void {
    this.http.get("../../assets/models/users.json").subscribe((res: any) => {
      this.users = res.map((result: any) => result.sessionData);
      console.log(res);
      console.log(this.users);
    });
    this.isHidden = true;

  }

  getUserName(user: any, index: number) {
    return this.users[index].userInfo.user_name;
  }
  getUserRole(user: any, index: number) {
    return this.users[index].AssignInfo.role_Desc;
  }
  submit(): void {
    this.setSessionData(this.currentUser);
    this.setData();
    this.redirect("Main");
    localStorage.setItem("currentUser", this.currentUser);
    this.setAssignmentId(this.dataStore.getAssignmentId());
    this.dataStore.setUserName(this.dataStore.getUserName());
    this.dataStore.setRoleName(this.dataStore.getRoleName());
    localStorage["ON"] = this.dataStore.getDepartmentType();

    this.redirect("/Main");
    //this.getTokenDetails();

  }


  Roles = [{ 'text': 'Master Data Management Maker ', "value": "1001" },
  { 'text': 'Master Data Management Checker', "value": "1002" },
  { 'text': 'Master Data Management Approver', "value": "1003" }]


}
