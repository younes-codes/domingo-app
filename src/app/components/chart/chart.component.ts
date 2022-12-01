import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgChartsModule} from "ng2-charts";
import {ForecastService} from "../../services/forecast.service";
import {ChartType} from "chart.js";

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    type: ChartType = "line"
    barChartData = [
        {
            data: [],
            label: 'Prévision jours 2023',
            backgroundColor: '#000',
            pointBackgroundColor: "#6F3",
            borderColor: "#34E",
            tension: 0.3,
        },
    ];
    barChartsLabels: string[];
    barChartLegend = false;
    barChartOptions = {
        responsive: true,
    };

    // CHART 2 =  LINE D

    type2: ChartType = "bar";

    barChartData2 = [
        {
            data: [],
            label: 'Prévision CA 2023',
            backgroundColor: '#4caf50',
            borderColor: "#000",
            borderWidth: 2,
            borderRadius: 2,
            categoryPercentage: .9, // notice here
            barPercentage: 1,  // notice here
        },
    ];

    barChartsLabels2: string[];
    barChartLegend2 = true;
    barChartOptions2 = {
        responsive: true,
    };

    // CHART 3 =  LINE D

    type3: ChartType = "doughnut";

    barChartData3 = [
        {
            data: [],
            label: 'Prévision 1 mois',
            backgroundColor: '#4caf50',
            borderColor: "#000",
            borderWidth: 2,
        },
    ];

    barChartsLabels3: string[];
    barChartLegend3 = true;
    barChartOptions3 = {
        responsive: true,
    };

    chartDay: boolean;
    chartCa: boolean;

    constructor(private forecast: ForecastService) {
    }

    ngOnInit() {
        this.barChartsLabels = this.forecast.forecast.value.map((obj) => obj.month);
        this.barChartData[0].data = this.forecast.forecast.value.map((obj) => obj.CA);
        this.barChartsLabels2 = this.forecast.forecast.value.map((obj) => obj.month);
        this.barChartData2[0].data = this.forecast.forecast.value.map((obj) => obj.dayForecasted);
        this.chartDay = true;
        this.chartCa = true;

        this.barChartsLabels3 = this.forecast.forecast.value.map((obj) => obj.month);
        this.barChartData3[0].data = this.forecast.forecast.value.map((obj) => obj.dayForecasted);
    }
}
