import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dynamic-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dynamic-chart.component.html',
  styleUrl: './dynamic-chart.component.css',
})
export class DynamicChartComponent implements OnInit {
  @Input() grades: any[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor() {}

  ngOnInit(): void {
    if (this.grades && this.grades.length > 0) {
      // Initialize labels from subject names
      this.barChartLabels = this.grades.map((grade) => grade.subject);

      // Initialize datasets from term grades
      const datasets = [];
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: this.grades.map((grade) => grade[`term${i + 1}`]),
          label: `Term ${i + 1} Grades`,
        });
      }
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: datasets,
      };
    }
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
