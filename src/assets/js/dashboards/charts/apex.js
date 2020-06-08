/*! apex.js | Huro | Css ninja 2020-2021 */

"use strict";

$(document).ready(function () {

    if ($('#dashboard-chart').length) {
        var options = {
            chart: {
                width: "100%",
                height: 380,
                type: "bar"
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 1,
                colors: ["#fff"]
            },
            series: [
                {
                    data: [44, 55, 41, 64, 22, 43, 21]
                },
                {
                    data: [53, 32, 33, 52, 13, 44, 32]
                }
            ],
            xaxis: {
                categories: [
                    "Korea",
                    "Canada",
                    "Poland",
                    "Italy",
                    "France",
                    "Japan",
                    "China"
                ]
            },
            legend: {
                position: "right",
                verticalAlign: "top",
                containerMargin: {
                    left: 35,
                    right: 60
                }
            },
            responsive: [
                {
                    breakpoint: 1000,
                    options: {
                        plotOptions: {
                            bar: {
                                horizontal: false
                            }
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        };

        var chart = new ApexCharts(
            document.querySelector("#dashboard-chart"),
            options
        );

        chart.render();
    }

})