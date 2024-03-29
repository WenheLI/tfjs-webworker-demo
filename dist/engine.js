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
var environment_1 = require("./environment");
var profiler_1 = require("./profiler");
var tape_1 = require("./tape");
var tensor_1 = require("./tensor");
var tensor_util_1 = require("./tensor_util");
var util = require("./util");
var util_1 = require("./util");
var EngineState = /** @class */ (function () {
    function EngineState() {
        // Public since optimizers will use it.
        this.registeredVariables = {};
        this.nextTapeNodeId = 0;
        this.numBytes = 0;
        this.numTensors = 0;
        this.numStringTensors = 0;
        this.numDataBuffers = 0;
        // Number of nested tf.grad() statements when computing higher-order
        // gradients. E.g. `1` for first-order gradients and `2` for second-order
        // gradients. Used to track if the tape should be removed after a backprop.
        this.gradientDepth = 0;
        // Number of nested kernel calls. When kernel depth is greater than 1, we turn
        // off the tape.
        this.kernelDepth = 0;
        this.scopeStack = [];
        this.nextScopeId = 0;
        this.tensorInfo = new WeakMap();
        this.profiling = false;
        this.activeProfile = { newBytes: 0, newTensors: 0, peakBytes: 0, kernels: [], result: null };
    }
    EngineState.prototype.dispose = function () {
        for (var variableName in this.registeredVariables) {
            this.registeredVariables[variableName].dispose();
        }
    };
    return EngineState;
}());
var Engine = /** @class */ (function () {
    function Engine(ENV) {
        this.ENV = ENV;
        this.registry = {};
        this.registryFactory = {};
        this.pendingBackendInitId = 0;
        this.state = new EngineState();
    }
    Engine.prototype.ready = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sortedBackends, i, backendName, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pendingBackendInit != null) {
                            return [2 /*return*/, this.pendingBackendInit.then(function () { })];
                        }
                        if (this.backendInstance != null) {
                            return [2 /*return*/];
                        }
                        sortedBackends = this.getSortedBackends();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < sortedBackends.length)) return [3 /*break*/, 5];
                        backendName = sortedBackends[i];
                        return [4 /*yield*/, this.initializeBackend(backendName).success];
                    case 2:
                        success = _a.sent();
                        if (!success) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.setBackend(backendName)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: throw new Error("Could not initialize any backends, all backend initializations " +
                        "failed.");
                }
            });
        });
    };
    Object.defineProperty(Engine.prototype, "backend", {
        get: function () {
            if (this.pendingBackendInit != null) {
                throw new Error("Backend '" + this.backendName + "' has not yet been initialized. Make " +
                    "sure to await tf.ready() before calling other methods");
            }
            if (this.backendInstance == null) {
                var _a = this.initializeBackendsAndReturnBest(), name_1 = _a.name, asyncInit = _a.asyncInit;
                if (asyncInit) {
                    throw new Error("The highest priority backend '" + name_1 + "' has not yet been " +
                        "initialized. Make sure to await tf.ready() before calling " +
                        "other methods");
                }
                this.setBackend(name_1);
            }
            return this.backendInstance;
        },
        enumerable: true,
        configurable: true
    });
    Engine.prototype.backendNames = function () {
        return Object.keys(this.registryFactory);
    };
    Engine.prototype.findBackend = function (backendName) {
        if (!(backendName in this.registry)) {
            // If the backend hasn't been initialized but we have a registry entry for
            // it, initialize it and return it.
            if (backendName in this.registryFactory) {
                var asyncInit = this.initializeBackend(backendName).asyncInit;
                if (asyncInit) {
                    // Backend is not ready yet.
                    return null;
                }
            }
            else {
                return null;
            }
        }
        return this.registry[backendName];
    };
    Engine.prototype.findBackendFactory = function (backendName) {
        if (!(backendName in this.registryFactory)) {
            return null;
        }
        return this.registryFactory[backendName].factory;
    };
    Engine.prototype.registerBackend = function (backendName, factory, priority) {
        if (priority === void 0) { priority = 1; }
        if (backendName in this.registryFactory) {
            console.warn(backendName + " backend was already registered. " +
                "Reusing existing backend factory.");
            return false;
        }
        this.registryFactory[backendName] = { factory: factory, priority: priority };
        return true;
    };
    Engine.prototype.setBackend = function (backendName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, asyncInit, result, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.registryFactory[backendName] == null) {
                            throw new Error("Backend name '" + backendName + "' not found in registry");
                        }
                        this.backendName = backendName;
                        if (!(this.registry[backendName] == null)) return [3 /*break*/, 4];
                        this.backendInstance = null;
                        _a = this.initializeBackend(backendName), success = _a.success, asyncInit = _a.asyncInit;
                        if (!asyncInit) return [3 /*break*/, 2];
                        return [4 /*yield*/, success];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = success;
                        _c.label = 3;
                    case 3:
                        result = _b;
                        if (!result) {
                            return [2 /*return*/, false];
                        }
                        _c.label = 4;
                    case 4:
                        this.backendInstance = this.registry[backendName];
                        // Reset the profiler.
                        this.profiler = new profiler_1.Profiler(this.backendInstance);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Initializes a backend by looking up the backend name in the factory
     * registry and calling the factory method. Returns a boolean representing
     * whether the initialization of the backend suceeded. Throws an error if
     * there is no backend in the factory registry.
     */
    Engine.prototype.initializeBackend = function (backendName) {
        var _this = this;
        var registryFactoryEntry = exports.ENGINE.registryFactory[backendName];
        if (registryFactoryEntry == null) {
            throw new Error("Cannot initialize backend " + backendName + ", no registration found.");
        }
        try {
            var backend = registryFactoryEntry.factory();
            // Test if the factory returns a promise.
            if (Promise.resolve(backend) === backend) {
                var promiseId_1 = ++this.pendingBackendInitId;
                var success = backend
                    .then(function (backendInstance) {
                    // Outdated promise. Another backend was set in the meantime.
                    if (promiseId_1 < _this.pendingBackendInitId) {
                        return false;
                    }
                    _this.registry[backendName] = backendInstance;
                    _this.pendingBackendInit = null;
                    return true;
                })
                    .catch(function (err) {
                    // Outdated promise. Another backend was set in the meantime.
                    if (promiseId_1 < _this.pendingBackendInitId) {
                        return false;
                    }
                    _this.pendingBackendInit = null;
                    console.warn("Initialization of backend " + backendName + " failed");
                    console.warn(err.stack || err.message);
                    return false;
                });
                this.pendingBackendInit = success;
                return { success: success, asyncInit: true };
            }
            else {
                this.registry[backendName] = backend;
                return { success: true, asyncInit: false };
            }
        }
        catch (err) {
            console.warn("Initialization of backend " + backendName + " failed");
            console.warn(err.stack || err.message);
            return { success: false, asyncInit: false };
        }
    };
    Engine.prototype.removeBackend = function (backendName) {
        if (!(backendName in this.registryFactory)) {
            throw new Error(backendName + " backend not found in registry");
        }
        if (this.backendName === backendName && this.pendingBackendInit != null) {
            // There is a pending promise of the backend we want to remove. Make it
            // obsolete.
            this.pendingBackendInitId++;
        }
        if (backendName in this.registry) {
            this.registry[backendName].dispose();
            delete this.registry[backendName];
        }
        delete this.registryFactory[backendName];
        // Unset the backend if it is active.
        if (this.backendName === backendName) {
            this.pendingBackendInit = null;
            this.backendName = null;
            this.backendInstance = null;
        }
    };
    Engine.prototype.getSortedBackends = function () {
        var _this = this;
        if (Object.keys(this.registryFactory).length === 0) {
            throw new Error('No backend found in registry.');
        }
        return Object.keys(this.registryFactory).sort(function (a, b) {
            // Highest priority comes first.
            return _this.registryFactory[b].priority -
                _this.registryFactory[a].priority;
        });
    };
    Engine.prototype.initializeBackendsAndReturnBest = function () {
        var sortedBackends = this.getSortedBackends();
        for (var i = 0; i < sortedBackends.length; i++) {
            var backendName = sortedBackends[i];
            var _a = this.initializeBackend(backendName), success = _a.success, asyncInit = _a.asyncInit;
            if (asyncInit || success) {
                return { name: backendName, asyncInit: asyncInit };
            }
        }
        throw new Error("Could not initialize any backends, all backend initializations " +
            "failed.");
    };
    Engine.prototype.moveData = function (destBackend, dataId) {
        this.write(destBackend, dataId, this.readSync(dataId));
    };
    Engine.prototype.tidy = function (nameOrFn, fn) {
        var _this = this;
        var name = null;
        if (fn == null) {
            // Called with only 1 argument.
            if (typeof nameOrFn !== 'function') {
                throw new Error('Please provide a function to tidy()');
            }
            fn = nameOrFn;
        }
        else {
            // Called with 2 arguments.
            if (typeof nameOrFn !== 'string' && !(nameOrFn instanceof String)) {
                throw new Error('When calling with two arguments, the first argument ' +
                    'to tidy() must be a string');
            }
            if (typeof fn !== 'function') {
                throw new Error('When calling with two arguments, the 2nd argument ' +
                    'to tidy() must be a function');
            }
            name = nameOrFn;
            // TODO(nsthorat,smilkov): Do operation logging and performance
            // profiling.
        }
        var result;
        return this.scopedRun(function () { return _this.startScope(name); }, function () { return _this.endScope(result); }, function () {
            result = fn();
            if (result instanceof Promise) {
                console.error('Cannot return a Promise inside of tidy.');
            }
            return result;
        });
    };
    Engine.prototype.scopedRun = function (start, end, f) {
        start();
        try {
            var res = f();
            end();
            return res;
        }
        catch (ex) {
            end();
            throw ex;
        }
    };
    Engine.prototype.nextTensorId = function () {
        return Engine.nextTensorId++;
    };
    Engine.prototype.nextVariableId = function () {
        return Engine.nextVariableId++;
    };
    /**
     * This method is called instead of the public-facing tensor.clone() when
     * saving a tensor for backwards pass. It makes sure to add the clone
     * operation to the tape regardless of being called inside a kernel
     * execution.
     */
    Engine.prototype.clone = function (x) {
        var y = tensor_1.Tensor.make(x.shape, { dataId: x.dataId }, x.dtype);
        this.addTapeNode([x], y, function (dy) { return [dy.toFloat()]; });
        return y;
    };
    Engine.prototype.runKernel = function (forwardFunc, inputs, backwardsFunc) {
        var _this = this;
        var result;
        var saved = [];
        var isTapeOn = this.isTapeOn();
        var scopeName = this.state.activeScope != null ? this.state.activeScope.name : '';
        var saveFunc = function (tensors) {
            // Do not save unless we are recording to the tape. Otherwise it would
            // cause a mem leak since we would never run backprop, which disposes
            // the kept tensors.
            if (!isTapeOn) {
                return;
            }
            saved = tensors.map(function (tensor) { return _this.keep(_this.clone(tensor)); });
        };
        var startingBytecount = this.state.numBytes;
        var startingNumTensors = this.state.numTensors;
        // Stop recording to a tape when running a kernel.
        this.scopedRun(function () { return _this.state.kernelDepth++; }, function () { return _this.state.kernelDepth--; }, function () {
            if (!_this.ENV.getBool('DEBUG')) {
                result = forwardFunc(_this.backend, saveFunc);
            }
            else {
                result = _this.profiler.profileKernel(scopeName, function () { return forwardFunc(_this.backend, saveFunc); });
            }
        });
        if (isTapeOn) {
            var tapeNode = {
                id: this.state.nextTapeNodeId++,
                name: scopeName,
                inputs: inputs,
                outputs: Array.isArray(result) ? result : [result],
                saved: saved
            };
            if (backwardsFunc != null) {
                tapeNode.gradient = function (dy) { return backwardsFunc(dy, saved); };
            }
            this.state.activeTape.push(tapeNode);
        }
        if (this.state.profiling) {
            this.state.activeProfile.kernels.push({
                name: scopeName,
                bytesAdded: this.state.numBytes - startingBytecount,
                totalBytesSnapshot: this.state.numBytes,
                tensorsAdded: this.state.numTensors - startingNumTensors,
                totalTensorsSnapshot: this.state.numTensors,
                inputShapes: Object.keys(inputs).map(function (key) { return inputs[key].shape; }),
                outputShape: Array.isArray(result) ?
                    result.map(function (item) { return item.shape; }) :
                    result.shape
            });
        }
        return result;
    };
    // TensorManager implementation.
    Engine.prototype.registerTensor = function (a, backend) {
        var refCount = this.state.tensorInfo.has(a.dataId) ?
            this.state.tensorInfo.get(a.dataId).refCount :
            0;
        this.state.numTensors++;
        if (a.dtype === 'string') {
            this.state.numStringTensors++;
        }
        if (refCount === 0) {
            this.state.numDataBuffers++;
            // Bytes for complex numbers are counted by their components. Bytes for
            // string tensors are counted when writing values.
            var bytes = 0;
            if (a.dtype !== 'complex64' && a.dtype !== 'string') {
                bytes = a.size * util.bytesPerElement(a.dtype);
            }
            this.state.tensorInfo.set(a.dataId, {
                backend: backend != null ? backend : this.backend,
                dtype: a.dtype,
                shape: a.shape,
                bytes: bytes,
                refCount: 0
            });
            this.state.numBytes += bytes;
            if (backend != null) {
                backend.register(a.dataId, a.shape, a.dtype);
            }
            else {
                this.backend.register(a.dataId, a.shape, a.dtype);
            }
        }
        this.state.tensorInfo.get(a.dataId).refCount++;
        if (!(a instanceof tensor_1.Variable)) {
            this.track(a);
        }
    };
    Engine.prototype.registerVariable = function (v) {
        if (this.state.registeredVariables[v.name] != null) {
            throw new Error("Variable with name " + v.name + " was already registered");
        }
        this.state.registeredVariables[v.name] = v;
    };
    Engine.prototype.disposeTensor = function (a) {
        if (!this.state.tensorInfo.has(a.dataId)) {
            return;
        }
        this.state.numTensors--;
        if (a.dtype === 'string') {
            this.state.numStringTensors--;
        }
        var info = this.state.tensorInfo.get(a.dataId);
        var refCount = info.refCount;
        if (refCount <= 1) {
            // Don't count bytes for complex numbers as they are counted by their
            // components.
            if (a.dtype !== 'complex64') {
                this.state.numBytes -= info.bytes;
            }
            this.state.numDataBuffers--;
            info.backend.disposeData(a.dataId);
            this.state.tensorInfo.delete(a.dataId);
        }
        else {
            this.state.tensorInfo.get(a.dataId).refCount--;
        }
        // TODO(nsthorat): Construct an error and save the stack trace for
        // debugging when in debug mode. Creating a stack trace is too expensive
        // to do unconditionally.
    };
    Engine.prototype.disposeVariables = function () {
        for (var varName in this.state.registeredVariables) {
            var v = this.state.registeredVariables[varName];
            this.disposeVariable(v);
        }
    };
    Engine.prototype.disposeVariable = function (v) {
        this.disposeTensor(v);
        if (this.state.registeredVariables[v.name] != null) {
            delete this.state.registeredVariables[v.name];
        }
    };
    Engine.prototype.memory = function () {
        var info = this.backend.memory();
        info.numTensors = this.state.numTensors;
        info.numDataBuffers = this.state.numDataBuffers;
        info.numBytes = this.state.numBytes;
        if (this.state.numStringTensors > 0) {
            info.unreliable = true;
            if (info.reasons == null) {
                info.reasons = [];
            }
            info.reasons.push('Memory usage by string tensors is approximate ' +
                '(2 bytes per character)');
        }
        return info;
    };
    Engine.prototype.profile = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var startBytes, startNumTensors;
            return __generator(this, function (_a) {
                this.state.profiling = true;
                startBytes = this.state.numBytes;
                startNumTensors = this.state.numTensors;
                this.state.activeProfile.kernels = [];
                this.state.activeProfile.result = query();
                this.state.profiling = false;
                this.state.activeProfile.peakBytes = Math.max.apply(Math, this.state.activeProfile.kernels.map(function (d) { return d.totalBytesSnapshot; }));
                this.state.activeProfile.newBytes = this.state.numBytes - startBytes;
                this.state.activeProfile.newTensors =
                    this.state.numTensors - startNumTensors;
                return [2 /*return*/, this.state.activeProfile];
            });
        });
    };
    Engine.prototype.isTapeOn = function () {
        return this.state.gradientDepth > 0 && this.state.kernelDepth === 0;
    };
    Engine.prototype.addTapeNode = function (inputs, result, gradientsFunc) {
        var inputsMap = {};
        inputs.forEach(function (input, idx) {
            inputsMap[idx] = input;
        });
        var gradient = function (dy) {
            var res = gradientsFunc(dy);
            var resMap = {};
            res.forEach(function (r, idx) {
                resMap[idx] = function () { return r; };
            });
            return resMap;
        };
        var tapeNode = {
            id: this.state.nextTapeNodeId++,
            name: this.state.activeScope.name,
            inputs: inputsMap,
            outputs: [result],
            gradient: gradient
        };
        this.state.activeTape.push(tapeNode);
    };
    Engine.prototype.keep = function (result) {
        result.kept = true;
        return result;
    };
    Engine.prototype.startTape = function () {
        if (this.state.gradientDepth === 0) {
            this.state.activeTape = [];
        }
        this.state.gradientDepth++;
    };
    Engine.prototype.endTape = function () {
        this.state.gradientDepth--;
    };
    /**
     * Start a scope. Use this with endScope() to achieve the same functionality
     * as scope() without the need for a function closure.
     */
    Engine.prototype.startScope = function (name) {
        var scopeInfo = {
            track: [],
            name: 'unnamed scope',
            id: this.state.nextScopeId++
        };
        if (name) {
            scopeInfo.name = name;
        }
        this.state.scopeStack.push(scopeInfo);
        this.state.activeScope = scopeInfo;
    };
    /**
     * End a scope. Use this with startScope() to achieve the same functionality
     * as scope() without the need for a function closure.
     */
    Engine.prototype.endScope = function (result) {
        var _this = this;
        var tensorsToTrackInParent = tensor_util_1.getTensorsInContainer(result);
        var tensorsToTrackInParentSet = new Set(tensorsToTrackInParent.map(function (t) { return t.id; }));
        // Dispose the arrays tracked in this scope.
        for (var i = 0; i < this.state.activeScope.track.length; i++) {
            var tensor = this.state.activeScope.track[i];
            if (!tensor.kept && !tensorsToTrackInParentSet.has(tensor.id)) {
                tensor.dispose();
            }
        }
        var oldScope = this.state.scopeStack.pop();
        this.state.activeScope = this.state.scopeStack.length === 0 ?
            null :
            this.state.scopeStack[this.state.scopeStack.length - 1];
        // Track the current result in the parent scope.
        tensorsToTrackInParent.forEach(function (tensor) {
            // Only track the tensor if was allocated in the inner scope and is not
            // globally kept.
            if (!tensor.kept && tensor.scopeId === oldScope.id) {
                _this.track(tensor);
            }
        });
    };
    /**
     * Returns gradients of `f` with respect to each of the `xs`. The gradients
     * returned are of the same length as `xs`, but some might be null if `f`
     * was not a function of that `x`. It also takes optional dy to multiply the
     * gradient, which defaults to `1`.
     */
    Engine.prototype.gradients = function (f, xs, dy, allowNoGradients) {
        var _this = this;
        if (allowNoGradients === void 0) { allowNoGradients = false; }
        util.assert(xs.length > 0, function () { return 'gradients() received an empty list of xs.'; });
        if (dy != null && dy.dtype !== 'float32') {
            throw new Error("dy must have 'float32' dtype, but has '" + dy.dtype + "'");
        }
        var y = this.scopedRun(function () { return _this.startTape(); }, function () { return _this.endTape(); }, function () { return _this.tidy('forward', f); });
        util.assert(y instanceof tensor_1.Tensor, function () { return 'The result y returned by f() must be a tensor.'; });
        // Filter out the nodes that don't connect x => y.
        var filteredTape = tape_1.getFilteredNodesXToY(this.state.activeTape, xs, y);
        if (!allowNoGradients && filteredTape.length === 0 && xs.length > 0) {
            throw new Error('Cannot compute gradient of y=f(x) with respect to x. Make sure ' +
                'that the f you passed encloses all operations that lead from x ' +
                'to y.');
        }
        return this.tidy('backward', function () {
            var accumulatedGradientMap = {};
            accumulatedGradientMap[y.id] = (dy == null) ? ones(y.shape) : dy;
            // Backprop gradients through the filtered nodes.
            tape_1.backpropagateGradients(accumulatedGradientMap, filteredTape, 
            // Pass the tidy function to avoid circular dep with `tape.ts`.
            function (f) { return _this.tidy(f); });
            var grads = xs.map(function (x) { return accumulatedGradientMap[x.id]; });
            if (_this.state.gradientDepth === 0) {
                // This means that we are not computing higher-order gradients
                // and can clean up the tape.
                _this.state.activeTape.forEach(function (node) {
                    for (var key in node.saved) {
                        node.saved[key].dispose();
                    }
                });
                _this.state.activeTape = null;
            }
            return { value: y, grads: grads };
        });
    };
    Engine.prototype.customGrad = function (f) {
        var _this = this;
        util.assert(util.isFunction(f), function () { return 'The f passed in customGrad(f) must be a function.'; });
        return function () {
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            util.assert(inputs.every(function (t) { return t instanceof tensor_1.Tensor; }), function () { return 'The args passed in customGrad(f)(x1, x2,...) must all be ' +
                'tensors'; });
            var res;
            var inputMap = {};
            inputs.forEach(function (input, i) {
                inputMap[i] = input;
            });
            return _this.runKernel(function (_, save) {
                res = f.apply(void 0, inputs.concat([save]));
                util.assert(res.value instanceof tensor_1.Tensor, function () { return 'The function f passed in customGrad(f) must return an ' +
                    'object where `obj.value` is a tensor'; });
                util.assert(util.isFunction(res.gradFunc), function () { return 'The function f passed in customGrad(f) must return an ' +
                    'object where `obj.gradFunc` is a function.'; });
                return res.value;
            }, inputMap, function (dy, saved) {
                var gradRes = res.gradFunc(dy, saved);
                var grads = Array.isArray(gradRes) ? gradRes : [gradRes];
                util.assert(grads.length === inputs.length, function () { return 'The function f passed in customGrad(f) must return an ' +
                    'object where `obj.gradFunc` is a function that returns ' +
                    'the same number of tensors as inputs passed to f(...).'; });
                util.assert(grads.every(function (t) { return t instanceof tensor_1.Tensor; }), function () { return 'The function f passed in customGrad(f) must return an ' +
                    'object where `obj.gradFunc` is a function that returns ' +
                    'a list of only tensors.'; });
                var gradMap = {};
                grads.forEach(function (grad, i) {
                    gradMap[i] = function () { return grad; };
                });
                return gradMap;
            });
        };
    };
    // Forwarding to backend.
    Engine.prototype.write = function (destBackend, dataId, values) {
        var info = this.state.tensorInfo.get(dataId);
        var srcBackend = info.backend;
        destBackend = destBackend || this.backend;
        // Bytes for string tensors are counted when writing.
        if (info.dtype === 'string') {
            var newBytes = util_1.bytesFromStringArray(values);
            this.state.numBytes += newBytes - info.bytes;
            info.bytes = newBytes;
        }
        if (destBackend !== srcBackend) {
            // Delete the tensor from the old backend and move it to the new
            // backend.
            srcBackend.disposeData(dataId);
            info.backend = destBackend;
            destBackend.register(dataId, info.shape, info.dtype);
        }
        destBackend.write(dataId, values);
    };
    Engine.prototype.readSync = function (dataId) {
        // Route the read to the correct backend.
        var info = this.state.tensorInfo.get(dataId);
        return info.backend.readSync(dataId);
    };
    Engine.prototype.read = function (dataId) {
        // Route the read to the correct backend.
        var info = this.state.tensorInfo.get(dataId);
        return info.backend.read(dataId);
    };
    Engine.prototype.fromPixels = function (pixels, numChannels) {
        return this.backend.fromPixels(pixels, numChannels);
    };
    Engine.prototype.time = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var start, timingInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = util_1.now();
                        return [4 /*yield*/, this.backend.time(query)];
                    case 1:
                        timingInfo = _a.sent();
                        timingInfo.wallMs = util_1.now() - start;
                        return [2 /*return*/, timingInfo];
                }
            });
        });
    };
    /**
     * Tracks a Tensor in the current scope to be automatically cleaned up
     * when the current scope ends, and returns the value.
     *
     * @param result The Tensor to track in the current scope.
     */
    Engine.prototype.track = function (result) {
        if (this.state.activeScope != null) {
            result.scopeId = this.state.activeScope.id;
            this.state.activeScope.track.push(result);
        }
        return result;
    };
    Object.defineProperty(Engine.prototype, "registeredVariables", {
        get: function () {
            return this.state.registeredVariables;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the engine state. Removes all backends but does not remove
     * registered backend factories.
     */
    Engine.prototype.reset = function () {
        // Make any pending promise obsolete.
        this.pendingBackendInitId++;
        this.state.dispose();
        this.ENV.reset();
        this.state = new EngineState();
        for (var backendName in this.registry) {
            this.registry[backendName].dispose();
            delete this.registry[backendName];
        }
        this.backendName = null;
        this.backendInstance = null;
        this.pendingBackendInit = null;
    };
    Engine.nextTensorId = 0;
    Engine.nextVariableId = 0;
    return Engine;
}());
exports.Engine = Engine;
function ones(shape) {
    var values = util_1.makeOnesTypedArray(util_1.sizeFromShape(shape), 'float32');
    return tensor_1.Tensor.make(shape, { values: values });
}
var GLOBAL;
function getGlobalNamespace() {
    if (GLOBAL == null) {
        // tslint:disable-next-line:no-any
        var ns = void 0;
        if (typeof (window) !== 'undefined') {
            ns = window;
        }
        else if (typeof (global) !== 'undefined') {
            ns = global;
        }
        else if (typeof (process) !== 'undefined') {
            ns = process;
        }
        else if (typeof (self) !== 'undefined') {
            ns = self;
        }
        else {
            throw new Error('Could not find a global object');
        }
        GLOBAL = ns;
    }
    return GLOBAL;
}
function getOrMakeEngine() {
    var ns = getGlobalNamespace();
    if (ns._tfengine == null) {
        var environment = new environment_1.Environment(ns);
        ns._tfengine = new Engine(environment);
    }
    environment_1.setEnvironmentGlobal(ns._tfengine.ENV);
    // Tell the current tensor interface that the global engine is responsible
    // for tracking.
    tensor_1.setTensorTracker(function () { return ns._tfengine; });
    return ns._tfengine;
}
exports.ENGINE = getOrMakeEngine();
//# sourceMappingURL=engine.js.map