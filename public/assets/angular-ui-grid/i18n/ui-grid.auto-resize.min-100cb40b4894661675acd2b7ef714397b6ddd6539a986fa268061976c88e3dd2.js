/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */



!function(){"use strict";angular.module("ui.grid.autoResize",["ui.grid"]).directive("uiGridAutoResize",["gridUtil",function(n){return{require:"uiGrid",scope:!1,link:function(i,r,e,u){var t;t=n.debounce(function(i,e,t,n){null!==r[0].offsetParent&&(u.grid.gridWidth=t,u.grid.gridHeight=n,u.grid.queueGridRefresh().then(function(){u.grid.api.core.raise.gridDimensionChanged(e,i,n,t)}))},400),i.$watchCollection(function(){return{width:n.elementWidth(r),height:n.elementHeight(r)}},function(i,e){angular.equals(i,e)||t(e.width,e.height,i.width,i.height)})}}}])}();
