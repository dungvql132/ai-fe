import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RequestSubmissionComponent } from './request-submission/request-submission.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';

export const routes: Routes = [
    {path:'login',component: LoginComponent},
    {path:'requestSubmission',component: RequestSubmissionComponent},
    {path:'dashboard',component: DashboardComponent},
    {path:'managerDashboard',component: ManagerDashboardComponent},

];
