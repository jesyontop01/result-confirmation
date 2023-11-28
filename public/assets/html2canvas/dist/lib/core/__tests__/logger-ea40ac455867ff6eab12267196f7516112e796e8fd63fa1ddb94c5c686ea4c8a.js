"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../logger");
describe('logger', function () {
    var infoSpy;
    beforeEach(function () {
        infoSpy = jest.spyOn(console, 'info').mockImplementation(function () { });
    });
    afterEach(function () {
        infoSpy.mockRestore();
    });
    it('should call console.info when logger enabled', function () {
        var id = Math.random().toString();
        var logger = new logger_1.Logger({ id: id, enabled: true });
        logger.info('testing');
        expect(infoSpy).toHaveBeenLastCalledWith(id, expect.stringMatching(/\d+ms/), 'testing');
    });
    it("shouldn't call console.info when logger disabled", function () {
        var id = Math.random().toString();
        var logger = new logger_1.Logger({ id: id, enabled: false });
        logger.info('testing');
        expect(infoSpy).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=/assets/html2canvas/dist/lib/core/__tests__/logger.js-6804b25691447e6e58c465ac04eba0c5aeceea56e0e8641d7261e754ba2cf90f.map
//!

;
