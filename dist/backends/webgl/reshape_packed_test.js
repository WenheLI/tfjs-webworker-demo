"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("../../index");
var jasmine_util_1 = require("../../jasmine_util");
var test_util_1 = require("../../test_util");
var backend_webgl_test_registry_1 = require("./backend_webgl_test_registry");
jasmine_util_1.describeWithFlags('expensive reshape', backend_webgl_test_registry_1.PACKED_ENVS, function () {
    var cValues = [46, 52, 58, 64, 70, 100, 115, 130, 145, 160, 154, 178, 202, 226, 250];
    var c;
    beforeEach(function () {
        var a = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        var b = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [3, 5]);
        c = tf.matMul(a, b);
    });
    it('6d --> 1d', function () { return __awaiter(_this, void 0, void 0, function () {
        var cAs6D, cAs1D, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cAs6D = tf.reshape(c, [1, 1, 1, 3, 1, 5]);
                    cAs1D = tf.reshape(cAs6D, [-1, cValues.length]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cAs1D.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), cValues]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1d --> 2d', function () { return __awaiter(_this, void 0, void 0, function () {
        var cAs1D, cAs2D, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cAs1D = tf.reshape(c, [cValues.length]);
                    cAs2D = tf.reshape(cAs1D, [5, -1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cAs2D.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), cValues]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2d --> 3d', function () { return __awaiter(_this, void 0, void 0, function () {
        var cAs3D, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cAs3D = tf.reshape(c, [3, 1, 5]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cAs3D.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), cValues]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3d --> 4d', function () { return __awaiter(_this, void 0, void 0, function () {
        var cAs3D, cAs4D, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cAs3D = tf.reshape(c, [3, 1, 5]);
                    cAs4D = tf.reshape(cAs3D, [3, 5, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cAs4D.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), cValues]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4d --> 5d', function () { return __awaiter(_this, void 0, void 0, function () {
        var cAs4D, cAs5D, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cAs4D = tf.reshape(c, [3, 5, 1, 1]);
                    cAs5D = tf.reshape(cAs4D, [1, 1, 1, 5, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cAs5D.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), cValues]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('5d --> 6d', function () { return __awaiter(_this, void 0, void 0, function () {
        var cAs5D, cAs6D, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cAs5D = tf.reshape(c, [1, 1, 1, 5, 3]);
                    cAs6D = tf.reshape(cAs5D, [3, 5, 1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cAs6D.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), cValues]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('expensive reshape with even columns', backend_webgl_test_registry_1.PACKED_ENVS, function () {
    it('2 --> 4 columns', function () { return __awaiter(_this, void 0, void 0, function () {
        var maxTextureSize, values, a, b, c, cAs4D, webglPackFlagSaved, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    maxTextureSize = tf.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE');
                    values = new Array(16).fill(0);
                    values = values.map(function (d, i) { return i + 1; });
                    a = tf.tensor2d(values, [8, 2]);
                    b = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', 2);
                    c = tf.matMul(a, b);
                    cAs4D = c.reshape([2, 1, 2, 4]);
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', maxTextureSize);
                    webglPackFlagSaved = tf.ENV.getBool('WEBGL_PACK');
                    tf.ENV.set('WEBGL_PACK', false);
                    cAs4D = cAs4D.add(1);
                    cAs4D = cAs4D.add(-1);
                    tf.ENV.set('WEBGL_PACK', webglPackFlagSaved);
                    result = [7, 10, 15, 22, 23, 34, 31, 46, 39, 58, 47, 70, 55, 82, 63, 94];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cAs4D.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), result]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=reshape_packed_test.js.map