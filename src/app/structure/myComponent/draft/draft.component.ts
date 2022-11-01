import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
// end datatable
import { HttpClient } from '@angular/common/http';
import { MDMService } from 'src/app/shared/services/mdm.service';
import { Router } from '@angular/router';
import { UserData } from '../../dashboard/dashboard.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  displayedColumns: string[] = ['requestID', 'initiator', 'reqDescription', 'createdDate', 'taskTranId', 'previousAsignee', 'status', 'remarks', 'action'];
  dataSource !: MatTableDataSource<UserData>;
  Search: String = '';
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  // datatable
  pageData: any;
  noData: boolean = true;
  pageSizeOptions = environment.pageSizeOptions;
  constructor(private http: HttpClient, private MDMService: MDMService, private router: Router) { }
  ngOnInit(): void {

    let data = { assignmentId: localStorage.getItem("assignmentID"), type: "draft" };

    this.MDMService.getTasks(data).subscribe((
      response: any) => {
      console.log("draft response here");
      console.log(response);
      if (response.status.toUpperCase() == "SUCCESS") {
        this.pageData = response.data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.pageData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.pageData.length > 0)
          this.noData = false;
      }
    });
  }


  redirect(row: any): void {
    let taskid = row.taskTranId;
    this.MDMService.taskTransId = taskid;
    localStorage["requestId"] = row.requestID;
    localStorage["wfProcessId"] = row.processID;
    localStorage["taskTransId"] = taskid;
    localStorage.setItem("previousPage", "Drafts");
    this.router.navigateByUrl('/RequestDetails');
  }


  // datatable

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}