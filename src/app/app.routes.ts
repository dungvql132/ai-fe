import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RequestSubmissionComponent } from './request-submission/request-submission.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path:'requestSubmission',component: RequestSubmissionComponent, canActivate: [AuthGuard]},
    {path:'dashboard',component: DashboardComponent, canActivate: [AuthGuard]},
    {path:'managerDashboard',component: ManagerDashboardComponent, canActivate: [AuthGuard]},
    {path:'report',component: ReportComponent, canActivate: [AuthGuard]},
];