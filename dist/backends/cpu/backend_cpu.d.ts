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
import { Conv2DInfo, Conv3DInfo } from '../../ops/conv_util';
import { Activation } from '../../ops/fused_util';
import { DataId, Scalar, Tensor, Tensor1D, Tensor2D, Tensor3D, Tensor4D, Tensor5D } from '../../tensor';
import { BackendValues, DataType, PixelData, Rank, ShapeMap } from '../../types';
import { BackendTimingInfo, KernelBackend } from '../backend';
export declare class MathBackendCPU implements KernelBackend {
    blockSize: number;
    private data;
    private fromPixels2DContext;
    private firstUse;
    constructor();
    register(dataId: DataId, shape: number[], dtype: DataType): void;
    write(dataId: DataId, values: BackendValues): void;
    fromPixels(pixels: PixelData | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, numChannels: number): Tensor3D;
    read(dataId: DataId): Promise<BackendValues>;
    readSync(dataId: DataId): BackendValues;
    private bufferSync;
    disposeData(dataId: DataId): void;
    time(f: () => void): Promise<BackendTimingInfo>;
    memory(): {
        unreliable: boolean;
        reasons: string[];
    };
    complex<T extends Tensor>(real: T, imag: T): T;
    real<T extends Tensor>(input: T): T;
    imag<T extends Tensor>(input: T): T;
    private assertNotComplex;
    slice<T extends Tensor>(x: T, begin: number[], size: number[]): T;
    stridedSlice<T extends Tensor>(x: T, begin: number[], end: number[], strides: number[], beginMask: number, endMask: number, ellipsisMask: number, newAxisMask: number, shrinkAxisMask: number): T;
    unstack(x: Tensor, axis: number): Tensor[];
    reverse<T extends Tensor>(x: T, axis: number[]): T;
    concat(tensors: Tensor[], axis: number): Tensor;
    neg<T extends Tensor>(x: T): T;
    add(a: Tensor, b: Tensor): Tensor;
    addN<T extends Tensor>(tensors: T[]): T;
    subtract(a: Tensor, b: Tensor): Tensor;
    pow<T extends Tensor>(a: T, b: Tensor): T;
    batchMatMul(a: Tensor3D, b: Tensor3D, transposeA: boolean, transposeB: boolean): Tensor3D;
    fusedBatchMatMul(a: Tensor3D, b: Tensor3D, transposeA: boolean, transposeB: boolean, bias?: Tensor, activation?: Activation): Tensor3D;
    multiply(a: Tensor, b: Tensor): Tensor;
    realDivide(a: Tensor, b: Tensor): Tensor;
    floorDiv(a: Tensor, b: Tensor): Tensor;
    sum(x: Tensor, axes: number[]): Tensor;
    prod(x: Tensor, axes: number[]): Tensor;
    unsortedSegmentSum<T extends Tensor>(x: T, segmentIds: Tensor1D, numSegments: number): Tensor;
    argMin(x: Tensor, axis: number): Tensor;
    argMax(x: Tensor, axis: number): Tensor;
    cumsum(x: Tensor, axis: number, exclusive: boolean, reverse: boolean): Tensor;
    equal(a: Tensor, b: Tensor): Tensor;
    notEqual(a: Tensor, b: Tensor): Tensor;
    less(a: Tensor, b: Tensor): Tensor;
    lessEqual(a: Tensor, b: Tensor): Tensor;
    greater(a: Tensor, b: Tensor): Tensor;
    greaterEqual(a: Tensor, b: Tensor): Tensor;
    logicalNot<T extends Tensor>(x: T): T;
    logicalAnd(a: Tensor, b: Tensor): Tensor;
    logicalOr(a: Tensor, b: Tensor): Tensor;
    select(condition: Tensor, a: Tensor, b: Tensor): Tensor;
    where(condition: Tensor): Tensor2D;
    topk<T extends Tensor>(x: T, k: number, sorted: boolean): [T, T];
    min(x: Tensor, axes: number[]): Tensor;
    minimum(a: Tensor, b: Tensor): Tensor;
    mod(a: Tensor, b: Tensor): Tensor;
    max(x: Tensor, axes: number[]): Tensor;
    maximum(a: Tensor, b: Tensor): Tensor;
    all(x: Tensor, axes: number[]): Tensor;
    any(x: Tensor, axes: number[]): Tensor;
    squaredDifference(a: Tensor, b: Tensor): Tensor;
    ceil<T extends Tensor>(x: T): T;
    floor<T extends Tensor>(x: T): T;
    sign<T extends Tensor>(x: T): T;
    isNaN<T extends Tensor>(x: T): T;
    isInf<T extends Tensor>(x: T): T;
    isFinite<T extends Tensor>(x: T): T;
    round<T extends Tensor>(x: T): T;
    exp<T extends Tensor>(x: T): T;
    expm1<T extends Tensor>(x: T): T;
    log<T extends Tensor>(x: T): T;
    log1p<T extends Tensor>(x: T): T;
    sqrt<T extends Tensor>(x: T): T;
    rsqrt<T extends Tensor>(x: T): T;
    square<T extends Tensor>(x: T): T;
    reciprocal<T extends Tensor>(x: T): T;
    linear<T extends Tensor>(x: T): T;
    relu<T extends Tensor>(x: T): T;
    prelu<T extends Tensor>(x: T, a: T): T;
    elu<T extends Tensor>(x: T): T;
    eluDer<T extends Tensor>(dy: T, y: T): T;
    selu<T extends Tensor>(x: T): T;
    clip<T extends Tensor>(x: T, min: number, max: number): T;
    abs<T extends Tensor>(x: T): T;
    complexAbs<T extends Tensor>(x: T): T;
    int<T extends Tensor>(x: T): T;
    sigmoid<T extends Tensor>(x: T): T;
    softplus<T extends Tensor>(x: T): T;
    sin<T extends Tensor>(x: T): T;
    cos<T extends Tensor>(x: T): T;
    tan<T extends Tensor>(x: T): T;
    asin<T extends Tensor>(x: T): T;
    acos<T extends Tensor>(x: T): T;
    atan<T extends Tensor>(x: T): T;
    atan2<T extends Tensor>(a: T, b: T): T;
    sinh<T extends Tensor>(x: T): T;
    cosh<T extends Tensor>(x: T): T;
    tanh<T extends Tensor>(x: T): T;
    asinh<T extends Tensor>(x: T): T;
    acosh<T extends Tensor>(x: T): T;
    atanh<T extends Tensor>(x: T): T;
    erf<T extends Tensor>(x: T): T;
    step<T extends Tensor>(x: T, alpha?: number): T;
    conv2d(x: Tensor4D, filter: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    conv3d(x: Tensor5D, filter: Tensor5D, convInfo: Conv3DInfo): Tensor5D;
    conv2dDerInput(dy: Tensor4D, filter: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    conv3dDerInput(dy: Tensor5D, filter: Tensor5D, convInfo: Conv3DInfo): Tensor5D;
    conv2dDerFilter(x: Tensor4D, dy: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    conv3dDerFilter(x: Tensor5D, dy: Tensor5D, convInfo: Conv3DInfo): Tensor5D;
    depthwiseConv2D(x: Tensor4D, filter: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    depthwiseConv2DDerInput(dy: Tensor4D, filter: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    depthwiseConv2DDerFilter(x: Tensor4D, dy: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    tile<T extends Tensor>(x: T, reps: number[]): T;
    pad<T extends Tensor>(x: T, paddings: Array<[number, number]>, constantValue: number): T;
    transpose<T extends Tensor>(x: T, perm: number[]): T;
    gather<T extends Tensor>(x: T, indices: Tensor1D, axis: number): T;
    batchToSpaceND<T extends Tensor>(x: T, blockShape: number[], crops: number[][]): T;
    spaceToBatchND<T extends Tensor>(x: T, blockShape: number[], paddings: Array<[number, number]>): T;
    private pool;
    maxPool(x: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    private maxPoolPositions;
    maxPoolBackprop(dy: Tensor4D, x: Tensor4D, y: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    avgPoolBackprop(dy: Tensor4D, x: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    cast<T extends Tensor>(x: T, dtype: DataType): T;
    reshape<R extends Rank>(x: Tensor, shape: ShapeMap[R]): Tensor<R>;
    avgPool(x: Tensor4D, convInfo: Conv2DInfo): Tensor4D;
    resizeBilinear(x: Tensor4D, newHeight: number, newWidth: number, alignCorners: boolean): Tensor4D;
    resizeBilinearBackprop(dy: Tensor4D, x: Tensor4D, alignCorners: boolean): Tensor<Rank.R4>;
    resizeNearestNeighbor(x: Tensor4D, newHeight: number, newWidth: number, alignCorners: boolean): Tensor4D;
    resizeNearestNeighborBackprop(dy: Tensor4D, x: Tensor4D, alignCorners: boolean): Tensor<Rank.R4>;
    batchNormalization(x: Tensor4D, mean: Tensor4D | Tensor1D, variance: Tensor4D | Tensor1D, varianceEpsilon: number, scale?: Tensor4D | Tensor1D, offset?: Tensor4D | Tensor1D): Tensor4D;
    localResponseNormalization4D(x: Tensor4D, depthRadius: number, bias: number, alpha: number, beta: number): Tensor4D;
    LRNGrad(dy: Tensor4D, inputImage: Tensor4D, outputImage: Tensor4D, depthRadius: number, bias: number, alpha: number, beta: number): Tensor4D;
    multinomial(logits: Tensor2D, normalized: boolean, numSamples: number, seed: number): Tensor2D;
    oneHot(indices: Tensor1D, depth: number, onValue: number, offValue: number): Tensor2D;
    nonMaxSuppression(boxes: Tensor2D, scores: Tensor1D, maxOutputSize: number, iouThreshold: number, scoreThreshold: number): Tensor1D;
    fft(x: Tensor2D): Tensor2D;
    ifft(x: Tensor2D): Tensor2D;
    /**
     * Calculate FFT of inner most elements of batch tensor.
     */
    private fftBatch;
    private fftImpl;
    private isExponentOf2;
    private fftRadix2;
    private fourierTransformByMatmul;
    depthToSpace(x: Tensor4D, blockSize: number, dataFormat: 'NHWC' | 'NCHW'): Tensor4D;
    private broadcastedBinaryOp;
    private broadcastedBinaryComplexOp;
    split<T extends Tensor>(x: T, sizeSplits: number[], axis: number): T[];
    dispose(): void;
    floatPrecision(): 16 | 32;
    /** Returns the smallest representable number.  */
    epsilon(): number;
    cropAndResize(images: Tensor4D, boxes: Tensor2D, boxIndex: Tensor1D, cropSize: [number, number], method: string, extrapolationValue: number): Tensor<Rank.R4>;
    sparseToDense<R extends Rank>(sparseIndices: Tensor, sparseValues: Tensor, outputShape: ShapeMap[R], defaultValue: Scalar): Tensor<R>;
    gatherND(x: Tensor, indices: Tensor): Tensor;
    scatterND<R extends Rank>(indices: Tensor, updates: Tensor, shape: ShapeMap[R]): Tensor<R>;
    fill<R extends Rank>(shape: ShapeMap[R], value: number | string, dtype?: DataType): Tensor<R>;
    onesLike<R extends Rank>(x: Tensor<R>): Tensor<R>;
    zerosLike<R extends Rank>(x: Tensor<R>): Tensor<R>;
    linspace(start: number, stop: number, num: number): Tensor1D;
    private scatter;
}
