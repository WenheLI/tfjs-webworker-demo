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
var PlatformBrowser = /** @class */ (function () {
    function PlatformBrowser() {
        // The built-in encoder and the decoder use UTF-8 encoding.
        this.textEncoder = new TextEncoder();
        this.textDecoder = new TextDecoder();
    }
    PlatformBrowser.prototype.encodeUTF8 = function (text) {
        return this.textEncoder.encode(text);
    };
    PlatformBrowser.prototype.decodeUTF8 = function (bytes) {
        return this.textDecoder.decode(bytes);
    };
    PlatformBrowser.prototype.fetch = function (path, init) {
        return fetch(path, init);
    };
    return PlatformBrowser;
}());
exports.PlatformBrowser = PlatformBrowser;
if (environment_1.ENV.get('IS_BROWSER')) {
    environment_1.ENV.setPlatform('browser', new PlatformBrowser());
}
//# sourceMappingURL=platform_browser.js.map