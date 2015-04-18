/*
Plugin Name: amCharts Responsive
Description: This plugin add responsive functionality to JavaScript Charts and Maps.
Author: Martynas Majeris, amCharts
Version: 1.0
Author URI: http://www.amcharts.com/

Copyright 2015 amCharts

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Please note that the above license covers only this plugin. It by all means does
not apply to any other amCharts products that are covered by different licenses.
*/

AmCharts.addInitHandler(function(chart) {

    if (chart.responsive === undefined || chart.responsive.ready || chart.responsive.enabled !== true)
        return;

    var version = chart.version.split('.');
    if ((Number(version[0]) < 3) || (Number(version[0]) === 3 && (Number(version[1]) < 13)))
        return;

    // a short variable for easy reference
    var r = chart.responsive;

    r.ready = true;
    r.currentRules = {};
    r.overridden = [];

    // defaults per chart type
    var defaults = {

        /**
		 * AmPie
		 */
        'pie': [

            /**
			 * Disable legend in certain cases
			 */
            {
                "maxWidth": 550,
                "legendPosition": "left",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 550,
                "legendPosition": "right",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 150,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 350,
                "legendPosition": "top",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 350,
                "legendPosition": "bottom",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 150,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },

            /**
			 * Narrow chart
			 */
            {
                "maxWidth": 400,
                "overrides": {
                    "labelsEnabled": false
                }
            },
            {
                "maxWidth": 100,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },

            /**
			 * Short chart
			 */
            {
                "maxHeight": 350,
                "overrides": {
                    "pullOutRadius": 0
                }
            },
            {
                "maxHeight": 200,
                "overrides": {
                    "titles": {
                        "enabled": false
                    },
                    "labelsEnabled": false
                }
            },

            /**
			 * Supersmall
			 */
            {
                "maxWidth": 60,
                "overrides": {
                    "autoMargins": false,
                    "marginTop": 0,
                    "marginBottom": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "radius": "50%",
                    "innerRadius": 0,
                    "balloon": {
                        "enabled": false
                    },
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 60,
                "overrides": {
                    "marginTop": 0,
                    "marginBottom": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "radius": "50%",
                    "innerRadius": 0,
                    "balloon": {
                        "enabled": false
                    },
                    "legend": {
                        "enabled": false
                    }
                }
            }
        ],

        /**
		 * AmFunnel
		 */

        'funnel': [
            {
                "maxWidth": 550,
                "legendPosition": "left",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 550,
                "legendPosition": "right",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 150,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 500,
                "legendPosition": "top",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 500,
                "legendPosition": "bottom",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 150,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 400,
                "overrides": {
                    "labelsEnabled": false,
                    "marginLeft": 10,
                    "marginRight": 10,
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 350,
                "overrides": {
                    "pullOutRadius": 0,
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 300,
                "overrides": {
                    "titles": {
                        "enabled": false
                    }
                }
            }
        ],

        /**
		 * AmRadar
		 */

        "radar": [
            {
                "maxWidth": 550,
                "legendPosition": "left",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 550,
                "legendPosition": "right",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 150,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 350,
                "legendPosition": "top",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 350,
                "legendPosition": "bottom",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 150,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 300,
                "overrides": {
                    "labelsEnabled": false
                }
            },
            {
                "maxWidth": 200,
                "overrides": {
                    "autoMargins": false,
                    "marginTop": 0,
                    "marginBottom": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "radius": "50%",
                    "titles": {
                        "enabled": false
                    },
                    "valueAxes": {
                        "labelsEnabled": false,
                        "radarCategoriesEnabled": false
                    }
                }
            },
            {
                "maxHeight": 300,
                "overrides": {
                    "labelsEnabled": false
                }
            },
            {
                "maxHeight": 200,
                "overrides": {
                    "autoMargins": false,
                    "marginTop": 0,
                    "marginBottom": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "radius": "50%",
                    "titles": {
                        "enabled": false
                    },
                    "valueAxes": {
                        "radarCategoriesEnabled": false
                    }
                }
            },
            {
                "maxHeight": 100,
                "overrides": {
                    "valueAxes": {
                        "labelsEnabled": false
                    }
                }
            }
        ],

        /**
		 * AmGauge
		 */

        'gauge': [
            {
                "maxWidth": 550,
                "legendPosition": "left",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 550,
                "legendPosition": "right",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 150,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 500,
                "legendPosition": "top",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 500,
                "legendPosition": "bottom",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 150,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 200,
                "overrides": {
                    "titles": {
                        "enabled": false
                    },
                    "allLabels": {
                        "enabled": false
                    },
                    "axes": {
                        "labelsEnabled": false
                    }
                }
            },
            {
                "maxHeight": 200,
                "overrides": {
                    "titles": {
                        "enabled": false
                    },
                    "allLabels": {
                        "enabled": false
                    },
                    "axes": {
                        "labelsEnabled": false
                    }
                }
            }
        ],

        /**
		 * AmSerial
		 */
        "serial": [

            /**
			 * Disable legend in certain cases
			 */
            {
                "maxWidth": 550,
                "legendPosition": "left",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 550,
                "legendPosition": "right",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 100,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 350,
                "legendPosition": "top",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 350,
                "legendPosition": "bottom",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 100,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },


            /**
			 * Narrow chart
			 */
            {
                "maxWidth": 350,
                "overrides": {
                    "autoMarginOffset": 0,
                    "graphs": {
                        "hideBulletsCount": 10
                    }
                }
            },
            {
                "maxWidth": 350,
                "rotate": false,
                "overrides": {
                    "marginLeft": 10,
                    "marginRight": 10,
                    "valueAxes": {
                        "ignoreAxisWidth": true,
                        "inside": true,
                        "title": "",
                        "showFirstLabel": false,
                        "showLastLabel": false
                    },
                    "graphs": {
                        "bullet": "none"
                    }
                }
            },
            {
                "maxWidth": 350,
                "rotate": true,
                "overrides": {
                    "marginLeft": 10,
                    "marginRight": 10,
                    "categoryAxis": {
                        "ignoreAxisWidth": true,
                        "inside": true,
                        "title": ""
                    }
                }
            },
            {
                "maxWidth": 200,
                "rotate": false,
                "overrides": {
                    "marginLeft": 10,
                    "marginRight": 10,
                    "marginTop": 10,
                    "marginBottom": 10,
                    "categoryAxis": {
                        "ignoreAxisWidth": true,
                        "labelsEnabled": false,
                        "inside": true,
                        "title": "",
                        "guides": {
                            "inside": true
                        }
                    },
                    "valueAxes": {
                        "ignoreAxisWidth": true,
                        "labelsEnabled": false,
                        "axisAlpha": 0,
                        "guides": {
                            "label": ""
                        }
                    },
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 200,
                "rotate": true,
                "overrides": {
                    "chartScrollbar": {
                        "scrollbarHeight": 4,
                        "graph": "",
                        "resizeEnabled": false
                    },
                    "categoryAxis": {
                        "labelsEnabled": false,
                        "axisAlpha": 0,
                        "guides": {
                            "label": ""
                        }
                    },
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 100,
                "rotate": false,
                "overrides": {
                    "valueAxes": {
                        "gridAlpha": 0
                    }
                }
            },
            {
                "maxWidth": 100,
                "rotate": true,
                "overrides": {
                    "categoryAxis": {
                        "gridAlpha": 0
                    }
                }
            },

            /**
			 * Short chart
			 */
            {
                "maxHeight": 300,
                "overrides": {
                    "autoMarginOffset": 0,
                    "graphs": {
                        "hideBulletsCount": 10
                    }
                }
            },
            {
                "maxHeight": 200,
                "rotate": false,
                "overrides": {
                    "marginTop": 10,
                    "marginBottom": 10,
                    "categoryAxis": {
                        "ignoreAxisWidth": true,
                        "inside": true,
                        "title": "",
                        "showFirstLabel": false,
                        "showLastLabel": false
                    }
                }
            },
            {
                "maxHeight": 200,
                "rotate": true,
                "overrides": {
                    "marginTop": 10,
                    "marginBottom": 10,
                    "valueAxes": {
                        "ignoreAxisWidth": true,
                        "inside": true,
                        "title": "",
                        "showFirstLabel": false,
                        "showLastLabel": false
                    },
                    "graphs": {
                        "bullet": "none"
                    }
                }
            },
            {
                "maxHeight": 150,
                "rotate": false,
                "overrides": {
                    "titles": {
                        "enabled": false
                    },
                    "chartScrollbar": {
                        "scrollbarHeight": 4,
                        "graph": "",
                        "resizeEnabled": false
                    },
                    "categoryAxis": {
                        "labelsEnabled": false,
                        "ignoreAxisWidth": true,
                        "axisAlpha": 0,
                        "guides": {
                            "label": ""
                        }
                    }
                }
            },
            {
                "maxHeight": 150,
                "rotate": true,
                "overrides": {
                    "titles": {
                        "enabled": false
                    },
                    "valueAxes": {
                        "labelsEnabled": false,
                        "ignoreAxisWidth": true,
                        "axisAlpha": 0,
                        "guides": {
                            "label": ""
                        }
                    }
                }
            },
            {
                "maxHeight": 100,
                "rotate": false,
                "overrides": {
                    "valueAxes": {
                        "labelsEnabled": false,
                        "ignoreAxisWidth": true,
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "guides": {
                            "label": ""
                        }
                    }
                }
            },
            {
                "maxHeight": 100,
                "rotate": true,
                "overrides": {
                    "categoryAxis": {
                        "labelsEnabled": false,
                        "ignoreAxisWidth": true,
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "guides": {
                            "label": ""
                        }
                    }
                }
            },

            /**
			 * Really small charts: microcharts and sparklines
			 */
            {
                "maxWidth": 100,
                "overrides": {
                    "autoMargins": false,
                    "marginTop": 0,
                    "marginBottom": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "categoryAxis": {
                        "labelsEnabled": false
                    },
                    "valueAxes": {
                        "labelsEnabled": false
                    }
                }
            },
            {
                "maxHeight": 100,
                "overrides": {
                    "autoMargins": false,
                    "marginTop": 0,
                    "marginBottom": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "categoryAxis": {
                        "labelsEnabled": false
                    },
                    "valueAxes": {
                        "labelsEnabled": false
                    }
                }
            }
        ],

        /**
		 * AmXY
		 */
        "xy": [

            /**
			 * Disable legend in certain cases
			 */
            {
                "maxWidth": 550,
                "legendPosition": "left",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 550,
                "legendPosition": "right",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 100,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 350,
                "legendPosition": "top",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 350,
                "legendPosition": "bottom",
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxHeight": 100,
                "overrides": {
                    "legend": {
                        "enabled": false
                    }
                }
            },

            /**
			 * Narrow chart
			 */
            {
                "maxWidth": 250,
                "overrides": {
                    "autoMarginOffset": 0,
                    "autoMargins": false,
                    "marginTop": 0,
                    "marginBottom": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "valueAxes": {
                        "inside": true,
                        "title": "",
                        "showFirstLabel": false,
                        "showLastLabel": false
                    },
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 150,
                "overrides": {
                    "valueyAxes": {
                        "labelsEnabled": false,
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "guides": {
                            "label": ""
                        }
                    }
                }
            },

            /**
			 * Short chart
			 */
            {
                "maxHeight": 250,
                "overrides": {
                    "autoMarginOffset": 0,
                    "autoMargins": false,
                    "marginTop": 0,
                    "marginBottom": 0,
                    "marginLeft": 0,
                    "marginRight": 0,
                    "valueAxes": {
                        "inside": true,
                        "title": "",
                        "showFirstLabel": false,
                        "showLastLabel": false
                    },
                    "legend": {
                        "enabled": false
                    }
                }
            },
            {
                "maxWidth": 150,
                "overrides": {
                    "valueyAxes": {
                        "labelsEnabled": false,
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "guides": {
                            "label": ""
                        }
                    }
                }
            }
        ],

        /**
		 * AmStock
		 */

        'stock': [
            {
                "maxWidth": 500,
                "overrides": {
                    "dataSetSelector": {
                        "position": "top"
                    },
                    "periodSelector": {
                        "position": "bottom"
                    }
                }
            },
            {
                "maxWidth": 400,
                "overrides": {
                    "dataSetSelector": {
                        "selectText": "",
                        "compareText": ""
                    },
                    "periodSelector": {
                        "periodsText": "",
                        "inputFieldsEnabled": false
                    }
                }
            }
        ],

        /**
		 * AmMap
		 */

        'map': [
            {
                "maxWidth": 200,
                "overrides": {
                    "zoomControl": {
                        "zoomControlEnabled": false
                    },
                    "smallMap": {
                        "enabled": false
                    },
                    "valueLegend": {
                        "enabled": false
                    },
                    "dataProvider": {
                        "areas": {
                            "descriptionWindowWidth": 160,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        },
                        "images": {
                            "descriptionWindowWidth": 160,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        },
                        "lines": {
                            "descriptionWindowWidth": 160,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        }
                    }
                }
            },
            {
                "maxWidth": 150,
                "overrides": {
                    "dataProvider": {
                        "areas": {
                            "descriptionWindowWidth": 110,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        },
                        "images": {
                            "descriptionWindowWidth": 110,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        },
                        "lines": {
                            "descriptionWindowWidth": 110,
                            "descriptionWindowLeft": 10,
                            "descriptionWindowRight": 10
                        }
                    }
                }
            },
            {
                "maxHeight": 200,
                "overrides": {
                    "zoomControl": {
                        "zoomControlEnabled": false
                    },
                    "smallMap": {
                        "enabled": false
                    },
                    "valueLegend": {
                        "enabled": false
                    },
                    "dataProvider": {
                        "areas": {
                            "descriptionWindowHeight": 160,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        },
                        "images": {
                            "descriptionWindowHeight": 160,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        },
                        "lines": {
                            "descriptionWindowHeight": 160,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        }
                    }
                }
            },
            {
                "maxHeight": 150,
                "overrides": {
                    "dataProvider": {
                        "areas": {
                            "descriptionWindowHeight": 110,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        },
                        "images": {
                            "descriptionWindowHeight": 110,
                            "descriptionWindowRight": 10,
                            "descriptionWindowTop": 10
                        },
                        "lines": {
                            "descriptionWindowHeight": 110,
                            "descriptionWindowLeft": 10,
                            "descriptionWindowRight": 10
                        }
                    }
                }
            }
        ]
    };

    var findArrayObjectById = function (arr, id) {
        if (arr instanceof Array) {
            for (var x in arr) {
                if (typeof arr[x] === 'object' && arr[x].id === id)
                    return arr[x];
            }
        }
        return false;
    }

    var isArray = function (obj) {
        return obj instanceof Array;
    }

    var isObject = function (obj) {
        return typeof (obj) === 'object';
    }

    var setOriginalProperty = function (object, property, value) {
        if (object['_r_' + property] === undefined)
            object['_r_' + property] = value;

        r.overridden.push({ object: object, property: property });
    }

    var restoreOriginalProperty = function (object, property) {
        object[property] = object['_r_' + property];
    }

    var restoreOriginals = function () {
        var override;
        while (override = r.overridden.pop()) {
            if (override.object['_r_' + override.property] === '_r_none')
                delete override.object[override.property];
            else
                override.object[override.property] = override.object['_r_' + override.property];
        }
    }

    var redrawChart = function () {
        chart.dataChanged = true;
        if (chart.type !== 'xy') {
            chart.marginsUpdated = false;
        }
        chart.zoomOutOnDataUpdate = false;
        chart.validateNow(true);
        restoreOriginalProperty(chart, 'zoomOutOnDataUpdate');
    }

    var applyConfig = function (original, override) {
        for (var key in override) {
            var originalValue = original[key];
            var overrideValue = override[key];

            if (originalValue === undefined) {
                original[key] = overrideValue;
                setOriginalProperty(original, key, '_r_none');
            } else if (isArray(originalValue)) {
                // special case - apply overrides selectively

                // an array of primitive values
                if (originalValue.length && !isObject(originalValue[0])) {
                    setOriginalProperty(original, key, originalValue);
                    original[key] = overrideValue;
                }

                // an array of objects
                else if (isArray(overrideValue)) {
                    for (var x in overrideValue) {
                        var overrideArrValue = overrideValue[x];
                        var originalArrValue = undefined;

                        if (overrideArrValue.id === undefined && originalValue[x] !== undefined)
                            originalArrValue = originalValue[x];
                        else if (overrideArrValue.id !== undefined)
                            originalArrValue = findArrayObjectById(originalValue, overrideArrValue.id);

                        if (originalArrValue) {
                            applyConfig(originalArrValue, overrideArrValue);
                        }
                    }
                }

                // override all array objects with the same values form a single override object
                else if (isObject(overrideValue)) {
                    for (var x in originalValue) {
                        applyConfig(originalValue[x], overrideValue);
                    }
                }
                //if the original property is an array but the override property is a primitive, ignore it
            } else if (isObject(originalValue)) {
                applyConfig(originalValue, overrideValue);
            } else {
                setOriginalProperty(original, key, originalValue);
                original[key] = overrideValue;
            }
        }
    }

    var checkRules = function () {

        var width = chart.divRealWidth;
        var height = chart.divRealHeight;

        // get current rules
        var rulesChanged = false;
        for (var x in r.rules) {
            var rule = r.rules[x];

            var ruleMatches =
                (rule.minWidth === undefined || (rule.minWidth <= width)) && (rule.maxWidth === undefined || (rule.maxWidth >= width)) &&
                (rule.minHeight === undefined || (rule.minHeight <= height)) && (rule.maxHeight === undefined || (rule.maxHeight >= height)) &&
                (rule.rotate === undefined || (rule.rotate === true && chart.rotate === true) || (rule.rotate === false && (chart.rotate === undefined || chart.rotate === false))) &&
                (rule.legendPosition === undefined || (chart.legend !== undefined && chart.legend.position !== undefined && chart.legend.position === rule.legendPosition));
            
            if (ruleMatches) {
                if (r.currentRules[x] === undefined) {
                    r.currentRules[x] = true;
                    rulesChanged = true;
                }
            } else {
                if (r.currentRules[x] !== undefined) {
                    r.currentRules[x] = undefined;
                    rulesChanged = true;
                }
            }
        }

        if (!rulesChanged)
            return;

        restoreOriginals();

        for (var x in r.currentRules) {
            if (r.currentRules[x] !== undefined)
                applyConfig(chart, r.rules[x].overrides);
        }

        // TODO - re-apply zooms/slices as necessary
        redrawChart();
    }

    defaults['gantt'] = defaults['serial'];

    if (r.rules === undefined || r.rules.length === 0 || !isArray(r.rules)) {
        r.rules = defaults[chart.type];
    }
    else if (r.addDefaultRules !== false) {
        r.rules = defaults[chart.type].concat(r.rules);
    }

    setOriginalProperty(chart, 'zoomOutOnDataUpdate', chart.zoomOutOnDataUpdate);

    chart.addListener('resized', checkRules);
    chart.addListener('init', checkRules);

}, ['pie', 'serial', 'xy', 'funnel', 'radar', 'gauge', 'gantt', 'stock', 'map']);