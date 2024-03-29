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
var glsl_version_1 = require("./glsl_version");
var shader_compiler_util_1 = require("./shader_compiler_util");
var EncodeFloatPackedProgram = /** @class */ (function () {
    function EncodeFloatPackedProgram(outputShape) {
        this.variableNames = ['A'];
        this.usesPackedTextures = true;
        var glsl = glsl_version_1.getGlslDifferences();
        this.outputShape = outputShape;
        this.userCode = "\n      " + shader_compiler_util_1.ENCODE_FLOAT_SNIPPET + "\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));\n        " + glsl.output + " = encode_float(x);\n      }\n    ";
    }
    return EncodeFloatPackedProgram;
}());
exports.EncodeFloatPackedProgram = EncodeFloatPackedProgram;
//# sourceMappingURL=encode_float_packed_gpu.js.map