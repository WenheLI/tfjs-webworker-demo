"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
var device_util = require("../../device_util");
var environment_1 = require("../../environment");
var webgl_1 = require("../../webgl");
var canvas_util = require("./canvas_util");
describe('HAS_WEBGL', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('false when version is 0', function () {
        environment_1.ENV.set('WEBGL_VERSION', 0);
        expect(environment_1.ENV.getBool('HAS_WEBGL')).toBe(false);
    });
    it('true when version is 1', function () {
        environment_1.ENV.set('WEBGL_VERSION', 1);
        expect(environment_1.ENV.getBool('HAS_WEBGL')).toBe(true);
    });
    it('true when version is 2', function () {
        environment_1.ENV.set('WEBGL_VERSION', 2);
        expect(environment_1.ENV.getBool('HAS_WEBGL')).toBe(true);
    });
});
describe('WEBGL_PACK', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('true when HAS_WEBGL is true', function () {
        environment_1.ENV.set('HAS_WEBGL', true);
        expect(environment_1.ENV.getBool('WEBGL_PACK')).toBe(true);
    });
    it('false when HAS_WEBGL is false', function () {
        environment_1.ENV.set('HAS_WEBGL', false);
        expect(environment_1.ENV.getBool('WEBGL_PACK')).toBe(false);
    });
});
describe('WEBGL_PACK_NORMALIZATION', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('true when WEBGL_PACK is true', function () {
        environment_1.ENV.set('WEBGL_PACK', true);
        expect(environment_1.ENV.getBool('WEBGL_PACK_NORMALIZATION')).toBe(true);
    });
    it('false when WEBGL_PACK is false', function () {
        environment_1.ENV.set('WEBGL_PACK', false);
        expect(environment_1.ENV.getBool('WEBGL_PACK_NORMALIZATION')).toBe(false);
    });
});
describe('WEBGL_PACK_CLIP', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('true when WEBGL_PACK is true', function () {
        environment_1.ENV.set('WEBGL_PACK', true);
        expect(environment_1.ENV.getBool('WEBGL_PACK_CLIP')).toBe(true);
    });
    it('false when WEBGL_PACK is false', function () {
        environment_1.ENV.set('WEBGL_PACK', false);
        expect(environment_1.ENV.getBool('WEBGL_PACK_CLIP')).toBe(false);
    });
});
// TODO: https://github.com/tensorflow/tfjs/issues/1679
// describe('WEBGL_PACK_DEPTHWISECONV', () => {
//   beforeEach(() => ENV.reset());
//   afterAll(() => ENV.reset());
//   it('true when WEBGL_PACK is true', () => {
//     ENV.set('WEBGL_PACK', true);
//     expect(ENV.getBool('WEBGL_PACK_DEPTHWISECONV')).toBe(true);
//   });
//   it('false when WEBGL_PACK is false', () => {
//     ENV.set('WEBGL_PACK', false);
//     expect(ENV.getBool('WEBGL_PACK_DEPTHWISECONV')).toBe(false);
//   });
// });
describe('WEBGL_PACK_BINARY_OPERATIONS', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('true when WEBGL_PACK is true', function () {
        environment_1.ENV.set('WEBGL_PACK', true);
        expect(environment_1.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS')).toBe(true);
    });
    it('false when WEBGL_PACK is false', function () {
        environment_1.ENV.set('WEBGL_PACK', false);
        expect(environment_1.ENV.getBool('WEBGL_PACK_BINARY_OPERATIONS')).toBe(false);
    });
});
describe('WEBGL_PACK_ARRAY_OPERATIONS', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('true when WEBGL_PACK is true', function () {
        environment_1.ENV.set('WEBGL_PACK', true);
        expect(environment_1.ENV.getBool('WEBGL_PACK_ARRAY_OPERATIONS')).toBe(true);
    });
    it('false when WEBGL_PACK is false', function () {
        environment_1.ENV.set('WEBGL_PACK', false);
        expect(environment_1.ENV.getBool('WEBGL_PACK_ARRAY_OPERATIONS')).toBe(false);
    });
});
describe('WEBGL_PACK_IMAGE_OPERATIONS', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('true when WEBGL_PACK is true', function () {
        environment_1.ENV.set('WEBGL_PACK', true);
        expect(environment_1.ENV.getBool('WEBGL_PACK_IMAGE_OPERATIONS')).toBe(true);
    });
    it('false when WEBGL_PACK is false', function () {
        environment_1.ENV.set('WEBGL_PACK', false);
        expect(environment_1.ENV.getBool('WEBGL_PACK_IMAGE_OPERATIONS')).toBe(false);
    });
});
describe('WEBGL_PACK_REDUCE', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('true when WEBGL_PACK is true', function () {
        environment_1.ENV.set('WEBGL_PACK', true);
        expect(environment_1.ENV.getBool('WEBGL_PACK_REDUCE')).toBe(true);
    });
    it('false when WEBGL_PACK is false', function () {
        environment_1.ENV.set('WEBGL_PACK', false);
        expect(environment_1.ENV.getBool('WEBGL_PACK_REDUCE')).toBe(false);
    });
});
describe('WEBGL_LAZILY_UNPACK', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('true when WEBGL_PACK is true', function () {
        environment_1.ENV.set('WEBGL_PACK', true);
        expect(environment_1.ENV.getBool('WEBGL_LAZILY_UNPACK')).toBe(true);
    });
    it('false when WEBGL_PACK is false', function () {
        environment_1.ENV.set('WEBGL_PACK', false);
        expect(environment_1.ENV.getBool('WEBGL_LAZILY_UNPACK')).toBe(false);
    });
});
describe('WEBGL_CONV_IM2COL', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('true when WEBGL_PACK is true', function () {
        environment_1.ENV.set('WEBGL_PACK', true);
        expect(environment_1.ENV.getBool('WEBGL_CONV_IM2COL')).toBe(true);
    });
    it('false when WEBGL_PACK is false', function () {
        environment_1.ENV.set('WEBGL_PACK', false);
        expect(environment_1.ENV.getBool('WEBGL_CONV_IM2COL')).toBe(false);
    });
});
describe('WEBGL_MAX_TEXTURE_SIZE', function () {
    beforeEach(function () {
        environment_1.ENV.reset();
        webgl_1.webgl_util.MAX_TEXTURE_SIZE = null;
        spyOn(canvas_util, 'getWebGLContext').and.returnValue({
            MAX_TEXTURE_SIZE: 101,
            getParameter: function (param) {
                if (param === 101) {
                    return 50;
                }
                throw new Error("Got undefined param " + param + ".");
            }
        });
    });
    afterAll(function () {
        environment_1.ENV.reset();
        webgl_1.webgl_util.MAX_TEXTURE_SIZE = null;
    });
    it('is a function of gl.getParameter(MAX_TEXTURE_SIZE)', function () {
        expect(environment_1.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE')).toBe(50);
    });
});
describe('WEBGL_MAX_TEXTURES_IN_SHADER', function () {
    var maxTextures;
    beforeEach(function () {
        environment_1.ENV.reset();
        webgl_1.webgl_util.MAX_TEXTURES_IN_SHADER = null;
        spyOn(canvas_util, 'getWebGLContext').and.callFake(function () {
            return {
                MAX_TEXTURE_IMAGE_UNITS: 101,
                getParameter: function (param) {
                    if (param === 101) {
                        return maxTextures;
                    }
                    throw new Error("Got undefined param " + param + ".");
                }
            };
        });
    });
    afterAll(function () {
        environment_1.ENV.reset();
        webgl_1.webgl_util.MAX_TEXTURES_IN_SHADER = null;
    });
    it('is a function of gl.getParameter(MAX_TEXTURE_IMAGE_UNITS)', function () {
        maxTextures = 10;
        expect(environment_1.ENV.getNumber('WEBGL_MAX_TEXTURES_IN_SHADER')).toBe(10);
    });
    it('is capped at 16', function () {
        maxTextures = 20;
        expect(environment_1.ENV.getNumber('WEBGL_MAX_TEXTURES_IN_SHADER')).toBe(16);
    });
});
describe('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('disjoint query timer disabled', function () {
        environment_1.ENV.set('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION', 0);
        expect(environment_1.ENV.getBool('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE'))
            .toBe(false);
    });
    it('disjoint query timer enabled, mobile', function () {
        environment_1.ENV.set('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION', 1);
        spyOn(device_util, 'isMobile').and.returnValue(true);
        expect(environment_1.ENV.getBool('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE'))
            .toBe(false);
    });
    it('disjoint query timer enabled, not mobile', function () {
        environment_1.ENV.set('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION', 1);
        spyOn(device_util, 'isMobile').and.returnValue(false);
        expect(environment_1.ENV.getBool('WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE'))
            .toBe(true);
    });
});
describe('WEBGL_SIZE_UPLOAD_UNIFORM', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('is 0 when there is no float32 bit support', function () {
        environment_1.ENV.set('WEBGL_RENDER_FLOAT32_ENABLED', false);
        expect(environment_1.ENV.getNumber('WEBGL_SIZE_UPLOAD_UNIFORM')).toBe(0);
    });
    it('is > 0 when there is float32 bit support', function () {
        environment_1.ENV.set('WEBGL_RENDER_FLOAT32_ENABLED', true);
        expect(environment_1.ENV.getNumber('WEBGL_SIZE_UPLOAD_UNIFORM')).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=flags_webgl_test.js.map