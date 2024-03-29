"use strict";
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('depthwiseConv2D', jasmine_util_1.ALL_ENVS, function () {
    it('input=1x3x3x1,f=2,s=1,d=1,p=valid,chMul=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    w = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    result = tf.depthwiseConv2d(x, w, stride, pad);
                    expect(result.shape).toEqual([1, 2, 2, 1]);
                    expected = [1.07022, 1.03167, 0.67041, 0.778863];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x5x5x1,f=3,s=1,d=1,p=valid,chMul=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 3;
                    pad = 'valid';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.149194, 0.089009, 0.654891, 0.083324, 0.537043, 0.644331, 0.563037,
                        0.211859, 0.633501, 0.186427, 0.777034, 0.50001, 0.607341, 0.95303,
                        0.696479, 0.050387, 0.62045, 0.728049, 0.028043, 0.437009, 0.712881,
                        0.741935, 0.974474, 0.621102, 0.171411
                    ], [1, 5, 5, inDepth]);
                    w = tf.tensor4d([
                        0.125386, 0.975199, 0.640437, 0.281895, 0.990968, 0.347208, 0.889702,
                        0.180695, 0.691992
                    ], [fSize, fSize, inDepth, chMul]);
                    result = tf.depthwiseConv2d(x, w, stride, pad);
                    expect(result.shape).toEqual([1, 3, 3, 1]);
                    expected = [
                        2.540022, 2.505885, 2.454062, 2.351701, 2.459601, 3.076421, 3.29848,
                        3.437421, 2.93419
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x3x3x1,f=2,s=1,d=2,p=valid,chMul=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, dilation, chMul, inDepth, x, w, fSizeDilated, wDilated, result, expectedResult, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = 1;
                    dilation = 2;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    w = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    fSizeDilated = fSize + (fSize - 1) * (dilation - 1);
                    wDilated = tf.tensor4d([0.303873, 0, 0.229223, 0, 0, 0, 0.144333, 0, 0.803373], [fSizeDilated, fSizeDilated, inDepth, chMul]);
                    result = tf.depthwiseConv2d(x, w, stride, pad, 'NHWC', dilation);
                    expectedResult = tf.depthwiseConv2d(x, wDilated, stride, pad);
                    expect(result.shape).toEqual(expectedResult.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expectedResult.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x5x5x1,f=3,s=1,d=2,p=valid,chMul=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, dilation, chMul, inDepth, x, w, fSizeDilated, wDilated, result, expectedResult, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fSize = 3;
                    pad = 'valid';
                    stride = 1;
                    dilation = 2;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.149194, 0.089009, 0.654891, 0.083324, 0.537043, 0.644331, 0.563037,
                        0.211859, 0.633501, 0.186427, 0.777034, 0.50001, 0.607341, 0.95303,
                        0.696479, 0.050387, 0.62045, 0.728049, 0.028043, 0.437009, 0.712881,
                        0.741935, 0.974474, 0.621102, 0.171411
                    ], [1, 5, 5, inDepth]);
                    w = tf.tensor4d([
                        0.125386, 0.975199, 0.640437, 0.281895, 0.990968, 0.347208, 0.889702,
                        0.180695, 0.691992
                    ], [fSize, fSize, inDepth, chMul]);
                    fSizeDilated = fSize + (fSize - 1) * (dilation - 1);
                    wDilated = tf.tensor4d([
                        0.125386, 0, 0.975199, 0, 0.640437, 0, 0, 0, 0, 0,
                        0.281895, 0, 0.990968, 0, 0.347208, 0, 0, 0, 0, 0,
                        0.889702, 0, 0.180695, 0, 0.691992
                    ], [fSizeDilated, fSizeDilated, inDepth, chMul]);
                    result = tf.depthwiseConv2d(x, w, stride, pad, 'NHWC', dilation);
                    expectedResult = tf.depthwiseConv2d(x, wDilated, stride, pad);
                    expect(result.shape).toEqual(expectedResult.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expectedResult.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x3x3x2,f=2,s=1,d=1,p=same,chMul=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'same';
                    stride = 1;
                    chMul = 1;
                    inDepth = 2;
                    x = tf.tensor4d([
                        0.111057, 0.661818, 0.701979, 0.424362, 0.992854, 0.417599, 0.423036,
                        0.500499, 0.368484, 0.714135, 0.456693, 0.531058, 0.636636, 0.345024,
                        0.0506303, 0.789682, 0.177473, 0.793569
                    ], [1, 3, 3, inDepth]);
                    w = tf.tensor4d([
                        0.614293, 0.0648011, 0.101113, 0.452887, 0.0582746, 0.426481,
                        0.872743, 0.765767
                    ], [fSize, fSize, inDepth, chMul]);
                    result = tf.depthwiseConv2d(x, w, stride, pad);
                    expect(result.shape).toEqual([1, 3, 3, 2]);
                    expected = [
                        0.485445, 0.995389, 0.95166, 0.927856, 0.636516, 0.253547, 0.378414,
                        1.10771, 0.430373, 1.23126, 0.290885, 0.372855, 0.3962, 0.379995,
                        0.0490466, 0.410569, 0.10902, 0.0514242
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x5x5x1,f=3,s=1,d=1,p=same,chMul=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 3;
                    pad = 'same';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.149194, 0.089009, 0.654891, 0.083324, 0.537043, 0.644331, 0.563037,
                        0.211859, 0.633501, 0.186427, 0.777034, 0.50001, 0.607341, 0.95303,
                        0.696479, 0.050387, 0.62045, 0.728049, 0.028043, 0.437009, 0.712881,
                        0.741935, 0.974474, 0.621102, 0.171411
                    ], [1, 5, 5, inDepth]);
                    w = tf.tensor4d([
                        0.125386, 0.975199, 0.640437, 0.281895, 0.990968, 0.347208, 0.889702,
                        0.180695, 0.691992
                    ], [fSize, fSize, inDepth, chMul]);
                    result = tf.depthwiseConv2d(x, w, stride, pad);
                    // result.print();
                    expect(result.shape).toEqual([1, 5, 5, 1]);
                    expected = [
                        0.684796, 1.179251, 1.680593, 0.885615, 1.152995, 1.52291, 2.540022,
                        2.505885, 2.454062, 1.871258, 2.371015, 2.351701, 2.459601, 3.076421,
                        1.323994, 1.985572, 3.29848, 3.437421, 2.93419, 1.823238, 1.410545,
                        2.352186, 2.19622, 1.348218, 0.774635
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x3x3x2,f=2,s=1,d=2,p=same,chMul=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, dilation, inDepth, x, w, fSizeDilated, wDilated, result, expectedResult, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fSize = 2;
                    pad = 'same';
                    stride = 1;
                    dilation = 2;
                    inDepth = 2;
                    x = tf.tensor4d([
                        0.111057, 0.661818, 0.701979, 0.424362, 0.992854, 0.417599, 0.423036,
                        0.500499, 0.368484, 0.714135, 0.456693, 0.531058, 0.636636, 0.345024,
                        0.0506303, 0.789682, 0.177473, 0.793569
                    ], [1, 3, 3, inDepth]);
                    w = tf.stack([
                        tf.tensor2d([0.614293, 0.0648011, 0.101113, 0.452887], [fSize, fSize]),
                        tf.tensor2d([0.0582746, 0.426481, 0.872743, 0.765767], [fSize, fSize])
                    ], 2)
                        .expandDims(3);
                    fSizeDilated = fSize + (fSize - 1) * (dilation - 1);
                    wDilated = tf.stack([
                        tf.tensor2d([0.614293, 0, 0.0648011, 0, 0, 0, 0.101113, 0, 0.452887], [fSizeDilated, fSizeDilated]),
                        tf.tensor2d([0.0582746, 0, 0.426481, 0, 0, 0, 0.872743, 0, 0.765767], [fSizeDilated, fSizeDilated])
                    ], 2)
                        .expandDims(3);
                    expect(wDilated.shape).toEqual([fSizeDilated, fSizeDilated, inDepth, 1]);
                    result = tf.depthwiseConv2d(x, w, stride, pad, 'NHWC', dilation);
                    expectedResult = tf.depthwiseConv2d(x, wDilated, stride, pad);
                    expect(result.shape).toEqual(expectedResult.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expectedResult.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x5x5x1,f=3,s=1,d=2,p=same,chMul=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 3;
                    pad = 'valid';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.149194, 0.089009, 0.654891, 0.083324, 0.537043, 0.644331, 0.563037,
                        0.211859, 0.633501, 0.186427, 0.777034, 0.50001, 0.607341, 0.95303,
                        0.696479, 0.050387, 0.62045, 0.728049, 0.028043, 0.437009, 0.712881,
                        0.741935, 0.974474, 0.621102, 0.171411
                    ], [1, 5, 5, inDepth]);
                    w = tf.tensor4d([
                        0.125386, 0.975199, 0.640437, 0.281895, 0.990968, 0.347208, 0.889702,
                        0.180695, 0.691992
                    ], [fSize, fSize, inDepth, chMul]);
                    result = tf.depthwiseConv2d(x, w, stride, pad);
                    expect(result.shape).toEqual([1, 3, 3, 1]);
                    expected = [
                        2.540022, 2.505885, 2.454062, 2.351701, 2.459601, 3.076421, 3.29848,
                        3.437421, 2.93419
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x3x3x2,f=2,s=1,p=same,chMul=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'same';
                    stride = 1;
                    chMul = 2;
                    inDepth = 2;
                    x = tf.tensor4d([
                        0.675707, 0.758567, 0.413529, 0.963967, 0.217291, 0.101335, 0.804231,
                        0.329673, 0.924503, 0.728742, 0.180217, 0.210459, 0.133869, 0.650827,
                        0.047613, 0.554795, 0.653365, 0.442196
                    ], [1, 3, 3, inDepth]);
                    w = tf.tensor4d([
                        0.347154, 0.386692, 0.327191, 0.483784, 0.591807, 0.24263, 0.95182,
                        0.174353, 0.592136, 0.623469, 0.988244, 0.660731, 0.946534, 0.0801365,
                        0.864889, 0.874602
                    ], [fSize, fSize, inDepth, chMul]);
                    result = tf.depthwiseConv2d(x, w, stride, pad);
                    expect(result.shape).toEqual([1, 3, 3, 4]);
                    expected = [
                        1.83059, 0.937125, 2.1218, 1.39024, 0.990167, 0.803472,
                        1.31405, 1.14959, 0.182147, 0.196385, 0.241141, 0.188081,
                        0.950656, 0.622581, 1.92451, 1.20179, 1.07422, 0.483268,
                        1.36948, 1.14256, 0.449444, 0.477042, 0.505857, 0.393989,
                        0.0746509, 0.0633184, 0.74101, 0.41159, 0.403195, 0.176938,
                        0.602415, 0.345499, 0.226819, 0.252651, 0.144682, 0.213927
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=2x3x3x2,f=2,s=1,p=same,chMul=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'same';
                    stride = 1;
                    chMul = 2;
                    inDepth = 2;
                    x = tf.tensor4d([
                        0.261945, 0.0528113, 0.656698, 0.127345, 0.610039, 0.169131,
                        0.458647, 0.0988288, 0.966109, 0.0421747, 0.82035, 0.274711,
                        0.359377, 0.512113, 0.689682, 0.941571, 0.31961, 0.743826,
                        0.858147, 0.984766, 0.926973, 0.579597, 0.444104, 0.505969,
                        0.241437, 0.937999, 0.0957074, 0.773611, 0.46023, 0.469379,
                        0.363789, 0.269745, 0.486136, 0.894215, 0.794299, 0.724615
                    ], [2, 3, 3, inDepth]);
                    w = tf.tensor4d([
                        0.240347, 0.906352, 0.478657, 0.825918, 0.380769, 0.184705, 0.238241,
                        0.201907, 0.294087, 0.181165, 0.191303, 0.7225, 0.430064, 0.900622,
                        0.670338, 0.33478
                    ], [fSize, fSize, inDepth, chMul]);
                    result = tf.depthwiseConv2d(x, w, stride, pad);
                    expect(result.shape).toEqual([2, 3, 3, 4]);
                    expected = [
                        0.863379, 1.3119, 0.102795, 0.154853, 1.02704, 1.62173, 0.293466,
                        0.261764, 0.387876, 0.701529, 0.133508, 0.338167, 0.880395, 1.28039,
                        0.786492, 0.775361, 0.884845, 1.43995, 0.764374, 1.0196, 0.291162,
                        0.801428, 0.273788, 0.764303, 0.348985, 0.45311, 0.469447, 0.613073,
                        0.287461, 0.684128, 0.627899, 0.927844, 0.0768174, 0.28968, 0.356037,
                        0.614339, 0.67138, 1.07894, 1.30747, 1.86705, 0.617971, 1.35402,
                        0.860607, 1.29693, 0.242087, 0.485892, 0.331979, 0.757015, 0.410527,
                        0.740235, 1.28431, 1.42516, 0.68281, 0.975185, 1.13892, 1.62237,
                        0.344208, 0.561029, 0.363292, 0.911203, 0.272541, 0.419513, 0.342154,
                        0.403335, 0.419286, 0.587321, 0.600655, 0.884853, 0.190907, 0.719914,
                        0.346842, 0.598472
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=2x3x3x2,f=2,s=1,d=2,p=same,chMul=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, inDepth, dilation, noDilation, x, w, fSizeDilated, wDilated, result, expectedResult, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fSize = 2;
                    pad = 'same';
                    stride = 1;
                    inDepth = 2;
                    dilation = 2;
                    noDilation = 1;
                    x = tf.tensor4d([
                        0.261945, 0.0528113, 0.656698, 0.127345, 0.610039, 0.169131,
                        0.458647, 0.0988288, 0.966109, 0.0421747, 0.82035, 0.274711,
                        0.359377, 0.512113, 0.689682, 0.941571, 0.31961, 0.743826,
                        0.858147, 0.984766, 0.926973, 0.579597, 0.444104, 0.505969,
                        0.241437, 0.937999, 0.0957074, 0.773611, 0.46023, 0.469379,
                        0.363789, 0.269745, 0.486136, 0.894215, 0.794299, 0.724615
                    ], [2, 3, 3, inDepth]);
                    w = tf.stack([
                        tf.stack([
                            tf.tensor2d([0.240347, 0.906352, 0.478657, 0.825918], [fSize, fSize]),
                            tf.tensor2d([0.380769, 0.184705, 0.238241, 0.201907], [fSize, fSize])
                        ], 2),
                        tf.stack([
                            tf.tensor2d([0.294087, 0.181165, 0.191303, 0.7225], [fSize, fSize]),
                            tf.tensor2d([0.430064, 0.900622, 0.670338, 0.33478], [fSize, fSize])
                        ], 2)
                    ], 3);
                    fSizeDilated = fSize + (fSize - 1) * (dilation - 1);
                    wDilated = tf.stack([
                        tf.stack([
                            tf.tensor2d([0.240347, 0, 0.906352, 0, 0, 0, 0.478657, 0, 0.825918], [fSizeDilated, fSizeDilated]),
                            tf.tensor2d([0.380769, 0, 0.184705, 0, 0, 0, 0.238241, 0, 0.201907], [fSizeDilated, fSizeDilated])
                        ], 2),
                        tf.stack([
                            tf.tensor2d([0.294087, 0, 0.181165, 0, 0, 0, 0.191303, 0, 0.7225], [fSizeDilated, fSizeDilated]),
                            tf.tensor2d([0.430064, 0, 0.900622, 0, 0, 0, 0.670338, 0, 0.33478], [fSizeDilated, fSizeDilated])
                        ], 2)
                    ], 3);
                    result = tf.depthwiseConv2d(x, w, stride, pad, 'NHWC', dilation);
                    expectedResult = tf.depthwiseConv2d(x, wDilated, stride, pad, 'NHWC', noDilation);
                    expect(result.shape).toEqual(expectedResult.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expectedResult.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D is allowed', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, x, w, result;
        return __generator(this, function (_a) {
            fSize = 2;
            pad = 'same';
            stride = 1;
            chMul = 3;
            inDepth = 2;
            x = tf.zeros([3, 3, inDepth]);
            w = tf.zeros([fSize, fSize, inDepth, chMul]);
            result = tf.depthwiseConv2d(x, w, stride, pad);
            expect(result.shape).toEqual([3, 3, inDepth * chMul]);
            return [2 /*return*/];
        });
    }); });
    it('Pass null for dilations, which defaults to [1, 1]', function () {
        var fSize = 2;
        var pad = 'same';
        var stride = 1;
        var chMul = 3;
        var inDepth = 2;
        var dilations = null;
        var x = tf.zeros([3, 3, inDepth]);
        var w = tf.zeros([fSize, fSize, inDepth, chMul]);
        var result = tf.depthwiseConv2d(x, w, stride, pad, 'NHWC', dilations);
        expect(result.shape).toEqual([3, 3, inDepth * chMul]);
    });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pad = 'valid';
                    stride = 1;
                    x = [[
                            [[0.230664], [0.987388], [0.0685208]],
                            [[0.419224], [0.887861], [0.731641]],
                            [[0.0741907], [0.409265], [0.351377]]
                        ]];
                    w = [[[[0.303873]], [[0.229223]]], [[[0.144333]], [[0.803373]]]];
                    result = tf.depthwiseConv2d(x, w, stride, pad);
                    expected = [1.07022, 1.03167, 0.67041, 0.778863];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, inDepth, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pad = 'valid';
                    stride = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    w = [[[[0.303873]], [[0.229223]]], [[[0.144333]], [[0.803373]]]];
                    result = x.depthwiseConv2D(w, stride, pad);
                    expect(result.shape).toEqual([1, 2, 2, 1]);
                    expected = [1.07022, 1.03167, 0.67041, 0.778863];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed x as a non-tensor', function () {
        var inputDepth = 1;
        var outputDepth = 1;
        var fSize = 1;
        var pad = 'same';
        var stride = 2;
        var dataFormat = 'NHWC';
        var dilation = 2;
        var w = tf.tensor4d([3], [fSize, fSize, inputDepth, outputDepth]);
        var e = /Argument 'x' passed to 'depthwiseConv2d' must be a Tensor/;
        expect(function () { return tf.depthwiseConv2d({}, w, stride, pad, dataFormat, dilation); })
            .toThrowError(e);
    });
    it('throws when passed filter as a non-tensor', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var pad = 'same';
        var stride = 2;
        var dataFormat = 'NHWC';
        var dilation = 2;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var e = /Argument 'filter' passed to 'depthwiseConv2d' must be a Tensor/;
        expect(function () { return tf.depthwiseConv2d(x, {}, stride, pad, dataFormat, dilation); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pad = 'valid';
                    stride = 1;
                    x = [[
                            [[0.230664], [0.987388], [0.0685208]],
                            [[0.419224], [0.887861], [0.731641]],
                            [[0.0741907], [0.409265], [0.351377]]
                        ]];
                    w = [[[[0.303873]], [[0.229223]]], [[[0.144333]], [[0.803373]]]];
                    result = tf.depthwiseConv2d(x, w, stride, pad);
                    expect(result.shape).toEqual([1, 2, 2, 1]);
                    expected = [1.07022, 1.03167, 0.67041, 0.778863];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('depthwiseConv2d gradients', jasmine_util_1.ALL_ENVS, function () {
    var images;
    var filter;
    var result;
    var stride = 1;
    var pad = 'same';
    beforeEach(function () {
        // two 2x2 RGB images => 2x2x2x3
        images = tf.tensor4d([
            [[[2, 3, 1], [3, 0, 2]], [[0, 4, 1], [3, 1, 3]]],
            [[[2, 1, 0], [0, 3, 3]], [[4, 0, 1], [1, 4, 1]]]
        ]);
        // 2x2 filters, chMul = 2 => 2x2x3x2
        filter = tf.tensor4d([
            [[[1, 1], [1, 1], [0, 0]], [[0, 1], [1, 1], [1, 1]]],
            [[[1, 0], [1, 1], [0, 0]], [[0, 1], [1, 0], [0, 0]]]
        ]);
        // result of convolution operatoin
        result = tf.tensor4d([
            [
                [[2, 8, 8, 7, 2, 2], [6, 3, 1, 1, 0, 0]],
                [[0, 3, 5, 5, 3, 3], [3, 3, 1, 1, 0, 0]]
            ],
            [
                [[6, 3, 8, 4, 3, 3], [1, 0, 7, 7, 0, 0]],
                [[4, 5, 4, 4, 1, 1], [1, 1, 4, 4, 0, 0]]
            ]
        ]);
    });
    it('wrt input', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, value, grad, _b, _c, expectedGrad, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = tf.valueAndGrad(function (x) { return tf.depthwiseConv2d(x, filter, stride, pad); })(images), value = _a.value, grad = _a.grad;
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, value.data()];
                case 1:
                    _c = [_f.sent()];
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, _c.concat([_f.sent()]));
                    expectedGrad = tf.tensor4d([
                        [[[2., 2., 0.], [3., 4., 2.]], [[3., 4., 0.], [5., 7., 2.]]],
                        [[[2., 2., 0.], [3., 4., 2.]], [[3., 4., 0.], [5., 7., 2.]]]
                    ]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, grad.data()];
                case 3:
                    _e = [_f.sent()];
                    return [4 /*yield*/, expectedGrad.data()];
                case 4:
                    _d.apply(void 0, _e.concat([_f.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    // The gradients of normal and depthwise 2D convolutions are actually the same
    // in the special case that dy = 1, so we also test the gradient of a function
    // of the output to disambiguate the two methods.
    it('wrt input, squared output', function () { return __awaiter(_this, void 0, void 0, function () {
        var grad, expectedGrad, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    grad = tf.grad(function (x) {
                        return tf.square(tf.depthwiseConv2d(x, filter, stride, pad));
                    })(images);
                    expectedGrad = tf.tensor4d([
                        [[[20., 30., 0.], [34., 34., 8.]], [[10., 50., 0.], [46., 44., 12.]]],
                        [[[18., 24., 0.], [8., 52., 12.]], [[30., 40., 0.], [22., 76., 4.]]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, grad.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expectedGrad.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('wrt filter', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, value, grad, _b, _c, expectedGrad, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = tf.valueAndGrad(function (f) { return tf.depthwiseConv2d(images, f, stride, pad); })(filter), value = _a.value, grad = _a.grad;
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, value.data()];
                case 1:
                    _c = [_f.sent()];
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, _c.concat([_f.sent()]));
                    expectedGrad = tf.tensor4d([
                        [[[15., 15.], [16., 16.], [12., 12.]], [[7., 7.], [8., 8.], [9., 9.]]],
                        [[[8., 8.], [9., 9.], [6., 6.]], [[4., 4.], [5., 5.], [4., 4.]]]
                    ]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, grad.data()];
                case 3:
                    _e = [_f.sent()];
                    return [4 /*yield*/, expectedGrad.data()];
                case 4:
                    _d.apply(void 0, _e.concat([_f.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, dx, dFilter;
        return __generator(this, function (_b) {
            _a = tf.grads(function (x, filter) {
                return tf.depthwiseConv2d(x.clone(), filter.clone(), stride, pad).clone();
            })([images, filter]), dx = _a[0], dFilter = _a[1];
            expect(dx.shape).toEqual(images.shape);
            expect(dFilter.shape).toEqual(filter.shape);
            return [2 /*return*/];
        });
    }); });
    // Also disambiguate regular vs. depthwise filter gradients
    it('wrt filter, squared output', function () { return __awaiter(_this, void 0, void 0, function () {
        var grad, expectedGrad, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    grad = tf.grad(function (f) {
                        return tf.square(tf.depthwiseConv2d(images, f, stride, pad));
                    })(filter);
                    expectedGrad = tf.tensor4d([
                        [
                            [[120., 122.], [180., 166.], [12., 12.]],
                            [[20., 76.], [90., 66.], [46., 46.]]
                        ],
                        [
                            [[86., 42.], [122., 114.], [10., 10.]],
                            [[24., 54.], [80., 46.], [18., 18.]]
                        ]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, grad.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expectedGrad.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error on dilations > 1', function () {
        var grad = tf.grad(function (x) {
            return tf.depthwiseConv2d(x, filter, stride, pad, 'NHWC', 2);
        });
        expect(function () { return grad(images); })
            .toThrowError(/dilation rates greater than 1 are not yet supported/);
    });
    it('wrt input, stride=2, pad=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dx = tf.grad(function (x) { return tf.depthwiseConv2d(x, filter, 2, 'valid'); })(images);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [2., 2., 0., 1., 2., 2., 1., 2., 0., 1., 1., 0.,
                            2., 2., 0., 1., 2., 2., 1., 2., 0., 1., 1., 0.]]);
                    expect(dx.shape).toEqual([2, 2, 2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('wrt filter, stride=2, pad=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var df, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    df = tf.grad(function (f) { return tf.depthwiseConv2d(images, f, 2, 'valid'); })(filter);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, df.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [4., 4., 4., 4., 1., 1., 3., 3., 3., 3., 5., 5.,
                            4., 4., 4., 4., 2., 2., 4., 4., 5., 5., 4., 4.]]);
                    expect(df.shape).toEqual([2, 2, 3, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, x, f, _a, dx, df, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    f = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    _a = tf.grads(function (x, f) {
                        return tf.depthwiseConv2d(x.clone(), f.clone(), stride, pad).clone();
                    })([x, f]), dx = _a[0], df = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(),
                        [0.303873, 0.533096, 0.229223,
                            0.448206, 1.480802, 1.032596,
                            0.144333, 0.947706, 0.803373]]);
                    expect(dx.shape).toEqual([1, 3, 3, 1]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, df.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(),
                        [2.525137, 2.6754108, 1.7905407, 2.380144]]);
                    expect(df.shape).toEqual([2, 2, 1, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=conv2d_depthwise_test.js.map