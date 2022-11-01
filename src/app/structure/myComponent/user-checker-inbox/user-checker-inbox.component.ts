import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';

// end datatable
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserData } from '../../dashboard/dashboard.component';
import { MDMService } from 'src/app/shared/services/mdm.service';



@Component({
  selector: 'app-user-checker-inbox',
  templateUrl: './user-checker-inbox.component.html',
  styleUrls: ['./user-checker-inbox.component.css']
})


export class UserCheckerInboxComponent implements OnInit {

  pageData: any;
  pipe = new DatePipe('en-US');

  // code for data table 
  displayedColumns: string[] = ['requestID', 'initiator', 'reqDescription', 'createdDate', 'previousAsignee', 'status', 'remarks', 'action'];
  columnHeaders: string[] = ['Request ID', 'Initiator', 'Request Description', 'Initiated Date', 'Received From', 'Status', 'Remarks'];
  dataSource !: MatTableDataSource<UserData>;
  noData: Boolean = true;
  searchForm = new FormGroup({
    search: new FormControl('')
  });




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  getValue(value: any, property: string) {
    if (property.toLowerCase().indexOf('date') >= 0)
      return this.pipe.transform(value, 'medium');
    else
      return value;
  }

  constructor(private MDMService: MDMService, private router: Router) { }


  ngOnInit(): void {
    let data = { assignmentId: localStorage.getItem("assignmentID"), type: "inbox" };
    this.MDMService.getListInboxRequestDetailes(data).subscribe((response: any) => {

      // console.table(response);

      this.pageData = response.data;

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.pageData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.pageData.length > 0)
        this.noData = false;
    }, (err) => { console.log(err); });
  }

  redirect(row: any): void {
    this.MDMService.taskTransId = row.taskTranId;
    localStorage["requestId"] = row.requestID;
    localStorage["wfProcessId"] = row.processID;
    localStorage["taskTransId"] = row.taskTranId;
    localStorage.setItem("previousPage", "Inbox");
    this.router.navigate(['/RequestDetails'], { state: row });
  }



  // datatable
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}