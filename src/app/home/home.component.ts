import { Component, OnInit } from '@angular/core';
import { Student } from '../../shared/models/student.model';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  students!: Student[];

  constructor(private router: Router, private studentService: StudentService) {}

  viewDashboard(student: Student): void {
    this.router.navigate([
      '/student-dashboard',
      { student: JSON.stringify(student) },
    ]);
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }
}
