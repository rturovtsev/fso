$(document).ready(function() {
    addCustomScroll();
    addCustomScroll({
        el: ".indicators-content__scrolled-cont",
        theme: "dark-3",
        autoHideScrollbar: true
    });
    makeMonitorCharts.init();
    indicatorsTree.init();
    addCustomSelect.init();
    addCustomSelect.init({
        el: '.select2-scrolled',
        dropdownParent: $('.select2-scrolled').closest('.mCSB_container')
    });
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


function addCustomScroll(options) {
    if ( typeof $.fn.mCustomScrollbar != 'function' ) return;

    options = options || {};
    options.el = options.el || '.custom-scroll_y';
    options.axis = options.axis || "y";
    options.theme = options.theme || "light-3";
    options.scrollInertia = options.scrollInertia || 100;
    options.advanced = options.advanced || {
            updateOnContentResize: true
        };

    $(options.el).mCustomScrollbar(options);
}


var addCustomSelect = {
    render: function(options) {
        $(options.el).select2(options);
    },
    init: function(options) {
        if ( typeof $.fn.select2 != 'function' ) return;

        options = options || {};
        options.el = options.el || '.select2';
        options.language = options.language || {
                "noResults": function () {
                    return "Ничего не найдено";
                }
            };
        options.minimumResultsForSearch = options.minimumResultsForSearch || "Infinity";
        options.dropdownParent = options.dropdownParent || $('body');

        this.render(options);
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
            $treeList = $('#tree-list'),
            $items = $('.tree-list__item'),
            $openBtn = $('#open_all_tree'),
            $closeBtn = $('#close_all_tree'),
            $dragRail = $('#viewed-tree__rail');

        $slider.on('click', this.toggleTree.bind(this, $cont, $right, $treeList, $dragRail));
        $items.on('click', this.toggleTreeItem.bind(this, $treeList, $dragRail));
        $openBtn.on('click', this.openAllItem.bind(this, $treeList, $dragRail));
        $closeBtn.on('click', this.closeAllItem.bind(this, $treeList, $dragRail));

        this.dragAndDrop();
    },
    toggleTree: function($cont, $right, $treeList, $dragRail) {
        $cont.toggleClass('open');
        $right.toggleClass('tree_open');

        if (!$cont.hasClass('open')) {
            this.closeAllItem($treeList, $dragRail);
        }
    },
    toggleTreeItem: function($treeList, $dragRail, e) {
        e = e || window.event;

        $(e.target).parent('.has-child').toggleClass('open');
        this.chooseDragger($treeList, $dragRail);
    },
    openAllItem: function($treeList, $dragRail) {
        $treeList.find('.has-child').addClass('open');
        this.draggerOpen($dragRail);
    },
    closeAllItem: function($treeList, $dragRail) {
        $treeList.find('.has-child').removeClass('open');
        this.draggerClose($dragRail);
    },
    draggerOpen: function($dragRail) {
        $dragRail.removeClass('close').addClass('open');
    },
    draggerClose: function($dragRail) {
        $dragRail.removeClass('open').addClass('close');
    },
    draggerMiddle: function($dragRail) {
        $dragRail.removeClass('open close');
    },
    chooseDragger: function($treeList, $dragRail) {
        var items = $treeList.find('.has-child'),
            itemsOpen = $treeList.find('.has-child.open');

        if (!itemsOpen.length) {
            this.draggerClose($dragRail);
        } else if (items.length == itemsOpen.length) {
            this.draggerOpen($dragRail);
        } else {
            this.draggerMiddle($dragRail);
        }
    },
    dragAndDrop: function() {
        if (typeof Sortable != 'function') return;

        var uls = document.querySelectorAll(".tree-list ul"),
            i = 0,
            max = uls.length;

        for (; i < max; i++) {
            Sortable.create(uls[i], { group: "myGroup", animation: 150 });
        }
    }
};