import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-interactive-chart',
  template: '<canvas #performanceChart></canvas>',
  styleUrls: ['./interactive-chart.component.scss'],
})
export class InteractiveChartComponent implements OnChanges, AfterViewInit {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() title: string = 'Portfolio Performance';  // Added title input
  @ViewChild('performanceChart') chartCanvas: ElementRef<HTMLCanvasElement> | undefined;
  public chart: Chart | undefined;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
      this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['data'] || changes['labels'])) {
      this.updateChart();
    }
    if(!this.chart){
      this.createChart();
    }
  }

  createChart(): void {
    if (!this.chartCanvas) return;
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
     if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.title, // Use the title here
            data: this.data,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
      },
    });
  }

    updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.data;
      this.chart.data.datasets[0].label = this.title; // update title
      this.chart.update();
    }
  }
}
