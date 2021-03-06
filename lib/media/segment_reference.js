/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

goog.provide('shaka.media.InitSegmentReference');
goog.provide('shaka.media.SegmentReference');

goog.require('goog.asserts');



/**
 * Creates an InitSegmentReference, which provides the location to an
 * initialization segment.
 *
 * @param {!Array.<string>} uris The URIs of the resource containing the
 *   segment.
 * @param {number} startByte The offset from the start of the resource to the
 *   start of the segment.
 * @param {?number} endByte The offset from the start of the resource to the
 *   end of the segment, inclusive. null indicates that the segment extends
 *   to the end of the resource.
 *
 * @constructor
 * @struct
 * @export
 */
shaka.media.InitSegmentReference = function(uris, startByte, endByte) {
  /** @const {!Array.<string>} */
  this.uris = uris;

  /** @const {number} */
  this.startByte = startByte;

  /** @const {?number} */
  this.endByte = endByte;
};



/**
 * Creates a SegmentReference, which provides the start time, end time, and
 * location to a media segment.
 *
 * @param {number} position The segment's position within a particular Period.
 *   The following should hold true between any two SegmentReferences from the
 *   same Period, r1 and r2:
 *   IF r2.position > r1.position THEN
 *     [ (r2.startTime > r1.startTime) OR
 *       (r2.startTime == r1.startTime AND r2.endTime >= r1.endTime) ]
 * @param {number} startTime The segment's start time in seconds, relative to
 *   the start of a particular Period.
 * @param {number} endTime The segment's end time in seconds, relative to
 *   the start of a particular Period. The segment ends the instant before
 *   this time, so |endTime| must be strictly greater than |startTime|.
 * @param {!Array.<string>} uris The URIs of the resource containing the
 *   segment.
 * @param {number} startByte The offset from the start of the resource to the
 *   start of the segment.
 * @param {?number} endByte The offset from the start of the resource to the
 *   end of the segment, inclusive. null indicates that the segment extends
 *   to the end of the resource.
 *
 * @constructor
 * @struct
 * @export
 */
shaka.media.SegmentReference = function(
    position, startTime, endTime, uris, startByte, endByte) {
  goog.asserts.assert(startTime < endTime,
                      'startTime must be less than endTime');
  goog.asserts.assert((startByte < endByte) || (endByte == null),
                      'startByte must be < endByte');
  /** @const {number} */
  this.position = position;

  /** @const {number} */
  this.startTime = startTime;

  /** @const {number} */
  this.endTime = endTime;

  /** @const {!Array.<string>} */
  this.uris = uris;

  /** @const {number} */
  this.startByte = startByte;

  /** @const {?number} */
  this.endByte = endByte;
};

