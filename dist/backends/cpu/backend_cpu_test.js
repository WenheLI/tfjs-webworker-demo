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
var ops_1 = require("../../ops/ops");
var test_util_1 = require("../../test_util");
var util_1 = require("../../util");
var backend_cpu_1 = require("./backend_cpu");
var backend_cpu_test_registry_1 = require("./backend_cpu_test_registry");
/** Private test util for encoding array of strings in utf-8. */
function encodeStrings(a) {
    return a.map(function (s) { return util_1.encodeString(s); });
}
/** Private test util for decoding array of strings in utf-8. */
function decodeStrings(bytes) {
    return bytes.map(function (b) { return util_1.decodeString(b); });
}
jasmine_util_1.describeWithFlags('backendCPU', backend_cpu_test_registry_1.CPU_ENVS, function () {
    var backend;
    beforeEach(function () {
        backend = tf.backend();
    });
    it('register empty string tensor', function () {
        var t = tf.Tensor.make([3], {}, 'string');
        expect(backend.readSync(t.dataId) == null).toBe(true);
    });
    it('register empty string tensor and write', function () {
        var t = tf.Tensor.make([3], {}, 'string');
        backend.write(t.dataId, encodeStrings(['c', 'a', 'b']));
        test_util_1.expectArraysEqual(decodeStrings(backend.readSync(t.dataId)), ['c', 'a', 'b']);
    });
    it('register string tensor with values', function () {
        var t = tf.Tensor.make([3], { values: ['a', 'b', 'c'] }, 'string');
        test_util_1.expectArraysEqual(decodeStrings(backend.readSync(t.dataId)), ['a', 'b', 'c']);
    });
    it('register string tensor with values and overwrite', function () {
        var t = tf.Tensor.make([3], { values: ['a', 'b', 'c'] }, 'string');
        backend.write(t.dataId, encodeStrings(['c', 'a', 'b']));
        test_util_1.expectArraysEqual(decodeStrings(backend.readSync(t.dataId)), ['c', 'a', 'b']);
    });
    it('register string tensor with values and mismatched shape', function () {
        expect(function () { return tf.tensor(['a', 'b', 'c'], [4], 'string'); }).toThrowError();
    });
});
jasmine_util_1.describeWithFlags('depthToSpace', backend_cpu_test_registry_1.CPU_ENVS, function () {
    it('throws when CPU backend used with data format NCHW', function () {
        var t = tf.tensor4d([1, 2, 3, 4], [1, 4, 1, 1]);
        var blockSize = 2;
        var dataFormat = 'NCHW';
        expect(function () { return tf.depthToSpace(t, blockSize, dataFormat); })
            .toThrowError("Only NHWC dataFormat supported on CPU for depthToSpace. Got " + dataFormat);
    });
});
jasmine_util_1.describeWithFlags('gatherND CPU', backend_cpu_test_registry_1.CPU_ENVS, function () {
    it('should throw error when index out of range', function () {
        var indices = ops_1.tensor2d([0, 2, 99], [3, 1], 'int32');
        var input = ops_1.tensor2d([100, 101, 102, 777, 778, 779, 10000, 10001, 10002], [3, 3], 'float32');
        expect(function () { return tf.gatherND(input, indices); }).toThrow();
    });
});
jasmine_util_1.describeWithFlags('scatterND CPU', backend_cpu_test_registry_1.CPU_ENVS, function () {
    it('should throw error when index out of range', function () {
        var indices = tf.tensor2d([0, 4, 99], [3, 1], 'int32');
        var updates = tf.tensor2d([100, 101, 102, 777, 778, 779, 10000, 10001, 10002], [3, 3], 'float32');
        var shape = [5, 3];
        expect(function () { return tf.scatterND(indices, updates, shape); }).toThrow();
    });
    it('should throw error when indices has wrong dimension', function () {
        var indices = tf.tensor2d([0, 4, 99], [3, 1], 'int32');
        var updates = tf.tensor2d([100, 101, 102, 777, 778, 779, 10000, 10001, 10002], [3, 3], 'float32');
        var shape = [2, 3];
        expect(function () { return tf.scatterND(indices, updates, shape); }).toThrow();
    });
});
jasmine_util_1.describeWithFlags('sparseToDense CPU', backend_cpu_test_registry_1.CPU_ENVS, function () {
    it('should throw error when index out of range', function () {
        var defaultValue = 2;
        var indices = tf.tensor1d([0, 2, 6], 'int32');
        var values = tf.tensor1d([100, 101, 102], 'int32');
        var shape = [6];
        expect(function () { return tf.sparseToDense(indices, values, shape, defaultValue); })
            .toThrow();
    });
});
jasmine_util_1.describeWithFlags('memory cpu', backend_cpu_test_registry_1.CPU_ENVS, function () {
    it('unreliable is true due to auto gc', function () {
        tf.tensor(1);
        var mem = tf.memory();
        expect(mem.numTensors).toBe(1);
        expect(mem.numDataBuffers).toBe(1);
        expect(mem.numBytes).toBe(4);
        expect(mem.unreliable).toBe(true);
        var expectedReason = 'The reported memory is an upper bound. Due to automatic garbage ' +
            'collection, the true allocated memory may be less.';
        expect(mem.reasons.indexOf(expectedReason) >= 0).toBe(true);
    });
    it('unreliable is true due to both auto gc and string tensors', function () {
        tf.tensor(1);
        tf.tensor('a');
        var mem = tf.memory();
        expect(mem.numTensors).toBe(2);
        expect(mem.numDataBuffers).toBe(2);
        expect(mem.numBytes).toBe(5);
        expect(mem.unreliable).toBe(true);
        var expectedReasonGC = 'The reported memory is an upper bound. Due to automatic garbage ' +
            'collection, the true allocated memory may be less.';
        expect(mem.reasons.indexOf(expectedReasonGC) >= 0).toBe(true);
        var expectedReasonString = 'Memory usage by string tensors is approximate ' +
            '(2 bytes per character)';
        expect(mem.reasons.indexOf(expectedReasonString) >= 0).toBe(true);
    });
});
describe('CPU backend has sync init', function () {
    it('can do matmul without waiting for ready', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tf.registerBackend('my-cpu', function () {
                        return new backend_cpu_1.MathBackendCPU();
                    });
                    a = tf.tensor1d([5]);
                    b = tf.tensor1d([3]);
                    res = tf.dot(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 15]);
                    tf.dispose([a, b, res]);
                    tf.removeBackend('my-cpu');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=backend_cpu_test.js.map