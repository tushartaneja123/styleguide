import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-suggested-remarks-chips',
  templateUrl: './suggested-remarks-chips.component.html',
  styleUrls: ['./suggested-remarks-chips.component.css']
})
export class SuggestedRemarksChipsComponent {

  constructor() { }
  @Input() options = new Array();
  @Input() label = "Suggested Remarks";
  @Input() control: AbstractControl | undefined;



  setRemark(r: string) {
    if (this.control)
      this.control.setValue(r);
  }
}
