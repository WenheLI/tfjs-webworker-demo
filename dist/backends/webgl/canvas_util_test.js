"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
var canvas_util_1 = require("./canvas_util");
jasmine_util_1.describeWithFlags('canvas_util', jasmine_util_1.BROWSER_ENVS, function () {
    it('Returns a valid canvas', function () {
        var canvas = canvas_util_1.getWebGLContext(environment_1.ENV.getNumber('WEBGL_VERSION')).canvas;
        expect((canvas instanceof HTMLCanvasElement) ||
            (canvas instanceof OffscreenCanvas))
            .toBe(true);
    });
    it('Returns a valid gl context', function () {
        var gl = canvas_util_1.getWebGLContext(environment_1.ENV.getNumber('WEBGL_VERSION'));
        expect(gl.isContextLost()).toBe(false);
    });
});
jasmine_util_1.describeWithFlags('canvas_util webgl2', { flags: { WEBGL_VERSION: 2 } }, function () {
    it('is ok when the user requests webgl 1 canvas', function () {
        var canvas = canvas_util_1.getWebGLContext(1).canvas;
        expect((canvas instanceof HTMLCanvasElement)).toBe(true);
    });
});
//# sourceMappingURL=canvas_util_test.js.map