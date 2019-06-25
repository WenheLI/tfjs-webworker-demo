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
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../environment");
var jasmine_util_1 = require("../../jasmine_util");
var backend_webgl_test_registry_1 = require("./backend_webgl_test_registry");
var glsl_version_1 = require("./glsl_version");
var gpgpu_context_1 = require("./gpgpu_context");
var tex_util = require("./tex_util");
var DOWNLOAD_FLOAT_ENVS = {
    flags: { 'WEBGL_DOWNLOAD_FLOAT_ENABLED': true },
    predicate: backend_webgl_test_registry_1.WEBGL_ENVS.predicate
};
jasmine_util_1.describeWithFlags('GPGPUContext setOutputMatrixTexture', DOWNLOAD_FLOAT_ENVS, function () {
    var gpgpu;
    var texture;
    beforeEach(function () {
        gpgpu = new gpgpu_context_1.GPGPUContext();
        // Silences debug warnings.
        spyOn(console, 'warn');
        environment_1.ENV.set('DEBUG', true);
        texture = gpgpu.createFloat32MatrixTexture(1, 1);
    });
    afterEach(function () {
        gpgpu.deleteMatrixTexture(texture);
        gpgpu.dispose();
    });
    it('sets the output texture property to the output texture', function () {
        gpgpu.setOutputMatrixTexture(texture, 1, 1);
        expect(gpgpu.outputTexture).toBe(texture);
    });
    it('sets the gl viewport to the output texture dimensions', function () {
        var columns = 456;
        var rows = 123;
        var output = gpgpu.createFloat32MatrixTexture(rows, columns);
        gpgpu.setOutputMatrixTexture(output, rows, columns);
        var expected = new Int32Array([0, 0, columns, rows]);
        expect(gpgpu.gl.getParameter(gpgpu.gl.VIEWPORT)).toEqual(expected);
        gpgpu.deleteMatrixTexture(output);
    });
});
jasmine_util_1.describeWithFlags('GPGPUContext setOutputPackedMatrixTexture', DOWNLOAD_FLOAT_ENVS, function () {
    var gpgpu;
    var texture;
    beforeEach(function () {
        gpgpu = new gpgpu_context_1.GPGPUContext();
        // Silences debug warnings.
        spyOn(console, 'warn');
        environment_1.ENV.set('DEBUG', true);
    });
    afterEach(function () {
        if (texture != null) {
            gpgpu.deleteMatrixTexture(texture);
        }
        gpgpu.dispose();
    });
    it('sets the output texture property to the output texture', function () {
        texture = gpgpu.createPackedMatrixTexture(1, 1);
        gpgpu.setOutputPackedMatrixTexture(texture, 1, 1);
        expect(gpgpu.outputTexture).toBe(texture);
    });
    it('sets the gl viewport to the output packed texture dimensions', function () {
        var columns = 456;
        var rows = 123;
        texture = gpgpu.createPackedMatrixTexture(rows, columns);
        gpgpu.setOutputPackedMatrixTexture(texture, rows, columns);
        var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
        var expected = new Int32Array([0, 0, width, height]);
        expect(gpgpu.gl.getParameter(gpgpu.gl.VIEWPORT)).toEqual(expected);
    });
});
jasmine_util_1.describeWithFlags('GPGPUContext setOutputMatrixWriteRegion', DOWNLOAD_FLOAT_ENVS, function () {
    var gpgpu;
    var program;
    var output;
    beforeEach(function () {
        gpgpu = new gpgpu_context_1.GPGPUContext();
        // Silences debug warnings.
        spyOn(console, 'warn');
        environment_1.ENV.set('DEBUG', true);
        var glsl = glsl_version_1.getGlslDifferences();
        var src = glsl.version + "\n          precision highp float;\n          " + glsl.defineOutput + "\n          void main() {\n            " + glsl.output + " = vec4(2,0,0,0);\n          }\n        ";
        program = gpgpu.createProgram(src);
        output = gpgpu.createFloat32MatrixTexture(4, 4);
        gpgpu.uploadDenseMatrixToTexture(output, 4, 4, new Float32Array(16));
        gpgpu.setOutputMatrixTexture(output, 4, 4);
        gpgpu.setProgram(program);
    });
    afterEach(function () {
        gpgpu.deleteMatrixTexture(output);
        gpgpu.deleteProgram(program);
        gpgpu.dispose();
    });
    it('sets the scissor box to the requested parameters', function () {
        gpgpu.setOutputMatrixWriteRegion(0, 1, 2, 3);
        var scissorBox = gpgpu.gl.getParameter(gpgpu.gl.SCISSOR_BOX);
        expect(scissorBox[0]).toEqual(2);
        expect(scissorBox[1]).toEqual(0);
        expect(scissorBox[2]).toEqual(3);
        expect(scissorBox[3]).toEqual(1);
    });
});
jasmine_util_1.describeWithFlags('GPGPUContext', DOWNLOAD_FLOAT_ENVS, function () {
    var gpgpu;
    beforeEach(function () {
        gpgpu = new gpgpu_context_1.GPGPUContext();
        // Silences debug warnings.
        spyOn(console, 'warn');
        environment_1.ENV.set('DEBUG', true);
    });
    afterEach(function () {
        gpgpu.dispose();
    });
    it('throws an error if used after dispose', function () {
        var gpgpuContext = new gpgpu_context_1.GPGPUContext();
        gpgpuContext.dispose();
        expect(gpgpuContext.dispose).toThrowError();
    });
    it('throws an error if validation is on and framebuffer incomplete', function () {
        var glsl = glsl_version_1.getGlslDifferences();
        var src = glsl.version + "\n      precision highp float;\n      void main() {}\n    ";
        var program = gpgpu.createProgram(src);
        var result = gpgpu.createFloat32MatrixTexture(1, 1);
        gpgpu.setOutputMatrixTexture(result, 1, 1);
        gpgpu.setProgram(program);
        gpgpu.deleteMatrixTexture(result);
        expect(gpgpu.executeProgram).toThrowError();
        gpgpu.deleteProgram(program);
    });
});
describe('gpgpu_context linearSearchLastTrue', function () {
    it('[false]', function () {
        var a = [false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(-1);
    });
    it('[true]', function () {
        var a = [true];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(0);
    });
    it('[false, false]', function () {
        var a = [false, false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(-1);
    });
    it('[true, false]', function () {
        var a = [true, false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(0);
    });
    it('[true, true]', function () {
        var a = [true, true];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(1);
    });
    it('[false, false, false]', function () {
        var a = [false, false, false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(-1);
    });
    it('[true, false, false]', function () {
        var a = [true, false, false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(0);
    });
    it('[true, true, false]', function () {
        var a = [true, true, false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(1);
    });
    it('[true, true, true]', function () {
        var a = [true, true, true];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(2);
    });
    it('[false, false, false, false]', function () {
        var a = [false, false, false, false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(-1);
    });
    it('[true, false, false, false]', function () {
        var a = [true, false, false, false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(0);
    });
    it('[true, true, false, false]', function () {
        var a = [true, true, false, false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(1);
    });
    it('[true, true, true, false]', function () {
        var a = [true, true, true, false];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(2);
    });
    it('[true, true, true, true]', function () {
        var a = [true, true, true, true];
        var arr = a.map(function (x) { return function () { return x; }; });
        expect(gpgpu_context_1.linearSearchLastTrue(arr)).toBe(3);
    });
});
//# sourceMappingURL=gpgpu_context_test.js.map