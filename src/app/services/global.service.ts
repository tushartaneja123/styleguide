import { Injectable } from '@angular/core';
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  // global functions variables here
  letterOnly(event: any): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }

  // global functions variables here
  letterSpace(event: any): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && (charCode <= 31 || charCode >= 33)) {
      return false;
    }
    return true;
  }
  // global functions variables here(space/comma-dash allowed)
  letterSCD(event: any): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && (charCode <= 31 || charCode >= 33)
      && (charCode < 44 || charCode > 45)) {
      return false;
    }
    return true;
  }
  numberOnly(event: any): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  // print function global

  msg: string = '';
  reqId: string = '';



  alertWithSuccess() {
    Swal.fire('', `${this.msg}`, `success`)
  }

  alertWithError() {
    Swal.fire('', `Access Denied !`, `error`)
  }

  alertForApiDown() {
    Swal.fire('', `Server Down!.<br> please try after some time.`, `error`)
  }


  // =================================== swt alert ============================ 


  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  // =================================== swt alert end ========================
  printSec(divName: any) {

    // alert(divName + 'if');
    let printContents = document.getElementById(divName)!.innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

  }



}



