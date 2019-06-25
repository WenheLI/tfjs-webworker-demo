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
var jasmine_util_1 = require("../../jasmine_util");
var backend_webgl_test_registry_1 = require("./backend_webgl_test_registry");
var gpgpu_context_1 = require("./gpgpu_context");
var gpgpu_util = require("./gpgpu_util");
jasmine_util_1.describeWithFlags('gpgpu_util createWebGLContext', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    var gpgpu;
    beforeEach(function () {
        gpgpu = new gpgpu_context_1.GPGPUContext();
    });
    afterEach(function () {
        gpgpu.dispose();
    });
    it('disables DEPTH_TEST and STENCIL_TEST', function () {
        expect(gpgpu.gl.getParameter(gpgpu.gl.DEPTH_TEST)).toEqual(false);
        expect(gpgpu.gl.getParameter(gpgpu.gl.STENCIL_TEST)).toEqual(false);
    });
    it('disables BLEND', function () {
        expect(gpgpu.gl.getParameter(gpgpu.gl.BLEND)).toEqual(false);
    });
    it('disables DITHER, POLYGON_OFFSET_FILL', function () {
        expect(gpgpu.gl.getParameter(gpgpu.gl.DITHER)).toEqual(false);
        expect(gpgpu.gl.getParameter(gpgpu.gl.POLYGON_OFFSET_FILL)).toEqual(false);
    });
    it('enables CULL_FACE with BACK', function () {
        expect(gpgpu.gl.getParameter(gpgpu.gl.CULL_FACE)).toEqual(true);
        expect(gpgpu.gl.getParameter(gpgpu.gl.CULL_FACE_MODE))
            .toEqual(gpgpu.gl.BACK);
    });
    it('enables SCISSOR_TEST', function () {
        expect(gpgpu.gl.getParameter(gpgpu.gl.SCISSOR_TEST)).toEqual(true);
    });
});
jasmine_util_1.describeWithFlags('gpgpu_util createFloat32MatrixTexture', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('sets the TEXTURE_WRAP S+T parameters to CLAMP_TO_EDGE', function () {
        var gpgpu = new gpgpu_context_1.GPGPUContext();
        var textureConfig = gpgpu_util.getTextureConfig(gpgpu.gl);
        var debug = false;
        var tex = gpgpu_util.createFloat32MatrixTexture(gpgpu.gl, debug, 32, 32, textureConfig);
        gpgpu.gl.bindTexture(gpgpu.gl.TEXTURE_2D, tex);
        expect(gpgpu.gl.getTexParameter(gpgpu.gl.TEXTURE_2D, gpgpu.gl.TEXTURE_WRAP_S))
            .toEqual(gpgpu.gl.CLAMP_TO_EDGE);
        expect(gpgpu.gl.getTexParameter(gpgpu.gl.TEXTURE_2D, gpgpu.gl.TEXTURE_WRAP_T))
            .toEqual(gpgpu.gl.CLAMP_TO_EDGE);
        gpgpu.gl.bindTexture(gpgpu.gl.TEXTURE_2D, null);
        gpgpu.deleteMatrixTexture(tex);
        gpgpu.dispose();
    });
    it('sets the TEXTURE_[MIN|MAG]_FILTER parameters to NEAREST', function () {
        var gpgpu = new gpgpu_context_1.GPGPUContext();
        var textureConfig = gpgpu_util.getTextureConfig(gpgpu.gl);
        var debug = false;
        var tex = gpgpu_util.createFloat32MatrixTexture(gpgpu.gl, debug, 32, 32, textureConfig);
        gpgpu.gl.bindTexture(gpgpu.gl.TEXTURE_2D, tex);
        expect(gpgpu.gl.getTexParameter(gpgpu.gl.TEXTURE_2D, gpgpu.gl.TEXTURE_MIN_FILTER))
            .toEqual(gpgpu.gl.NEAREST);
        expect(gpgpu.gl.getTexParameter(gpgpu.gl.TEXTURE_2D, gpgpu.gl.TEXTURE_MAG_FILTER))
            .toEqual(gpgpu.gl.NEAREST);
        gpgpu.gl.bindTexture(gpgpu.gl.TEXTURE_2D, null);
        gpgpu.deleteMatrixTexture(tex);
        gpgpu.dispose();
    });
});
jasmine_util_1.describeWithFlags('gpgpu_util createPackedMatrixTexture', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('sets the TEXTURE_WRAP S+T parameters to CLAMP_TO_EDGE', function () {
        var gpgpu = new gpgpu_context_1.GPGPUContext();
        var textureConfig = gpgpu_util.getTextureConfig(gpgpu.gl);
        var debug = false;
        var tex = gpgpu_util.createPackedMatrixTexture(gpgpu.gl, debug, 32, 32, textureConfig);
        gpgpu.gl.bindTexture(gpgpu.gl.TEXTURE_2D, tex);
        expect(gpgpu.gl.getTexParameter(gpgpu.gl.TEXTURE_2D, gpgpu.gl.TEXTURE_WRAP_S))
            .toEqual(gpgpu.gl.CLAMP_TO_EDGE);
        expect(gpgpu.gl.getTexParameter(gpgpu.gl.TEXTURE_2D, gpgpu.gl.TEXTURE_WRAP_T))
            .toEqual(gpgpu.gl.CLAMP_TO_EDGE);
        gpgpu.gl.bindTexture(gpgpu.gl.TEXTURE_2D, null);
        gpgpu.deleteMatrixTexture(tex);
        gpgpu.dispose();
    });
    it('sets the TEXTURE_[MIN|MAG]_FILTER parameters to NEAREST', function () {
        var gpgpu = new gpgpu_context_1.GPGPUContext();
        var textureConfig = gpgpu_util.getTextureConfig(gpgpu.gl);
        var debug = false;
        var tex = gpgpu_util.createPackedMatrixTexture(gpgpu.gl, debug, 32, 32, textureConfig);
        gpgpu.gl.bindTexture(gpgpu.gl.TEXTURE_2D, tex);
        expect(gpgpu.gl.getTexParameter(gpgpu.gl.TEXTURE_2D, gpgpu.gl.TEXTURE_MIN_FILTER))
            .toEqual(gpgpu.gl.NEAREST);
        expect(gpgpu.gl.getTexParameter(gpgpu.gl.TEXTURE_2D, gpgpu.gl.TEXTURE_MAG_FILTER))
            .toEqual(gpgpu.gl.NEAREST);
        gpgpu.gl.bindTexture(gpgpu.gl.TEXTURE_2D, null);
        gpgpu.deleteMatrixTexture(tex);
        gpgpu.dispose();
    });
});
//# sourceMappingURL=gpgpu_util_test.js.map