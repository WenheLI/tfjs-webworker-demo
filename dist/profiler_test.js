"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("./index");
var jasmine_util_1 = require("./jasmine_util");
var profiler_1 = require("./profiler");
var TestBackendTimer = /** @class */ (function () {
    function TestBackendTimer(delayMs, queryTimeMs, extraInfo) {
        this.delayMs = delayMs;
        this.queryTimeMs = queryTimeMs;
        this.extraInfo = extraInfo;
        this.counter = 1;
    }
    TestBackendTimer.prototype.time = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var kernelMs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(_this.queryTimeMs * _this.counter++); }, _this.delayMs); })];
                    case 1:
                        kernelMs = _a.sent();
                        return [2 /*return*/, { kernelMs: kernelMs, getExtraProfileInfo: function () { return _this.extraInfo; } }];
                }
            });
        });
    };
    return TestBackendTimer;
}());
var TestLogger = /** @class */ (function (_super) {
    __extends(TestLogger, _super);
    function TestLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestLogger.prototype.logKernelProfile = function (name, result, vals, timeMs) { };
    return TestLogger;
}(profiler_1.Logger));
jasmine_util_1.describeWithFlags('profiler.Profiler', jasmine_util_1.SYNC_BACKEND_ENVS, function () {
    it('profiles simple function', function (doneFn) {
        var delayMs = 5;
        var queryTimeMs = 10;
        var extraInfo = '';
        var timer = new TestBackendTimer(delayMs, queryTimeMs, extraInfo);
        var logger = new TestLogger();
        var profiler = new profiler_1.Profiler(timer, logger);
        spyOn(timer, 'time').and.callThrough();
        spyOn(logger, 'logKernelProfile').and.callThrough();
        var timeSpy = timer.time;
        var logKernelProfileSpy = logger.logKernelProfile;
        var kernelCalled = false;
        var result = 1;
        var resultScalar = tf.scalar(result);
        profiler.profileKernel('MatMul', function () {
            kernelCalled = true;
            return resultScalar;
        });
        setTimeout(function () {
            expect(timeSpy.calls.count()).toBe(1);
            expect(logKernelProfileSpy.calls.count()).toBe(1);
            expect(logKernelProfileSpy.calls.first().args).toEqual([
                'MatMul', resultScalar, new Float32Array([result]), queryTimeMs,
                extraInfo
            ]);
            expect(kernelCalled).toBe(true);
            doneFn();
        }, delayMs * 2);
    });
    it('profiles nested kernel', function (doneFn) {
        var delayMs = 5;
        var queryTimeMs = 10;
        var extraInfo = '';
        var timer = new TestBackendTimer(delayMs, queryTimeMs, extraInfo);
        var logger = new TestLogger();
        var profiler = new profiler_1.Profiler(timer, logger);
        spyOn(timer, 'time').and.callThrough();
        spyOn(logger, 'logKernelProfile').and.callThrough();
        var timeSpy = timer.time;
        var logKernelProfileSpy = logger.logKernelProfile;
        var matmulKernelCalled = false;
        var maxKernelCalled = false;
        var result = 1;
        var resultScalar = tf.scalar(result);
        profiler.profileKernel('MatMul', function () {
            var result = profiler.profileKernel('Max', function () {
                maxKernelCalled = true;
                return resultScalar;
            });
            matmulKernelCalled = true;
            return result;
        });
        setTimeout(function () {
            expect(timeSpy.calls.count()).toBe(2);
            expect(logKernelProfileSpy.calls.count()).toBe(2);
            expect(logKernelProfileSpy.calls.first().args).toEqual([
                'Max', resultScalar, new Float32Array([result]), queryTimeMs, extraInfo
            ]);
            expect(logKernelProfileSpy.calls.argsFor(1)).toEqual([
                'MatMul', resultScalar, new Float32Array([result]), queryTimeMs * 2,
                extraInfo
            ]);
            expect(matmulKernelCalled).toBe(true);
            expect(maxKernelCalled).toBe(true);
            doneFn();
        }, delayMs * 2);
    });
});
//# sourceMappingURL=profiler_test.js.map