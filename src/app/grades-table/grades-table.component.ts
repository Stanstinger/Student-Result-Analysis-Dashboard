import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grades-table',
  standalone: true,
  imports: [],
  templateUrl: './grades-table.component.html',
  styleUrl: './grades-table.component.css',
})
export class GradesTableComponent {
  @Input() grades: any[] = [];

  // Function to calculate average for a grade
  calculateAverage(grade: {
    subject: string;
    term1: number;
    term2: number;
    term3: number;
  }): number {
    const average = (grade.term1 + grade.term2 + grade.term3) / 3;
    return Math.round(average);
  }

  // Function to calculate grade based on average
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
