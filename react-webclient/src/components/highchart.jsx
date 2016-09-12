import React from 'react';
import {merge} from 'lodash';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';

export default class Highchart extends React.Component {
  constructor(props) {
    super(props);
    this.setTheme(props.colors);
  }

  static propTypes = {
    config: React.PropTypes.object.isRequired
  }

  static defaultProps = {
    config: []
  }

  setTheme(colors) {
    if (colors === undefined) {
      colors = ["#7cb5ec", "#f6c86f", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"]
    }
    ReactHighcharts.Highcharts.theme = {
      colors: colors,
      chart: { backgroundColor: null, },
      title: { style: {fontSize: '16px',fontWeight: 'bold',textTransform: 'uppercase'} },
      tooltip: {borderWidth: 0,backgroundColor: 'rgba(219,219,216,0.8)',shadow: false},
      legend: {itemStyle: {fontWeight: 'bold',fontSize: '13px'}},
      xAxis: {gridLineWidth: 1,labels: {style: {fontSize: '12px'}}},
      yAxis: {minorTickInterval: 'auto', title: {style: {textTransform: 'uppercase'}}, labels: {style: {fontSize: '12px'}}},
      plotOptions: { candlestick: {lineColor: '#404048'}},
      background2: '#F0F0EA'
    };
    ReactHighcharts.Highcharts.setOptions(ReactHighcharts.Highcharts.theme);
  }

  shouldComponentUpdate(newProps, state) {
    let chart = this.refs.chart.getChart();
    let data  = newProps.config.series[0].data;
    chart.series[0].setData(data);
    return false
  }

  config(config) {
    return merge({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: "Percentage",
        colorByPoint: true,
        data: []
      }]
    },
    config)
  }

  render() {
    var config = this.config(this.props.config);
    return (
      <ReactHighcharts ref="chart" config={config} />
    );
  }
}