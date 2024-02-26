import { Component } from '@angular/core';
import { Student } from '../../shared/models/student.model';
import { ActivatedRoute } from '@angular/router';
import { DynamicChartComponent } from '../dynamic-chart/dynamic-chart.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [DynamicChartComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent {
  student!: Student;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const studentJSON = params.get('student');
      if (studentJSON !== null) {
        this.student = JSON.parse(studentJSON);
        console.log('Parsed student object:', this.student);
      }
    });
  }

  calculateAverage(grade: {
    subject: string;
    term1: number;
    term2: number;
    term3: number;
  }): number {
    const average = (grade.term1 + grade.term2 + grade.term3) / 3;
    return Math.round(average);
  }

  calculateGrade(average: number): string {
    if (average >= 80) {
      return 'A';
    } else if (average >= 70) {
      return 'B';
    } else if (average >= 60) {
      return 'C';
    } else if (average >= 50) {
      return 'D';
    } else {
      return 'F';
    }
  }
}
