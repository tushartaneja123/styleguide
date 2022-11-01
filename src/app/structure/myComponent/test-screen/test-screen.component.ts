import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-screen',
  templateUrl: './test-screen.component.html',
  styleUrls: ['./test-screen.component.css']
})
export class TestScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  url="../../../../assets/images/Mtech_certificate.jpg";

  onSelectFile(e:any){
    if(e.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{
        this.url = event.target.result;
      }
    }
  }
  ImageUpload(event:any){
    alert(event);
  }



}
