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
import { DataType, DataTypeMap, FlatVector, NumericDataType, RecursiveArray, TensorLike, TypedArray } from './types';
/**
 * Shuffles the array in-place using Fisher-Yates algorithm.
 *
 * ```js
 * const a = [1, 2, 3, 4, 5];
 * tf.util.shuffle(a);
 * console.log(a);
 * ```
 *
 * @param array The array to shuffle in-place.
 */
/** @doc {heading: 'Util', namespace: 'util'} */
export declare function shuffle(array: any[] | Uint32Array | Int32Array | Float32Array): void;
/** Clamps a value to a specified range. */
export declare function clamp(min: number, x: number, max: number): number;
export declare function nearestLargerEven(val: number): number;
export declare function sum(arr: number[]): number;
/**
 * Returns a sample from a uniform [a, b) distribution.
 *
 * @param a The minimum support (inclusive).
 * @param b The maximum support (exclusive).
 * @return A pseudorandom number on the half-open interval [a,b).
 */
export declare function randUniform(a: number, b: number): number;
/** Returns the squared Euclidean distance between two vectors. */
export declare function distSquared(a: FlatVector, b: FlatVector): number;
/**
 * Asserts that the expression is true. Otherwise throws an error with the
 * provided message.
 *
 * ```js
 * const x = 2;
 * tf.util.assert(x === 2, 'x is not 2');
 * ```
 *
 * @param expr The expression to assert (as a boolean).
 * @param msg A function that returns the message to report when throwing an
 *     error. We use a function for performance reasons.
 */
/** @doc {heading: 'Util', namespace: 'util'} */
export declare function assert(expr: boolean, msg: () => string): void;
export declare function assertShapesMatch(shapeA: number[], shapeB: number[], errorMessagePrefix?: string): void;
export declare function assertNonNull(a: TensorLike): void;
/**
 *  Flattens an arbitrarily nested array.
 *
 * ```js
 * const a = [[1, 2], [3, 4], [5, [6, [7]]]];
 * const flat = tf.util.flatten(a);
 * console.log(flat);
 * ```
 *
 *  @param arr The nested array to flatten.
 *  @param result The destination array which holds the elements.
 *  @param skipTypedArray If true, avoids flattening the typed arrays. Defaults
 *      to false.
 */
/** @doc {heading: 'Util', namespace: 'util'} */
export declare function flatten<T extends number | boolean | string | Promise<number> | TypedArray>(arr: T | RecursiveArray<T>, result?: T[], skipTypedArray?: boolean): T[];
/**
 * Returns the size (number of elements) of the tensor given its shape.
 *
 * ```js
 * const shape = [3, 4, 2];
 * const size = tf.util.sizeFromShape(shape);
 * console.log(size);
 * ```
 */
/** @doc {heading: 'Util', namespace: 'util'} */
export declare function sizeFromShape(shape: number[]): number;
export declare function isScalarShape(shape: number[]): boolean;
export declare function arraysEqual(n1: FlatVector, n2: FlatVector): boolean;
export declare function isInt(a: number): boolean;
export declare function tanh(x: number): number;
export declare function sizeToSquarishShape(size: number): [number, number];
export declare function createShuffledIndices(n: number): Uint32Array;
export declare function rightPad(a: string, size: number): string;
export declare function repeatedTry(checkFn: () => boolean, delayFn?: (counter: number) => number, maxCounter?: number): Promise<void>;
/**
 * Given the full size of the array and a shape that may contain -1 as the
 * implicit dimension, returns the inferred shape where -1 is replaced.
 * E.g. For shape=[2, -1, 3] and size=24, it will return [2, 4, 3].
 *
 * @param shape The shape, which may contain -1 in some dimension.
 * @param size The full size (number of elements) of the array.
 * @return The inferred shape where -1 is replaced with the inferred size.
 */
export declare function inferFromImplicitShape(shape: number[], size: number): number[];
export declare function parseAxisParam(axis: number | number[], shape: number[]): number[];
/** Reduces the shape by removing all dimensions of shape 1. */
export declare function squeezeShape(shape: number[], axis?: number[]): {
    newShape: number[];
    keptDims: number[];
};
export declare function getTypedArrayFromDType<D extends NumericDataType>(dtype: D, size: number): DataTypeMap[D];
export declare function getArrayFromDType<D extends DataType>(dtype: D, size: number): DataTypeMap[D];
export declare function checkComputationForErrors<D extends DataType>(vals: DataTypeMap[D], dtype: D, name: string): void;
export declare function checkConversionForErrors<D extends DataType>(vals: DataTypeMap[D] | number[], dtype: D): void;
/** Returns true if the dtype is valid. */
export declare function isValidDtype(dtype: DataType): boolean;
/**
 * Returns true if the new type can't encode the old type without loss of
 * precision.
 */
export declare function hasEncodingLoss(oldType: DataType, newType: DataType): boolean;
export declare function isTypedArray(a: {}): a is Float32Array | Int32Array | Uint8Array;
export declare function bytesPerElement(dtype: DataType): number;
/**
 * Returns the approximate number of bytes allocated in the string array - 2
 * bytes per character. Computing the exact bytes for a native string in JS is
 * not possible since it depends on the encoding of the html page that serves
 * the website.
 */
export declare function bytesFromStringArray(arr: Uint8Array[]): number;
/** Returns true if the value is a string. */
export declare function isString(value: {}): value is string;
export declare function isBoolean(value: {}): boolean;
export declare function isNumber(value: {}): boolean;
export declare function inferDtype(values: TensorLike): DataType;
export declare function isFunction(f: Function): boolean;
export declare function nearestDivisor(size: number, start: number): number;
export declare function computeStrides(shape: number[]): number[];
export declare function toTypedArray(a: TensorLike, dtype: DataType, debugMode: boolean): TypedArray;
export declare function toNestedArray(shape: number[], a: TypedArray): number | any[];
export declare function makeOnesTypedArray<D extends DataType>(size: number, dtype: D): DataTypeMap[D];
export declare function makeZerosTypedArray<D extends DataType>(size: number, dtype: D): DataTypeMap[D];
/**
 * Returns the current high-resolution time in milliseconds relative to an
 * arbitrary time in the past. It works across different platforms (node.js,
 * browsers).
 *
 * ```js
 * console.log(tf.util.now());
 * ```
 */
/** @doc {heading: 'Util', namespace: 'util'} */
export declare function now(): number;
export declare function assertNonNegativeIntegerDimensions(shape: number[]): void;
/**
 * Returns a platform-specific implementation of
 * [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
 *
 * If `fetch` is defined on the global object (`window`, `process`, etc.),
 * `tf.util.fetch` returns that function.
 *
 * If not, `tf.util.fetch` returns a platform-specific solution.
 *
 * ```js
 * const resource = await tf.util.fetch('https://unpkg.com/@tensorflow/tfjs');
 * // handle response
 * ```
 */
/** @doc {heading: 'Util'} */
export declare function fetch(path: string, requestInits?: RequestInit): Promise<Response>;
/**
 * Encodes the provided string into bytes using the provided encoding scheme.
 *
 * @param s The string to encode.
 * @param encoding The encoding scheme. Defaults to utf-8.
 *
 */
/** @doc {heading: 'Util'} */
export declare function encodeString(s: string, encoding?: string): Uint8Array;
/**
 * Decodes the provided bytes into a string using the provided encoding scheme.
 * @param bytes The bytes to decode.
 *
 * @param encoding The encoding scheme. Defaults to utf-8.
 */
/** @doc {heading: 'Util'} */
export declare function decodeString(bytes: Uint8Array, encoding?: string): string;
