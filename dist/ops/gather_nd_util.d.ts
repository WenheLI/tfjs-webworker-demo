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
import { Tensor } from '../tensor';
/**
 * Validate gather nd inputs.
 *
 * @param tensor The tensor contains the source values.
 * @param indices The tensor contains the indices to slice the source.
 *
 * @returns [resultShape, numUpdates, sliceSize, strides]
 */
export declare function prepareAndValidate(tensor: Tensor, indices: Tensor): [number[], number, number, number[]];
