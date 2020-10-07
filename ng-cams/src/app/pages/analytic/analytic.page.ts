import { Component, OnInit } from '@angular/core';
import { AnalyticService } from '../../service/analytic.service';
import { TwoDimensionAnalytic } from '../../interfaces/two-dimension-analytic.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'analytic',
  templateUrl: './analytic.page.html',
  styleUrls: ['./analytic.page.scss']
})
export class AnalyticPage implements OnInit {

  chartDataDateGrouped$: Observable<any>;
  chartDataCityGrouped$: Observable<any>;
  chartDataAccidentTimeSeries$: Observable<any>;
  chartDataAccidentAgeSeries$: Observable<any>;
  barChart = ChartType.BarChart;
  lineChart = ChartType.LineChart;
  pieChart = ChartType.PieChart;
  tableChart = ChartType.Table;

  options = {
    legend: { position: 'left' },
  };

  constructor(private _service: AnalyticService) { }

  ngOnInit(): void {
    this.chartDataCityGrouped$ = this._service.getAccidentsCountByCity()
      .pipe(map(it => this._mapToGoogleAnalyticsChartData(it)));
    this.chartDataDateGrouped$ = this._service.getAccidentsCountsByDate()
      .pipe(map(it => this._mapToGoogleAnalyticsChartData(it)));
    this.chartDataAccidentTimeSeries$ = this._service.getAccidentsTimeSeries()
      .pipe(map(it => this._mapToGoogleAnalyticsChartData(it)));
    this.chartDataAccidentAgeSeries$ = this._service.getPassengersAgeSeries()
      .pipe(map(it => this._mapToGoogleAnalyticsChartData(it)));

  }

  private _mapToGoogleAnalyticsChartData(chart: TwoDimensionAnalytic) {
    const result = [];
    for (let i = 0; i < chart.columns.length; i++) {
      result.push([chart.columns[i], chart.data[i]]);
    }
    return result;
  }
}
