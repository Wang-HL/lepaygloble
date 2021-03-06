angular.module('lepayglobleApp')
    .controller('OverViewController', function ($scope, $state, Commission, $http) {

                    Commission.getMerchantCommissionDetail().then(function (response) {
                        var data = response.data;
                        $scope.withdrawTotalPrice=toDecimal(data.withdrawTotalPrice*0.01);
                        $scope.available = toDecimal(data.available*0.01);
                        $scope.totalCommission = toDecimal(data.totalCommission*0.01);
                        $scope.userLimit = data.userLimit;
                        $scope.currentBind = data.currentBind;
                        if (data.currentBind == 0 && data.totalCommission == 0) {
                            $scope.per = 0;
                        } else {

                            $scope.per = toDecimal(data.totalCommission / data.currentBind);
                        }
                        var percent = data.currentBind / data.userLimit * 100;
                        $(".sjgl .progress-bar").css({width: "" + percent + "%"});
                        //强制保留两位小数
                        function toDecimal(x) {
                            var f = parseFloat(x);
                            if (isNaN(f)) {
                                return false;
                            }
                            var f = Math.round(x*100)/100;
                            var s = f.toString();
                            var rs = s.indexOf('.');
                            if (rs < 0) {
                                rs = s.length;
                                s += '.';
                            }
                            while (s.length <= rs + 2) {
                                s += '0';
                            }
                            return s;
                        }
                    });

                    Commission.getDayCommissionDetail().then(function (response) {
                        var data = response.data;
                        $scope.dayCommission = data.dayCommission / 100;
                        $scope.count = data.count;
                        $scope.shareCount = data.shareCount;
                    });

                    $http.get('api/merchant').success(function (response) {
                        $scope.payee = response.data.payee;
                        var bankNumber = response.data.merchantBank.bankNumber;
                        $scope.bank =
                        bankNumber.substring(bankNumber.length - 4, bankNumber.length);
                    });

                    $scope.tx = function () {
                        var withdrawTotalPrice=$scope.withdrawTotalPrice;
                        var available= $scope.available;
                        if(available-withdrawTotalPrice>=200){
                            $("#tx").modal("toggle");
                        }
                    }
                    Commission.getOnLineCommissionIncome().then(function (response) {
                        var data = response.data;
                        $scope.dOneDaySum = data.dOneDaySum;
                        $scope.onLinePer = data.onLinePer;
                        $scope.oneDayCount = data.oneDayCount;
                        $scope.totalCount = data.totalCount;
                    });


                    //  提现功能
                    $scope.withDraw=function() {
                        var amount = $("#inputPassword1").val();
                        if(amount<200) {
                            return;
                        }
                        var data = 'amount='
                            + encodeURIComponent($("#inputPassword1").val().trim());
                        $http.post('/withdraw/merchant_withdraw', data, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).success(function (response) {
                            if(response.status==400){
                                alert("服务繁忙,请稍后尝试!");
                            }else{
                                alert("提现申请成功 !");
                                $("#inputPassword1").val('');
                                $scope.tx();
                                Commission.getMerchantCommissionDetail().then(function (response) {
                                    var data = response.data;
                                    $scope.withdrawTotalPrice=toDecimal(data.withdrawTotalPrice*0.01);
                                    $scope.available = toDecimal(data.available*0.01);
                                    $scope.totalCommission = toDecimal(data.totalCommission*0.01);
                                    $scope.userLimit = data.userLimit;
                                    $scope.currentBind = data.currentBind;
                                    if (data.currentBind == 0 && data.totalCommission == 0) {
                                        $scope.per = 0;
                                    } else {

                                        $scope.per = toDecimal(data.totalCommission / data.currentBind);
                                    }
                                    var percent = data.currentBind / data.userLimit * 100;
                                    $(".sjgl .progress-bar").css({width: "" + percent + "%"});
                                    //强制保留两位小数
                                    function toDecimal(x) {
                                        var f = parseFloat(x);
                                        if (isNaN(f)) {
                                            return false;
                                        }
                                        var f = Math.round(x*100)/100;
                                        var s = f.toString();
                                        var rs = s.indexOf('.');
                                        if (rs < 0) {
                                            rs = s.length;
                                            s += '.';
                                        }
                                        while (s.length <= rs + 2) {
                                            s += '0';
                                        }
                                        return s;
                                    }
                                });

                            }
                        })
                    };
                });




