$(document).ready(function() {
    makeMonitorCharts.init();
    addCustomScroll.init();
    addCustomSelect.init();
    indicatorsTree.init();
});





var makeMonitorCharts = {
    init: function() {
        if (typeof $.fn.highcharts == "function" && typeof monitorChartsData == "object") {
            this.buildData();
        }
    },
    buildData: function() {
        var i = 0,
            max = monitorChartsData.length;

        for (; i < max; i++) {
            this.renderChart(monitorChartsData[i])
        }
    },
    renderChart: function(data) {
        var _this = this;

        $("#monitor-chart-" + data.id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                width: 334,
                height: 272,
                type: 'pie'
            },
            credits: {
                enabled: false
            },
            title: {
                text: _this.makeTitle(data.data),
                floating: true,
                useHTML: true,
                style: {
                    "font-family": "ProximaNovaReg",
                    "color": "#3c5c74",
                    "font-size": "12px"
                },
                x: 0,
                y: 110
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        connectorWidth: 0,
                        distance: 7,
                        format: '{point.y}',
                        style: {
                            "font-family": "MyriadProRegular",
                            "font-size": "14px",
                            "color": "#3c5c74"
                        }
                    }
                }
            },
            series: [{
                name: 'Показатели',
                colorByPoint: true,
                size: 230,
                innerSize: '70%',
                point:{
                    events:{
                        click: function (event) {
                            event.preventDefault();
                            location.href = this.lnk;
                        }
                    }
                },
                data: data.data
            }]
        });
    },
    makeTitle: function(data) {
        var i = 0,
            max = data.length,
            sum = 0,
            n;

        for (; i < max; i++) {
            sum += data[i].y;
        }

        n = (sum + "").split("")[(sum + "").length -1];

        if ( +n > 1 && +n < 5) {
            return '<div class="monitor-chart__title">' + sum + '</div>показателя';
        } else if ( +n ==1 ) {
            return '<div class="monitor-chart__title">' + sum + '</div>показатель';
        } else {
            return '<div class="monitor-chart__title">' + sum + '</div>показателей';
        }
    }
};


var addCustomScroll = {
    addCustomScrollYX: function() {
        $('.custom-scroll_yx').mCustomScrollbar({
            axis:"yx",
            theme:"light-3",
            scrollInertia:100,
            advanced:{
                updateOnContentResize: true
            }
        });
    },
    addCustomScrollY: function() {
        $('.custom-scroll_y').mCustomScrollbar({
            axis:"y",
            theme:"light-3",
            scrollInertia:100,
            advanced:{
                updateOnContentResize: true
            }
        });
    },
    addCustomScrollX: function() {
        $('.custom-scroll_x').mCustomScrollbar({
            axis:"x",
            theme:"light-3",
            scrollInertia:100,
            advanced:{
                updateOnContentResize: true
            }
        });
    },
    init: function() {
        if ( typeof $.fn.mCustomScrollbar == 'function' ) {
            this.addCustomScrollYX();
            this.addCustomScrollX();
            this.addCustomScrollY();
        }
    }
};


var addCustomSelect = {
    render: function(options) {
        options = options || {};
        options.language = options.language || {
                "noResults": function () {
                    return "Ничего не найдено";
                }
            };
        options.minimumResultsForSearch = options.minimumResultsForSearch || "Infinity";

        $('.select2').select2(options);
    },
    init: function() {
        if ( typeof $.fn.select2 == 'function' ) {
            this.render();
        }
    }
};

var indicatorsTree = {
    init: function() {
        if ($('#indicators-tree').length) {
            this.event();
        }
    },
    event: function() {
        var $slider = $('#tree-slider'),
            $cont = $('#indicators-tree'),
            $right = $('#indicators-tree__right'),
            $items = $('.tree-list__item');

        $slider.on('click', function() {
            $cont.toggleClass('open');
            $right.toggleClass('tree_open');
        });

        $items.on('click', function() {
            $(this).parent('.has-child').toggleClass('open');
        })
    }
};