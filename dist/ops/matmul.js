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
var tensor_util_1 = require("../tensor_util");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var operation_1 = require("./operation");
/**
 * Computes the dot product of two matrices, A * B. These must be matrices.
 *
 * ```js
 * const a = tf.tensor2d([1, 2], [1, 2]);
 * const b = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * a.matMul(b).print();  // or tf.matMul(a, b)
 * ```
 * @param a First matrix in dot product operation.
 * @param b Second matrix in dot product operation.
 * @param transposeA If true, `a` is transposed before multiplication.
 * @param transposeB If true, `b` is transposed before multiplication.
 */
/** @doc {heading: 'Operations', subheading: 'Matrices'} */
function matMul_(a, b, transposeA, transposeB) {
    if (transposeA === void 0) { transposeA = false; }
    if (transposeB === void 0) { transposeB = false; }
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'matMul');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'matMul');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    var innerShapeA = transposeA ? $a.shape[$a.rank - 2] : $a.shape[$a.rank - 1];
    var innerShapeB = transposeB ? $b.shape[$b.rank - 1] : $b.shape[$b.rank - 2];
    var outerShapeA = transposeA ? $a.shape[$a.rank - 1] : $a.shape[$a.rank - 2];
    var outerShapeB = transposeB ? $b.shape[$b.rank - 2] : $b.shape[$b.rank - 1];
    var outerDimsA = $a.shape.slice(0, -2);
    var outerDimsB = $b.shape.slice(0, -2);
    var batchDimA = util.sizeFromShape(outerDimsA);
    var batchDimB = util.sizeFromShape(outerDimsB);
    util.assert($a.rank >= 2 && $b.rank >= 2 && $a.rank === $b.rank, function () { return "Error in matMul: inputs must have the same rank of at least 2, " +
        ("got ranks " + $a.rank + " and " + $b.rank + "."); });
    util.assert(util.arraysEqual(outerDimsA, outerDimsB), function () { return "Error in matMul: outer dimensions (" + outerDimsA + ") and (" +
        (outerDimsB + ") of Tensors with shapes " + $a.shape + " and ") +
        ($b.shape + " must match."); });
    util.assert(innerShapeA === innerShapeB, function () { return "Error in matMul: inner shapes (" + innerShapeA + ") and (" +
        (innerShapeB + ") of Tensors with shapes " + $a.shape + " and ") +
        ($b.shape + " and transposeA=" + transposeA) +
        (" and transposeB=" + transposeB + " must match."); });
    var outShape = $a.shape.slice(0, -2).concat([outerShapeA, outerShapeB]);
    var a3D = transposeA ? $a.as3D(batchDimA, innerShapeA, outerShapeA) :
        $a.as3D(batchDimA, outerShapeA, innerShapeA);
    var b3D = transposeB ? $b.as3D(batchDimB, outerShapeB, innerShapeB) :
        $b.as3D(batchDimB, innerShapeB, outerShapeB);
    var grad = function (dy, saved) {
        var _a = saved, a3D = _a[0], b3D = _a[1];
        if (!transposeA && !transposeB) {
            return {
                $a: function () { return dy.matMul(b3D, false, true); },
                $b: function () { return a3D.matMul(dy, true, false); }
            };
        }
        else if (!transposeA && transposeB) {
            return {
                $a: function () { return dy.matMul(b3D, false, false); },
                $b: function () { return dy.matMul(a3D, true, false); }
            };
        }
        else if (transposeA && !transposeB) {
            return {
                $a: function () { return b3D.matMul(dy, false, true); },
                $b: function () { return a3D.matMul(dy, false, false); }
            };
        }
        else {
            return {
                $a: function () { return b3D.matMul(dy, true, true); },
                $b: function () { return dy.matMul(a3D, true, true); }
            };
        }
    };
    var res = engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.batchMatMul(a3D, b3D, transposeA, transposeB);
        save([a3D, b3D]);
        return res;
    }, { $a: a3D, $b: b3D }, grad);
    return res.reshape(outShape);
}
/**
 * Computes the outer product of two vectors, `v1` and `v2`.
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([3, 4, 5]);
 *
 * tf.outerProduct(a, b).print();
 * ```
 * @param v1 The first vector in the outer product operation.
 * @param v2 The second vector in the outer product operation.
 */
/** @doc {heading: 'Operations', subheading: 'Matrices'} */
function outerProduct_(v1, v2) {
    var $v1 = tensor_util_env_1.convertToTensor(v1, 'v1', 'outerProduct');
    var $v2 = tensor_util_env_1.convertToTensor(v2, 'v2', 'outerProduct');
    util.assert($v1.rank === 1 && $v2.rank === 1, function () { return "Error in outerProduct: inputs must be rank 1, but got ranks " +
        ($v1.rank + " and " + $v2.rank + "."); });
    return $v1.as2D(-1, 1).matMul($v2.as2D(1, -1));
}
/**
 * Computes the dot product of two matrices and/or vectors, `t1` and `t2`.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor2d([[1, 2], [3, 4]]);
 * const c = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);
 *
 * a.dot(b).print();  // or tf.dot(a, b)
 * b.dot(a).print();
 * b.dot(c).print();
 * ```
 * @param t1 The first tensor in the dot operation.
 * @param t2 The second tensor in the dot operation.
 */
/** @doc {heading: 'Operations', subheading: 'Matrices'} */
function dot_(t1, t2) {
    var $t1 = tensor_util_env_1.convertToTensor(t1, 't1', 'dot');
    var $t2 = tensor_util_env_1.convertToTensor(t2, 't2', 'dot');
    util.assert(($t1.rank === 1 || $t1.rank === 2) && ($t2.rank === 1 || $t2.rank === 2), function () { return "Error in dot: inputs must all be rank 1 or 2, but got ranks " +
        ($t1.rank + " and " + $t2.rank + "."); });
    var t1Inner = ($t1.rank === 1 ? $t1.size : $t1.shape[1]);
    var t2Inner = ($t2.rank === 1 ? $t2.size : $t2.shape[0]);
    util.assert(t1Inner === t2Inner, function () { return "Error in dot: inner dimensions of inputs must match, but got " +
        (t1Inner + " and " + t2Inner + "."); });
    if ($t1.rank === 1 && $t2.rank === 1) {
        return $t1.as2D(1, -1).matMul($t2.as2D(-1, 1)).asScalar();
    }
    else if ($t1.rank === 1 && $t2.rank === 2) {
        return $t1.as2D(1, -1).matMul($t2.as2D($t2.shape[0], $t2.shape[1])).as1D();
    }
    else if ($t1.rank === 2 && $t2.rank === 1) {
        return $t1.matMul($t2.as2D(-1, 1)).as1D();
    }
    else {
        return $t1.matMul($t2.as2D($t2.shape[0], $t2.shape[1]));
    }
}
exports.matMul = operation_1.op({ matMul_: matMul_ });
exports.dot = operation_1.op({ dot_: dot_ });
exports.outerProduct = operation_1.op({ outerProduct_: outerProduct_ });
//# sourceMappingURL=matmul.js.map