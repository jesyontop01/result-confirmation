/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */



!function(){"use strict";var e=angular.module("ui.grid.expandable",["ui.grid"]);e.service("uiGridExpandableService",["gridUtil",function(n){var a={initializeGrid:function(o){o.expandable={},o.expandable.expandedAll=!1,o.options.enableOnDblClickExpand=!1!==o.options.enableOnDblClickExpand,o.options.enableExpandable=!1!==o.options.enableExpandable,o.options.showExpandAllButton=!1!==o.options.showExpandAllButton,o.options.expandableRowHeight=o.options.expandableRowHeight||150,o.options.expandableRowHeaderWidth=o.options.expandableRowHeaderWidth||40,o.options.enableExpandable&&!o.options.expandableRowTemplate&&(n.logError("You have not set the expandableRowTemplate, disabling expandable module"),o.options.enableExpandable=!1);var e={events:{expandable:{rowExpandedBeforeStateChanged:function(e,n,i){},rowExpandedStateChanged:function(e,n,i){},rowExpandedRendered:function(e,n,i){}}},methods:{expandable:{toggleRowExpansion:function(e,n){var i=o.getRow(e);null!==i&&a.toggleRowExpansion(o,i,n)},expandAllRows:function(){a.expandAllRows(o)},collapseAllRows:function(){a.collapseAllRows(o)},toggleAllRows:function(){a.toggleAllRows(o)},expandRow:function(e){var n=o.getRow(e);null===n||n.isExpanded||a.toggleRowExpansion(o,n)},collapseRow:function(e){var n=o.getRow(e);null!==n&&n.isExpanded&&a.toggleRowExpansion(o,n)},getExpandedRows:function(){return a.getExpandedRows(o).map(function(e){return e.entity})}}}};o.api.registerEventsFromObject(e.events),o.api.registerMethodsFromObject(e.methods)},toggleRowExpansion:function(n,i,o){n.api.expandable.raise.rowExpandedBeforeStateChanged(i),i.isExpanded=!i.isExpanded,angular.isUndefined(i.expandedRowHeight)&&(i.expandedRowHeight=n.options.expandableRowHeight),i.isExpanded?(i.height=i.grid.options.rowHeight+i.expandedRowHeight,n.expandable.expandedAll=a.getExpandedRows(n).length===n.rows.length):(i.height=i.grid.options.rowHeight,n.expandable.expandedAll=!1),n.api.expandable.raise.rowExpandedStateChanged(i,o),function e(){i.expandedRendered?n.api.expandable.raise.rowExpandedRendered(i,o):window.setTimeout(e,100)}()},expandAllRows:function(n){n.renderContainers.body.visibleRowCache.forEach(function(e){e.isExpanded||e.entity.subGridOptions&&e.entity.subGridOptions.disableRowExpandable||a.toggleRowExpansion(n,e)}),n.expandable.expandedAll=!0,n.queueGridRefresh()},collapseAllRows:function(n){n.renderContainers.body.visibleRowCache.forEach(function(e){e.isExpanded&&a.toggleRowExpansion(n,e)}),n.expandable.expandedAll=!1,n.queueGridRefresh()},toggleAllRows:function(e){e.expandable.expandedAll?a.collapseAllRows(e):a.expandAllRows(e)},getExpandedRows:function(e){return e.rows.filter(function(e){return e.isExpanded})}};return a}]),e.directive("uiGridExpandable",["uiGridExpandableService","$templateCache",function(d,l){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,n,i,o){if(d.initializeGrid(o.grid),o.grid.options.enableExpandable&&!1!==o.grid.options.enableExpandableRowHeader){var a={name:"expandableButtons",displayName:"",exporterSuppressExport:!0,enableColumnResizing:!1,enableColumnMenu:!1,width:o.grid.options.expandableRowHeaderWidth||30};a.cellTemplate=l.get("ui-grid/expandableRowHeader"),a.headerCellTemplate=l.get("ui-grid/expandableTopRowHeader"),o.grid.addRowHeaderColumn(a,-90)}},post:function(e,n,i,o){}}}}}]),e.directive("uiGrid",function(){return{replace:!0,priority:599,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,n,i,o){o.grid.api.core.on.renderingComplete(e,function(){e.row&&e.row.grid&&e.row.grid.options&&e.row.grid.options.enableExpandable&&(o.grid.parentRow=e.row)})},post:function(e,n,i,o){}}}}}),e.directive("uiGridExpandableRow",["uiGridExpandableService","$compile","uiGridConstants","gridUtil",function(e,l,n,i){return{replace:!1,priority:0,scope:!1,compile:function(){return{pre:function(a,d){i.getTemplate(a.grid.options.expandableRowTemplate).then(function(e){if(a.grid.options.expandableRowScope){var n=a.grid.options.expandableRowScope;for(var i in n)n.hasOwnProperty(i)&&(a[i]=n[i])}var o=angular.element(e);o=l(o)(a),d.append(o),a.row.element=d,a.row.expandedRendered=!0})},post:function(e,n){e.row.element=n,e.$on("$destroy",function(){e.row.expandedRendered=!1})}}}}}]),e.directive("uiGridRow",function(){return{priority:-200,scope:!1,compile:function(){return{pre:function(n,e){n.grid.options.enableExpandable&&(n.expandableRow={},n.expandableRow.shouldRenderExpand=function(){return"body"===n.colContainer.name&&!1!==n.grid.options.enableExpandable&&n.row.isExpanded&&(!n.grid.isScrollingVertically||n.row.expandedRendered)},n.expandableRow.shouldRenderFiller=function(){return n.row.isExpanded&&("body"!==n.colContainer.name||n.grid.isScrollingVertically&&!n.row.expandedRendered)},n.grid.options.enableOnDblClickExpand&&e.on("dblclick",function(e){n.grid.api.expandable.toggleRowExpansion(n.row.entity,e)}))},post:function(e,n,i,o){}}}}}),e.directive("uiGridViewport",["$compile","gridUtil","$templateCache",function(e,n,a){return{priority:-200,scope:!1,compile:function(e){var n=angular.element(e.children().children()[0]),i=a.get("ui-grid/expandableScrollFiller"),o=a.get("ui-grid/expandableRow");return n.append(o),n.append(i),{pre:function(e,n,i,o){},post:function(e,n,i,o){}}}}}])}(),angular.module("ui.grid.expandable").run(["$templateCache",function(e){"use strict";e.put("ui-grid/expandableRow",'<div ui-grid-expandable-row ng-if="expandableRow.shouldRenderExpand()" class="expandableRow" style="float:left; margin-top: 1px; margin-bottom: 1px" ng-style="{width: (grid.renderContainers.body.getCanvasWidth()) + \'px\', height: row.expandedRowHeight + \'px\'}"></div>'),e.put("ui-grid/expandableRowHeader",'<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><i class="clickable" ng-if="!(row.groupHeader==true || row.entity.subGridOptions.disableRowExpandable)" ng-class="{ \'ui-grid-icon-plus-squared\' : !row.isExpanded, \'ui-grid-icon-minus-squared\' : row.isExpanded }" ng-click="grid.api.expandable.toggleRowExpansion(row.entity, $event)"></i></div></div>'),e.put("ui-grid/expandableScrollFiller","<div ng-if=\"expandableRow.shouldRenderFiller()\" ng-class=\"{scrollFiller: true, scrollFillerClass:(colContainer.name === 'body')}\" ng-style=\"{ width: (grid.getViewportWidth()) + 'px', height: row.expandedRowHeight + 2 + 'px', 'margin-left': grid.options.rowHeader.rowHeaderWidth + 'px' }\">&nbsp;</div>"),e.put("ui-grid/expandableTopRowHeader",'<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><span class="ui-grid-cell-empty" ng-if="!grid.options.showExpandAllButton"></span> <button type="button" class="ui-grid-icon-button clickable" ng-if="grid.options.showExpandAllButton" ng-class="{ \'ui-grid-icon-plus-squared\' : !grid.expandable.expandedAll, \'ui-grid-icon-minus-squared\' : grid.expandable.expandedAll }" ng-click="grid.api.expandable.toggleAllRows()"></button></div></div>')}]);