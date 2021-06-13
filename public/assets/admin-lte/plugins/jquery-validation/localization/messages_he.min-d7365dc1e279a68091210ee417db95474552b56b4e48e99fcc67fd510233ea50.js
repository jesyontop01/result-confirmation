/*! jQuery Validation Plugin - v1.19.1 - 6/15/2019
 * https://jqueryvalidation.org/
 * Copyright (c) 2019 Jörn Zaefferer; Licensed MIT */

!function(a){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate.min"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){return a.extend(a.validator.messages,{required:"השדה הזה הינו שדה חובה",remote:"נא לתקן שדה זה",email:'נא למלא כתובת דוא"ל חוקית',url:"נא למלא כתובת אינטרנט חוקית",date:"נא למלא תאריך חוקי",dateISO:"נא למלא תאריך חוקי (ISO)",number:"נא למלא מספר",digits:"נא למלא רק מספרים",creditcard:"נא למלא מספר כרטיס אשראי חוקי",equalTo:"נא למלא את אותו ערך שוב",extension:"נא למלא ערך עם סיומת חוקית",maxlength:a.validator.format(".נא לא למלא יותר מ- {0} תווים"),minlength:a.validator.format("נא למלא לפחות {0} תווים"),rangelength:a.validator.format("נא למלא ערך בין {0} ל- {1} תווים"),range:a.validator.format("נא למלא ערך בין {0} ל- {1}"),max:a.validator.format("נא למלא ערך קטן או שווה ל- {0}"),min:a.validator.format("נא למלא ערך גדול או שווה ל- {0}")}),a});
