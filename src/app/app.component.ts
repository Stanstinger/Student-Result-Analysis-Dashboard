import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    StudentDashboardComponent,
    NgChartsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'result-analysis-dashboard';
}
