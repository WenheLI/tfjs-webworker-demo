"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
var engine_1 = require("../engine");
var sparse_to_dense = require("../ops/sparse_to_dense_util");
var tensor_util_env_1 = require("../tensor_util_env");
var operation_1 = require("./operation");
/**
 * Converts a sparse representation into a dense tensor.
 *
 * Builds an array dense with shape outputShape such that:
 *
 * // If sparseIndices is scalar
 * dense[i] = (i == sparseIndices ? sparseValues : defaultValue)
 *
 * // If sparseIndices is a vector, then for each i
 * dense[sparseIndices[i]] = sparseValues[i]
 *
 * // If sparseIndices is an n by d matrix, then for each i in [0, n)
 * dense[sparseIndices[i][0], ..., sparseIndices[i][d-1]] = sparseValues[i]
 * All other values in dense are set to defaultValue. If sparseValues is a
 * scalar, all sparse indices are set to this single value.
 *
 * If indices are repeated the final value is summed over all values for those
 * indices.
 *
 * ```js
 * const indices = tf.tensor1d([4, 5, 6, 1, 2, 3], 'int32');
 * const values = tf.tensor1d([10, 11, 12, 13, 14, 15], 'float32');
 * const shape = [8];
 * tf.sparseToDense(indices, values, shape).print();
 * ```
 *
 * @param sparseIndices A 0-D, 1-D, or 2-D Tensor of type int32.
 * sparseIndices[i] contains the complete index where sparseValues[i] will be
 * placed.
 * @param sparseValues A 0-D or 1-D Tensor. Values
 * corresponding to each row of sparseIndices, or a scalar value to be used for
 * all sparse indices.
 * @param outputShape Shape of the dense output tensor. the type is inferred.
 * @param defaultValue Scalar. Value to set for indices not specified in
 * sparseIndices. Defaults to zero.
 */
/** @doc {heading: 'Operations', subheading: 'Normalization'} */
function sparseToDense_(sparseIndices, sparseValues, outputShape, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var $sparseIndices = tensor_util_env_1.convertToTensor(sparseIndices, 'sparseIndices', 'sparseToDense', 'int32');
    var $sparseValues = tensor_util_env_1.convertToTensor(sparseValues, 'sparseValues', 'sparseToDense');
    var $defaultValue = tensor_util_env_1.convertToTensor(defaultValue, 'defaultValue', 'sparseToDense', $sparseValues.dtype);
    sparse_to_dense.validateInput($sparseIndices, $sparseValues, outputShape, $defaultValue);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.sparseToDense($sparseIndices, $sparseValues, outputShape, $defaultValue); }, { $sparseIndices: $sparseIndices, $sparseValues: $sparseValues, $defaultValue: $defaultValue });
}
exports.sparseToDense = operation_1.op({ sparseToDense_: sparseToDense_ });
//# sourceMappingURL=sparse_to_dense.js.map