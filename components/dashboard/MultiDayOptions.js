let MultiDayOptions = {
    bezierCurve: false,
    scales: {
        yAxes: [{
            ticks: {
                callback: function(tick) { return tick.toFixed(2) }
            },
            scaleLabel: {
                display: true,
                labelString: 'Deceleration'
              }
        }],
        xAxes: [{
            ticks: {
                callback: function(tick) { return tick.toFixed(2) }
            },
            type: 'time',
            time: {
                unit: 'day',
                unitStepSize: 1,
                displayFormats: {
                    'day': 'MMM DD',
                },
                tooltipFormat: 'MMM DD'
            },
            scaleLabel: {
                display: true,
                labelString: 'Dates'
            }
        }]
    }
};

module.exports = MultiDayOptions;
