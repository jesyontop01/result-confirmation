/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */



!function(){"use strict";var e=angular.module("ui.grid.exporter",["ui.grid"]);e.constant("uiGridExporterConstants",{featureName:"exporter",rowHeaderColName:"treeBaseRowHeaderCol",selectionRowHeaderColName:"selectionRowHeaderCol",ALL:"all",VISIBLE:"visible",SELECTED:"selected",CSV_CONTENT:"CSV_CONTENT",BUTTON_LABEL:"BUTTON_LABEL",FILE_NAME:"FILE_NAME"}),e.service("uiGridExporterService",["$filter","$q","uiGridExporterConstants","gridUtil","$compile","$interval","i18nService",function(p,n,x,d,e,t,r){var o={delay:100,initializeGrid:function(r){r.exporter={},this.defaultGridOptions(r.options);var e={events:{exporter:{}},methods:{exporter:{csvExport:function(e,t){o.csvExport(r,e,t)},pdfExport:function(e,t){o.pdfExport(r,e,t)},excelExport:function(e,t){o.excelExport(r,e,t)}}}};r.api.registerEventsFromObject(e.events),r.api.registerMethodsFromObject(e.methods),r.api.core.addToGridMenu?o.addToMenu(r):t(function(){r.api.core.addToGridMenu&&o.addToMenu(r)},this.delay,1)},defaultGridOptions:function(e){e.exporterSuppressMenu=!0===e.exporterSuppressMenu,e.exporterMenuLabel=e.exporterMenuLabel?e.exporterMenuLabel:"Export",e.exporterSuppressColumns=e.exporterSuppressColumns?e.exporterSuppressColumns:[],e.exporterCsvColumnSeparator=e.exporterCsvColumnSeparator?e.exporterCsvColumnSeparator:",",e.exporterCsvFilename=e.exporterCsvFilename?e.exporterCsvFilename:"download.csv",e.exporterPdfFilename=e.exporterPdfFilename?e.exporterPdfFilename:"download.pdf",e.exporterExcelFilename=e.exporterExcelFilename?e.exporterExcelFilename:"download.xlsx",e.exporterExcelSheetName=e.exporterExcelSheetName?e.exporterExcelSheetName:"Sheet1",e.exporterOlderExcelCompatibility=!0===e.exporterOlderExcelCompatibility,e.exporterIsExcelCompatible=!0===e.exporterIsExcelCompatible,e.exporterMenuItemOrder=e.exporterMenuItemOrder?e.exporterMenuItemOrder:200,e.exporterPdfDefaultStyle=e.exporterPdfDefaultStyle?e.exporterPdfDefaultStyle:{fontSize:11},e.exporterPdfTableStyle=e.exporterPdfTableStyle?e.exporterPdfTableStyle:{margin:[0,5,0,15]},e.exporterPdfTableHeaderStyle=e.exporterPdfTableHeaderStyle?e.exporterPdfTableHeaderStyle:{bold:!0,fontSize:12,color:"black"},e.exporterPdfHeader=e.exporterPdfHeader?e.exporterPdfHeader:null,e.exporterPdfFooter=e.exporterPdfFooter?e.exporterPdfFooter:null,e.exporterPdfOrientation=e.exporterPdfOrientation?e.exporterPdfOrientation:"landscape",e.exporterPdfPageSize=e.exporterPdfPageSize?e.exporterPdfPageSize:"A4",e.exporterPdfMaxGridWidth=e.exporterPdfMaxGridWidth?e.exporterPdfMaxGridWidth:720,e.exporterMenuAllData=void 0===e.exporterMenuAllData||e.exporterMenuAllData,e.exporterMenuVisibleData=void 0===e.exporterMenuVisibleData||e.exporterMenuVisibleData,e.exporterMenuSelectedData=void 0===e.exporterMenuSelectedData||e.exporterMenuSelectedData,e.exporterMenuCsv=void 0===e.exporterMenuCsv||e.exporterMenuCsv,e.exporterMenuPdf=void 0===e.exporterMenuPdf||e.exporterMenuPdf,e.exporterMenuExcel=void 0===e.exporterMenuExcel||e.exporterMenuExcel,e.exporterPdfCustomFormatter=e.exporterPdfCustomFormatter&&"function"==typeof e.exporterPdfCustomFormatter?e.exporterPdfCustomFormatter:function(e){return e},e.exporterHeaderFilterUseName=!0===e.exporterHeaderFilterUseName,e.exporterFieldCallback=e.exporterFieldCallback?e.exporterFieldCallback:i,e.exporterFieldFormatCallback=e.exporterFieldFormatCallback?e.exporterFieldFormatCallback:function(e,t,r,o){return null},e.exporterExcelCustomFormatters=e.exporterExcelCustomFormatters?e.exporterExcelCustomFormatters:function(e,t,r){return r},e.exporterExcelHeader=e.exporterExcelHeader?e.exporterExcelHeader:function(e,t,r,o){return null},e.exporterColumnScaleFactor=e.exporterColumnScaleFactor?e.exporterColumnScaleFactor:3.5,e.exporterFieldApplyFilters=!0===e.exporterFieldApplyFilters,e.exporterAllDataFn=e.exporterAllDataFn?e.exporterAllDataFn:null,null===e.exporterAllDataFn&&e.exporterAllDataPromise&&(e.exporterAllDataFn=e.exporterAllDataPromise)},addToMenu:function(e){e.api.core.addToGridMenu(e,[{title:r.getSafeText("gridMenu.exporterAllAsCsv"),action:function(){e.api.exporter.csvExport(x.ALL,x.ALL)},shown:function(){return e.options.exporterMenuCsv&&e.options.exporterMenuAllData},order:e.options.exporterMenuItemOrder},{title:r.getSafeText("gridMenu.exporterVisibleAsCsv"),action:function(){e.api.exporter.csvExport(x.VISIBLE,x.VISIBLE)},shown:function(){return e.options.exporterMenuCsv&&e.options.exporterMenuVisibleData},order:e.options.exporterMenuItemOrder+1},{title:r.getSafeText("gridMenu.exporterSelectedAsCsv"),action:function(){e.api.exporter.csvExport(x.SELECTED,x.VISIBLE)},shown:function(){return e.options.exporterMenuCsv&&e.options.exporterMenuSelectedData&&e.api.selection&&0<e.api.selection.getSelectedRows().length},order:e.options.exporterMenuItemOrder+2},{title:r.getSafeText("gridMenu.exporterAllAsPdf"),action:function(){e.api.exporter.pdfExport(x.ALL,x.ALL)},shown:function(){return e.options.exporterMenuPdf&&e.options.exporterMenuAllData},order:e.options.exporterMenuItemOrder+3},{title:r.getSafeText("gridMenu.exporterVisibleAsPdf"),action:function(){e.api.exporter.pdfExport(x.VISIBLE,x.VISIBLE)},shown:function(){return e.options.exporterMenuPdf&&e.options.exporterMenuVisibleData},order:e.options.exporterMenuItemOrder+4},{title:r.getSafeText("gridMenu.exporterSelectedAsPdf"),action:function(){e.api.exporter.pdfExport(x.SELECTED,x.VISIBLE)},shown:function(){return e.options.exporterMenuPdf&&e.options.exporterMenuSelectedData&&e.api.selection&&0<e.api.selection.getSelectedRows().length},order:e.options.exporterMenuItemOrder+5},{title:r.getSafeText("gridMenu.exporterAllAsExcel"),action:function(){e.api.exporter.excelExport(x.ALL,x.ALL)},shown:function(){return e.options.exporterMenuExcel&&e.options.exporterMenuAllData},order:e.options.exporterMenuItemOrder+6},{title:r.getSafeText("gridMenu.exporterVisibleAsExcel"),action:function(){e.api.exporter.excelExport(x.VISIBLE,x.VISIBLE)},shown:function(){return e.options.exporterMenuExcel&&e.options.exporterMenuVisibleData},order:e.options.exporterMenuItemOrder+7},{title:r.getSafeText("gridMenu.exporterSelectedAsExcel"),action:function(){e.api.exporter.excelExport(x.SELECTED,x.VISIBLE)},shown:function(){return e.options.exporterMenuExcel&&e.options.exporterMenuSelectedData&&e.api.selection&&0<e.api.selection.getSelectedRows().length},order:e.options.exporterMenuItemOrder+8}])},csvExport:function(o,n,i){var a=this;this.loadAllDataIfNeeded(o,n,i).then(function(){var e=o.options.showHeader?a.getColumnHeaders(o,i):[],t=a.getData(o,n,i),r=a.formatAsCsv(e,t,o.options.exporterCsvColumnSeparator);a.downloadFile(o.options.exporterCsvFilename,r,o.options.exporterCsvColumnSeparator,o.options.exporterOlderExcelCompatibility,o.options.exporterIsExcelCompatible)})},loadAllDataIfNeeded:function(t,e,r){if(e===x.ALL&&t.rows.length!==t.options.totalItems&&t.options.exporterAllDataFn)return t.options.exporterAllDataFn().then(function(e){t.modifyRows(e)});var o=n.defer();return o.resolve(),o.promise},getColumnHeaders:function(r,e){var t,o=[];if(e===x.ALL)t=r.columns;else{var n=r.renderContainers.left?r.renderContainers.left.visibleColumnCache.filter(function(e){return e.visible}):[],i=r.renderContainers.body?r.renderContainers.body.visibleColumnCache.filter(function(e){return e.visible}):[],a=r.renderContainers.right?r.renderContainers.right.visibleColumnCache.filter(function(e){return e.visible}):[];t=n.concat(i,a)}return t.forEach(function(e){if(!0!==e.colDef.exporterSuppressExport&&"$$hashKey"!==e.field&&-1===r.options.exporterSuppressColumns.indexOf(e.name)){var t={name:e.field,displayName:function(e,t){if(e.options.exporterHeaderFilter)return e.options.exporterHeaderFilterUseName?e.options.exporterHeaderFilter(t.name):e.options.exporterHeaderFilter(t.displayName);return t.headerCellFilter?p(t.headerCellFilter)(t.displayName):t.displayName}(r,e),width:e.drawnWidth?e.drawnWidth:e.width,align:e.colDef.align?e.colDef.align:"number"===e.colDef.type?"right":"left"};o.push(t)}}),o},getRowsFromNode:function(e){for(var t=[],r=0;r<e.children.length;r++)if(e.children[r].children&&0===e.children[r].children.length)t.push(e.children[r]);else{var o=this.getRowsFromNode(e.children[r]);t=t.concat(o)}return t},getDataSorted:function(e){if(!e.treeBase||0===e.treeBase.numberLevels)return e.rows;for(var t=[],r=0;r<e.treeBase.tree.length;r++)for(var o=this.getRowsFromNode(e.treeBase.tree[r]),n=0;n<o.length;n++)t.push(o[n].row);return t},getData:function(a,e,l,p){var t,r,o=[];switch(e){case x.ALL:t=this.getDataSorted(a,e,l,p);break;case x.VISIBLE:t=a.getVisibleRows();break;case x.SELECTED:a.api.selection?t=a.api.selection.getSelectedGridRows():d.logError("selection feature must be enabled to allow selected rows to be exported")}if(l===x.ALL)r=a.columns;else{var n=a.renderContainers.left?a.renderContainers.left.visibleColumnCache.filter(function(e){return e.visible}):[],i=a.renderContainers.body?a.renderContainers.body.visibleColumnCache.filter(function(e){return e.visible}):[],s=a.renderContainers.right?a.renderContainers.right.visibleColumnCache.filter(function(e){return e.visible}):[];r=n.concat(i,s)}return t.forEach(function(n){if(!1!==n.exporterEnableExporting){var i=[];r.forEach(function(e){if((e.visible||l===x.ALL)&&!0!==e.colDef.exporterSuppressExport&&"$$hashKey"!==e.field&&-1===a.options.exporterSuppressColumns.indexOf(e.name)){var t=p?a.getCellDisplayValue(n,e):a.getCellValue(n,e),r={value:a.options.exporterFieldCallback(a,n,e,t)},o=a.options.exporterFieldFormatCallback(a,n,e,t);o&&Object.assign(r,o),e.colDef.exporterPdfAlign&&(r.alignment=e.colDef.exporterPdfAlign),i.push(r)}}),o.push(i)}}),o},formatAsCsv:function(e,t,r){var o=e.map(function(e){return{value:e.displayName}}),n=0<o.length?this.formatRowAsCsv(this,r)(o)+"\n":"";return n+=t.map(this.formatRowAsCsv(this,r)).join("\n")},formatRowAsCsv:function(t,r){return function(e){return e.map(t.formatFieldAsCsv).join(r)}},formatFieldAsCsv:function(e){return null==e.value?"":"number"==typeof e.value?e.value:"boolean"==typeof e.value?e.value?"TRUE":"FALSE":"string"==typeof e.value?'"'+e.value.replace(/"/g,'""')+'"':"object"!=typeof e.value||e.value instanceof Date?JSON.stringify(e.value):'"'+JSON.stringify(e.value).replace(/"/g,'""')+'"'},isIE:function(){var e=!1;return-1!==navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/)&&(e=!0),e},downloadFile:function(e,t,r,o,n){var i,a=document,l=a.createElement("a"),p="application/octet-stream;charset=utf-8",s=this.isIE();if(n&&(t="sep="+r+"\r\n"+t),navigator.msSaveBlob)return navigator.msSaveOrOpenBlob(new Blob([o?"\ufeff":"",t],{type:p}),e);if(s){var d=a.createElement("iframe");return document.body.appendChild(d),d.contentWindow.document.open("text/html","replace"),d.contentWindow.document.write(t),d.contentWindow.document.close(),d.contentWindow.focus(),d.contentWindow.document.execCommand("SaveAs",!0,e),document.body.removeChild(d),!0}if("download"in l){var u=new Blob([o?"\ufeff":"",t],{type:p});i=URL.createObjectURL(u),l.setAttribute("download",e)}else i="data: "+p+","+encodeURIComponent(t),l.setAttribute("target","_blank");l.href=i,l.setAttribute("style","display:none;"),a.body.appendChild(l),setTimeout(function(){if(l.click)l.click();else if(document.createEvent){var e=document.createEvent("MouseEvents");e.initEvent("click",!0,!0),l.dispatchEvent(e)}a.body.removeChild(l)},this.delay)},pdfExport:function(o,n,i){var a=this;this.loadAllDataIfNeeded(o,n,i).then(function(){var e=a.getColumnHeaders(o,i),t=a.getData(o,n,i),r=a.prepareAsPdf(o,e,t);a.isIE()||-1!==navigator.appVersion.indexOf("Edge")?a.downloadPDF(o.options.exporterPdfFilename,r):pdfMake.createPdf(r).open()})},downloadPDF:function(r,e){var o,n,i=document;i.createElement("a");o=this.isIE(),pdfMake.createPdf(e).getBuffer(function(e){if(n=new Blob([e]),navigator.msSaveBlob)return navigator.msSaveBlob(n,r);if(o){var t=i.createElement("iframe");return document.body.appendChild(t),t.contentWindow.document.open("text/html","replace"),t.contentWindow.document.write(n),t.contentWindow.document.close(),t.contentWindow.focus(),t.contentWindow.document.execCommand("SaveAs",!0,r),document.body.removeChild(t),!0}})},prepareAsPdf:function(e,t,r){var o=this.calculatePdfHeaderWidths(e,t),n=t.map(function(e){return{text:e.displayName,style:"tableHeader"}}),i=r.map(this.formatRowAsPdf(this)),a=[n].concat(i),l={pageOrientation:e.options.exporterPdfOrientation,pageSize:e.options.exporterPdfPageSize,content:[{style:"tableStyle",table:{headerRows:1,widths:o,body:a}}],styles:{tableStyle:e.options.exporterPdfTableStyle,tableHeader:e.options.exporterPdfTableHeaderStyle},defaultStyle:e.options.exporterPdfDefaultStyle};return e.options.exporterPdfLayout&&(l.layout=e.options.exporterPdfLayout),e.options.exporterPdfHeader&&(l.header=e.options.exporterPdfHeader),e.options.exporterPdfFooter&&(l.footer=e.options.exporterPdfFooter),e.options.exporterPdfCustomFormatter&&(l=e.options.exporterPdfCustomFormatter(l)),l},calculatePdfHeaderWidths:function(t,e){var r=0;e.forEach(function(e){"number"==typeof e.width&&(r+=e.width)});var o=0;e.forEach(function(e){if("*"===e.width&&(o+=100),"string"==typeof e.width&&e.width.match(/(\d)*%/)){var t=parseInt(e.width.match(/(\d)*%/)[0]);e.width=r*t/100,o+=e.width}});var n=r+o;return e.map(function(e){return"*"===e.width?e.width:e.width*t.options.exporterPdfMaxGridWidth/n})},formatRowAsPdf:function(t){return function(e){return e.map(t.formatFieldAsPdfString)}},formatFieldAsPdfString:function(e){var t;return t=null==e.value?"":"number"==typeof e.value?e.value.toString():"boolean"==typeof e.value?e.value?"TRUE":"FALSE":"string"==typeof e.value?e.value.replace(/"/g,'""'):e.value instanceof Date?JSON.stringify(e.value).replace(/^"/,"").replace(/"$/,""):"object"==typeof e.value?e.value:JSON.stringify(e.value).replace(/^"/,"").replace(/"$/,""),e.alignment&&"string"==typeof e.alignment&&(t={text:t,alignment:e.alignment}),t},formatAsExcel:function(e,t,r,o,n){for(var i=e.map(function(e){return{value:e.displayName}}),a=[],l=[],p=0;p<i.length;p++){var s="header";switch(e[p].align){case"center":s="headerCenter";break;case"right":s="headerRight"}var d=n.styles&&n.styles[s]?{style:n.styles[s].id}:null;l.push({value:i[p].value,metadata:d})}a.push(l);for(var u=t.map(this.formatRowAsExcel(this,r,o)),c=0;c<u.length;c++)a.push(u[c]);return a},formatRowAsExcel:function(n,i,a){return function(e){for(var t=[],r=0;r<e.length;r++){var o=n.formatFieldAsExcel(e[r],i,a);t.push({value:o,metadata:e[r].metadata})}return t}},formatFieldAsExcel:function(e,t,r,o){return null==e.value?"":"number"==typeof e.value||"string"==typeof e.value?e.value:"boolean"==typeof e.value?e.value?"TRUE":"FALSE":JSON.stringify(e.value)},prepareAsExcel:function(e,t,r){var o={styles:{}};if(e.options.exporterExcelCustomFormatters&&(o=e.options.exporterExcelCustomFormatters(e,t,o)),e.options.exporterExcelHeader)if(angular.isFunction(e.options.exporterExcelHeader))e.options.exporterExcelHeader(e,t,r,o);else{var n=e.options.exporterExcelHeader.text,i=e.options.exporterExcelHeader.style;r.data.push([{value:n,metadata:{style:o.styles[i].id}}])}return o},excelExport:function(s,d,u){var c=this;this.loadAllDataIfNeeded(s,d,u).then(function(){var e=s.options.showHeader?c.getColumnHeaders(s,u):[],t=new ExcelBuilder.Workbook,r=s.options.exporterExcelSheetName?s.options.exporterExcelSheetName:"Sheet1",o=new ExcelBuilder.Worksheet({name:r});t.addWorksheet(o);for(var n=c.prepareAsExcel(s,t,o),i=[],a=s.treeBase?s.treeBase.numberLevels:s.enableRowSelection?1:0;a<s.columns.length;a++)s.columns[a].field!==x.rowHeaderColName&&s.columns[a].field!==x.selectionRowHeaderColName&&i.push({width:s.columns[a].drawnWidth/s.options.exporterColumnScaleFactor});o.setColumns(i);var l=c.getData(s,d,u,s.options.exporterFieldApplyFilters),p=c.formatAsExcel(e,l,t,o,n);o.setData(o.data.concat(p)),ExcelBuilder.Builder.createFile(t,{type:"blob"}).then(function(e){c.downloadFile(s.options.exporterExcelFilename,e,s.options.exporterCsvColumnSeparator,s.options.exporterOlderExcelCompatibility)})})}};function i(e,t,r,o){var n,i,a,l;return r.cellFilter?(i=(n=r.cellFilter.replace(/[\'\"\s]/g,"").split(":"))[0]?n[0]:null,a=n[1]?n[1]:null,l=n[2]?n[2]:null,p(i)(o,a,l)):o}return o}]),e.directive("uiGridExporter",["uiGridExporterConstants","uiGridExporterService","gridUtil","$compile",function(e,n,t,r){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,link:function(e,t,r,o){n.initializeGrid(o.grid),o.grid.exporter.$scope=e}}}])}(),angular.module("ui.grid.exporter").run(["$templateCache",function(e){"use strict";e.put("ui-grid/csvLink",'<span class="ui-grid-exporter-csv-link-span"><a href="data:text/csv;charset=UTF-8,CSV_CONTENT" download="FILE_NAME">LINK_LABEL</a></span>')}]);
