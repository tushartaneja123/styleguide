import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
// end datatable
import { Router, RouterLinkWithHref } from '@angular/router';
import { MDMService } from 'src/app/shared/services/mdm.service';
import { UserData } from '../../dashboard/dashboard.component';
import { CdkRow } from '@angular/cdk/table';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent implements OnInit {
  pageData: any;
  noData: boolean = true;

  displayedColumns: string[] = ['requestID', 'initiator', 'reqDescription', 'createdDate', 'previousAsignee', 'status', 'remarks', 'action'];
  columnHeaders: string[] = ['requestID', 'initiator', 'Request Description', 'Initiated Date', 'Received From', 'Status', 'Remarks'];
  dataSource !: MatTableDataSource<UserData>;
  Search: String = '';
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  // datatable

  constructor(private MDMService: MDMService, private router: Router) { }

  ngOnInit(): void {

    let data = {
      assignmentId: localStorage.getItem("assignmentID"),
      type: "outbox"
    };




    this.MDMService.getTasks(data).subscribe((response: any) => {
      if (response.status.toUpperCase() == "SUCCESS") {
        console.log(response);
        this.pageData = response.data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.pageData);
        this.dataSource.paginator = this.paginator;
        this.sort.disableClear = true;
        this.dataSource.sort = this.sort;
        if (this.pageData.length > 0)
          this.noData = false;

        // this.dataSource.sortingDataAccessor = (row, columnName) => {

        //   // console.log("inside accessor");
        //   // console.log(row);
        //   // console.log("property", columnName);
        //   // var columnValue = row[columnName] as string;
        //   // return columnValue;

        // };
      }
    });
  }

  redirect(row: any): void {
    let taskId = row.taskTransId;
    let requestId = row.requestID;
    this.MDMService.taskTransId = taskId;
    this.MDMService.setRequestId(requestId);
    localStorage["requestId"] = requestId;
    localStorage.setItem("previousPage", "Outbox");
    let data = {
      "requestId": row.requestId,
      "taskTransId": row.taskTransId
    }
    this.router.navigateByUrl('/RequestDetails', { state: { data: data } });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

