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

})