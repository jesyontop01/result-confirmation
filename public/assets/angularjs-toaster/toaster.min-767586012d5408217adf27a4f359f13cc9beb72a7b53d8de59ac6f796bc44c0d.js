/*
    * @license
    * AngularJS Toaster
    * Version: 3.0.0
    *
    * Copyright 2013-2019 Jiri Kavulak, Stabzs.
    * All Rights Reserved.
    * Use, reproduction, distribution, and modification of this code is subject to the terms and
    * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
    *
    * Authors: Jiri Kavulak, Stabzs
    * Related to project of John Papa, Hans Fjällemark and Nguyễn Thiện Hùng (thienhung1989)
*/

!function(t,e){"use strict";angular.module("toaster",[]).constant("toasterConfig",{limit:0,"tap-to-dismiss":!0,"close-button":!1,"close-html":'<button class="toast-close-button" type="button">&times;</button>',"newest-on-top":!0,"time-out":5e3,"icon-classes":{error:"toast-error",info:"toast-info",wait:"toast-wait",success:"toast-success",warning:"toast-warning"},"body-output-type":"","body-template":"toasterBodyTmpl.html","icon-class":"toast-info","position-class":"toast-top-right","title-class":"toast-title","message-class":"toast-message","prevent-duplicates":!1,"mouseover-timer-stop":!0}).run(["$templateCache",function(t){t.put("angularjs-toaster/toast.html",'<div id="toast-container" ng-class="[config.position, config.animation]"><div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click($event, toaster)" ng-mouseover="stopTimer(toaster)" ng-mouseout="restartTimer(toaster)"><div ng-if="toaster.showCloseButton" ng-click="click($event, toaster, true)" ng-bind-html="toaster.closeHtml"></div><div ng-class="config.title">{{toaster.title}}</div><div ng-class="config.message" ng-switch on="toaster.bodyOutputType"><div ng-switch-when="html" ng-bind-html="toaster.body"></div><div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div><div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="templateWithData"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="directive"><div directive-template directive-name="{{toaster.html}}" directive-data="toaster.directiveData"></div></div><div ng-switch-default >{{toaster.body}}</div></div></div></div>')}]).service("toaster",["$rootScope","toasterConfig",function(d,t){var m={newGuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})}};for(var e in this.pop=function(t,e,o,s,a,i,n,r,c,l){if(angular.isObject(t)){var u=t;this.toast={type:u.type,title:u.title,body:u.body,timeout:u.timeout,bodyOutputType:u.bodyOutputType,clickHandler:u.clickHandler,showCloseButton:u.showCloseButton,closeHtml:u.closeHtml,toastId:u.toastId,onShowCallback:u.onShowCallback,onHideCallback:u.onHideCallback,directiveData:u.directiveData,tapToDismiss:u.tapToDismiss},n=u.toasterId}else this.toast={type:t,title:e,body:o,timeout:s,bodyOutputType:a,clickHandler:i,showCloseButton:r,toastId:c,onHideCallback:l};return this.toast.toastId&&this.toast.toastId.length||(this.toast.toastId=m.newGuid()),d.$emit("toaster-newToast",n,this.toast.toastId),{toasterId:n,toastId:this.toast.toastId}},this.clear=function(t,e){angular.isObject(t)?d.$emit("toaster-clearToasts",t.toasterId,t.toastId):d.$emit("toaster-clearToasts",t,e)},t["icon-classes"])this[e]=o(e);function o(l){return function(t,e,o,s,a,i,n,r,c){return angular.isString(t)?this.pop(l,t,e,o,s,a,i,n,r,c):this.pop(angular.extend(t,{type:l}))}}}]).factory("toasterEventRegistry",["$rootScope",function(t){var e,o=null,s=null,i=[],n=[];return{setup:(e={setup:function(){o||(o=t.$on("toaster-newToast",function(t,e,o){for(var s=0,a=i.length;s<a;s++)i[s](t,e,o)})),s||(s=t.$on("toaster-clearToasts",function(t,e,o){for(var s=0,a=n.length;s<a;s++)n[s](t,e,o)}))},subscribeToNewToastEvent:function(t){i.push(t)},subscribeToClearToastsEvent:function(t){n.push(t)},unsubscribeToNewToastEvent:function(t){var e=i.indexOf(t);0<=e&&i.splice(e,1),0===i.length&&(o(),o=null)},unsubscribeToClearToastsEvent:function(t){var e=n.indexOf(t);0<=e&&n.splice(e,1),0===n.length&&(s(),s=null)}}).setup,subscribeToNewToastEvent:e.subscribeToNewToastEvent,subscribeToClearToastsEvent:e.subscribeToClearToastsEvent,unsubscribeToNewToastEvent:e.unsubscribeToNewToastEvent,unsubscribeToClearToastsEvent:e.unsubscribeToClearToastsEvent}}]).directive("directiveTemplate",["$compile","$injector",function(r,c){return{restrict:"A",scope:{directiveName:"@directiveName",directiveData:"=directiveData"},replace:!0,link:function(a,i,n){a.$watch("directiveName",function(e){if(angular.isUndefined(e)||e.length<=0)throw new Error("A valid directive name must be provided via the toast body argument when using bodyOutputType: directive");var t;try{t=c.get(n.$normalize(e)+"Directive")}catch(t){throw new Error(e+" could not be found. The name should appear as it exists in the markup, not camelCased as it would appear in the directive declaration, e.g. directive-name not directiveName.")}var o=t[0];if(!0!==o.scope&&o.scope)throw new Error("Cannot use a directive with an isolated scope. The scope must be either true or falsy (e.g. false/null/undefined). Occurred for directive "+e+".");if(o.restrict.indexOf("A")<0)throw new Error('Directives must be usable as attributes. Add "A" to the restrict option (or remove the option entirely). Occurred for directive '+e+".");a.directiveData&&(a.directiveData=angular.fromJson(a.directiveData));var s=r("<div "+e+"></div>")(a);i.append(s)})}}}]).directive("toasterContainer",["$parse","$rootScope","$interval","$sce","toasterConfig","toaster","toasterEventRegistry",function(d,t,i,m,o,a,n){return{replace:!0,restrict:"EA",scope:!0,link:function(c,t,e){var l;function u(t){var e=c.toasters[t];e.timeoutPromise&&i.cancel(e.timeoutPromise),c.toasters.splice(t,1),angular.isFunction(e.onHideCallback)&&e.onHideCallback(e)}function s(t){return angular.isUndefined(t)||null===t}l=angular.extend({},o,c.$eval(e.toasterOptions)),c.config={toasterId:l["toaster-id"],position:l["position-class"],title:l["title-class"],message:l["message-class"],tap:l["tap-to-dismiss"],closeButton:l["close-button"],closeHtml:l["close-html"],animation:l["animation-class"],mouseoverTimer:l["mouseover-timer-stop"]},c.$on("$destroy",function(){n.unsubscribeToNewToastEvent(c._onNewToast),n.unsubscribeToClearToastsEvent(c._onClearToasts)}),c.configureTimer=function(t){var e,o,s=angular.isNumber(t.timeout)?t.timeout:l["time-out"];"object"==typeof s&&(s=s[t.type]),0<s&&(o=s,(e=t).timeoutPromise=i(function(){c.removeToast(e.toastId)},o,1))},c.removeToast=function(t){var e,o;for(e=0,o=c.toasters.length;e<o;e++)if(c.toasters[e].toastId===t){u(e);break}},c.toasters=[],c._onNewToast=function(t,e,o){(s(c.config.toasterId)&&s(e)||!s(c.config.toasterId)&&!s(e)&&c.config.toasterId==e)&&function(t,e){if(t.type=l["icon-classes"][t.type],t.type||(t.type=l["icon-class"]),!0===l["prevent-duplicates"]&&c.toasters.length){if(c.toasters[c.toasters.length-1].body===t.body)return;var o,s,a=!1;for(o=0,s=c.toasters.length;o<s;o++)if(c.toasters[o].toastId===e){a=!0;break}if(a)return}var i=l["close-button"];if("boolean"==typeof t.showCloseButton);else if("boolean"==typeof i)t.showCloseButton=i;else if("object"==typeof i){var n=i[t.type];null!=n&&(t.showCloseButton=n)}else t.showCloseButton=!1;switch(t.showCloseButton&&(t.closeHtml=m.trustAsHtml(t.closeHtml||c.config.closeHtml)),t.bodyOutputType=t.bodyOutputType||l["body-output-type"],t.bodyOutputType){case"trustedHtml":t.html=m.trustAsHtml(t.body);break;case"template":t.bodyTemplate=t.body||l["body-template"];break;case"templateWithData":var r=d(t.body||l["body-template"])(c);t.bodyTemplate=r.template,t.data=r.data;break;case"directive":t.html=t.body}c.configureTimer(t),!0===l["newest-on-top"]?(c.toasters.unshift(t),0<l.limit&&c.toasters.length>l.limit&&u(c.toasters.length-1)):(c.toasters.push(t),0<l.limit&&c.toasters.length>l.limit&&u(0)),angular.isFunction(t.onShowCallback)&&t.onShowCallback(t)}(a.toast,o)},c._onClearToasts=function(t,e,o){("*"==e||s(c.config.toasterId)&&s(e)||!s(c.config.toasterId)&&!s(e)&&c.config.toasterId==e)&&function(t){for(var e=c.toasters.length-1;0<=e;e--)s(t)?u(e):c.toasters[e].toastId==t&&u(e)}(o)},n.setup(),n.subscribeToNewToastEvent(c._onNewToast),n.subscribeToClearToastsEvent(c._onClearToasts)},controller:["$scope","$element","$attrs",function(a,t,e){a.stopTimer=function(t){!0===a.config.mouseoverTimer&&t.timeoutPromise&&(i.cancel(t.timeoutPromise),t.timeoutPromise=null)},a.restartTimer=function(t){!0===a.config.mouseoverTimer?t.timeoutPromise||a.configureTimer(t):null===t.timeoutPromise&&a.removeToast(t.toastId)},a.click=function(t,e,o){if(t.stopPropagation(),!0===("boolean"==typeof e.tapToDismiss?e.tapToDismiss:a.config.tap)||!0===e.showCloseButton&&!0===o){var s=!0;e.clickHandler&&(angular.isFunction(e.clickHandler)?s=e.clickHandler(e,o):angular.isFunction(a.$parent.$eval(e.clickHandler))?s=a.$parent.$eval(e.clickHandler)(e,o):console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.")),s&&a.removeToast(e.toastId)}}}],templateUrl:"angularjs-toaster/toast.html"}}])}(window,document);
