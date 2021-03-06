/**
 * Created by recoluan on 2016/11/25.
 */
'use strict';


angular.module('lepayglobleApp')
    .controller('lePlusOrderDetailController', function ($scope, $state, $rootScope, $location, Principal, Auth, $http, Trade, $stateParams) {


        $scope.defaultId = $stateParams.mid;
        var currentPage = 1;
        var olOrderCriteria = {};
        olOrderCriteria.offset = 1;
        if($stateParams.mid!=null) {
            var merchant = {};
            merchant.id = $stateParams.mid;
            olOrderCriteria.merchant = merchant;
        }

        $('#timePicker1').daterangepicker({
                timePicker: true, //是否显示小时和分钟
                timePickerIncrement: 1, //时间的增量，单位为分钟
                opens: 'right', //日期选择框的弹出位置
                startDate: moment().format('YYYY/MM/DD HH:mm:00'),
                endDate: moment().format('YYYY/MM/DD HH:mm:59'),
                format: 'YYYY/MM/DD HH:mm:ss', //控件中from和to 显示的日期格式
                ranges: {
                    '最近1小时': [moment().subtract('hours', 1), moment()],
                    '今日': [moment().startOf('day'), moment()],
                    '昨日': [moment().subtract('days', 1).startOf('day'),
                        moment().subtract('days', 1).endOf('day')],
                    '最近7日': [moment().subtract('days', 6), moment()],
                    '最近30日': [moment().subtract('days', 29), moment()]
                },
            }, function (start, end, label) {
            });
        $("#timePicker1").val("");
        if ($stateParams.tradeDate != null && $stateParams.tradeDate != "") {
            var end = new Date($stateParams.tradeDate);

            var start = new Date($stateParams.tradeDate);
            start.setMinutes(0, 0, 0);
            start.setHours(0);
            $("#timePicker1").val(start.format("yyyy/MM/dd HH:mm:ss") + " - "
                + end.format("yyyy/MM/dd HH:mm:ss"));
            olOrderCriteria.startDate = start.format("yyyy/MM/dd HH:mm:ss");
            olOrderCriteria.endDate = end.format("yyyy/MM/dd HH:mm:ss");
            loadContent();
        } else {

            loadContent();
        }
        loadStatistic();

        function loadContent() {
            Trade.getOrderList(olOrderCriteria).then(function (results) {
                var page = results.data;
                $scope.pulls = page.content;
                $scope.page = currentPage;
                $scope.totalElements = page.totalElements;
                $scope.totalPages = page.totalPages;
            });
        }

        function loadStatistic() {
            $http.post("/api/offLineOrder/olOrderStatistic", olOrderCriteria).success(function (response) {
                if (response.status == 200) {
                    var data = response.data;
                    var totalData = data.totalData;
                    var lejiaData = data.lejiaData;
                    var commonData = data.commonData;
                    $scope.totalData = data.totalData;
                    $scope.lejiaData = data.lejiaData;
                    $scope.commonData = data.commonData;
                } else {
                    alert('加载扫码订单数据错误...');
                }
            });
        }

        $scope.loadPage = function (page) {
            if (page == 0) {
                return;
            }
            if (page > $scope.totalPages) {
                return;
            }
            if (currentPage == $scope.totalPages && page == $scope.totalPages) {
                return;
            }
            if (currentPage == 1 && page == 1) {
                return;
            }
            currentPage = page;
            olOrderCriteria.offset = page;
            loadContent();
        };

        $scope.searchByCriteria = function () {
            var orderType = $("#orderType").val();
            if(orderType != "" && orderType != null){
                olOrderCriteria.orderType = orderType;
            }else {
                olOrderCriteria.orderType =null;
            }
            olOrderCriteria.offset = 1;
            currentPage = 1;
            loadContent();
            loadStatistic();
        }

        $scope.exportExcel = function () {
            var data = "?";
            if (olOrderCriteria.startDate != null) {
                data += "startDate=" + olOrderCriteria.startDate + "&";
                data += "endDate=" + olOrderCriteria.endDate;
            }
            if (olOrderCriteria.orderSid != null) {
                data += "&orderSid=" + olOrderCriteria.orderSid;
            }
            if (olOrderCriteria.rebateWay != null) {
                data += "&rebateWay=" + olOrderCriteria.rebateWay;
            }
            location.href = "/api/offLineOrder/export" + data;
        }

        var stateArr = ['lePlusTradeRecord', 'lePlusReturnRecord'];
        $scope.currentTab0 = true;
        $scope.currentTab1 = false;
        $scope.priviousState = 0;
        $scope.currentState = 0;
        $scope.onClickTab = function (index) {
            $scope.priviousState = $scope.currentState;
            $scope.currentState = index;
            switch ($scope.priviousState) {
                case 0:
                    $scope.currentTab0 = false;
                    break;
                default:
                    $scope.currentTab1 = false;
            }
            switch ($scope.currentState) {
                case 0:
                    $scope.currentTab0 = true;
                    break;
                default:
                    $scope.currentTab1 = true;
                    break;
            }
        };
    });


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt =
            fmt.replace(RegExp.$1,
                ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468")
                    : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt =
                fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr((""
                + o[k]).length)));
        }
    }
    return fmt;
}
