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
var tf = require("../../index");
var jasmine_util_1 = require("../../jasmine_util");
var test_util_1 = require("../../test_util");
var backend_webgl_test_registry_1 = require("./backend_webgl_test_registry");
jasmine_util_1.describeWithFlags('fromPixels + regular math op', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('fromPixels + add', function () { return __awaiter(_this, void 0, void 0, function () {
        var pixels, i, i, a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pixels = new ImageData(2, 2);
                    for (i = 0; i < 8; i++) {
                        pixels.data[i] = 100;
                    }
                    for (i = 8; i < 16; i++) {
                        pixels.data[i] = 250;
                    }
                    a = tf.browser.fromPixels(pixels, 4);
                    b = tf.scalar(20, 'int32');
                    res = tf.add(a, b);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            120, 120, 120, 120, 120, 120, 120, 120, 270, 270, 270, 270, 270, 270, 270,
                            270
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('toPixels', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('draws a rank-2 float32 tensor, canvas', function (done) {
        var x = tf.tensor2d([.15, .2], [2, 1], 'float32');
        var canvas = document.createElement('canvas');
        tf.browser.toPixels(x, canvas).then(function (data) {
            var expected = new Uint8ClampedArray([
                Math.round(.15 * 255), Math.round(.15 * 255), Math.round(.15 * 255),
                255, Math.round(.2 * 255), Math.round(.2 * 255), Math.round(.2 * 255),
                255
            ]);
            expect(data).toEqual(expected);
            var ctx = canvas.getContext('2d');
            var imgData = ctx.getImageData(0, 0, 1, 2);
            expect(imgData.data).toEqual(expected);
            done();
        });
    });
    it('draws a rank-2 int32 tensor, canvas', function (done) {
        var x = tf.tensor2d([10, 20], [2, 1], 'int32');
        var canvas = document.createElement('canvas');
        tf.browser.toPixels(x, canvas).then(function (data) {
            var expected = new Uint8ClampedArray([10, 10, 10, 255, 20, 20, 20, 255]);
            expect(data).toEqual(expected);
            var ctx = canvas.getContext('2d');
            var imgData = ctx.getImageData(0, 0, 1, 2);
            expect(imgData.data).toEqual(expected);
            done();
        });
    });
    it('draws a rank-3 float32 tensor, 1 channel, canvas', function (done) {
        var x = tf.tensor3d([.15, .2], [2, 1, 1], 'float32');
        var canvas = document.createElement('canvas');
        tf.browser.toPixels(x, canvas).then(function (data) {
            var expected = new Uint8ClampedArray([
                Math.round(.15 * 255), Math.round(.15 * 255), Math.round(.15 * 255),
                255, Math.round(.2 * 255), Math.round(.2 * 255), Math.round(.2 * 255),
                255
            ]);
            expect(data).toEqual(expected);
            var ctx = canvas.getContext('2d');
            var imgData = ctx.getImageData(0, 0, 1, 2);
            expect(imgData.data).toEqual(expected);
            done();
        });
    });
    it('draws a rank-3 int32 tensor, 1 channel, canvas', function (done) {
        var x = tf.tensor3d([10, 20], [2, 1, 1], 'int32');
        var canvas = document.createElement('canvas');
        tf.browser.toPixels(x, canvas).then(function (data) {
            var expected = new Uint8ClampedArray([10, 10, 10, 255, 20, 20, 20, 255]);
            expect(data).toEqual(expected);
            var ctx = canvas.getContext('2d');
            var imgData = ctx.getImageData(0, 0, 1, 2);
            expect(imgData.data).toEqual(expected);
            done();
        });
    });
    it('draws a rank-3 float32 tensor, 3 channel, canvas', function (done) {
        var x = tf.tensor3d([.05, .1001, .15, .20, .25, .3001], [2, 1, 3], 'float32');
        var canvas = document.createElement('canvas');
        tf.browser.toPixels(x, canvas).then(function (data) {
            var expected = new Uint8ClampedArray([
                Math.round(.05 * 255), Math.round(.1001 * 255), Math.round(.15 * 255),
                255, Math.round(.2 * 255), Math.round(.25 * 255),
                Math.round(.3001 * 255), 255
            ]);
            expect(data).toEqual(expected);
            var ctx = canvas.getContext('2d');
            var imgData = ctx.getImageData(0, 0, 1, 2);
            expect(imgData.data).toEqual(expected);
            done();
        });
    });
    it('draws a rank-3 int32 tensor, 3 channel, canvas', function (done) {
        var x = tf.tensor3d([10, 20, 30, 40, 50, 60], [2, 1, 3], 'int32');
        var canvas = document.createElement('canvas');
        tf.browser.toPixels(x, canvas).then(function (data) {
            var expected = new Uint8ClampedArray([10, 20, 30, 255, 40, 50, 60, 255]);
            expect(data).toEqual(expected);
            var ctx = canvas.getContext('2d');
            var imgData = ctx.getImageData(0, 0, 1, 2);
            expect(imgData.data).toEqual(expected);
            done();
        });
    });
    it('draws a rank-3 float32 tensor, 4 channel, canvas', function (done) {
        // ImageData roundtrips are lossy because of pre-multiplied alphas, so we
        // use an alpha = 1 to avoid losing precision on r, g, b channels in these
        // tests https://www.w3.org/TR/2dcontext/
        var x = tf.tensor3d([.05, .1001, .15, 1, .20, .25, .3001, 1], [2, 1, 4], 'float32');
        var canvas = document.createElement('canvas');
        tf.browser.toPixels(x, canvas).then(function (data) {
            var expected = new Uint8ClampedArray([
                Math.round(.05 * 255), Math.round(.1001 * 255), Math.round(.15 * 255),
                255, Math.round(.20 * 255), Math.round(.25 * 255),
                Math.round(.3001 * 255), 255
            ]);
            expect(data).toEqual(expected);
            var ctx = canvas.getContext('2d');
            var imgData = ctx.getImageData(0, 0, 1, 2);
            expect(imgData.data).toEqual(expected);
            done();
        });
    });
    it('draws a rank-3 int32 tensor, 4 channel, canvas', function (done) {
        // ImageData roundtrips are lossy because of pre-multiplied alphas, so we
        // use an alpha = 1 to avoid losing precision on r, g, b channels in these
        // tests https://www.w3.org/TR/2dcontext/
        var x = tf.tensor3d([10, 20, 30, 255, 50, 60, 70, 255], [2, 1, 4], 'int32');
        var canvas = document.createElement('canvas');
        tf.browser.toPixels(x, canvas).then(function (data) {
            var expected = new Uint8ClampedArray([10, 20, 30, 255, 50, 60, 70, 255]);
            expect(data).toEqual(expected);
            var ctx = canvas.getContext('2d');
            var imgData = ctx.getImageData(0, 0, 1, 2);
            expect(imgData.data).toEqual(expected);
            done();
        });
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, canvas, data, expected, ctx, imgData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x = [[127], [100]];
                    canvas = document.createElement('canvas');
                    return [4 /*yield*/, tf.browser.toPixels(x, canvas)];
                case 1:
                    data = _a.sent();
                    expected = new Uint8ClampedArray([127, 127, 127, 255, 100, 100, 100, 255]);
                    expect(data).toEqual(expected);
                    ctx = canvas.getContext('2d');
                    imgData = ctx.getImageData(0, 0, 1, 2);
                    expect(imgData.data).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('depthToSpace', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('tensor4d, input shape=[1, 4, 1, 1], blockSize=2, format=NCHW', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, blockSize, dataFormat, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor4d([1, 2, 3, 4], [1, 4, 1, 1]);
                    blockSize = 2;
                    dataFormat = 'NCHW';
                    res = tf.depthToSpace(t, blockSize, dataFormat);
                    expect(res.shape).toEqual([1, 1, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor4d, input shape=[1, 12, 1, 1], blockSize=2, format=NCHW', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, blockSize, dataFormat, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 12, 1, 1]);
                    blockSize = 2;
                    dataFormat = 'NCHW';
                    res = tf.depthToSpace(t, blockSize, dataFormat);
                    expect(res.shape).toEqual([1, 3, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 4, 7, 10, 2, 5, 8, 11, 3, 6, 9, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor4d, input shape=[1, 4, 2, 2], blockSize=2, format=NCHW', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, blockSize, dataFormat, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [1, 4, 2, 2]);
                    blockSize = 2;
                    dataFormat = 'NCHW';
                    res = tf.depthToSpace(t, blockSize, dataFormat);
                    expect(res.shape).toEqual([1, 1, 4, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1, 5, 2, 6, 9, 13, 10, 14, 3, 7, 4, 8, 11, 15, 12, 16]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor4d, input shape=[1, 8, 2, 2], blockSize=2, format=NCHW', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, blockSize, dataFormat, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor4d([
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
                    ], [1, 8, 2, 2]);
                    blockSize = 2;
                    dataFormat = 'NCHW';
                    res = tf.depthToSpace(t, blockSize, dataFormat);
                    expect(res.shape).toEqual([1, 2, 4, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 9, 2, 10, 17, 25, 18, 26, 3, 11, 4, 12, 19, 27, 20, 28,
                            5, 13, 6, 14, 21, 29, 22, 30, 7, 15, 8, 16, 23, 31, 24, 32
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('maximum', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('works with squarification for large dimension', function () { return __awaiter(_this, void 0, void 0, function () {
        var maxTextureSize, a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    maxTextureSize = tf.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE');
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', 5);
                    a = tf.tensor2d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [2, 7]);
                    b = tf.tensor2d([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 7]);
                    result = tf.maximum(a, b);
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', maxTextureSize);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('div', backend_webgl_test_registry_1.PACKED_ENVS, function () {
    it('works when unused channels are divided', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, d, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1], [1, 1]);
                    b = tf.tensor2d([1], [1, 1]);
                    c = tf.add(a, b).div(a);
                    d = tf.add(a, b).div(a);
                    result = c.matMul(d);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works when unused channels in tensors with size > 1 are divided', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, d, e, f, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3], [3, 1]);
                    b = tf.tensor2d([1, 2, 3], [3, 1]);
                    c = a.div(b);
                    d = tf.tensor1d([1, 2, 3]);
                    e = tf.tensor1d([1, 2, 3]);
                    f = d.div(e).reshape([1, 3]);
                    result = c.matMul(f);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1, 1, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('conv2d webgl', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('packed input x=[2,1,2] f=[1,1,2,2] s=1 d=1 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputShape, fSize, pad, stride, x, w, webglLazilyUnpackFlagSaved, webglPackBinaryOperationsFlagSaved, result, result1, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    inputShape = [2, 1, 2];
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    x = tf.tensor3d([1, 2, 3, 4], inputShape);
                    w = tf.tensor4d([1, 2, 3, 4], [fSize, fSize, 2, 2]);
                    webglLazilyUnpackFlagSaved = tf.ENV.getBool('WEBGL_LAZILY_UNPACK');
                    tf.ENV.set('WEBGL_LAZILY_UNPACK', true);
                    webglPackBinaryOperationsFlagSaved = tf.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS');
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', true);
                    result = tf.conv2d(x, w, stride, pad);
                    result1 = tf.conv2d(result, w, stride, pad);
                    tf.ENV.set('WEBGL_LAZILY_UNPACK', webglLazilyUnpackFlagSaved);
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', webglPackBinaryOperationsFlagSaved);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [7, 10, 15, 22]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result1.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [37, 54, 81, 118]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tf.memory() packed input x=[1,1,1,2] f=[1,1,2,2] s=1 d=1 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputShape, fSize, pad, stride, xInit, w, webglLazilyUnpackFlagSaved, webglPackBinaryOperationsFlagSaved, x, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputShape = [1, 1, 1, 2];
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    xInit = tf.tensor4d([0, 1], inputShape);
                    w = tf.tensor4d([1, 2, 3, 4], [fSize, fSize, 2, 2]);
                    webglLazilyUnpackFlagSaved = tf.ENV.getBool('WEBGL_LAZILY_UNPACK');
                    tf.ENV.set('WEBGL_LAZILY_UNPACK', true);
                    webglPackBinaryOperationsFlagSaved = tf.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS');
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', true);
                    x = xInit.add(1);
                    result = tf.conv2d(x, w, stride, pad);
                    tf.ENV.set('WEBGL_LAZILY_UNPACK', webglLazilyUnpackFlagSaved);
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', webglPackBinaryOperationsFlagSaved);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7, 10]]);
                    result.dispose();
                    x.dispose();
                    xInit.dispose();
                    w.dispose();
                    expect(tf.memory().numBytesInGPU).toBe(0);
                    expect(tf.memory().numBytes).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('conv to matmul', backend_webgl_test_registry_1.PACKED_ENVS, function () {
    it('im2col should not leak memory', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        var dataFormat = 'NHWC';
        var dilation = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
        var startNumBytes = tf.memory().numBytes;
        tf.conv2d(x, w, stride, pad, dataFormat, dilation);
        var endNumBytes = tf.memory().numBytes;
        expect(endNumBytes - startNumBytes).toEqual(4);
    });
    it('pointwise conv should work when matmul is unpacked', function () {
        var inputDepth = 1001; // this number must be greater than MATMUL_SHARED_DIM_THRESHOLD
        // for matmul to be unpacked
        var inputShape = [3, 3, inputDepth];
        var outputDepth = 1;
        var fSize = 1;
        var pad = 'same';
        var stride = [1, 1];
        var x = tf.randomNormal(inputShape);
        x = x.add(1); // this packs x so we can test the case where we mistakenly
        // want to avoid expensive reshape in pointwise conv2d even
        // though matmul is unpacked
        var w = tf.randomNormal([fSize, fSize, inputDepth, outputDepth]);
        expect(function () { return tf.conv2d(x, w, stride, pad); }).not.toThrow();
    });
});
// For operations on non-trivial matrix sizes, we skip the CPU-only ENV and use
// only WebGL ENVs.
jasmine_util_1.describeWithFlags('gramSchmidt-non-tiny', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('16x32', function () { return __awaiter(_this, void 0, void 0, function () {
        var xs, y, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    xs = tf.randomUniform([16, 32]);
                    y = tf.linalg.gramSchmidt(xs);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.matMul(y.transpose()).data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, tf.eye(16).data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('matmul webgl-only', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('Matrix times vector, large matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var maxTexSize, sharedDim, matrix, v, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    maxTexSize = 16000;
                    sharedDim = maxTexSize + 4;
                    matrix = tf.buffer([2, sharedDim], 'float32');
                    matrix.set(1, 0, sharedDim - 3);
                    matrix.set(1, 0, sharedDim - 2);
                    v = tf.buffer([sharedDim], 'float32');
                    v.set(1, sharedDim - 3);
                    v.set(1, sharedDim - 2);
                    result = tf.dot(matrix.toTensor(), v.toTensor());
                    expected = [2, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('matmul', backend_webgl_test_registry_1.PACKED_ENVS, function () {
    it('should not leak memory', function () {
        var a = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        var b = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [3, 5]);
        var startNumBytes = tf.memory().numBytes;
        tf.matMul(a, b);
        var endNumBytes = tf.memory().numBytes;
        expect(endNumBytes - startNumBytes).toEqual(60);
    });
    it('should work when input matrix dimensions are not divisible by 2', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
                    b = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [3, 5]);
                    c = tf.matMul(a, b);
                    expect(c.shape).toEqual([3, 5]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            46, 52, 58, 64, 70, 100, 115, 130, 145, 160, 154, 178, 202, 226, 250
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work when output texture shape != physical shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var sharedDim, a, b, c, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sharedDim = 16000;
                    a = tf.buffer([2, sharedDim], 'float32');
                    b = tf.buffer([sharedDim, 2], 'float32');
                    a.set(1, 0, sharedDim - 1);
                    a.set(1, 0, sharedDim - 2);
                    a.set(1, 1, sharedDim - 1);
                    b.set(1, sharedDim - 1, 0);
                    b.set(1, sharedDim - 2, 0);
                    c = tf.matMul(a.toTensor(), b.toTensor());
                    expected = [2, 0, 1, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work when input texture shapes != physical shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var maxTextureSize, a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    maxTextureSize = tf.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE');
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', 5);
                    a = tf.tensor2d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 12]);
                    b = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [12, 1]);
                    c = tf.matMul(a, b);
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', maxTextureSize);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [572]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work when squarification results in zero padding', function () { return __awaiter(_this, void 0, void 0, function () {
        var maxTextureSize, a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    maxTextureSize = tf.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE');
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', 3);
                    a = tf.tensor2d([1, 2], [1, 2]);
                    b = tf.tensor2d([[0, 1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16, 17]]);
                    c = tf.matMul(a, b);
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', maxTextureSize);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [18, 21, 24, 27, 30, 33, 36, 39, 42]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.matMul(a, b);
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 8, -3, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A x B^t', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([1, 0, 2, 4, 3, 0], [2, 3]);
                    transposeA = false;
                    transposeB = true;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    expected = [7, 10, 16, 31];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A^t x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([1, 0, 2, 4, 3, 0], [2, 3]);
                    transposeA = true;
                    transposeB = false;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    expected = [17, 12, 2, 22, 15, 4, 27, 18, 6];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A^t x B^t', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
                    b = tf.tensor2d([1, 0, 2, 4, 3, 0], [2, 3]);
                    transposeA = true;
                    transposeB = true;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    expected = [11, 13, 14, 20];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works when followed by an op that requires unpacked inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, webglPackBinarySaved, d, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.matMul(a, b);
                    webglPackBinarySaved = tf.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS');
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', false);
                    d = tf.add(c, 1);
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', webglPackBinarySaved);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, d.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 9, -2, 21]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // tslint:disable-next-line:max-line-length
    it('works when followed by a packed reshape that changes texture layout, and then an unpacked op', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, d, webglPackBinarySaved, e, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [9, 1]);
                    b = tf.tensor2d([1], [1, 1]);
                    c = tf.matMul(a, b);
                    d = tf.reshape(c, [1, 3, 3, 1]);
                    webglPackBinarySaved = tf.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS');
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', false);
                    e = tf.add(d, 1);
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', webglPackBinarySaved);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, e.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, 4, 5, 6, 7, 8, 9, 10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works when preceded by an op that requires packed inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, d, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.add(a, 1);
                    d = tf.matMul(b, c);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, d.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 6, 7, 4, 3, 2, 9, 12, 15]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('Reduction: webgl packed input', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('argmax 3D, odd number of rows, axis = -1', function () { return __awaiter(_this, void 0, void 0, function () {
        var webglLazilyUnpackFlagSaved, webglPackBinaryOperationsFlagSaved, a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    webglLazilyUnpackFlagSaved = tf.ENV.getBool('WEBGL_LAZILY_UNPACK');
                    tf.ENV.set('WEBGL_LAZILY_UNPACK', true);
                    webglPackBinaryOperationsFlagSaved = tf.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS');
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', true);
                    a = tf.tensor3d([3, 2, 5, 100, -7, 2], [2, 1, 3]).add(1);
                    r = tf.argMax(a, -1);
                    tf.ENV.set('WEBGL_LAZILY_UNPACK', webglLazilyUnpackFlagSaved);
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', webglPackBinaryOperationsFlagSaved);
                    expect(r.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('argmin 4D, odd number of rows, axis = -1', function () { return __awaiter(_this, void 0, void 0, function () {
        var webglLazilyUnpackFlagSaved, webglPackBinaryOperationsFlagSaved, a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    webglLazilyUnpackFlagSaved = tf.ENV.getBool('WEBGL_LAZILY_UNPACK');
                    tf.ENV.set('WEBGL_LAZILY_UNPACK', true);
                    webglPackBinaryOperationsFlagSaved = tf.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS');
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', true);
                    a = tf.tensor4d([3, 2, 5, 100, -7, 2, 8, 7, -5, 101, 7, -2, 100, -7, 2, 8, 7, -5], [1, 2, 3, 3])
                        .add(1);
                    r = tf.argMin(a, -1);
                    tf.ENV.set('WEBGL_LAZILY_UNPACK', webglLazilyUnpackFlagSaved);
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', webglPackBinaryOperationsFlagSaved);
                    expect(r.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 2, 2, 1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not leak memory when called after unpacked op', function () { return __awaiter(_this, void 0, void 0, function () {
        var webglPackBinaryOperationsFlagSaved, a, startNumBytes, startNumTensors, r, endNumBytes, endNumTensors, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    webglPackBinaryOperationsFlagSaved = tf.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS');
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', false);
                    a = tf.tensor5d([3, 2, 5, 100, -7, 2, 8, 7, -5, 101, 7, -2, 100, -7, 2, 8, 7, -5], [1, 2, 3, 1, 3])
                        .add(1);
                    startNumBytes = tf.memory().numBytes;
                    startNumTensors = tf.memory().numTensors;
                    r = tf.argMin(a, -1);
                    tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', webglPackBinaryOperationsFlagSaved);
                    endNumBytes = tf.memory().numBytes;
                    endNumTensors = tf.memory().numTensors;
                    expect(endNumBytes - startNumBytes).toEqual(24);
                    expect(endNumTensors - startNumTensors).toEqual(1);
                    expect(r.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 2, 2, 1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('slice and memory usage', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    beforeAll(function () {
        tf.ENV.set('WEBGL_CPU_FORWARD', false);
        tf.ENV.set('WEBGL_SIZE_UPLOAD_UNIFORM', 0);
    });
    it('slice a tensor, read it and check memory', function () { return __awaiter(_this, void 0, void 0, function () {
        var getMem, a, b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getMem = function () { return tf.memory(); };
                    expect(getMem().numBytesInGPU).toBe(0);
                    a = tf.tensor([2, 3]);
                    expect(getMem().numBytesInGPU).toBe(0);
                    // Upload a to the GPU by running an op.
                    a.square().dispose();
                    expect(getMem().numBytesInGPU).toBe(8);
                    b = a.slice(0);
                    expect(getMem().numBytesInGPU).toBe(8);
                    // Download a to the CPU but the texture remains on GPU
                    // since b points to it.
                    return [4 /*yield*/, a.data()];
                case 1:
                    // Download a to the CPU but the texture remains on GPU
                    // since b points to it.
                    _a.sent();
                    expect(getMem().numBytesInGPU).toBe(8);
                    // Dispose a, but the texture should still remain on the GPU
                    // since b points to it.
                    a.dispose();
                    expect(getMem().numBytesInGPU).toBe(8);
                    // Dispose b and expect 0 memory on GPU.
                    b.dispose();
                    expect(getMem().numBytesInGPU).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('slice a packed texture', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    beforeAll(function () {
        tf.ENV.set('WEBGL_PACK', true);
    });
    it('slice after a matmul', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    a = [[1, 2], [3, 4]];
                    b = [[5, 6], [7, 8]];
                    c = tf.matMul(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.slice([0, 0]).data()];
                case 1:
                    _a.apply(void 0, [_e.sent(), [19, 22, 43, 50]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.slice([0, 1]).data()];
                case 2:
                    _b.apply(void 0, [_e.sent(), [22, 50]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.slice([1, 0]).data()];
                case 3:
                    _c.apply(void 0, [_e.sent(), [43, 50]]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.slice([1, 1]).data()];
                case 4:
                    _d.apply(void 0, [_e.sent(), [50]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('relu', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('works with squarification for prime number length vector', function () { return __awaiter(_this, void 0, void 0, function () {
        var maxTextureSize, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    maxTextureSize = tf.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE');
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', 5);
                    a = tf.tensor1d([1, -2, 5, -3, -1, 4, 7]);
                    result = tf.relu(a);
                    tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', maxTextureSize);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 5, 0, 0, 4, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('packed clip', backend_webgl_test_registry_1.PACKED_ENVS, function () {
    it('should not leak memory', function () {
        var a = tf.tensor1d([3, -1, 0, 100, -7, 2]);
        var min = -1;
        var max = 50;
        var startNumBytes = tf.memory().numBytes;
        var startNumTensors = tf.memory().numTensors;
        tf.clipByValue(a, min, max);
        var endNumBytes = tf.memory().numBytes;
        var endNumTensors = tf.memory().numTensors;
        expect(endNumBytes - startNumBytes).toEqual(24);
        expect(endNumTensors - startNumTensors).toEqual(1);
    });
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, min, max, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, -1, 0, 100, -7, 2]);
                    min = -1;
                    max = 50;
                    result = tf.clipByValue(a, min, max);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, -1, 0, 50, -1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('using extreme values', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor1d([3, -1, 0, 100, -7, 2]);
                    result = tf.clipByValue(a, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [3, -1, 0, 100, -7, 2]]);
                    result = tf.clipByValue(a, Number.MIN_VALUE, Number.MAX_VALUE);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(),
                        [3, Number.MIN_VALUE, Number.MIN_VALUE, 100, Number.MIN_VALUE, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for scalars', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, min, max, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-4);
                    min = -1;
                    max = 50;
                    result = tf.clipByValue(a, min, max);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [min]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('derivative: 1D tensor with max or min value', function () { return __awaiter(_this, void 0, void 0, function () {
        var min, max, x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    min = -1;
                    max = 2;
                    x = tf.tensor1d([-1, 1, 2, 3]);
                    dy = tf.tensor1d([1, 10, 100, 1000]);
                    gradients = tf.grad(function (x) { return x.clipByValue(min, max); })(x, dy);
                    expect(gradients.shape).toEqual(x.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 10, 100, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('depthwiseConv2d packed', backend_webgl_test_registry_1.PACKED_ENVS, function () {
    it('should not leak memory', function () {
        var x = tf.tensor4d([
            0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
            0.0741907, 0.409265, 0.351377
        ], [1, 3, 3, 1]);
        var w = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [2, 2, 1, 1]);
        var startNumBytes = tf.memory().numBytes;
        var startNumTensors = tf.memory().numTensors;
        tf.depthwiseConv2d(x, w, 1, 'valid');
        var endNumBytes = tf.memory().numBytes;
        var endNumTensors = tf.memory().numTensors;
        expect(endNumBytes - startNumBytes).toEqual(16);
        expect(endNumTensors - startNumTensors).toEqual(1);
    });
});
//# sourceMappingURL=webgl_ops_test.js.map