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
export declare function callAndCheck<T>(gl: WebGLRenderingContext, debugMode: boolean, func: () => T): T;
export declare function canBeRepresented(num: number): boolean;
export declare function getWebGLErrorMessage(gl: WebGLRenderingContext, status: number): string;
export declare function getExtensionOrThrow(gl: WebGLRenderingContext, debug: boolean, extensionName: string): {};
export declare function createVertexShader(gl: WebGLRenderingContext, debug: boolean, vertexShaderSource: string): WebGLShader;
export declare function createFragmentShader(gl: WebGLRenderingContext, debug: boolean, fragmentShaderSource: string): WebGLShader;
export declare function createProgram(gl: WebGLRenderingContext, debug: boolean): WebGLProgram;
export declare function linkProgram(gl: WebGLRenderingContext, debug: boolean, program: WebGLProgram): void;
export declare function validateProgram(gl: WebGLRenderingContext, debug: boolean, program: WebGLProgram): void;
export declare function createStaticVertexBuffer(gl: WebGLRenderingContext, debug: boolean, data: Float32Array): WebGLBuffer;
export declare function createStaticIndexBuffer(gl: WebGLRenderingContext, debug: boolean, data: Uint16Array): WebGLBuffer;
export declare function getNumChannels(): number;
export declare function createTexture(gl: WebGLRenderingContext, debug: boolean): WebGLTexture;
export declare function validateTextureSize(width: number, height: number): void;
export declare function createFramebuffer(gl: WebGLRenderingContext, debug: boolean): WebGLFramebuffer;
export declare function bindVertexBufferToProgramAttribute(gl: WebGLRenderingContext, debug: boolean, program: WebGLProgram, attribute: string, buffer: WebGLBuffer, arrayEntriesPerItem: number, itemStrideInBytes: number, itemOffsetInBytes: number): boolean;
export declare function bindTextureUnit(gl: WebGLRenderingContext, debug: boolean, texture: WebGLTexture, textureUnit: number): void;
export declare function unbindTextureUnit(gl: WebGLRenderingContext, debug: boolean, textureUnit: number): void;
export declare function getProgramUniformLocationOrThrow(gl: WebGLRenderingContext, debug: boolean, program: WebGLProgram, uniformName: string): WebGLUniformLocation;
export declare function getProgramUniformLocation(gl: WebGLRenderingContext, program: WebGLProgram, uniformName: string): WebGLUniformLocation;
export declare function bindTextureToProgramUniformSampler(gl: WebGLRenderingContext, debug: boolean, program: WebGLProgram, texture: WebGLTexture, uniformSamplerLocation: WebGLUniformLocation, textureUnit: number): void;
export declare function bindCanvasToFramebuffer(gl: WebGLRenderingContext, debug: boolean): void;
export declare function bindColorTextureToFramebuffer(gl: WebGLRenderingContext, debug: boolean, texture: WebGLTexture, framebuffer: WebGLFramebuffer): void;
export declare function unbindColorTextureFromFramebuffer(gl: WebGLRenderingContext, debug: boolean, framebuffer: WebGLFramebuffer): void;
export declare function validateFramebuffer(gl: WebGLRenderingContext): void;
export declare function getFramebufferErrorMessage(gl: WebGLRenderingContext, status: number): string;
export declare function getBatchDim(shape: number[], dimsToSkip?: number): number;
export declare function getRowsCols(shape: number[]): [number, number];
export declare function getShapeAs3D(shape: number[]): [number, number, number];
export declare function getTextureShapeFromLogicalShape(logShape: number[], isPacked?: boolean): [number, number];
/**
 * This determines whether reshaping a packed texture requires rearranging
 * the data within the texture, assuming 2x2 packing.
 */
export declare function isReshapeFree(shape1: number[], shape2: number[]): boolean;
export declare let MAX_TEXTURE_SIZE: number;
export declare let MAX_TEXTURES_IN_SHADER: number;
export declare function getWebGLMaxTextureSize(webGLVersion: number): number;
export declare function getMaxTexturesInShader(webGLVersion: number): number;
export declare function getWebGLDisjointQueryTimerVersion(webGLVersion: number): number;
export declare function isWebGLVersionEnabled(webGLVersion: 1 | 2): boolean;
export declare function isRenderToFloatTextureEnabled(webGLVersion: number): boolean;
export declare function isDownloadFloatTextureEnabled(webGLVersion: number): boolean;
export declare function isWebGLFenceEnabled(webGLVersion: number): boolean;
