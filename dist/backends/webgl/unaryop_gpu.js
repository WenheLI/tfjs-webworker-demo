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
var erf_util = require("../../ops/erf_util");
var selu_util = require("../../ops/selu_util");
var UnaryOpProgram = /** @class */ (function () {
    function UnaryOpProgram(aShape, opSnippet) {
        this.variableNames = ['A'];
        this.outputShape = aShape;
        this.userCode = "\n      float unaryOperation(float x) {\n        " + opSnippet + "\n      }\n\n      void main() {\n        float x = getAAtOutCoords();\n        float y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    ";
    }
    return UnaryOpProgram;
}());
exports.UnaryOpProgram = UnaryOpProgram;
var CHECK_NAN_SNIPPET = "if (isnan(x)) return x;";
exports.LINEAR = "return x;";
exports.ABS = "return abs(x);";
exports.RELU = CHECK_NAN_SNIPPET + "\n  return (x < 0.0) ? 0.0 : x;\n";
exports.ELU = "return (x >= 0.0) ? x : (exp(x) - 1.0);";
exports.SELU = "\n  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.\n  // see: https://arxiv.org/abs/1706.02515\n  float scaleAlpha = " + selu_util.SELU_SCALEALPHA + ";\n  float scale = " + selu_util.SELU_SCALE + ";\n  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);\n";
function STEP(alpha) {
    if (alpha === void 0) { alpha = 0.0; }
    return CHECK_NAN_SNIPPET + ("\n    return x > 0.0 ? 1.0 : float(" + alpha + ");\n  ");
}
exports.STEP = STEP;
exports.NEG = "return -x;";
exports.CEIL = "return ceil(x);";
exports.FLOOR = "return floor(x);";
exports.SIGN = "\n  if (isnan(x)) { return 0.0; }\n  return sign(x);\n";
exports.IS_NAN = "return float(isnan(x));";
exports.IS_INF = "return float(isinf(x));";
exports.IS_FINITE = "return float(!isnan(x) && !isinf(x));";
exports.ROUND = "\n  // OpenGL ES does not support round function.\n  // The algorithm is based on banker's rounding.\n  float base = floor(x);\n  if ((x - base) < 0.5) {\n    return floor(x);\n  } else if ((x - base) > 0.5) {\n    return ceil(x);\n  } else {\n    if (mod(base, 2.0) == 0.0) {\n      return base;\n    } else {\n      return base + 1.0;\n    }\n  }\n";
exports.EXP = "return exp(x);";
exports.EXPM1 = "return exp(x) - 1.0;";
exports.LOG = "if (x < 0.0) return NAN;\n  return log(x);";
exports.LOG1P = "return log(1.0 + x);";
exports.SQRT = "return sqrt(x);";
exports.RSQRT = "return inversesqrt(x);";
exports.SIGMOID = "return 1.0 / (1.0 + exp(-1.0 * x));";
/**
 * mirrors the implementation of tf.nn.softplus: https://goo.gl/vkcvwX
 *
 * epsilon is the difference between 1.0 and the next representable
 * float. For a single precision 32 bit float this should be 2^-23, see:
 * https://math.byu.edu/~schow/work/IEEEFloatingPoint.htm
 *
 * too_large = (x > -threshold) is value above which exp(x) may overflow
 * but softplus(x) == x is within machine epsilon
 *
 * too_small = (x < threshold) is value below which exp(x) may underflow,
 * but softplus(x) == exp(x) is within machine epsilon.
 */
exports.SOFTPLUS = "\n  float epsilon = 1.1920928955078125e-7;\n  float threshold = log(epsilon) + 2.0;\n\n  bool too_large = x > -threshold;\n  bool too_small = x < threshold;\n\n  float result;\n  float exp_x = exp(x);\n\n  if (too_large){\n    result = x;\n  }\n  else if (too_small){\n    result = exp_x;\n  }\n  else{\n    result = log(exp_x + 1.0);\n  }\n  return result;\n";
exports.SIN = CHECK_NAN_SNIPPET + "\n  return sin(x);\n";
exports.COS = CHECK_NAN_SNIPPET + "\n  return cos(x);\n";
exports.TAN = "return tan(x);";
exports.ASIN = "return asin(x);";
exports.ACOS = "return acos(x);";
exports.ATAN = CHECK_NAN_SNIPPET + "\n  return atan(x);\n";
exports.SINH = "\n  float e2x = exp(x);\n  return (e2x - 1.0 / e2x) / 2.0;\n";
exports.COSH = "\n  float e2x = exp(-x);\n  return (e2x + 1.0 / e2x) / 2.0;\n";
exports.TANH = "\n  float e2x = exp(-2.0 * abs(x));\n  return sign(x) * (1.0 - e2x) / (1.0 + e2x);\n";
exports.ASINH = "return log(x + sqrt(x * x + 1.0));";
exports.ACOSH = CHECK_NAN_SNIPPET + "\n  if (x < 1.0) return NAN;\n  return log(x + sqrt(x * x - 1.0));";
exports.ATANH = CHECK_NAN_SNIPPET + "\n  if ((x < -1.0) || (x > 1.0)) return NAN;\n  return (log(1.0 + x) - log(1.0 - x)) / 2.0;";
exports.ERF = "\n  // Error function is calculated approximately with elementary function.\n  // See \"Handbook of Mathematical Functions with Formulas,\n  // Graphs, and Mathematical Tables\", Abramowitz and Stegun.\n  float p = " + erf_util.ERF_P + ";\n  float a1 = " + erf_util.ERF_A1 + ";\n  float a2 = " + erf_util.ERF_A2 + ";\n  float a3 = " + erf_util.ERF_A3 + ";\n  float a4 = " + erf_util.ERF_A4 + ";\n  float a5 = " + erf_util.ERF_A5 + ";\n\n  float t = 1.0 / (1.0 + p * x);\n  return 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x);\n";
exports.SQUARE = "return x * x;";
exports.RECIPROCAL = "return 1.0 / x;";
exports.LOGICAL_NOT = "return float(!(x >= 1.0));";
exports.TO_INT = "return float(int(x));";
exports.CLONE = 'return x;';
//# sourceMappingURL=unaryop_gpu.js.map