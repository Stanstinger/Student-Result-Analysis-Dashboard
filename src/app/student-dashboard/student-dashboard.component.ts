import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Student } from '../../shared/models/student.model';
import { ActivatedRoute } from '@angular/router';
import { DynamicChartComponent } from '../dynamic-chart/dynamic-chart.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { GradesTableComponent } from '../grades-table/grades-table.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    DynamicChartComponent,
    DoughnutChartComponent,
    CarouselComponent,
    GradesTableComponent,
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent {
  student!: Student;
  @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;

  sidebarExpanded: boolean = false;

  constructor(private route: ActivatedRoute, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const studentJSON = params.get('student');
      if (studentJSON !== null) {
        this.student = JSON.parse(studentJSON);
        console.log('Parsed student object:', this.student);
      }
    });
  }

  // Function to toggle sidebar class
  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
    if (this.sidebarExpanded) {
      this.renderer.addClass(this.sidebar.nativeElement, 'expand');
    } else {
      this.renderer.removeClass(this.sidebar.nativeElement, 'expand');
    }
  }

  calculateTotalAverage(): { average: number; total: number } {
    let total = 0;
    this.student.grades.forEach((grade) => {
      total += (grade.term1 + grade.term2 + grade.term3) / 3;
    });
    const average = Math.round(total / this.student.grades.length);
    total = Math.round(total);
    return { average, total };
  }

  calculateTotalGrade(totalAverage: number): string {
    if (totalAverage >= 80) {
      return 'A';
    } else if (totalAverage >= 70) {
      return 'B';
    } else if (totalAverage >= 60) {
      return 'C';
    } else if (totalAverage >= 50) {
      return 'D';
    } else {
      return 'F';
    }
  }
}
