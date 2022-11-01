import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './structure/dashboard/dashboard.component';
import { HeaderComponent } from './structure/layout/header/header.component';
import { FooterComponent } from './structure/layout/footer/footer.component';
import { AsideComponent } from './structure/layout/aside/aside.component';
import { TopNavigationComponent } from './structure/layout/top-navigation/top-navigation.component';
import { LoginComponent } from './structure/auth/login/login.component';
import { RegistrationComponent } from './structure/auth/registration/registration.component';
import { ForgotPasswordComponent } from './structure/auth/forgot-password/forgot-password.component';
import { DepartmentCreationComponent } from './structure/myComponent/department-creation/department-creation.component';
import { PageNotFoundComponent } from './structure/auth/page-not-found/page-not-found.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DepartmentCreationPreviewComponent } from './structure/myComponent/department-creation-preview/department-creation-preview.component';
import { TestScreenComponent } from './structure/myComponent/test-screen/test-screen.component';
import { MainComponent } from './structure/myComponent/main/main.component';
import { UserCheckerInboxComponent } from './structure/myComponent/user-checker-inbox/user-checker-inbox.component';
import { UserCheckerPreviewComponent } from './structure/myComponent/user-checker-preview/user-checker-preview.component';
import { RoleSelectionComponent } from './structure/myComponent/role-selection/role-selection.component';
import { DraftComponent } from './structure/myComponent/draft/draft.component';
import { OutboxComponent } from './structure/myComponent/outbox/outbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoDataErrorComponent } from './shared/Components/no-data-error/no-data-error.component';
import { FooterLandingComponent } from './styleguide/footer-landing/footer-landing.component';


//angular material files 


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { BreadcrumbComponent } from './shared/Components/breadcrumb/breadcrumb.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { SearchFieldComponent } from './shared/Components/search-field/search-field.component';
import { UserInfoHeaderComponent } from './structure/layout/user-info-header/user-info-header.component';
import { SuggestedRemarksChipsComponent } from './shared/Components/suggested-remarks-chips/suggested-remarks-chips.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { StyleguideComponent } from './styleguide/styleguide.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';







@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    TopNavigationComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    DepartmentCreationComponent,
    PageNotFoundComponent,
    DepartmentCreationPreviewComponent,
    TestScreenComponent,
    MainComponent,
    UserCheckerInboxComponent,
    UserCheckerPreviewComponent,
    RoleSelectionComponent,
    DraftComponent,
    OutboxComponent,
    BreadcrumbComponent,
    NoDataErrorComponent,
    SearchFieldComponent,
    UserInfoHeaderComponent,
    SuggestedRemarksChipsComponent,
    StyleguideComponent,
    FooterLandingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatChipsModule,
    MatBadgeModule,
    MatRadioModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    TypeaheadModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
