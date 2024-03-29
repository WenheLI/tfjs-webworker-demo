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
var util = require("../../util");
var canvas_util_1 = require("./canvas_util");
function callAndCheck(gl, debugMode, func) {
    var returnValue = func();
    if (debugMode) {
        checkWebGLError(gl);
    }
    return returnValue;
}
exports.callAndCheck = callAndCheck;
function checkWebGLError(gl) {
    var error = gl.getError();
    if (error !== gl.NO_ERROR) {
        throw new Error('WebGL Error: ' + getWebGLErrorMessage(gl, error));
    }
}
// https://en.wikipedia.org/wiki/Half-precision_floating-point_format
var MIN_FLOAT16 = 5.96e-8;
var MAX_FLOAT16 = 65504;
function canBeRepresented(num) {
    if (environment_1.ENV.getBool('WEBGL_RENDER_FLOAT32_ENABLED') || num === 0 ||
        (MIN_FLOAT16 < Math.abs(num) && Math.abs(num) < MAX_FLOAT16)) {
        return true;
    }
    return false;
}
exports.canBeRepresented = canBeRepresented;
function getWebGLErrorMessage(gl, status) {
    switch (status) {
        case gl.NO_ERROR:
            return 'NO_ERROR';
        case gl.INVALID_ENUM:
            return 'INVALID_ENUM';
        case gl.INVALID_VALUE:
            return 'INVALID_VALUE';
        case gl.INVALID_OPERATION:
            return 'INVALID_OPERATION';
        case gl.INVALID_FRAMEBUFFER_OPERATION:
            return 'INVALID_FRAMEBUFFER_OPERATION';
        case gl.OUT_OF_MEMORY:
            return 'OUT_OF_MEMORY';
        case gl.CONTEXT_LOST_WEBGL:
            return 'CONTEXT_LOST_WEBGL';
        default:
            return "Unknown error code " + status;
    }
}
exports.getWebGLErrorMessage = getWebGLErrorMessage;
function getExtensionOrThrow(gl, debug, extensionName) {
    return throwIfNull(gl, debug, function () { return gl.getExtension(extensionName); }, 'Extension "' + extensionName + '" not supported on this browser.');
}
exports.getExtensionOrThrow = getExtensionOrThrow;
function createVertexShader(gl, debug, vertexShaderSource) {
    var vertexShader = throwIfNull(gl, debug, function () { return gl.createShader(gl.VERTEX_SHADER); }, 'Unable to create vertex WebGLShader.');
    callAndCheck(gl, debug, function () { return gl.shaderSource(vertexShader, vertexShaderSource); });
    callAndCheck(gl, debug, function () { return gl.compileShader(vertexShader); });
    if (gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) === false) {
        console.log(gl.getShaderInfoLog(vertexShader));
        throw new Error('Failed to compile vertex shader.');
    }
    return vertexShader;
}
exports.createVertexShader = createVertexShader;
function createFragmentShader(gl, debug, fragmentShaderSource) {
    var fragmentShader = throwIfNull(gl, debug, function () { return gl.createShader(gl.FRAGMENT_SHADER); }, 'Unable to create fragment WebGLShader.');
    callAndCheck(gl, debug, function () { return gl.shaderSource(fragmentShader, fragmentShaderSource); });
    callAndCheck(gl, debug, function () { return gl.compileShader(fragmentShader); });
    if (gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) === false) {
        logShaderSourceAndInfoLog(fragmentShaderSource, gl.getShaderInfoLog(fragmentShader));
        throw new Error('Failed to compile fragment shader.');
    }
    return fragmentShader;
}
exports.createFragmentShader = createFragmentShader;
var lineNumberRegex = /ERROR: [0-9]+:([0-9]+):/g;
function logShaderSourceAndInfoLog(shaderSource, shaderInfoLog) {
    var lineNumberRegexResult = lineNumberRegex.exec(shaderInfoLog);
    if (lineNumberRegexResult == null) {
        console.log("Couldn't parse line number in error: " + shaderInfoLog);
        console.log(shaderSource);
        return;
    }
    var lineNumber = +lineNumberRegexResult[1];
    var shaderLines = shaderSource.split('\n');
    var pad = shaderLines.length.toString().length + 2;
    var linesWithLineNumbers = shaderLines.map(function (line, lineNumber) {
        return util.rightPad((lineNumber + 1).toString(), pad) + line;
    });
    var maxLineLength = 0;
    for (var i = 0; i < linesWithLineNumbers.length; i++) {
        maxLineLength = Math.max(linesWithLineNumbers[i].length, maxLineLength);
    }
    var beforeErrorLines = linesWithLineNumbers.slice(0, lineNumber - 1);
    var errorLine = linesWithLineNumbers.slice(lineNumber - 1, lineNumber);
    var afterErrorLines = linesWithLineNumbers.slice(lineNumber);
    console.log(beforeErrorLines.join('\n'));
    console.log(shaderInfoLog.split('\n')[0]);
    console.log("%c " + util.rightPad(errorLine[0], maxLineLength), 'border:1px solid red; background-color:#e3d2d2; color:#a61717');
    console.log(afterErrorLines.join('\n'));
}
function createProgram(gl, debug) {
    return throwIfNull(gl, debug, function () { return gl.createProgram(); }, 'Unable to create WebGLProgram.');
}
exports.createProgram = createProgram;
function linkProgram(gl, debug, program) {
    callAndCheck(gl, debug, function () { return gl.linkProgram(program); });
    if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
        console.log(gl.getProgramInfoLog(program));
        throw new Error('Failed to link vertex and fragment shaders.');
    }
}
exports.linkProgram = linkProgram;
function validateProgram(gl, debug, program) {
    callAndCheck(gl, debug, function () { return gl.validateProgram(program); });
    if (gl.getProgramParameter(program, gl.VALIDATE_STATUS) === false) {
        console.log(gl.getProgramInfoLog(program));
        throw new Error('Shader program validation failed.');
    }
}
exports.validateProgram = validateProgram;
function createStaticVertexBuffer(gl, debug, data) {
    var buffer = throwIfNull(gl, debug, function () { return gl.createBuffer(); }, 'Unable to create WebGLBuffer');
    callAndCheck(gl, debug, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, buffer); });
    callAndCheck(gl, debug, function () { return gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); });
    return buffer;
}
exports.createStaticVertexBuffer = createStaticVertexBuffer;
function createStaticIndexBuffer(gl, debug, data) {
    var buffer = throwIfNull(gl, debug, function () { return gl.createBuffer(); }, 'Unable to create WebGLBuffer');
    callAndCheck(gl, debug, function () { return gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer); });
    callAndCheck(gl, debug, function () { return gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW); });
    return buffer;
}
exports.createStaticIndexBuffer = createStaticIndexBuffer;
function getNumChannels() {
    if (environment_1.ENV.getNumber('WEBGL_VERSION') === 2) {
        return 1;
    }
    return 4;
}
exports.getNumChannels = getNumChannels;
function createTexture(gl, debug) {
    return throwIfNull(gl, debug, function () { return gl.createTexture(); }, 'Unable to create WebGLTexture.');
}
exports.createTexture = createTexture;
function validateTextureSize(width, height) {
    var maxTextureSize = environment_1.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE');
    if ((width <= 0) || (height <= 0)) {
        var requested = "[" + width + "x" + height + "]";
        throw new Error('Requested texture size ' + requested + ' is invalid.');
    }
    if ((width > maxTextureSize) || (height > maxTextureSize)) {
        var requested = "[" + width + "x" + height + "]";
        var max = "[" + maxTextureSize + "x" + maxTextureSize + "]";
        throw new Error('Requested texture size ' + requested +
            ' greater than WebGL maximum on this browser / GPU ' + max + '.');
    }
}
exports.validateTextureSize = validateTextureSize;
function createFramebuffer(gl, debug) {
    return throwIfNull(gl, debug, function () { return gl.createFramebuffer(); }, 'Unable to create WebGLFramebuffer.');
}
exports.createFramebuffer = createFramebuffer;
function bindVertexBufferToProgramAttribute(gl, debug, program, attribute, buffer, arrayEntriesPerItem, itemStrideInBytes, itemOffsetInBytes) {
    var loc = gl.getAttribLocation(program, attribute);
    if (loc === -1) {
        // The GPU compiler decided to strip out this attribute because it's unused,
        // thus no need to bind.
        return false;
    }
    callAndCheck(gl, debug, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, buffer); });
    callAndCheck(gl, debug, function () { return gl.vertexAttribPointer(loc, arrayEntriesPerItem, gl.FLOAT, false, itemStrideInBytes, itemOffsetInBytes); });
    callAndCheck(gl, debug, function () { return gl.enableVertexAttribArray(loc); });
    return true;
}
exports.bindVertexBufferToProgramAttribute = bindVertexBufferToProgramAttribute;
function bindTextureUnit(gl, debug, texture, textureUnit) {
    validateTextureUnit(gl, textureUnit);
    callAndCheck(gl, debug, function () { return gl.activeTexture(gl.TEXTURE0 + textureUnit); });
    callAndCheck(gl, debug, function () { return gl.bindTexture(gl.TEXTURE_2D, texture); });
}
exports.bindTextureUnit = bindTextureUnit;
function unbindTextureUnit(gl, debug, textureUnit) {
    validateTextureUnit(gl, textureUnit);
    callAndCheck(gl, debug, function () { return gl.activeTexture(gl.TEXTURE0 + textureUnit); });
    callAndCheck(gl, debug, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
}
exports.unbindTextureUnit = unbindTextureUnit;
function getProgramUniformLocationOrThrow(gl, debug, program, uniformName) {
    return throwIfNull(gl, debug, function () { return gl.getUniformLocation(program, uniformName); }, 'uniform "' + uniformName + '" not present in program.');
}
exports.getProgramUniformLocationOrThrow = getProgramUniformLocationOrThrow;
function getProgramUniformLocation(gl, program, uniformName) {
    return gl.getUniformLocation(program, uniformName);
}
exports.getProgramUniformLocation = getProgramUniformLocation;
function bindTextureToProgramUniformSampler(gl, debug, program, texture, uniformSamplerLocation, textureUnit) {
    callAndCheck(gl, debug, function () { return bindTextureUnit(gl, debug, texture, textureUnit); });
    callAndCheck(gl, debug, function () { return gl.uniform1i(uniformSamplerLocation, textureUnit); });
}
exports.bindTextureToProgramUniformSampler = bindTextureToProgramUniformSampler;
function bindCanvasToFramebuffer(gl, debug) {
    callAndCheck(gl, debug, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, null); });
    callAndCheck(gl, debug, function () { return gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); });
    callAndCheck(gl, debug, function () { return gl.scissor(0, 0, gl.canvas.width, gl.canvas.height); });
}
exports.bindCanvasToFramebuffer = bindCanvasToFramebuffer;
function bindColorTextureToFramebuffer(gl, debug, texture, framebuffer) {
    callAndCheck(gl, debug, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); });
    callAndCheck(gl, debug, function () { return gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0); });
}
exports.bindColorTextureToFramebuffer = bindColorTextureToFramebuffer;
function unbindColorTextureFromFramebuffer(gl, debug, framebuffer) {
    callAndCheck(gl, debug, function () { return gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); });
    callAndCheck(gl, debug, function () { return gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0); });
}
exports.unbindColorTextureFromFramebuffer = unbindColorTextureFromFramebuffer;
function validateFramebuffer(gl) {
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error('Error binding framebuffer: ' + getFramebufferErrorMessage(gl, status));
    }
}
exports.validateFramebuffer = validateFramebuffer;
function getFramebufferErrorMessage(gl, status) {
    switch (status) {
        case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            return 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT';
        case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            return 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT';
        case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            return 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS';
        case gl.FRAMEBUFFER_UNSUPPORTED:
            return 'FRAMEBUFFER_UNSUPPORTED';
        default:
            return "unknown error " + status;
    }
}
exports.getFramebufferErrorMessage = getFramebufferErrorMessage;
function throwIfNull(gl, debug, returnTOrNull, failureMessage) {
    var tOrNull = callAndCheck(gl, debug, function () { return returnTOrNull(); });
    if (tOrNull == null) {
        throw new Error(failureMessage);
    }
    return tOrNull;
}
function validateTextureUnit(gl, textureUnit) {
    var maxTextureUnit = gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1;
    var glTextureUnit = textureUnit + gl.TEXTURE0;
    if (glTextureUnit < gl.TEXTURE0 || glTextureUnit > maxTextureUnit) {
        var textureUnitRange = "[gl.TEXTURE0, gl.TEXTURE" + maxTextureUnit + "]";
        throw new Error("textureUnit must be in " + textureUnitRange + ".");
    }
}
function getBatchDim(shape, dimsToSkip) {
    if (dimsToSkip === void 0) { dimsToSkip = 2; }
    return util.sizeFromShape(shape.slice(0, shape.length - dimsToSkip));
}
exports.getBatchDim = getBatchDim;
function getRowsCols(shape) {
    if (shape.length === 0) {
        throw Error('Cannot get rows and columns of an empty shape array.');
    }
    return [
        shape.length > 1 ? shape[shape.length - 2] : 1, shape[shape.length - 1]
    ];
}
exports.getRowsCols = getRowsCols;
function getShapeAs3D(shape) {
    var shapeAs3D = [1, 1, 1];
    var isScalar = shape.length === 0 || (shape.length === 1 && shape[0] === 1);
    if (!isScalar) {
        shapeAs3D =
            [getBatchDim(shape)].concat(getRowsCols(shape));
    }
    return shapeAs3D;
}
exports.getShapeAs3D = getShapeAs3D;
function getTextureShapeFromLogicalShape(logShape, isPacked) {
    if (isPacked === void 0) { isPacked = false; }
    var _a;
    var maxTexSize = environment_1.ENV.getNumber('WEBGL_MAX_TEXTURE_SIZE');
    if (isPacked) {
        maxTexSize = maxTexSize * 2;
        // This logic ensures we accurately count the number of packed texels needed
        // to accommodate the tensor. We can only pack values in the same texel if
        // they are from adjacent pairs of rows/cols within the same batch. So if a
        // tensor has 3 rows, we pretend it has 4 rows in order to account for the
        // fact that the texels containing the third row are half empty.
        logShape = logShape.map(function (d, i) { return i >= logShape.length - 2 ?
            util.nearestLargerEven(logShape[i]) :
            logShape[i]; });
        // Packed texture height is at least 2 (the channel height of a single
        // texel).
        if (logShape.length === 1) {
            logShape = [2, logShape[0]];
        }
    }
    // If logical shape is 2, we don't squeeze, since we want to match physical.
    if (logShape.length !== 2) {
        var squeezeResult = util.squeezeShape(logShape);
        logShape = squeezeResult.newShape;
    }
    var size = util.sizeFromShape(logShape);
    if (logShape.length <= 1 && size <= maxTexSize) {
        return [1, size];
    }
    else if (logShape.length === 2 && logShape[0] <= maxTexSize &&
        logShape[1] <= maxTexSize) {
        return logShape;
    }
    else if (logShape.length === 3 && logShape[0] * logShape[1] <= maxTexSize &&
        logShape[2] <= maxTexSize) {
        return [logShape[0] * logShape[1], logShape[2]];
    }
    else if (logShape.length === 3 && logShape[0] <= maxTexSize &&
        logShape[1] * logShape[2] <= maxTexSize) {
        return [logShape[0], logShape[1] * logShape[2]];
    }
    else if (logShape.length === 4 &&
        logShape[0] * logShape[1] * logShape[2] <= maxTexSize &&
        logShape[3] <= maxTexSize) {
        return [logShape[0] * logShape[1] * logShape[2], logShape[3]];
    }
    else if (logShape.length === 4 && logShape[0] <= maxTexSize &&
        logShape[1] * logShape[2] * logShape[3] <= maxTexSize) {
        return [logShape[0], logShape[1] * logShape[2] * logShape[3]];
    }
    else {
        if (isPacked) {
            // For packed textures size equals the number of channels required to
            // accommodate the texture data. However in order to squarify such that
            // inner dimensions stay even, we rewrite size to equal the number of
            // texels. Then in the return statement we rehydrate the squarified
            // dimensions to channel units.
            var batchDim = getBatchDim(logShape);
            var rows = 2, cols = 2;
            if (logShape.length) {
                _a = getRowsCols(logShape), rows = _a[0], cols = _a[1];
            }
            size = batchDim * (rows / 2) * (cols / 2);
            return util.sizeToSquarishShape(size).map(function (d) { return d * 2; });
        }
        return util.sizeToSquarishShape(size);
    }
}
exports.getTextureShapeFromLogicalShape = getTextureShapeFromLogicalShape;
function isEven(n) {
    return n % 2 === 0;
}
/**
 * This determines whether reshaping a packed texture requires rearranging
 * the data within the texture, assuming 2x2 packing.
 */
