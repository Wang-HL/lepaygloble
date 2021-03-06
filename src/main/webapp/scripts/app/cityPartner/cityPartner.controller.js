 /**
 * Created by recoluan on 2016/11/16.
 */
 'use strict';


angular.module('lepayglobleApp')
    .controller('cityPartnerController', function ($scope, $state, $rootScope, $location,Principal,Auth,$http) {
        //  MENU
        $scope.menuList=[
            {
                contentState:"1",
                clickState:"1",
                name:"首页",
                state:"cp-homePage",
                icon:"iconfont2 icon2-shouye"
            },
            {
                contentState:"0",
            },
            {
                contentState:"1",
                clickState:"0",
                name:"我的合伙人",
                state:"",
                icon:"iconfont2 icon2-wodehehuoren"
            },
            {
                contentState:"1",
                clickState:"1",
                name:"合伙人管理",
                state:"cp-partnerManage",
                icon:""
            },
            {
                contentState:"0",
            },
            {
                contentState:"1",
                clickState:"0",
                name:"我的佣金",
                state:"",
                icon:"iconfont2 icon2-wodeyongjin"
            },
            {
                contentState:"1",
                clickState:"1",
                name:"佣金明细",
                state:"cp-commissionDetail",
                icon:""
            },
            {
                contentState:"1",
                clickState:"1",
                name:"提现记录",
                state:"cp-withdrawRecord",
                icon:""
            },
            {
                contentState:"0",
            },
            {
                contentState:"1",
                clickState:"0",
                name:"账号设置",
                state:"",
                icon:"iconfont2 icon2-zhanghaoshezhi"
            },
            {
                contentState:"1",
                clickState:"1",
                name:"基本信息",
                state:"cp-basicInfo",
                icon:""
            },
            {
                contentState:"0",
            }
        ]
        $scope.currentTab=$scope.menuList[0].state;
        $scope.onClickTab=function (tab) {
            if(tab.state!=''){
                $scope.currentTab=tab.state;
                $state.go(tab.state);
            }

        }
        $scope.isActiveTab=function (tab) {
            return tab==$scope.currentTab;
        }
        $scope.logout = function () {
            Auth.logout();
            $state.go('home')
        }
        $http.get('api/partnerManager/wallet').success(function (response) {
            $scope.partnerName = response.data.partnerManager.name;
            $scope.partneraccount = response.data.partnerManager.name;
        });
    })
