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
var backend_webgl_1 = require("./backend_webgl");
var backend_webgl_test_registry_1 = require("./backend_webgl_test_registry");
jasmine_util_1.describeWithFlags('lazy packing and unpacking', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    var webglLazilyUnpackFlagSaved;
    var webglCpuForwardFlagSaved;
    beforeAll(function () {
        webglLazilyUnpackFlagSaved =
            tf.ENV.getBool('WEBGL_LAZILY_UNPACK');
        webglCpuForwardFlagSaved = tf.ENV.getBool('WEBGL_CPU_FORWARD');
        tf.ENV.set('WEBGL_LAZILY_UNPACK', true);
        tf.ENV.set('WEBGL_CPU_FORWARD', false);
    });
    afterAll(function () {
        tf.ENV.set('WEBGL_LAZILY_UNPACK', webglLazilyUnpackFlagSaved);
        tf.ENV.set('WEBGL_CPU_FORWARD', webglCpuForwardFlagSaved);
    });
    it('should not leak memory when lazily unpacking', function () {
        var a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
        var b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
        // c is packed to 1x1 RGBA texture.
        var c = tf.matMul(a, b);
        var startNumBytes = tf.memory().numBytes;
        var startNumTensors = tf.memory().numTensors;
        var startNumBytesInGPU = tf.memory().numBytesInGPU;
        var webglPackBinaryOperationsFlagSaved = tf.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS');
        tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', false);
        // Add will unpack c before the operation to 2
        tf.add(c, 1);
        tf.ENV.set('WEBGL_PACK_BINARY_OPERATIONS', webglPackBinaryOperationsFlagSaved);
        expect(tf.memory().numBytes - startNumBytes).toEqual(16);
        expect(tf.memory().numTensors - startNumTensors).toEqual(1);
        // result is unpacked 2x2 R texture.
        expect(tf.memory().numBytesInGPU -
            startNumBytesInGPU)
            .toEqual(4 * tf.util.bytesPerElement(a.dtype));
    });
    it('should not leak memory when lazily packing', function () {
        var a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
        var b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
        var c = tf.add(a, 1);
        var startNumBytes = tf.memory().numBytes;
        var startNumTensors = tf.memory().numTensors;
        var startNumBytesInGPU = tf.memory().numBytesInGPU;
        tf.matMul(b, c);
        expect(tf.memory().numBytes - startNumBytes).toEqual(36);
        expect(tf.memory().numTensors - startNumTensors).toEqual(1);
        // result [3, 3] is packed to four RGBA pixel texture b is packed to two
        // RGBA texels texture: total 6 * 4 = 24 components.
        expect(tf.memory().numBytesInGPU -
            startNumBytesInGPU)
            .toEqual(24 * tf.util.bytesPerElement(a.dtype));
    });
    it('should work when the same input must be represented by' +
        'different textures', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2]);
                    res = tf.dot(a, a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('backendWebGL', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    var prevBackend;
    beforeAll(function () {
        prevBackend = tf.getBackend();
    });
    afterEach(function () {
        tf.setBackend(prevBackend);
        tf.removeBackend('test-storage');
    });
    it('register empty string tensor', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var t = tf.Tensor.make([3], {}, 'string');
        expect(backend.readSync(t.dataId) == null).toBe(true);
    });
    it('register empty string tensor and write', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var t = tf.Tensor.make([3], {}, 'string');
        backend.write(t.dataId, ['c', 'a', 'b']);
        test_util_1.expectArraysEqual(backend.readSync(t.dataId), ['c', 'a', 'b']);
    });
    it('register string tensor with values', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var t = tf.Tensor.make([3], { values: ['a', 'b', 'c'] }, 'string');
        test_util_1.expectArraysEqual(backend.readSync(t.dataId), ['a', 'b', 'c']);
    });
    it('register string tensor with values and overwrite', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var t = tf.Tensor.make([3], { values: ['a', 'b', 'c'] }, 'string');
        backend.write(t.dataId, ['c', 'a', 'b']);
        test_util_1.expectArraysEqual(backend.readSync(t.dataId), ['c', 'a', 'b']);
    });
    it('register string tensor with values and wrong shape throws error', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        expect(function () { return tf.tensor(['a', 'b', 'c'], [4], 'string'); }).toThrowError();
    });
    it('reading', function () {
        var backend = new backend_webgl_1.MathBackendWebGL(null);
        tf.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var texManager = backend.getTextureManager();
        var t = tf.Tensor.make([3], {}, 'float32');
        backend.write(t.dataId, new Float32Array([1, 2, 3]));
        expect(texManager.getNumUsedTextures()).toBe(0);
        backend.getTexture(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(1);
        test_util_1.expectArraysClose(backend.readSync(t.dataId), new Float32Array([1, 2, 3]));
        expect(texManager.getNumUsedTextures()).toBe(0);
        backend.getTexture(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(1);
        backend.disposeData(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(0);
    });
    it('read packed and then use by an unpacked op', function () { return __awaiter(_this, void 0, void 0, function () {
        var backend, webglPackFlagSaved, webglSizeUploadUniformSaved, a, b, c, d, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    backend = new backend_webgl_1.MathBackendWebGL(null);
                    tf.registerBackend('test-storage', function () { return backend; });
                    tf.setBackend('test-storage');
                    webglPackFlagSaved = tf.ENV.getBool('WEBGL_PACK');
                    tf.ENV.set('WEBGL_PACK', true);
                    webglSizeUploadUniformSaved = tf.ENV.getNumber('WEBGL_SIZE_UPLOAD_UNIFORM');
                    tf.ENV.set('WEBGL_SIZE_UPLOAD_UNIFORM', 0);
                    a = tf.tensor2d([1, 2], [2, 1]);
                    b = tf.tensor2d([1], [1, 1]);
                    c = tf.matMul(a, b);
                    backend.readSync(c.dataId);
                    tf.ENV.set('WEBGL_PACK', false);
                    d = tf.add(c, 1);
                    tf.ENV.set('WEBGL_PACK', webglPackFlagSaved);
                    tf.ENV.set('WEBGL_SIZE_UPLOAD_UNIFORM', webglSizeUploadUniformSaved);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, d.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delayed storage, overwriting', function () {
        var backend = new backend_webgl_1.MathBackendWebGL(null);
        tf.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var texManager = backend.getTextureManager();
        var t = tf.Tensor.make([3], {}, 'float32');
        backend.write(t.dataId, new Float32Array([1, 2, 3]));
        backend.getTexture(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(1);
        // overwrite.
        backend.write(t.dataId, new Float32Array([4, 5, 6]));
        expect(texManager.getNumUsedTextures()).toBe(0);
        test_util_1.expectArraysClose(backend.readSync(t.dataId), new Float32Array([4, 5, 6]));
        backend.getTexture(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(1);
        test_util_1.expectArraysClose(backend.readSync(t.dataId), new Float32Array([4, 5, 6]));
        expect(texManager.getNumUsedTextures()).toBe(0);
    });
});
jasmine_util_1.describeWithFlags('Custom window size', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('Set screen area to be 1x1', function () {
        // This will set the screen size to 1x1 to make sure the page limit is
        // very small.
        spyOnProperty(window, 'screen', 'get')
            .and.returnValue({ height: 1, width: 1 });
        tf.registerBackend('custom-webgl', function () { return new backend_webgl_1.MathBackendWebGL(); });
        tf.setBackend('custom-webgl');
        // Allocate ~40KB.
        var a = tf.ones([100, 100]);
        // No gpu memory used yet because of delayed storage.
        expect(tf.memory().numBytesInGPU).toBe(0);
        // Expect console.warn() to be called.
        var numWarnCalls = 0;
        spyOn(console, 'warn').and.callFake(function () {
            numWarnCalls++;
        });
        a.square();
        expect(numWarnCalls).toBe(1);
        expect(tf.memory().numBytesInGPU)
            .toBe(100 * 100 * 4 * 2);
        // Allocate another 40KB.
        a.square();
        // Expect console.warn() to NOT be called more than once.
        expect(numWarnCalls).toBe(1);
        expect(tf.memory().numBytesInGPU)
            .toBe(100 * 100 * 4 * 3);
        tf.removeBackend('custom-webgl');
    });
});
var SIZE_UPLOAD_UNIFORM = 4;
// Run only for environments that have 32bit floating point support.
var FLOAT32_WEBGL_ENVS = {
    flags: { 'WEBGL_RENDER_FLOAT32_ENABLED': true },
    predicate: backend_webgl_test_registry_1.WEBGL_ENVS.predicate
};
jasmine_util_1.describeWithFlags('upload tensors as uniforms', FLOAT32_WEBGL_ENVS, function () {
    var savedUploadUniformValue;
    beforeAll(function () {
        savedUploadUniformValue = tf.ENV.get('WEBGL_SIZE_UPLOAD_UNIFORM');
        tf.ENV.set('WEBGL_SIZE_UPLOAD_UNIFORM', SIZE_UPLOAD_UNIFORM);
    });
    afterAll(function () {
        tf.ENV.set('WEBGL_SIZE_UPLOAD_UNIFORM', savedUploadUniformValue);
    });
    it('small tensor gets uploaded as scalar', function () {
        var m = tf.memory();
        expect(m.numBytesInGPU).toBe(0);
        var a = tf.zeros([SIZE_UPLOAD_UNIFORM - 1]);
        a.square();
        // Only the result lives on the gpu, the input is gone.
        m = tf.memory();
        expect(m.numBytesInGPU).toBe(a.size * 4);
    });
    it('large tensor gets uploaded to gpu', function () {
        var m = tf.memory();
        expect(m.numBytesInGPU).toBe(0);
        var a = tf.zeros([SIZE_UPLOAD_UNIFORM + 1]);
        a.square();
        // Both the result and the input live on the gpu.
        m = tf.memory();
        expect(m.numBytesInGPU).toBe(a.size * 4 * 2);
    });
    it('download and re-upload an output of a shader', function () { return __awaiter(_this, void 0, void 0, function () {
        var vals, a, res, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    vals = new Float32Array(SIZE_UPLOAD_UNIFORM + 1);
                    vals.fill(2);
                    a = tf.square(vals);
                    a.dataSync(); // Download to CPU.
                    res = a.square();
                    expected = new Float32Array(SIZE_UPLOAD_UNIFORM + 1);
                    expected.fill(16);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('indexing for large tensors', FLOAT32_WEBGL_ENVS, function () {
    it('properly indexes large tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var range, aData, i, a, aRelu, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    range = 3000 * 3000;
                    aData = new Float32Array(range);
                    for (i = 0; i < range; i++) {
                        aData[i] = i / range;
                    }
                    a = tf.tensor1d(aData);
                    aRelu = a.relu();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), aData]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, aRelu.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), aData]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('debug on webgl', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    beforeAll(function () {
        // Silences debug warnings.
        spyOn(console, 'warn');
        tf.ENV.set('DEBUG', true);
    });
    afterAll(function () {
        tf.ENV.set('DEBUG', false);
    });
    it('debug mode errors when overflow in tensor construction', function () {
        var savedRenderFloat32Flag = tf.ENV.getBool('WEBGL_RENDER_FLOAT32_ENABLED');
        tf.ENV.set('WEBGL_RENDER_FLOAT32_ENABLED', false);
        var a = function () { return tf.tensor1d([2, Math.pow(2, 17)], 'float32'); };
        expect(a).toThrowError();
        tf.ENV.set('WEBGL_RENDER_FLOAT32_ENABLED', savedRenderFloat32Flag);
    });
    it('debug mode errors when underflow in tensor construction', function () {
        var savedRenderFloat32Flag = tf.ENV.getBool('WEBGL_RENDER_FLOAT32_ENABLED');
        tf.ENV.set('WEBGL_RENDER_FLOAT32_ENABLED', false);
        var a = function () { return tf.tensor1d([2, 1e-8], 'float32'); };
        expect(a).toThrowError();
        tf.ENV.set('WEBGL_RENDER_FLOAT32_ENABLED', savedRenderFloat32Flag);
    });
});
jasmine_util_1.describeWithFlags('memory webgl', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('unreliable is falsy/not present when all tensors are numeric', function () {
        tf.tensor(1);
        var mem = tf.memory();
        expect(mem.numTensors).toBe(1);
        expect(mem.numDataBuffers).toBe(1);
        expect(mem.numBytes).toBe(4);
        expect(mem.unreliable).toBeFalsy();
    });
});
// We do not yet fully support half float backends. These tests are a starting
// point.
jasmine_util_1.describeWithFlags('backend without render float32 support', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    var savedRenderFloat32Flag = tf.ENV.getBool('WEBGL_RENDER_FLOAT32_ENABLED');
    beforeAll(function () {
        tf.ENV.set('WEBGL_RENDER_FLOAT32_ENABLED', false);
    });
    beforeEach(function () {
        tf.registerBackend('half-float-webgl', function () { return new backend_webgl_1.MathBackendWebGL(null); });
    });
    afterEach(function () {
        tf.removeBackend('half-float-webgl');
    });
    afterAll(function () {
        tf.ENV.set('WEBGL_RENDER_FLOAT32_ENABLED', savedRenderFloat32Flag);
    });
    it('basic usage', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tf.setBackend('half-float-webgl');
                    a = tf.tensor2d([1, 2], [1, 2]);
                    b = tf.tensor2d([1, 2], [1, 2]);
                    c = tf.add(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('disposing tensors should not cause errors', function () {
        tf.setBackend('half-float-webgl');
        expect(function () { return tf.tidy(function () {
            var a = tf.tensor2d([1, 2], [1, 2]);
            var b = tf.tensor2d([1, 2], [1, 2]);
            var c = tf.add(a, b);
            c.dataSync();
            return c.add(tf.tensor2d([2, 4], [1, 2]));
        }); }).not.toThrowError();
    });
});
jasmine_util_1.describeWithFlags('time webgl', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('upload + compute', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, time;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = tf.zeros([10, 10]);
                    return [4 /*yield*/, tf.time(function () { return a.square(); })];
                case 1:
                    time = _a.sent();
                    expect(time.uploadWaitMs > 0);
                    expect(time.downloadWaitMs === 0);
                    expect(time.kernelMs > 0);
                    expect(time.wallMs >= time.kernelMs);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upload + compute + dataSync', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, time;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = tf.zeros([10, 10]);
                    return [4 /*yield*/, tf.time(function () { return a.square().dataSync(); })];
                case 1:
                    time = _a.sent();
                    expect(time.uploadWaitMs > 0);
                    expect(time.downloadWaitMs > 0);
                    expect(time.kernelMs > 0);
                    expect(time.wallMs >= time.kernelMs);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upload + compute + data', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, time;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = tf.zeros([10, 10]);
                    return [4 /*yield*/, tf.time(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, a.square().data()];
                        }); }); })];
                case 1:
                    time = _a.sent();
                    expect(time.uploadWaitMs > 0);
                    expect(time.downloadWaitMs > 0);
                    expect(time.kernelMs > 0);
                    expect(time.wallMs >= time.kernelMs);
                    return [2 /*return*/];
            }
        });
    }); });
    it('preupload (not included) + compute + data', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, time;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = tf.zeros([10, 10]);
                    // Pre-upload a on gpu.
                    a.square();
                    return [4 /*yield*/, tf.time(function () { return a.sqrt(); })];
                case 1:
                    time = _a.sent();
                    // The tensor was already on gpu.
                    expect(time.uploadWaitMs === 0);
                    expect(time.downloadWaitMs === 0);
                    expect(time.kernelMs > 0);
                    expect(time.wallMs >= time.kernelMs);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('WebGL backend has sync init', function () {
    it('can do matmul without waiting for ready', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tf.registerBackend('my-webgl', function () {
                        return new backend_webgl_1.MathBackendWebGL();
                    });
                    a = tf.tensor1d([5]);
                    b = tf.tensor1d([3]);
                    res = tf.dot(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 15]);
                    tf.dispose([a, b, res]);
                    tf.removeBackend('my-webgl');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=backend_webgl_test.js.map