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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var util_1 = require("../util");
var io_utils_1 = require("./io_utils");
var model_management_1 = require("./model_management");
var router_registry_1 = require("./router_registry");
var PATH_SEPARATOR = '/';
var PATH_PREFIX = 'tensorflowjs_models';
var INFO_SUFFIX = 'info';
var MODEL_TOPOLOGY_SUFFIX = 'model_topology';
var WEIGHT_SPECS_SUFFIX = 'weight_specs';
var WEIGHT_DATA_SUFFIX = 'weight_data';
var MODEL_METADATA_SUFFIX = 'model_metadata';
/**
 * Purge all tensorflow.js-saved model artifacts from local storage.
 *
 * @returns Paths of the models purged.
 */
function purgeLocalStorageArtifacts() {
    if (!environment_1.ENV.getBool('IS_BROWSER') ||
        typeof window.localStorage === 'undefined') {
        throw new Error('purgeLocalStorageModels() cannot proceed because local storage is ' +
            'unavailable in the current environment.');
    }
    var LS = window.localStorage;
    var purgedModelPaths = [];
    for (var i = 0; i < LS.length; ++i) {
        var key = LS.key(i);
        var prefix = PATH_PREFIX + PATH_SEPARATOR;
        if (key.startsWith(prefix) && key.length > prefix.length) {
            LS.removeItem(key);
            var modelName = getModelPathFromKey(key);
            if (purgedModelPaths.indexOf(modelName) === -1) {
                purgedModelPaths.push(modelName);
            }
        }
    }
    return purgedModelPaths;
}
exports.purgeLocalStorageArtifacts = purgeLocalStorageArtifacts;
function getModelKeys(path) {
    return {
        info: [PATH_PREFIX, path, INFO_SUFFIX].join(PATH_SEPARATOR),
        topology: [PATH_PREFIX, path, MODEL_TOPOLOGY_SUFFIX].join(PATH_SEPARATOR),
        weightSpecs: [PATH_PREFIX, path, WEIGHT_SPECS_SUFFIX].join(PATH_SEPARATOR),
        weightData: [PATH_PREFIX, path, WEIGHT_DATA_SUFFIX].join(PATH_SEPARATOR),
        modelMetadata: [PATH_PREFIX, path, MODEL_METADATA_SUFFIX].join(PATH_SEPARATOR)
    };
}
/**
 * Get model path from a local-storage key.
 *
 * E.g., 'tensorflowjs_models/my/model/1/info' --> 'my/model/1'
 *
 * @param key
 */
function getModelPathFromKey(key) {
    var items = key.split(PATH_SEPARATOR);
    if (items.length < 3) {
        throw new Error("Invalid key format: " + key);
    }
    return items.slice(1, items.length - 1).join(PATH_SEPARATOR);
}
function maybeStripScheme(key) {
    return key.startsWith(BrowserLocalStorage.URL_SCHEME) ?
        key.slice(BrowserLocalStorage.URL_SCHEME.length) :
        key;
}
/**
 * IOHandler subclass: Browser Local Storage.
 *
 * See the doc string to `browserLocalStorage` for more details.
 */
