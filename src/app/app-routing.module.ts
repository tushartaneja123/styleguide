import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { RouteGuard } from './route.guard';
import { ForgotPasswordComponent } from './structure/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './structure/auth/login/login.component';
import { PageNotFoundComponent } from './structure/auth/page-not-found/page-not-found.component';
import { RegistrationComponent } from './structure/auth/registration/registration.component';
import { DashboardComponent } from './structure/dashboard/dashboard.component';
import { AsideComponent } from './structure/layout/aside/aside.component';
import { FooterComponent } from './structure/layout/footer/footer.component';
import { HeaderComponent } from './structure/layout/header/header.component';
import { TopNavigationComponent } from './structure/layout/top-navigation/top-navigation.component';
import { DepartmentCreationPreviewComponent } from './structure/myComponent/department-creation-preview/department-creation-preview.component';
import { DepartmentCreationComponent } from './structure/myComponent/department-creation/department-creation.component';
import { DraftComponent } from './structure/myComponent/draft/draft.component';
import { MainComponent } from './structure/myComponent/main/main.component';

import { OutboxComponent } from './structure/myComponent/outbox/outbox.component';
import { RoleSelectionComponent } from './structure/myComponent/role-selection/role-selection.component';
import { TestScreenComponent } from './structure/myComponent/test-screen/test-screen.component';
import { UserCheckerInboxComponent } from './structure/myComponent/user-checker-inbox/user-checker-inbox.component';
import { UserCheckerPreviewComponent } from './structure/myComponent/user-checker-preview/user-checker-preview.component';



const routes: Routes = [


  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'Registration', component: RegistrationComponent },
  { path: 'Menu/Inbox', component: UserCheckerInboxComponent },
  { path: 'RequestDetails', component: UserCheckerPreviewComponent, data: { taskTransId: "" } },
  { path: 'Main', component: MainComponent },
  { path: 'Login', component: LoginComponent },

  { path: 'RoleSelection', component: RoleSelectionComponent },
  { path: 'Menu/Drafts', component: DraftComponent },
  { path: 'Menu/Outbox', component: OutboxComponent },



  // { path: 'roleSelection', component: RoleSelectionComponent },
  // { path: 'Drafts', component: DraftComponent },
  // { path: 'Outbox', component: OutboxComponent },
  // // >>>>>>> 59d1b37324492ff66e813b3cc58c4a9817bfaa21
  {
    path: 'Dashboard', component: DashboardComponent,
    children: [
      { path: 'header', component: HeaderComponent },
      { path: 'topNavigation', component: TopNavigationComponent },
      { path: 'aside', component: AsideComponent },
      { path: 'footer', component: FooterComponent },
    ]
  },
  { path: 'DepartmentCreation', component: DepartmentCreationComponent },
  { path: 'department-creation-preview', component: DepartmentCreationPreviewComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'test-screen', component: TestScreenComponent },
  { path: '', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
