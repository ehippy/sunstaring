var sunStaring = (function ($) {
    var my = {};

    function buildUrl(resource) {
        return 'https://st20iygm56.execute-api.us-east-1.amazonaws.com/prod/' + resource;
    }

    my.checkStatus = function (callback) {
        $.getJSON(buildUrl('isonline'), null, callback);
    };

    my.showHistory = function () {
        $.getJSON(buildUrl('history'), null, function(data){

            var cleanData = [];

            for (var i=0; i<data.length;i++) {
                var item = data[i];
                var val = (item.event=='checkin')?1:2;
                cleanData.push([item.timestamp, val]);
            }

            my.renderHistory(cleanData);
        });
    };

    my.renderHistory = function(data) {
        var startTime = new Date().getTime() - 24*60*60*1000;
        $('#graph').highcharts({
            chart: {
                zoomType: 'x',
                height: 200
            },
            title: {text: ''},
            subtitle: {text: 'Last 24 Hours, 2 means a boot-up, 1 is a check-in'},
            xAxis: {
                type: 'datetime',
                min: startTime,
                max: new Date().getTime()
            },
            yAxis: {
                title: {
                    text: 'Uptime'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(68, 170, 213, 1)'],
                            [1, 'rgba(68, 170, 213, 0)']
                        ]
                    },
                    marker: {
                        radius: 4
                    },
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'IsOnline',
                data: data
            }],
            credits: {enabled: false},
            exporting: {enabled: false}
        });
    };

    return my;
}($));