var BrowserLocalStorage = /** @class */ (function () {
    function BrowserLocalStorage(modelPath) {
        if (!environment_1.ENV.getBool('IS_BROWSER') ||
            typeof window.localStorage === 'undefined') {
            // TODO(cais): Add more info about what IOHandler subtypes are
            // available.
            //   Maybe point to a doc page on the web and/or automatically determine
            //   the available IOHandlers and print them in the error message.
            throw new Error('The current environment does not support local storage.');
        }
        this.LS = window.localStorage;
        if (modelPath == null || !modelPath) {
            throw new Error('For local storage, modelPath must not be null, undefined or empty.');
        }
        this.modelPath = modelPath;
        this.keys = getModelKeys(this.modelPath);
    }
    /**
     * Save model artifacts to browser local storage.
     *
     * See the documentation to `browserLocalStorage` for details on the saved
     * artifacts.
     *
     * @param modelArtifacts The model artifacts to be stored.
     * @returns An instance of SaveResult.
     */
    BrowserLocalStorage.prototype.save = function (modelArtifacts) {
        return __awaiter(this, void 0, void 0, function () {
            var topology, weightSpecs, modelArtifactsInfo;
            return __generator(this, function (_a) {
                if (modelArtifacts.modelTopology instanceof ArrayBuffer) {
                    throw new Error('BrowserLocalStorage.save() does not support saving model topology ' +
                        'in binary formats yet.');
                }
                else {
                    topology = JSON.stringify(modelArtifacts.modelTopology);
                    weightSpecs = JSON.stringify(modelArtifacts.weightSpecs);
                    modelArtifactsInfo = io_utils_1.getModelArtifactsInfoForJSON(modelArtifacts);
                    try {
                        this.LS.setItem(this.keys.info, JSON.stringify(modelArtifactsInfo));
                        this.LS.setItem(this.keys.topology, topology);
                        this.LS.setItem(this.keys.weightSpecs, weightSpecs);
                        this.LS.setItem(this.keys.weightData, io_utils_1.arrayBufferToBase64String(modelArtifacts.weightData));
                        this.LS.setItem(this.keys.modelMetadata, JSON.stringify({
                            format: modelArtifacts.format,
                            generatedBy: modelArtifacts.generatedBy,
                            convertedBy: modelArtifacts.convertedBy
                        }));
                        return [2 /*return*/, { modelArtifactsInfo: modelArtifactsInfo }];
                    }
                    catch (err) {
                        // If saving failed, clean up all items saved so far.
                        this.LS.removeItem(this.keys.info);
                        this.LS.removeItem(this.keys.topology);
                        this.LS.removeItem(this.keys.weightSpecs);
                        this.LS.removeItem(this.keys.weightData);
                        this.LS.removeItem(this.keys.modelMetadata);
                        throw new Error("Failed to save model '" + this.modelPath + "' to local storage: " +
                            "size quota being exceeded is a possible cause of this failure: " +
                            ("modelTopologyBytes=" + modelArtifactsInfo.modelTopologyBytes + ", ") +
                            ("weightSpecsBytes=" + modelArtifactsInfo.weightSpecsBytes + ", ") +
                            ("weightDataBytes=" + modelArtifactsInfo.weightDataBytes + "."));
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Load a model from local storage.
     *
     * See the documentation to `browserLocalStorage` for details on the saved
     * artifacts.
     *
     * @returns The loaded model (if loading succeeds).
     */
    BrowserLocalStorage.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, out, topology, weightSpecs, metadataString, metadata, weightDataBase64;
            return __generator(this, function (_a) {
                info = JSON.parse(this.LS.getItem(this.keys.info));
                if (info == null) {
                    throw new Error("In local storage, there is no model with name '" + this.modelPath + "'");
                }
                if (info.modelTopologyType !== 'JSON') {
                    throw new Error('BrowserLocalStorage does not support loading non-JSON model ' +
                        'topology yet.');
                }
                out = {};
                topology = JSON.parse(this.LS.getItem(this.keys.topology));
                if (topology == null) {
                    throw new Error("In local storage, the topology of model '" + this.modelPath + "' " +
                        "is missing.");
                }
                out.modelTopology = topology;
                weightSpecs = JSON.parse(this.LS.getItem(this.keys.weightSpecs));
                if (weightSpecs == null) {
                    throw new Error("In local storage, the weight specs of model '" + this.modelPath + "' " +
                        "are missing.");
                }
                out.weightSpecs = weightSpecs;
                metadataString = this.LS.getItem(this.keys.modelMetadata);
                if (metadataString != null) {
                    metadata = JSON.parse(metadataString);
                    out.format = metadata['format'];
                    out.generatedBy = metadata['generatedBy'];
                    out.convertedBy = metadata['convertedBy'];
                }
                weightDataBase64 = this.LS.getItem(this.keys.weightData);
                if (weightDataBase64 == null) {
                    throw new Error("In local storage, the binary weight values of model " +
                        ("'" + this.modelPath + "' are missing."));
                }
                out.weightData = io_utils_1.base64StringToArrayBuffer(weightDataBase64);
                return [2 /*return*/, out];
            });
        });
    };
    BrowserLocalStorage.URL_SCHEME = 'localstorage://';
    return BrowserLocalStorage;
}());
exports.BrowserLocalStorage = BrowserLocalStorage;
exports.localStorageRouter = function (url) {
    if (!environment_1.ENV.getBool('IS_BROWSER')) {
        return null;
    }
    else {
        if (!Array.isArray(url) && url.startsWith(BrowserLocalStorage.URL_SCHEME)) {
            return browserLocalStorage(url.slice(BrowserLocalStorage.URL_SCHEME.length));
        }
        else {
            return null;
        }
    }
};
router_registry_1.IORouterRegistry.registerSaveRouter(exports.localStorageRouter);
router_registry_1.IORouterRegistry.registerLoadRouter(exports.localStorageRouter);
/**
 * Factory function for local storage IOHandler.
 *
 * This `IOHandler` supports both `save` and `load`.
 *
 * For each model's saved artifacts, four items are saved to local storage.
 *   - `${PATH_SEPARATOR}/${modelPath}/info`: Contains meta-info about the
 *     model, such as date saved, type of the topology, size in bytes, etc.
 *   - `${PATH_SEPARATOR}/${modelPath}/topology`: Model topology. For Keras-
 *     style models, this is a stringized JSON.
 *   - `${PATH_SEPARATOR}/${modelPath}/weight_specs`: Weight specs of the
 *     model, can be used to decode the saved binary weight values (see
 *     item below).
 *   - `${PATH_SEPARATOR}/${modelPath}/weight_data`: Concatenated binary
 *     weight values, stored as a base64-encoded string.
 *
 * Saving may throw an `Error` if the total size of the artifacts exceed the
 * browser-specific quota.
 *
 * @param modelPath A unique identifier for the model to be saved. Must be a
 *   non-empty string.
 * @returns An instance of `IOHandler`, which can be used with, e.g.,
 *   `tf.Model.save`.
 */
function browserLocalStorage(modelPath) {
    return new BrowserLocalStorage(modelPath);
}
exports.browserLocalStorage = browserLocalStorage;
var BrowserLocalStorageManager = /** @class */ (function () {
    function BrowserLocalStorageManager() {
        util_1.assert(environment_1.ENV.getBool('IS_BROWSER'), function () { return 'Current environment is not a web browser'; });
        util_1.assert(typeof window.localStorage !== 'undefined', function () { return 'Current browser does not appear to support localStorage'; });
        this.LS = window.localStorage;
    }
    BrowserLocalStorageManager.prototype.listModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var out, prefix, suffix, i, key, modelPath;
            return __generator(this, function (_a) {
                out = {};
                prefix = PATH_PREFIX + PATH_SEPARATOR;
                suffix = PATH_SEPARATOR + INFO_SUFFIX;
                for (i = 0; i < this.LS.length; ++i) {
                    key = this.LS.key(i);
                    if (key.startsWith(prefix) && key.endsWith(suffix)) {
                        modelPath = getModelPathFromKey(key);
                        out[modelPath] = JSON.parse(this.LS.getItem(key));
                    }
                }
                return [2 /*return*/, out];
            });
        });
    };
    BrowserLocalStorageManager.prototype.removeModel = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, info;
            return __generator(this, function (_a) {
                path = maybeStripScheme(path);
                keys = getModelKeys(path);
                if (this.LS.getItem(keys.info) == null) {
                    throw new Error("Cannot find model at path '" + path + "'");
                }
                info = JSON.parse(this.LS.getItem(keys.info));
                this.LS.removeItem(keys.info);
                this.LS.removeItem(keys.topology);
                this.LS.removeItem(keys.weightSpecs);
                this.LS.removeItem(keys.weightData);
                return [2 /*return*/, info];
            });
        });
    };
    return BrowserLocalStorageManager;
}());
exports.BrowserLocalStorageManager = BrowserLocalStorageManager;
if (environment_1.ENV.getBool('IS_BROWSER')) {
    // Wrap the construction and registration, to guard against browsers that
    // don't support Local Storage.
    try {
        model_management_1.ModelStoreManagerRegistry.registerManager(BrowserLocalStorage.URL_SCHEME, new BrowserLocalStorageManager());
    }
    catch (err) {
    }
}
//# sourceMappingURL=local_storage.js.map