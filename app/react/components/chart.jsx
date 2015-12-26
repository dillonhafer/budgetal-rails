import React from 'react';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    spent: React.PropTypes.number.isRequired,
    remaining: React.PropTypes.number.isRequired,
    selector: React.PropTypes.string.isRequired
  }

  data(props) {
    return [
      {y: parseFloat(props.spent), name: 'Spent'},
      {y: parseFloat(props.remaining), name: 'Remaining'}
    ]
  }

  shouldComponentUpdate(newProps, state) {
    var newData = this.data(newProps)
    let chart = this.refs.chart.getChart();
    chart.series[0].setData(newData)
    return false
  }

  config(data, selector) {
    return {
      chart: {
        renderTo: selector,
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
        data: data
      }]
    }
  }

  render() {
    var data   = this.data(this.props);
    var config = this.config(data, this.props.selector);
    return (
      <ReactHighcharts ref="chart" config={config} />
    );
  }
}