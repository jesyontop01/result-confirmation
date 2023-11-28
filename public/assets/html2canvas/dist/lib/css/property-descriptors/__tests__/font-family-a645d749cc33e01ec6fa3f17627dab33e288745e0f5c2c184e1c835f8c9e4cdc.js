"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var parser_1 = require("../../syntax/parser");
var font_family_1 = require("../font-family");
var fontFamilyParse = function (value) { return font_family_1.fontFamily.parse(parser_1.Parser.parseValues(value)); };
describe('property-descriptors', function () {
    describe('font-family', function () {
        it('sans-serif', function () { return assert_1.deepEqual(fontFamilyParse('sans-serif'), ['sans-serif']); });
        it('great fonts 40 library', function () {
            return assert_1.deepEqual(fontFamilyParse('great fonts 40 library'), ["'great fonts 40 library'"]);
        });
        it('preferred font, "quoted fallback font", font', function () {
            return assert_1.deepEqual(fontFamilyParse('preferred font, "quoted fallback font", font'), [
                "'preferred font'",
                "'quoted fallback font'",
                'font'
            ]);
        });
        it("'escaping test\\'s font'", function () {
            return assert_1.deepEqual(fontFamilyParse("'escaping test\\'s font'"), ["'escaping test's font'"]);
        });
    });
});
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/__tests__/font-family.js-6c4751e1315a0d2e696b21baba6c2dcaed0a3e4002a86f585e5fa3d69e08e5af.map
//!

;
