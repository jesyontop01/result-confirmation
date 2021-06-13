/*! For license information please see summernote-tr-TR.min.js.LICENSE.txt */

!function(e,a){if("object"==typeof exports&&"object"==typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var i=a();for(var r in i)("object"==typeof exports?exports:e)[r]=i[r]}}(window,(function(){return function(e){var a={};function i(r){if(a[r])return a[r].exports;var t=a[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,i),t.l=!0,t.exports}return i.m=e,i.c=a,i.d=function(e,a,r){i.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,a){if(1&a&&(e=i(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var t in e)i.d(r,t,function(a){return e[a]}.bind(null,t));return r},i.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(a,"a",a),a},i.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},i.p="",i(i.s=45)}({45:function(e,a){var i;(i=jQuery).extend(i.summernote.lang,{"tr-TR":{font:{bold:"Kalın",italic:"İtalik",underline:"Altı çizili",clear:"Temizle",height:"Satır yüksekliği",name:"Yazı Tipi",strikethrough:"Üstü çizili",subscript:"Alt Simge",superscript:"Üst Simge",size:"Yazı tipi boyutu"},image:{image:"Resim",insert:"Resim ekle",resizeFull:"Orjinal boyut",resizeHalf:"1/2 boyut",resizeQuarter:"1/4 boyut",floatLeft:"Sola hizala",floatRight:"Sağa hizala",floatNone:"Hizalamayı kaldır",shapeRounded:"Şekil: Yuvarlatılmış Köşe",shapeCircle:"Şekil: Daire",shapeThumbnail:"Şekil: K.Resim",shapeNone:"Şekil: Yok",dragImageHere:"Buraya sürükleyin",dropImage:"Resim veya metni bırakın",selectFromFiles:"Dosya seçin",maximumFileSize:"Maksimum dosya boyutu",maximumFileSizeError:"Maksimum dosya boyutu aşıldı.",url:"Resim bağlantısı",remove:"Resimi Kaldır",original:"Original"},video:{video:"Video",videoLink:"Video bağlantısı",insert:"Video ekle",url:"Video bağlantısı?",providers:"(YouTube, Vimeo, Vine, Instagram, DailyMotion veya Youku)"},link:{link:"Bağlantı",insert:"Bağlantı ekle",unlink:"Bağlantıyı kaldır",edit:"Bağlantıyı düzenle",textToDisplay:"Görüntülemek için",url:"Bağlantı adresi?",openInNewWindow:"Yeni pencerede aç"},table:{table:"Tablo",addRowAbove:"Yukarı satır ekle",addRowBelow:"Aşağı satır ekle",addColLeft:"Sola sütun ekle",addColRight:"Sağa sütun ekle",delRow:"Satırı sil",delCol:"Sütunu sil",delTable:"Tabloyu sil"},hr:{insert:"Yatay çizgi ekle"},style:{style:"Biçim",p:"p",blockquote:"Alıntı",pre:"Önbiçimli",h1:"Başlık 1",h2:"Başlık 2",h3:"Başlık 3",h4:"Başlık 4",h5:"Başlık 5",h6:"Başlık 6"},lists:{unordered:"Madde işaretli liste",ordered:"Numaralı liste"},options:{help:"Yardım",fullscreen:"Tam ekran",codeview:"HTML Kodu"},paragraph:{paragraph:"Paragraf",outdent:"Girintiyi artır",indent:"Girintiyi azalt",left:"Sola hizala",center:"Ortaya hizala",right:"Sağa hizala",justify:"Yasla"},color:{recent:"Son renk",more:"Daha fazla renk",background:"Arka plan rengi",foreground:"Yazı rengi",transparent:"Seffaflık",setTransparent:"Şeffaflığı ayarla",reset:"Sıfırla",resetToDefault:"Varsayılanlara sıfırla"},shortcut:{shortcuts:"Kısayollar",close:"Kapat",textFormatting:"Yazı biçimlendirme",action:"Eylem",paragraphFormatting:"Paragraf biçimlendirme",documentStyle:"Biçim",extraKeys:"İlave anahtarlar"},help:{insertParagraph:"Paragraf ekler",undo:"Son komudu geri alır",redo:"Son komudu yineler",tab:"Girintiyi artırır",untab:"Girintiyi azaltır",bold:"Kalın yazma stilini ayarlar",italic:"İtalik yazma stilini ayarlar",underline:"Altı çizgili yazma stilini ayarlar",strikethrough:"Üstü çizgili yazma stilini ayarlar",removeFormat:"Biçimlendirmeyi temizler",justifyLeft:"Yazıyı sola hizalar",justifyCenter:"Yazıyı ortalar",justifyRight:"Yazıyı sağa hizalar",justifyFull:"Yazıyı her iki tarafa yazlar",insertUnorderedList:"Madde işaretli liste ekler",insertOrderedList:"Numaralı liste ekler",outdent:"Aktif paragrafın girintisini azaltır",indent:"Aktif paragrafın girintisini artırır",formatPara:"Aktif bloğun biçimini paragraf (p) olarak değiştirir",formatH1:"Aktif bloğun biçimini başlık 1 (h1) olarak değiştirir",formatH2:"Aktif bloğun biçimini başlık 2 (h2) olarak değiştirir",formatH3:"Aktif bloğun biçimini başlık 3 (h3) olarak değiştirir",formatH4:"Aktif bloğun biçimini başlık 4 (h4) olarak değiştirir",formatH5:"Aktif bloğun biçimini başlık 5 (h5) olarak değiştirir",formatH6:"Aktif bloğun biçimini başlık 6 (h6) olarak değiştirir",insertHorizontalRule:"Yatay çizgi ekler","linkDialog.show":"Bağlantı ayar kutusunu gösterir"},history:{undo:"Geri al",redo:"Yinele"},specialChar:{specialChar:"ÖZEL KARAKTERLER",select:"Özel Karakterleri seçin"}}})}})}));
