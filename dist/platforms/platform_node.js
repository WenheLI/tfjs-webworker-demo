"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
var environment_1 = require("../environment");
// We are wrapping this within an object so it can be stubbed by Jasmine.
exports.getNodeFetch = {
    // tslint:disable-next-line:no-require-imports
    importFetch: function () { return require('node-fetch'); }
};
var PlatformNode = /** @class */ (function () {
    function PlatformNode() {
        // tslint:disable-next-line: no-require-imports
        var util = require('util');
        // The built-in encoder and the decoder use UTF-8 encoding.
        this.textEncoder = new util.TextEncoder();
        this.textDecoder = new util.TextDecoder();
    }
    PlatformNode.prototype.encodeUTF8 = function (text) {
        return this.textEncoder.encode(text);
    };
    PlatformNode.prototype.decodeUTF8 = function (bytes) {
        if (bytes.length === 0) {
            return '';
        }
        return this.textDecoder.decode(bytes);
    };
    PlatformNode.prototype.fetch = function (path, requestInits) {
        if (environment_1.ENV.global.fetch != null) {
            return environment_1.ENV.global.fetch(path, requestInits);
        }
        if (exports.systemFetch == null) {
            exports.systemFetch = exports.getNodeFetch.importFetch();
        }
        return exports.systemFetch(path, requestInits);
    };
    return PlatformNode;
}());
exports.PlatformNode = PlatformNode;
if (environment_1.ENV.get('IS_NODE')) {
    environment_1.ENV.setPlatform('node', new PlatformNode());
}
//# sourceMappingURL=platform_node.js.map