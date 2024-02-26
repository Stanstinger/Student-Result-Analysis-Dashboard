import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
];
