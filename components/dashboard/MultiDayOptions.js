let MultiDayOptions = {
    bezierCurve: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            },
            scaleLabel: {
                display: true,
                labelString: 'Deceleration'
              }
        }],
        xAxes: [{
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
