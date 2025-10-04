import { Routes } from '@angular/router';
import { PanelComponent } from "./layout/panel/panel.component";
import { ReportComponent } from "./pages/report/report.component";
import { AuthComponent } from "./layout/auth/auth.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { authGuard } from "./guards/auth.guard";
import {loginGuard} from "./guards/login.guard";

export const routes: Routes = [
    { path: 'auth', component: AuthComponent, canActivate: [loginGuard],
    children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
    ]},
    { path: '', component: PanelComponent, canActivate: [authGuard], children: [
        { path: '', redirectTo: 'reports', pathMatch: 'full' },
        { path: 'reports', component: ReportComponent },
        { path: 'profile', component: ProfileComponent },
    ]},
];
