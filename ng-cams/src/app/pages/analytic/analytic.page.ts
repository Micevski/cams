import { Component, OnInit } from '@angular/core';
import { AnalyticService } from '../../service/analytic.service';
import { TwoDimensionAnalytic } from '../../interfaces/two-dimension-analytic.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartType } from 'angular-google-charts';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  geoChart = ChartType.GeoChart;
  showFiller = false;
  filters: FormGroup;

  options = {
    legend: { position: 'left' }
  };
  geoOptions = {
    region: 'MK',
    displayMode: 'markers',
    colorAxis: { minValue: 0, colors: ['#8BC34A', '#3F51B5'] }
  };

  constructor(private _service: AnalyticService,
              private _mapsApiLoader: MapsAPILoader,
              private _builder: FormBuilder) { }

  ngOnInit(): void {
    this.filters = this._builder.group({
      from: [null],
      to: [null]
    });
    this.loadChartData();
  }

  private _mapToGoogleAnalyticsChartData(chart: TwoDimensionAnalytic) {
    const result = [];
    for (let i = 0; i < chart.columns.length; i++) {
      result.push([chart.columns[i], chart.data[i]]);
    }
    return result;
  }

  private loadChartData() {
    this._mapsApiLoader.load().then(() => {
      this.chartDataCityGrouped$ = this._service.getAccidentsCountByCity(this.filters.getRawValue())
        .pipe(map(it => this._mapToGoogleAnalyticsChartData(it)));
      this.chartDataDateGrouped$ = this._service.getAccidentsCountsByDate(this.filters.getRawValue())
        .pipe(map(it => this._mapToGoogleAnalyticsChartData(it)));
      this.chartDataAccidentTimeSeries$ = this._service.getAccidentsTimeSeries(this.filters.getRawValue())
        .pipe(map(it => this._mapToGoogleAnalyticsChartData(it)));
      this.chartDataAccidentAgeSeries$ = this._service.getPassengersAgeSeries(this.filters.getRawValue())
        .pipe(map(it => this._mapToGoogleAnalyticsChartData(it)));
    });
  }

  applyFilters() {
    this.loadChartData();
  }
}
