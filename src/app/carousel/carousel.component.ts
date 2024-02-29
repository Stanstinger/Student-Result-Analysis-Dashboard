import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() grades: any[] = [];
  currentIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  // Function to calculate average grade
  calculateAverage(grade: {
    subject: string;
    term1: number;
    term2: number;
    term3: number;
  }): number {
    const average = (grade.term1 + grade.term2 + grade.term3) / 3;
    return Math.round(average);
  }

  // Function to generate remark based on average grade
  generateRemark(average: number): string {
    if (average >= 80) {
      return 'Excellent performance!';
    } else if (average >= 70) {
      return 'Good job!';
    } else if (average >= 60) {
      return 'Keep it up!';
    } else if (average >= 50) {
      return 'Work harder!';
    } else {
      return 'Needs improvement!';
    }
  }

  // Function to generate recommendation based on average grade
  generateRecommendation(average: number): string {
    if (average >= 80) {
      return 'Continue with the good work and aim for even higher grades!';
    } else if (average >= 70) {
      return 'Maintain your effort and focus on areas for further improvement!';
    } else if (average >= 60) {
      return 'Stay committed and work on strengthening weaker subjects!';
    } else if (average >= 50) {
      return 'Seek additional support and dedicate more time to studying!';
    } else {
      return 'Consider seeking extra help and developing better study habits!';
    }
  }

  // Function to move to the previous slide in the carousel
  prevSlide(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.grades.length - 1;
    } else {
      this.currentIndex--;
    }
  }

  // Function to move to the next slide in the carousel
  nextSlide(): void {
    if (this.currentIndex === this.grades.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }
}
