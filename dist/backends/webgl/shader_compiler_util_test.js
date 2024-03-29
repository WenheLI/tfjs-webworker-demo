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
var jasmine_util_1 = require("../../jasmine_util");
var backend_webgl_test_registry_1 = require("./backend_webgl_test_registry");
var shader_compiler_util_1 = require("./shader_compiler_util");
jasmine_util_1.describeWithFlags('shader compiler', backend_webgl_test_registry_1.WEBGL_ENVS, function () {
    it('dotify takes two arrays of coordinates and produces' +
        'the glsl that finds the dot product of those coordinates', function () {
        var coords1 = ['r', 'g', 'b', 'a'];
        var coords2 = ['x', 'y', 'z', 'w'];
        expect(shader_compiler_util_1.dotify(coords1, coords2))
            .toEqual('dot(vec4(r,g,b,a), vec4(x,y,z,w))');
    });
    it('dotify should split up arrays into increments of vec4s', function () {
        var coords1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        var coords2 = ['h', 'i', 'j', 'k', 'l', 'm', 'n'];
        expect(shader_compiler_util_1.dotify(coords1, coords2))
            .toEqual('dot(vec4(a,b,c,d), vec4(h,i,j,k))+dot(vec3(e,f,g), vec3(l,m,n))');
    });
    it('getLogicalCoordinatesFromFlatIndex produces glsl that takes' +
        'a flat index and finds its coordinates within that shape', function () {
        var coords = ['r', 'c', 'd'];
        var shape = [1, 2, 3];
        expect(shader_compiler_util_1.getLogicalCoordinatesFromFlatIndex(coords, shape))
            .toEqual('int r = index / 6; index -= r * 6;' +
            'int c = index / 3; int d = index - c * 3;');
    });
});
//# sourceMappingURL=shader_compiler_util_test.js.map