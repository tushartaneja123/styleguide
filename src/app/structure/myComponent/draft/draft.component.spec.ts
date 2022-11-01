import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataStoreService } from 'src/app/services/data-store.service';
import { MDMService } from 'src/app/shared/mdm.service.ts.service';
import { DraftComponent } from './draft.component';
import { HttpTestingController } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Instance } from '@popperjs/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';


fdescribe('DraftComponent', () => {
  window.onbeforeunload = jasmine.createSpy();
  let component: DraftComponent;
  let fixture: ComponentFixture<DraftComponent>;

  let httpTestingController: HttpTestingController;
  let testService: TestService;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  //const routerSpy = {navigateByUrl: jasmine.createSpy('navigateByUrl')};

  beforeEach(async () => {
    testService = new TestService();
    await TestBed.configureTestingModule({
      declarations: [DraftComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        MatTableModule,
        MatInputModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],

      schemas: [CUSTOM_ELEMENTS_SCHEMA],

      providers: [
        DataStoreService,
        HttpClient,
        {
          provide: MDMService,
          useValue: testService
        },
        { provide: Router, useValue: routerSpy }
      ],
    })
      .compileComponents();
  });


  beforeEach(() => {

    fixture = TestBed.createComponent(DraftComponent);
    component = fixture.debugElement.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    spyOn(testService, 'getTasks').and.returnValue(of(resp));
    fixture.detectChanges();

  });


  it('should defined', async () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should check table rendering', () => {

    // const redirectSpy=spyOn(component, 'redirect').and.callThrough();
    // const navigateSpy=spyOn(myRouter,'navigateByUrl');
    // console.log(navigateSpy);
    let viewButtonElement = fixture.debugElement.query(By.css('#matTable')).nativeElement;
    // console.log("viewButtonElement : ",viewButtonElement);
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    // console.log('Table row1',tableRows[1]);
    expect(tableRows[1].cells[0].innerHTML).toBe(' 123 ');
    //let button = tableRows[1].cells[8].querySelector('#viewButton');
    // console.log('View Button',button);
    // button.click();
    //  expect(redirectSpy).toHaveBeenCalled();

    //  const elem = fixture.debugElement;

    // const buttonElement = elem.query(e => e.name === 'button');
    // expect(!!button).toBe(true);
    // expect(button.nativeElement.textContent.trim()).toBe('CLICK FOR BUBBLES');

    // button.nativeElement.click();
    // fixture.detectChanges();
    // fixture.whenStable().then(() => {
    //   // expect(location.path()).toBe('/test');
    // });

  })

  it('should check for search box', () => {
    let queryByLabel = fixture.debugElement.query(By.css("#searchField mat-label")).nativeElement.innerText;
    expect(queryByLabel).toBe('Search');
  })

  it('should match the value in search box', () => {
    let viewSearchBoxElement = fixture.debugElement.query(By.css('.form-control-sm')).nativeElement;
    //console.log("viewSearchBoxElement : ",viewSearchBoxElement);
    let elementValue = viewSearchBoxElement.value;
    expect(elementValue).toBeFalsy();
    fixture.detectChanges();
    elementValue = "Jim Carey";
    fixture.detectChanges();
    expect(elementValue).toBe("Jim Carey");
  })

  it('should check search functionality of search box', () => {
    const searchSpy = spyOn(component, 'applyFilter').and.callThrough();
    const hostElement = fixture.nativeElement;
    let tableRowsLength = hostElement.querySelectorAll('tr').length;
    //console.log("Table Rows length : ",tableRowsLength);
    expect(tableRowsLength).toBe(4);
    const searchInput: HTMLInputElement = hostElement.querySelector('.form-control-sm');
    searchInput.value = '123';
    searchInput.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    let tableRowsLength1 = hostElement.querySelectorAll('tr').length;
    //console.log("Table Rows length -->>: ",tableRowsLength1);
    expect(searchSpy).toHaveBeenCalled();
  })

  it('should check router functionality', () => {
    const redirectSpy = spyOn(component, 'redirect').and.callThrough();
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    //console.log('Table row1',tableRows[1]);
    expect(tableRows[1].cells[0].innerHTML).toBe(' 123 ');
    let button = tableRows[1].cells[8].querySelector('#viewButton');
    //console.log('View Button',button);
    button.click();
    fixture.detectChanges();
    expect(redirectSpy).toHaveBeenCalled();
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    const id = 1234;
    console.log('navArgs --->>>>', navArgs);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/TaskDetails/' + id);
    console.log("test");
  })


});


const mockData = [{
  requestID: 123,
  reqDescription: 'test desc',
  initiator: 1,
  createdDate: 1660986161000,
  taskTranId: 1234,
  previousAsignee: 'Nimesh',
  status: 'DRAFT',
  remarks: 'Test remark',
  processID: 1,
},
{
  requestID: 457,
  reqDescription: 'test desc2',
  initiator: 2,
  createdDate: 1661176856000,
  taskTranId: 5678,
  previousAsignee: 'Nimesh J',
  status: 'DRAFT',
  remarks: 'NEW Test remark',
  processID: 1,
},
{
  requestID: 8,
  reqDescription: 'test desc3',
  initiator: 3,
  createdDate: 20220801,
  taskTranId: 5678,
  previousAsignee: 'Nimesh J',
  status: 'DRAFT',
  remarks: 'NEW Test remark',
  processID: 1
}
];

const resp = { data: mockData, status: 'success' };
class TestService {
  getTasks() {
    return of(resp);
  }
}
