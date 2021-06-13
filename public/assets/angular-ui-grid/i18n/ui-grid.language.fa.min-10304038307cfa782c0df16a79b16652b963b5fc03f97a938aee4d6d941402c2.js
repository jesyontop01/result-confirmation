/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */



angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("fa",{aggregate:{label:"قلم"},groupPanel:{description:"عنوان یک ستون را بگیر و به گروهی از آن ستون رها کن."},search:{placeholder:"جستجو...",showingItems:"نمایش اقلام:",selectedItems:"قلم‌های انتخاب شده:",totalItems:"مجموع اقلام:",size:"اندازه‌ی صفحه:",first:"اولین صفحه",next:"صفحه‌ی‌بعدی",previous:"صفحه‌ی‌ قبلی",last:"آخرین صفحه"},menu:{text:"ستون‌های انتخابی:"},sort:{ascending:"ترتیب صعودی",descending:"ترتیب نزولی",remove:"حذف مرتب کردن"},column:{hide:"پنهان‌کردن ستون"},aggregation:{count:"تعداد: ",sum:"مجموع: ",avg:"میانگین: ",min:"کمترین: ",max:"بیشترین: "},pinning:{pinLeft:"پین کردن سمت چپ",pinRight:"پین کردن سمت راست",unpin:"حذف پین"},gridMenu:{columns:"ستون‌ها:",importerTitle:"وارد کردن فایل",exporterAllAsCsv:"خروجی تمام داده‌ها در فایل csv",exporterVisibleAsCsv:"خروجی داده‌های قابل مشاهده در فایل csv",exporterSelectedAsCsv:"خروجی داده‌های انتخاب‌شده در فایل csv",exporterAllAsPdf:"خروجی تمام داده‌ها در فایل pdf",exporterVisibleAsPdf:"خروجی داده‌های قابل مشاهده در فایل pdf",exporterSelectedAsPdf:"خروجی داده‌های انتخاب‌شده در فایل pdf",clearAllFilters:"پاک کردن تمام فیلتر"},importer:{noHeaders:"نام ستون قابل استخراج نیست. آیا فایل عنوان دارد؟",noObjects:"اشیا قابل استخراج نیستند. آیا به جز عنوان‌ها در فایل داده وجود دارد؟",invalidCsv:"فایل قابل پردازش نیست. آیا فرمت  csv  معتبر است؟",invalidJson:"فایل قابل پردازش نیست. آیا فرمت json   معتبر است؟",jsonNotArray:"فایل json وارد شده باید حاوی آرایه باشد. عملیات ساقط شد."},pagination:{sizes:"اقلام در هر صفحه",totalItems:"اقلام",of:"از"},grouping:{group:"گروه‌بندی",ungroup:"حذف گروه‌بندی",aggregate_count:"Agg: تعداد",aggregate_sum:"Agg: جمع",aggregate_max:"Agg: بیشینه",aggregate_min:"Agg: کمینه",aggregate_avg:"Agg: میانگین",aggregate_remove:"Agg: حذف"}}),e}])}]);
