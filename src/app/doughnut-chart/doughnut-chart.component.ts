import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.css',
})
export class DoughnutChartComponent implements OnInit {
  @Input() grades: any[] = [];

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // Chart options
  public doughnutChartOptions: any = {
    borderWidth: 10,
    borderRadius: 2,
    hoverBorderWidth: 0,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.processGrades();
  }

  private processGrades(): void {
    const subjectsMap = new Map<string, number[]>();

    // Calculate averages for each subject
    this.grades.forEach((grade) => {
      const subject = grade.subject;
      const average = (grade.term1 + grade.term2 + grade.term3) / 3;

      // Initialize an empty array if the subject is not in the map
      if (!subjectsMap.has(subject)) {
        subjectsMap.set(subject, []);
      }

      // Push the average to the array for the subject
      subjectsMap.get(subject)!.push(average);
    });

    // Fill labels and datasets
    this.doughnutChartLabels = Array.from(subjectsMap.keys());
    const averages: number[] = Array.from(subjectsMap.values()).map(
      (grades) => {
        const average =
          grades.reduce((total, val) => total + val, 0) / grades.length;
        return average;
      }
    );

    // Push the averages array as data for the dataset
    this.doughnutChartData.datasets.push({ data: averages });

    // Initialize doughnutChartData inside processGrades
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: averages }],
    };

    // Log labels and dataset
    console.log('Labels:', this.doughnutChartLabels);
    console.log('Datasets:', this.doughnutChartData.datasets);
  }

  calculatePercentage(index: number): number {
    if (this.doughnutChartData.datasets.length === 0) {
      return 0; // return 0 if datasets are not available yet
    }
    const totalAverage = this.doughnutChartData.datasets[0].data.reduce(
      (total, val) => total + val,
      0
    );
    const subjectAverage = this.doughnutChartData.datasets[0].data[index];
    const percentage = (subjectAverage / totalAverage) * 100;
    return Math.round(percentage); // round off the percentage to the nearest integer
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {}
}
