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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var engine_1 = require("../engine");
var globals_1 = require("../globals");
var ops_1 = require("../ops/ops");
var serialization_1 = require("../serialization");
var optimizer_1 = require("./optimizer");
/** @doclink Optimizer */
var AdadeltaOptimizer = /** @class */ (function (_super) {
    __extends(AdadeltaOptimizer, _super);
    function AdadeltaOptimizer(learningRate, rho, epsilon) {
        if (epsilon === void 0) { epsilon = null; }
        var _this = _super.call(this) || this;
        _this.learningRate = learningRate;
        _this.rho = rho;
        _this.epsilon = epsilon;
        _this.accumulatedGrads = [];
        _this.accumulatedUpdates = [];
        if (epsilon == null) {
            _this.epsilon = engine_1.ENGINE.backend.epsilon();
        }
        return _this;
    }
    AdadeltaOptimizer.prototype.applyGradients = function (variableGradients) {
        var _this = this;
        var variableNames = Array.isArray(variableGradients) ?
            variableGradients.map(function (item) { return item.name; }) :
            Object.keys(variableGradients);
        variableNames.forEach(function (name, i) {
            var value = engine_1.ENGINE.registeredVariables[name];
            var trainable = false;
            if (_this.accumulatedGrads[i] == null) {
                _this.accumulatedGrads[i] = {
                    originalName: name + "/accum_grad",
                    variable: globals_1.tidy(function () { return ops_1.zerosLike(value).variable(trainable); })
                };
            }
            if (_this.accumulatedUpdates[i] == null) {
                _this.accumulatedUpdates[i] = {
                    originalName: name + "/accum_var",
                    variable: globals_1.tidy(function () { return ops_1.zerosLike(value).variable(trainable); })
                };
            }
            var gradient = Array.isArray(variableGradients) ?
                variableGradients[i].tensor :
                variableGradients[name];
            if (gradient == null) {
                return;
            }
            var accumulatedGrad = _this.accumulatedGrads[i].variable;
            var accumulatedUpdate = _this.accumulatedUpdates[i].variable;
            globals_1.tidy(function () {
                var newAccumulatedGrad = accumulatedGrad.mul(_this.rho).add(gradient.square().mul(1 - _this.rho));
                var updates = accumulatedUpdate.add(_this.epsilon)
                    .sqrt()
                    .div(accumulatedGrad.add(_this.epsilon).sqrt())
                    .mul(gradient);
                var newAccumulatedUpdate = accumulatedUpdate.mul(_this.rho).add(updates.square().mul(1 - _this.rho));
                accumulatedGrad.assign(newAccumulatedGrad);
                accumulatedUpdate.assign(newAccumulatedUpdate);
                var newValue = updates.mul(-_this.learningRate).add(value);
                value.assign(newValue);
            });
        });
        this.incrementIterations();
    };
    AdadeltaOptimizer.prototype.dispose = function () {
        if (this.accumulatedUpdates != null) {
            globals_1.dispose(this.accumulatedGrads.map(function (v) { return v.variable; }));
            globals_1.dispose(this.accumulatedUpdates.map(function (v) { return v.variable; }));
        }
    };
    AdadeltaOptimizer.prototype.getWeights = function () {
        return __awaiter(this, void 0, void 0, function () {
            var variables;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        variables = this.accumulatedGrads.concat(this.accumulatedUpdates);
                        return [4 /*yield*/, this.saveIterations()];
                    case 1: return [2 /*return*/, [_a.sent()].concat(variables.map(function (v) { return ({ name: v.originalName, tensor: v.variable }); }))];
                }
            });
        });
    };
    AdadeltaOptimizer.prototype.setWeights = function (weightValues) {
        return __awaiter(this, void 0, void 0, function () {
            var variableCount, trainable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.extractIterations(weightValues)];
                    case 1:
                        weightValues = _a.sent();
                        variableCount = weightValues.length / 2;
                        trainable = false;
                        this.accumulatedGrads =
                            weightValues.slice(0, variableCount).map(function (v) { return ({
                                originalName: v.name,
                                variable: v.tensor.variable(trainable)
                            }); });
                        this.accumulatedUpdates =
                            weightValues.slice(variableCount, variableCount * 2)
                                .map(function (v) { return ({
                                originalName: v.name,
                                variable: v.tensor.variable(trainable)
                            }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AdadeltaOptimizer.prototype.getConfig = function () {
        return {
            'learningRate': this.learningRate,
            'rho': this.rho,
            'epsilon': this.epsilon
        };
    };
    /** @nocollapse */
    AdadeltaOptimizer.fromConfig = function (cls, config) {
        return new cls(config['learningRate'], config['rho'], config['epsilon']);
    };
    /** @nocollapse */
    AdadeltaOptimizer.className = 'AdadeltaOptimizer';
    return AdadeltaOptimizer;
}(optimizer_1.Optimizer));
exports.AdadeltaOptimizer = AdadeltaOptimizer;
serialization_1.registerClass(AdadeltaOptimizer);
//# sourceMappingURL=adadelta_optimizer.js.map