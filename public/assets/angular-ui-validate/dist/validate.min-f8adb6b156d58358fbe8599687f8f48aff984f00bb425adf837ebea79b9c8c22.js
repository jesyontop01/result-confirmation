/*!
 * angular-ui-validate
 * https://github.com/angular-ui/ui-validate
 * Version: 1.2.3 - 2017-05-18T08:04:45.422Z
 * License: MIT
 */

!function(){"use strict";angular.module("ui.validate",[]).directive("uiValidate",["$$uiValidateApplyWatch","$$uiValidateApplyWatchCollection",function(a,i){return{restrict:"A",require:"ngModel",link:function(t,n,l,e){var u,c=t.$eval(l.uiValidate);c&&(angular.isString(c)&&(c={validator:c}),angular.forEach(c,function(a,i){u=function(n,l){var u=t.$eval(a,{$value:n,$modelValue:n,$viewValue:l,$name:e.$name});return angular.isObject(u)&&angular.isFunction(u.then)?(u.then(function(){e.$setValidity(i,!0)},function(){e.$setValidity(i,!1)}),!0):!!u},e.$validators[i]=u}),l.uiValidateWatch&&a(t,e,t.$eval(l.uiValidateWatch),l.uiValidateWatchObjectEquality),l.uiValidateWatchCollection&&i(t,e,t.$eval(l.uiValidateWatchCollection)))}}}]).directive("uiValidateAsync",["$$uiValidateApplyWatch","$$uiValidateApplyWatchCollection","$timeout","$q",function(a,i,t,n){return{restrict:"A",require:"ngModel",link:function(t,l,e,u){var c,r=t.$eval(e.uiValidateAsync);r&&(angular.isString(r)&&(r={validatorAsync:r}),angular.forEach(r,function(a,i){c=function(i,l){var e=t.$eval(a,{$value:i,$modelValue:i,$viewValue:l,$name:u.$name});return angular.isObject(e)&&angular.isFunction(e.then)?e:n(function(a,i){setTimeout(function(){e?a():i()},0)})},u.$asyncValidators[i]=c}),e.uiValidateWatch&&a(t,u,t.$eval(e.uiValidateWatch),e.uiValidateWatchObjectEquality),e.uiValidateWatchCollection&&i(t,u,t.$eval(e.uiValidateWatchCollection)))}}}]).service("$$uiValidateApplyWatch",function(){return function(a,i,t,n){var l=function(){i.$validate()};angular.isString(t)?a.$watch(t,l,n):angular.isArray(t)?angular.forEach(t,function(i){a.$watch(i,l,n)}):angular.isObject(t)&&angular.forEach(t,function(i){angular.isString(i)&&a.$watch(i,l,n),angular.isArray(i)&&angular.forEach(i,function(i){a.$watch(i,l,n)})})}}).service("$$uiValidateApplyWatchCollection",function(){return function(a,i,t){var n=function(){i.$validate()};angular.isString(t)?a.$watchCollection(t,n):angular.isArray(t)?angular.forEach(t,function(i){a.$watchCollection(i,n)}):angular.isObject(t)&&angular.forEach(t,function(i){angular.isString(i)&&a.$watchCollection(i,n),angular.isArray(i)&&angular.forEach(i,function(i){a.$watchCollection(i,n)})})}})}();
