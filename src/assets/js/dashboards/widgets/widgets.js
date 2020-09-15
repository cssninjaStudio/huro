/*! widgets.js | Huro | Css ninja 2020-2021 */

"use strict";


$(document).ready(function () {

    //Gauge Widget
    if ($('#gauge-holder').length) {

        var gaugeWidgetChart = bb.generate({
            data: {
                columns: [
                    ["data", 91.4]
                ],
                type: "gauge",
                onclick: function (d, i) {
                    console.log("onclick", d, i);
                },
                onover: function (d, i) {
                    console.log("onover", d, i);
                },
                onout: function (d, i) {
                    console.log("onout", d, i);
                }
            },
            gauge: {},
            color: {
                pattern: [
                    themeColors.accent,
                    themeColors.secondary,
                    themeColors.orange,
                    themeColors.purple,
                ],
                threshold: {
                    values: [
                        30,
                        60,
                        90,
                        100
                    ]
                }
            },
            size: {
                height: 120
            },
            padding: {
                bottom: 20
            },
            legend: {
                show: false,
                position: "inset"
            },
            bindto: "#gauge-holder"
        });

        setTimeout(function () {
            gaugeWidgetChart.load({
                columns: [["data", 10]]
            });
        }, 1000);

        setTimeout(function () {
            gaugeWidgetChart.load({
                columns: [["data", 50]]
            });
        }, 2000);

        setTimeout(function () {
            gaugeWidgetChart.load({
                columns: [["data", 70]]
            });
        }, 3000);

        setTimeout(function () {
            gaugeWidgetChart.load({
                columns: [["data", 0]]
            });
        }, 4000);

        setTimeout(function () {
            gaugeWidgetChart.load({
                columns: [["data", 100]]
            });
        }, 5000);

    }

    if ($('#apex-chart-6').length) {

        var options6 = {
            series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
            }],
            chart: {
                height: '200px',
                width: '100%',
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            colors: [themeColors.accent, themeColors.purple, themeColors.orange],
            grid: {
                show: false,
                padding: {
                    left: -20,
                    right: 0
                }
            },
            padding: {
                bottom: 0,
                left: 0,
                right: 0
            },
            legend: {
                show: false,
                position: 'top'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [2, 2, 2],
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                }
            },
            yaxis: {
                labels: {
                    show: false,
                    offsetX: -40
                }
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        };

        var chart6 = new ApexCharts(document.querySelector("#apex-chart-6"), options6);
        chart6.render();

    }

})