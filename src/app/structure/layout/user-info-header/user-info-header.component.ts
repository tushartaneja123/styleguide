import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-info-header',
  templateUrl: './user-info-header.component.html',
  styleUrls: ['./user-info-header.component.css']
})
export class UserInfoHeaderComponent implements OnInit {

  @Input('userName') userName: String
  @Input('officeName') officeName: String
  @Input('role') currentRole: String

  constructor() {
    this.userName = '';
    this.officeName = '';
    this.currentRole = '';
  }

  currentDate: Date = new Date()

  ngOnInit(): void {



  }

}
