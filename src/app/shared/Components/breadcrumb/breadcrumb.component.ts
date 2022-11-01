import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor() { }
  @Input() links = [{ iconClass: "fa fa-home ", text: "Home", url: "/Login" }];

  ngOnInit(): void {
  }
}
 