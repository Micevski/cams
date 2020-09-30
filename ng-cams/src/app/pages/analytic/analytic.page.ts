import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { AnalyticService } from '../../service/analytic.service';
import { TwoDimensionAnalytic } from '../../interfaces/two-dimension-analytic.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'analytic',
  templateUrl: './analytic.page.html',
  styleUrls: ['./analytic.page.scss']
})
export class AnalyticPage implements OnInit {

  chartDataDateGrouped$: Observable<any>;
  chartDataCityGrouped$: Observable<any>;
  test = 'Bar';

  options = {
    legend: { position: 'none' }
  };

  constructor(private _service: AnalyticService) { }

  ngOnInit(): void {
    this.chartDataCityGrouped$ = this._service.getAccidentsCountByCity()
      .pipe(map(it => this._mapToGoogleAnalyticsChartData(it)));
    this.chartDataDateGrouped$ = this._service.getAccidentsCountsByDate()
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
