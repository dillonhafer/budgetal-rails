import React from 'react';
import {findStatistic} from '../../data/budget_category';

export default class StatsChart extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    budget_categories: React.PropTypes.array.isRequired,
  }

  state = {
    chart: ''
  }

  static defaultProps= {
    budget_categories: []
  }

  data(categories) {
    if (categories === undefined) {
      categories = this.props.budget_categories || []
    }
    return (
      _.map(categories, function(category) {
        return {y: parseFloat(category.percent_spent), name: category.name}
      })
    )
  }

  shouldComponentUpdate(newProps, state) {
    if (this.state.chart) {
      var newData = this.data(newProps.budget_categories)
      this.state.chart.series[0].setData(newData)
    }
    return false
  }

  drawChart() {
    var data = this.data()
    return new Highcharts.Chart({
      chart: {
        renderTo: 'stats-container',
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
      legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 100,
        layout: 'vertical'
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
        name: "Money",
        colorByPoint: true,
        data: data
      }]
    });
  }

  componentDidMount() {
    Highcharts.theme = {
      colors: ["#7cb5ec", "#f6c86f", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
      chart: { backgroundColor: null, },
      title: { style: {fontSize: '16px',fontWeight: 'bold',textTransform: 'uppercase'} },
      tooltip: {borderWidth: 0,backgroundColor: 'rgba(219,219,216,0.8)',shadow: false},
      legend: {itemStyle: {fontWeight: 'bold',fontSize: '13px'}},
      xAxis: {gridLineWidth: 1,labels: {style: {fontSize: '12px'}}},
      yAxis: {minorTickInterval: 'auto', title: {style: {textTransform: 'uppercase'}}, labels: {style: {fontSize: '12px'}}},
      plotOptions: { candlestick: {lineColor: '#404048'}},
      background2: '#F0F0EA'
    };
    Highcharts.setOptions(Highcharts.theme);
    var chart = this.drawChart()
    this.setState({chart: chart})
  }

  render() {
    return <div><div id='stats-container'></div></div>
  }
}