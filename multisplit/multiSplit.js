/*
 * Copyright (c) 2008, Joel Weinberger
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Joel Weinberger nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Joel Weinberger ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Joel Weinberger BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * This is the string member version of multiSplit. See the comments for
 * multiSplit for details regarding the behavior of this method.
 *
 */
String.prototype.multiSplit = function(delimitersOrig, callback)
{
	return multiSplit(this, delimitersOrig, callback);
}

/*
 * Given a string and an array of delimiters (which must be strings), returns a
 * split of the string in the order that the delimiters are found.
 *
 * splitStr : String that is to be split
 * splitDelimiters : Array of delimiters to split on
 * callback : (String, Array of Strings -> void)
 *
 * return : Array of Array of Strings
 *
 * The optional callback must be of the form:
 *      function callback (string, delimiter)
 * where a null delimiter implies the final string in the sequence. If the
 * callback is specified, it is called in order for each delimiter that is
 * reached, specifying the preceeding section of the String as the first
 * argument and the delimiter split on as the second argument. It is also called
 * for the last substring reached that does not precede a delmiter. In this
 * case, callback is called with the substring as the first argument and null as
 * the delimiter.
 *
 * multiSplit returns an Array of Arrays of Strings. Each element of the return
 * value is an Array of two elements. For all elements except the last, the
 * first of the two elements is the substring found preceding the delimiter and
 * the second element is the delimiter after the substring. For the last
 * element of the Array, the first element is the final substring and the second
 * element is null.
 */
function multiSplit(splitStr, splitDelimiters, callback)
{
	/*
	 * We use a helper function because this way we can pass the result and use
	 * tail recursion for each recursive call.
	 */
	function multiSplitHelp(str, delimiters, result)
	{
		var i;
		var minI;
		var minIndex = -1;

		/*
		 * For each delimiter, find the first instance of it in the string. If
		 * it is closer than the current minimum index, store it.
		 */
		for (i = 0; i < delimiters.length; i++) {
			var index = str.indexOf(delimiters[i]);

			/*
			 * If there is an instance of the delimiter (i.e. index is not -1),
			 * and there hasn't been an index found so far (i.e. minIndex is -1)
			 * or the index is less than the current minimum index, then the
			 * index is a new minimum.
			 */
			if (index > -1 && (minIndex == -1 || index < minIndex)) {
				minIndex = index;
				minI = i;
			}
		}

		/*
		 * If the minimum index is still -1, no instance of a delimiter was
		 * found. This is the base case, so return.
		 *
		 * Otherwise, add the found delimiter to the results and make a
		 * recursive call.
		 */
		if (minIndex == -1) {
			if (callback) {
				callback(str, null);
			}

			result.push([ str, null ]);
			return result;
		} else {
			var curStr = str.substr(0, minIndex);
			if (callback) {
				callback(curStr, delimiters[minI]);
			}

			result.push([ curStr, delimiters[minI] ]);
			str = str.substr(minIndex + delimiters[minI].length,
				str.length);
			return multiSplitHelp(str, delimiters, result);
		}
	}

	return multiSplitHelp(splitStr, splitDelimiters, new Array());
}
