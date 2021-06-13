/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */



!function(){"use strict";var e=angular.module("ui.grid.treeView",["ui.grid","ui.grid.treeBase"]);e.constant("uiGridTreeViewConstants",{featureName:"treeView",rowHeaderColName:"treeBaseRowHeaderCol",EXPANDED:"expanded",COLLAPSED:"collapsed",aggregation:{COUNT:"count",SUM:"sum",MAX:"max",MIN:"min",AVG:"avg"}}),e.service("uiGridTreeViewService",["$q","uiGridTreeViewConstants","uiGridTreeBaseConstants","uiGridTreeBaseService","gridUtil","GridRow","gridClassFactory","i18nService","uiGridConstants",function(e,i,r,n,t,o,a,s,u){var d={initializeGrid:function(e,i){n.initializeGrid(e,i),e.treeView={},e.registerRowsProcessor(d.adjustSorting,60);var r={treeView:{}},t={treeView:{}};e.api.registerEventsFromObject(r),e.api.registerMethodsFromObject(t)},defaultGridOptions:function(e){e.enableTreeView=!1!==e.enableTreeView},adjustSorting:function(e){return this.columns.forEach(function(e){e.sort&&(e.sort.ignoreSort=!0)}),e}};return d}]),e.directive("uiGridTreeView",["uiGridTreeViewConstants","uiGridTreeViewService","$templateCache",function(e,n,i){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,i,r,t){!1!==t.grid.options.enableTreeView&&n.initializeGrid(t.grid,e)},post:function(e,i,r,t){}}}}}])}();
