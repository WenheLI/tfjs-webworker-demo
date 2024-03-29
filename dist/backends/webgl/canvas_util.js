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
var contexts = {};
var WEBGL_ATTRIBUTES = {
    alpha: false,
    antialias: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    depth: false,
    stencil: false,
    failIfMajorPerformanceCaveat: true
};
function setWebGLContext(webGLVersion, gl) {
    contexts[webGLVersion] = gl;
}
exports.setWebGLContext = setWebGLContext;
function getWebGLContext(webGLVersion) {
    if (!(webGLVersion in contexts)) {
        contexts[webGLVersion] = getWebGLRenderingContext(webGLVersion);
    }
    var gl = contexts[webGLVersion];
    if (gl.isContextLost()) {
        delete contexts[webGLVersion];
        return getWebGLContext(webGLVersion);
    }
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.STENCIL_TEST);
    gl.disable(gl.BLEND);
    gl.disable(gl.DITHER);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.disable(gl.SAMPLE_COVERAGE);
    gl.enable(gl.SCISSOR_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    return contexts[webGLVersion];
}
exports.getWebGLContext = getWebGLContext;
function createCanvas(webGLVersion) {
    if (typeof OffscreenCanvas !== 'undefined' && webGLVersion === 2) {
        return new OffscreenCanvas(300, 150);
    }
    else if (typeof document !== 'undefined') {
        return document.createElement('canvas');
    }
    else {
        throw new Error('Cannot create a canvas in this context');
    }
}
exports.createCanvas = createCanvas;
function getWebGLRenderingContext(webGLVersion) {
    if (webGLVersion !== 1 && webGLVersion !== 2) {
        throw new Error('Cannot get WebGL rendering context, WebGL is disabled.');
    }
    var canvas = createCanvas(webGLVersion);
    canvas.addEventListener('webglcontextlost', function (ev) {
        ev.preventDefault();
        delete contexts[webGLVersion];
    }, false);
    if (webGLVersion === 1) {
        return (canvas.getContext('webgl', WEBGL_ATTRIBUTES) ||
            canvas.getContext('experimental-webgl', WEBGL_ATTRIBUTES));
    }
    return canvas.getContext('webgl2', WEBGL_ATTRIBUTES);
}
//# sourceMappingURL=canvas_util.js.map