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
var tf = require("../../index");
var jasmine_util_1 = require("../../jasmine_util");
var util = require("../../util");
var backend_webgl_test_registry_1 = require("./backend_webgl_test_registry");
var webgl_util = require("./webgl_util");
jasmine_util_1.describeWithFlags('getTextureShapeFromLogicalShape', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('scalar', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([]);
        expect(texShape).toEqual([1, 1]);
    });
    it('1d', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([4]);
        expect(texShape).toEqual([1, 4]);
    });
    it('2d stays same', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([5, 2]);
        expect(texShape).toEqual([5, 2]);
        texShape = webgl_util.getTextureShapeFromLogicalShape([5, 1]);
        expect(texShape).toEqual([5, 1]);
        texShape = webgl_util.getTextureShapeFromLogicalShape([1, 5]);
        expect(texShape).toEqual([1, 5]);
    });
    it('3d 2x3x4', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([2, 3, 4]);
        expect(texShape).toEqual([6, 4]);
    });
    it('3d 3x256x256', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([3, 256, 256]);
        expect(texShape).toEqual([3 * 256, 256]);
    });
    it('3d 2x1x4 got squeezed', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([2, 1, 4]);
        expect(texShape).toEqual([2, 4]);
    });
    it('3d 1x8x2 got squeezed', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([1, 8, 2]);
        expect(texShape).toEqual([8, 2]);
    });
    it('4d 2x2x256x256 got squeezed', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([2, 2, 256, 256]);
        expect(texShape).toEqual([2 * 2 * 256, 256]);
    });
    it('4d 1x8x1x3 got squeezed', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([1, 8, 1, 3]);
        expect(texShape).toEqual([8, 3]);
    });
    it('4d 1x3x1x8 got squeezed', function () {
        var texShape = webgl_util.getTextureShapeFromLogicalShape([1, 3, 1, 8]);
        expect(texShape).toEqual([3, 8]);
    });
});
jasmine_util_1.describeWithFlags('getTextureShapeFromLogicalShape packed', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('textures less than 2x max size of platform preserve their shapes', function () {
        var isPacked = true;
        var logicalShape = [
            2, util.nearestLargerEven(tf.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE') + 1)
        ];
        var texShape = webgl_util.getTextureShapeFromLogicalShape(logicalShape, isPacked);
        expect(texShape).toEqual(logicalShape);
    });
    it('rows/columns do not get squeezed', function () {
        var isPacked = true;
        var logicalShape = [1, 1, 1];
        var texShape = webgl_util.getTextureShapeFromLogicalShape(logicalShape, isPacked);
        expect(texShape).toEqual([2, 2]);
    });
    it('squarified texture shapes account for packing constraints', function () {
        var isPacked = true;
        var max = tf.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE');
        tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', 5);
        var logicalShape = [1, 12];
        var texShape = webgl_util.getTextureShapeFromLogicalShape(logicalShape, isPacked);
        tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', max);
        expect(texShape).toEqual([6, 4]);
    });
});
jasmine_util_1.describeWithFlags('isReshapeFree', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('is free when shapes have the same inner dimensions', function () {
        var before = [1, 2, 3];
        var after = [5, 2, 3];
        expect(webgl_util.isReshapeFree(before, after)).toBe(true);
    });
    it('is free when one of the shapes is a scalar', function () {
        var before = [];
        var after = [1, 2, 3];
        expect(webgl_util.isReshapeFree(before, after)).toBe(true);
    });
    it('is free when one of the dimensions equals 0', function () {
        var before = [1, 0];
        var after = [1, 2, 3];
        expect(webgl_util.isReshapeFree(before, after)).toBe(true);
    });
    it('is free when one shape is a vector and the final dimensions match', function () {
        var before = [9];
        var after = [1, 1, 9];
        expect(webgl_util.isReshapeFree(before, after)).toBe(true);
    });
    it('is free when one shape is a vector and the other has 1 row' +
        'in every batch and the final dimensions are even', function () {
        var before = [10];
        var after = [5, 1, 2];
        expect(webgl_util.isReshapeFree(before, after)).toBe(true);
    });
    it('is not free when one shape is a vector and the final dimensions' +
        'do not match and are not even', function () {
        var before = [18];
        var after = [2, 1, 9];
        expect(webgl_util.isReshapeFree(before, after)).toBe(false);
    });
    it('is free if the rows are divisible by two and the columns are the same', function () {
        var before = [1, 2, 3];
        var after = [1, 4, 3];
        expect(webgl_util.isReshapeFree(before, after)).toBe(true);
    });
    it('is not free when the inner dimensions are different and even', function () {
        var before = [1, 2, 4];
        var after = [1, 8, 10];
        expect(webgl_util.isReshapeFree(before, after)).toBe(false);
    });
    it('is not free when the inner dimensions are different and not all even', function () {
        var before = [1, 2, 3];
        var after = [1, 3, 2];
        expect(webgl_util.isReshapeFree(before, after)).toBe(false);
    });
});
//# sourceMappingURL=webgl_util_test.js.map