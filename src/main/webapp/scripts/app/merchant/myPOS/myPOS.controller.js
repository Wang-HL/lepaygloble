'use strict';

angular.module('lepayglobleApp')
    .controller('myPOSController', function ($scope, $state, $location) {
        $scope.lefts = [
            {
                pic: 'left-menu-icon iconfont icon-2wodezhangdan18x20',
                name: "每日账单",
                state: "POStradeList"
            },
            {
                pic: "left-menu-icon iconfont icon-jiaoyijilu",
                name: "交易记录",
                state: "POSorderList"
            },
            {
                pic: "left-menu-icon iconfont icon-erweima01",
                name: "POS管理",
                state: "POSmanager"
            }
        ];
        if ($location.url() == "/merchant/trade") {
            $scope.currentTab = "tradeList";
        } else if ($location.url().indexOf("orderList") != -1) {
            $scope.currentTab = "orderList";
        } else if ($location.url().indexOf("withdrawList") != -1) {
            $scope.currentTab = "withdrawList";
        } else if ($location.url().indexOf("qrCode") != -1) {
            $scope.currentTab = "qrCode";
        }
        $scope.currentTab = "POStradeList";
        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.state;
            $state.go(tab.state);
        };
        $scope.isActiveTab = function (tabState) {
            return tabState == $scope.currentTab;
        };
    }).controller('SampleCtrl', function ($scope, $filter) {
        $scope.dates1 = {
            startDate: moment().subtract(1, 'day'),
            endDate: moment().subtract(1, 'day'),
            timePicker: true
        };
        $scope.ranges = {
            '今天': [moment(), moment()],
            '昨天': [moment().subtract('days', 1),
                   moment().subtract('days', 1)],
            '最近7天': [moment().subtract('days', 7), moment()],
            '最近30天': [moment().subtract('days', 30), moment()],
            '这个月': [moment().startOf('month'), moment().endOf('month')]
        };
  });
