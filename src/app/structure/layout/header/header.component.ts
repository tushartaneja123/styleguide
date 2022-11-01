
import { Component, Input, OnInit, HostListener, ViewChild, Inject } from '@angular/core';
import { DataStoreService } from 'src/app/services/data-store.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() officeName = "Test";
  @Input() loggedInUserName = "Test";
  @Input() currentRole = "Test";
  @Input() currentDate?= new Date();
  @Input() isHidden = false;
  isHiddenLink: boolean = true;
  constructor(private store: DataStoreService, @Inject(DOCUMENT) private document: Document) {

  }
  isBottom: boolean = false;


  logOut(): void {
    this.store.logOut();
  }
  resetFont(): void {
    this.document.body.style.fontSize = "16px";

  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.isBottom = true;
    } else {
      this.isBottom = false;
    }
  }
}

