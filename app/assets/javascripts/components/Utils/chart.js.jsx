var Chart = React.createClass({
  drawChart: function(spent, remaining) {
    var selector = `#${this.props.selector}`
    $(selector).highcharts({
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
        data: [{
            name: "Spent",
            y: spent,
          }, {
            name: "Remaing",
            y: remaining,
          }]
      }]
    });
  },
  render() {
    Highcharts.theme = {
      colors: ["#7cb5ec", "#f6c86f", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
      chart: {
        backgroundColor: null,
      },
      title: {
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }
      },
      tooltip: {
        borderWidth: 0,
        backgroundColor: 'rgba(219,219,216,0.8)',
        shadow: false
      },
      legend: {
        itemStyle: {
          fontWeight: 'bold',
          fontSize: '13px'
        }
      },
      xAxis: {
        gridLineWidth: 1,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yAxis: {
        minorTickInterval: 'auto',
        title: {
          style: {
            textTransform: 'uppercase'
          }
        },
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      plotOptions: {
        candlestick: {
          lineColor: '#404048'
        }
      },
      background2: '#F0F0EA'
    };
    Highcharts.setOptions(Highcharts.theme);
    return (
      <div>
        <div id={this.props.selector} className='percentage-chart'></div>
        {this.drawChart(this.props.spent, this.props.remaining)}
      </div>
    );
  }
})