import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RequestSubmissionComponent } from './request-submission/request-submission.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path:'requestSubmission',component: RequestSubmissionComponent},
    {path:'dashboard',component: DashboardComponent},
    {path:'managerDashboard',component: ManagerDashboardComponent},
    {path:'report',component: ReportComponent},
];
