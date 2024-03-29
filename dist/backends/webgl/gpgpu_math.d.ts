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
import { Tensor } from '../../tensor';
import { TypedArray } from '../../types';
import { GPGPUContext } from './gpgpu_context';
import { ShapeInfo } from './shader_compiler';
import { TextureData } from './tex_util';
export interface GPGPUProgram {
    variableNames: string[];
    outputShape: number[];
    userCode: string;
    usesPackedTextures?: boolean;
}
export interface GPGPUBinary {
    webGLProgram: WebGLProgram;
    program: GPGPUProgram;
    uniformLocations: {
        [name: string]: WebGLUniformLocation;
    };
    source: string;
    inShapeInfos: ShapeInfo[];
    outShapeInfo: ShapeInfo;
    infLoc: WebGLUniformLocation;
    nanLoc: WebGLUniformLocation;
}
export interface TensorData {
    shape: number[];
    texData: TextureData;
    isUniform: boolean;
    uniformValues?: TypedArray;
}
export declare function compileProgram<T extends Tensor, K extends Tensor>(gpgpu: GPGPUContext, program: GPGPUProgram, inputs: TensorData[], output: TensorData): GPGPUBinary;
export declare function runProgram<T extends Tensor, K extends Tensor>(gpgpu: GPGPUContext, binary: GPGPUBinary, inputs: TensorData[], output: TensorData, customSetup?: (gpgpu: GPGPUContext, webGLProgram: WebGLProgram) => void): void;
export declare function makeShaderKey(program: GPGPUProgram, inputs: TensorData[], output: TensorData): string;