function isReshapeFree(shape1, shape2) {
    shape1 = shape1.slice(-2);
    shape2 = shape2.slice(-2);
    if (util.arraysEqual(shape1, shape2)) {
        return true;
    }
    if (!shape1.length || !shape2.length) { // One of the shapes is a scalar.
        return true;
    }
    if (shape1[0] === 0 || shape1[1] === 0 || shape2[0] === 0 ||
        shape2[1] === 0) {
        return true;
    }
    if (shape1.length !== shape2.length) { // One of the shapes is a vector.
        var shape1Cols = shape1.slice(-1)[0];
        var shape2Cols = shape2.slice(-1)[0];
        if (shape1Cols === shape2Cols) {
            return true;
        }
        if (isEven(shape1Cols) && isEven(shape2Cols) &&
            (shape1[0] === 1 || shape2[0] === 1)) {
            return true;
        }
    }
    return shape1[1] === shape2[1] && isEven(shape1[0]) && isEven(shape2[0]);
}
exports.isReshapeFree = isReshapeFree;
function getWebGLMaxTextureSize(webGLVersion) {
    if (exports.MAX_TEXTURE_SIZE == null) {
        var gl = canvas_util_1.getWebGLContext(webGLVersion);
        exports.MAX_TEXTURE_SIZE = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
    return exports.MAX_TEXTURE_SIZE;
}
exports.getWebGLMaxTextureSize = getWebGLMaxTextureSize;
function getMaxTexturesInShader(webGLVersion) {
    if (exports.MAX_TEXTURES_IN_SHADER == null) {
        var gl = canvas_util_1.getWebGLContext(webGLVersion);
        exports.MAX_TEXTURES_IN_SHADER = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    }
    // We cap at 16 to avoid spurious runtime "memory exhausted" error.
    return Math.min(16, exports.MAX_TEXTURES_IN_SHADER);
}
exports.getMaxTexturesInShader = getMaxTexturesInShader;
function getWebGLDisjointQueryTimerVersion(webGLVersion) {
    if (webGLVersion === 0) {
        return 0;
    }
    var queryTimerVersion;
    var gl = canvas_util_1.getWebGLContext(webGLVersion);
    if (hasExtension(gl, 'EXT_disjoint_timer_query_webgl2') &&
        webGLVersion === 2) {
        queryTimerVersion = 2;
    }
    else if (hasExtension(gl, 'EXT_disjoint_timer_query')) {
        queryTimerVersion = 1;
    }
    else {
        queryTimerVersion = 0;
    }
    return queryTimerVersion;
}
exports.getWebGLDisjointQueryTimerVersion = getWebGLDisjointQueryTimerVersion;
function hasExtension(gl, extensionName) {
    var ext = gl.getExtension(extensionName);
    return ext != null;
}
function isWebGLVersionEnabled(webGLVersion) {
    try {
        var gl = canvas_util_1.getWebGLContext(webGLVersion);
        if (gl != null) {
            return true;
        }
    }
    catch (e) {
        return false;
    }
    return false;
}
exports.isWebGLVersionEnabled = isWebGLVersionEnabled;
function isRenderToFloatTextureEnabled(webGLVersion) {
    if (webGLVersion === 0) {
        return false;
    }
    var gl = canvas_util_1.getWebGLContext(webGLVersion);
    if (webGLVersion === 1) {
        if (!hasExtension(gl, 'OES_texture_float')) {
            return false;
        }
    }
    else {
        if (!hasExtension(gl, 'EXT_color_buffer_float')) {
            return false;
        }
    }
    var isFrameBufferComplete = createFloatTextureAndBindToFramebuffer(gl, webGLVersion);
    return isFrameBufferComplete;
}
exports.isRenderToFloatTextureEnabled = isRenderToFloatTextureEnabled;
function isDownloadFloatTextureEnabled(webGLVersion) {
    if (webGLVersion === 0) {
        return false;
    }
    var gl = canvas_util_1.getWebGLContext(webGLVersion);
    if (webGLVersion === 1) {
        if (!hasExtension(gl, 'OES_texture_float')) {
            return false;
        }
        if (!hasExtension(gl, 'WEBGL_color_buffer_float')) {
            return false;
        }
    }
    else {
        if (!hasExtension(gl, 'EXT_color_buffer_float')) {
            return false;
        }
    }
    var isFrameBufferComplete = createFloatTextureAndBindToFramebuffer(gl, webGLVersion);
    return isFrameBufferComplete;
}
exports.isDownloadFloatTextureEnabled = isDownloadFloatTextureEnabled;
function createFloatTextureAndBindToFramebuffer(gl, webGLVersion) {
    var frameBuffer = gl.createFramebuffer();
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // tslint:disable-next-line:no-any
    var internalFormat = webGLVersion === 2 ? gl.RGBA32F : gl.RGBA;
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 1, 1, 0, gl.RGBA, gl.FLOAT, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    var isFrameBufferComplete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(frameBuffer);
    return isFrameBufferComplete;
}
function isWebGLFenceEnabled(webGLVersion) {
    if (webGLVersion !== 2) {
        return false;
    }
    var gl = canvas_util_1.getWebGLContext(webGLVersion);
    // tslint:disable-next-line:no-any
    var isEnabled = gl.fenceSync != null;
    return isEnabled;
}
exports.isWebGLFenceEnabled = isWebGLFenceEnabled;
//# sourceMappingURL=webgl_util.js.map