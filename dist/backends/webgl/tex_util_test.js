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
var test_util_1 = require("../../test_util");
var backend_webgl_test_registry_1 = require("./backend_webgl_test_registry");
var tex_util = require("./tex_util");
describe('tex_util getUnpackedMatrixTextureShapeWidthHeight', function () {
    it('[1x1] => [1x1]', function () {
        expect(tex_util.getUnpackedMatrixTextureShapeWidthHeight(1, 1)).toEqual([
            1, 1
        ]);
    });
    it('[MxN] => [NxM]', function () {
        expect(tex_util.getUnpackedMatrixTextureShapeWidthHeight(123, 456))
            .toEqual([456, 123]);
    });
});
describe('tex_util getPackedMatrixTextureShapeWidthHeight', function () {
    it('[1x1] => [1x1]', function () {
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(1, 1);
        expect(shape).toEqual([1, 1]);
    });
    it('[1x2] => [1x1]', function () {
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(1, 2);
        expect(shape).toEqual([1, 1]);
    });
    it('[2x1] => [1x1]', function () {
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(2, 1);
        expect(shape).toEqual([1, 1]);
    });
    it('[2x2] => [1x1]', function () {
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(2, 2);
        expect(shape).toEqual([1, 1]);
    });
    it('[3x3] => [2x2]', function () {
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(3, 3);
        expect(shape).toEqual([2, 2]);
    });
    it('[4x3] => [2x2]', function () {
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(4, 3);
        expect(shape).toEqual([2, 2]);
    });
    it('[3x4] => [2x2]', function () {
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(3, 4);
        expect(shape).toEqual([2, 2]);
    });
    it('[4x4] => [2x2]', function () {
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(4, 4);
        expect(shape).toEqual([2, 2]);
    });
    it('[1024x1024] => [512x512]', function () {
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(1024, 1024);
        expect(shape).toEqual([512, 512]);
    });
    it('[MxN] => [ceil(N/2)xceil(M/2)]', function () {
        var M = 123;
        var N = 5013;
        var shape = tex_util.getPackedMatrixTextureShapeWidthHeight(M, N);
        expect(shape).toEqual([Math.ceil(N / 2), Math.ceil(M / 2)]);
    });
});
jasmine_util_1.describeWithFlags('tex_util getDenseTexShape', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('basic', function () {
        var shape = [1, 3, 3, 4];
        var denseShape = tex_util.getDenseTexShape(shape);
        test_util_1.expectArraysClose(denseShape, [3, 3]);
    });
});
//# sourceMappingURL=tex_util_test.js.map