angular.module('lepayglobleApp')
    .controller('MemberController', function ($scope, $state, Commission, $q, $rootScope) {
                    $('#timePicker1')
                        // .val(moment().subtract('day', 1).format('YYYY/MM/DD HH:mm:00') + ' - ' + moment().format('YYYY/MM/DD HH:mm:59'))
                        .daterangepicker({
                            timePicker: true, //是否显示小时和分钟
                            timePickerIncrement: 1, //时间的增量，单位为分钟
                            opens : 'right', //日期选择框的弹出位置
                            startDate: moment().format('YYYY/MM/DD HH:mm:00'),
                            endDate: moment().format('YYYY/MM/DD HH:mm:59'),
                            format : 'YYYY/MM/DD HH:mm:ss', //控件中from和to 显示的日期格式
                            ranges : {
                                '最近1小时': [moment().subtract('hours',1), moment()],
                                '今日': [moment().startOf('day'), moment()],
                                '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
                                '最近7日': [moment().subtract('days', 6), moment()],
                                '最近30日': [moment().subtract('days', 29), moment()]
                            }
                        },function(start, end, label) {});

                    var currentPage = 1;
                    var criteria = {};
                    criteria.offset = 1;
                    getTotalPage();
                    function loadContent(){
                        Commission.getMerchantBindUserList(criteria).then(function (response) {
                            var data = response.data;
                            $scope.page = currentPage;
                            $scope.pulls =data;
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
                        criteria.offset = page;
                        loadContent();
                    };


                   function  getTotalPage(){
                       Commission.getMerchantBindUserTotalPages(criteria).then(function (response) {
                           $scope.totalPages = response.data;
                           loadContent();
                       });
                    }

                    $scope.searchByCriteria = function () {
                        var dateStr = $("#timePicker1").val();
                        if (dateStr == "" || dateStr == null) {
                            alert("请输入时间");
                            return;
                        }
                        var startDate = dateStr.split("-")[0].trim();
                        var endDate = dateStr.split("-")[1].trim();
                        criteria.startDate = startDate;
                        criteria.endDate = endDate;
                        criteria.offset = 1;
                        currentPage = 1;
                        getTotalPage()
                    }


                });




