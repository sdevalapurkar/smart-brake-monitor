let DefaultOptions = {
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
            ticks: {
                beginAtZero: true,
                stepSize: 5
            },
            scaleLabel: {
                display: true,
                labelString: 'Minutes'
            }
        }]
    }
};

module.exports = DefaultOptions;
