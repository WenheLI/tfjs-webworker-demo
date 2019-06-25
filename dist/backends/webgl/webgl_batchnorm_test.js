"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
jasmine_util_1.describeWithFlags('batchNorm', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('should work for broadcasted inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
                    mean = tf.tensor4d([1], [1, 1, 1, 1]);
                    variance = tf.tensor4d([1], [1, 1, 1, 1]);
                    result = tf.batchNorm4d(x, mean, variance);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.9995003, 2.9985011, 7.9960027, 21.9890079]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work when squarification results in zero padding', function () { return __awaiter(_this, void 0, void 0, function () {
        var maxTextureSize, x, mean, variance, offset, scale, varianceEpsilon, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    maxTextureSize = tf.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE');
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', 5);
                    x = tf.tensor3d([
                        0.49955603, 0.04158615, -1.09440524, 2.03854165, -0.61578344,
                        2.87533573, 1.18105987, 0.807462, 1.87888837, 2.26563962, -0.37040935,
                        1.35848753, -0.75347094, 0.15683117, 0.91925946, 0.34121279,
                        0.92717143, 1.89683965
                    ], [2, 3, 3]);
                    mean = tf.tensor1d([0.39745062, -0.48062894, 0.4847822]);
                    variance = tf.tensor1d([0.32375343, 0.67117643, 1.08334653]);
                    offset = tf.tensor1d([0.69398749, -1.29056387, 0.9429723]);
                    scale = tf.tensor1d([-0.5607271, 0.9878457, 0.25181573]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon);
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', maxTextureSize);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.59352049, -0.66135202, 0.5610874, -0.92077015, -1.45341019, 1.52106473,
                            -0.07704776, 0.26144429, 1.28010017, -1.14422404, -1.15776136, 1.15425493,
                            1.82644104, -0.52249442, 1.04803919, 0.74932291, 0.40568101, 1.2844412
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('batchnorm packed', backend_webgl_test_registry_1.PACKED_ENVS, function () {
    it('should not leak memory', function () {
        var x = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
        var mean = tf.tensor1d([1, 2]);
        var variance = tf.tensor1d([2, 3]);
        var varianceEpsilon = .001;
        var startNumBytes = tf.memory().numBytes;
        var startNumTensors = tf.memory().numTensors;
        tf.batchNorm4d(x, mean, variance, undefined, undefined, varianceEpsilon);
        var endNumBytes = tf.memory().numBytes;
        var endNumTensors = tf.memory().numTensors;
        expect(endNumBytes - startNumBytes).toEqual(16);
        expect(endNumTensors - startNumTensors).toEqual(1);
    });
});
//# sourceMappingURL=webgl_batchnorm_test.js.map