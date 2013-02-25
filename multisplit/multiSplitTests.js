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
 * Tests
 */
function test1() {
	document.write('test 1<br />');
	var tags = 'tag1,tag2 OR tag 3   , tag4';
	var delimiters = [ ',', ' OR ' ];
	var splits = multiSplit(tags, delimiters);

	var i, j;
	for (i = 0; i < splits.length; i++) {
		document.write('[ \"' + splits[i][0] + '\",\"' + splits[i][1] +
			'\" ]<br />');
	}
}

function test2() {
	document.write('test 2<br />');
	function myCallback(str, delim)
	{
		document.write('[ \"' + str + '\",\"' + delim + '\" ]<br />');
	}

	var tags = 'tag1,tag2 OR tag 3   , tag4';
	var delimiters = [ ',', ' OR ' ];
	multiSplit(tags, delimiters, myCallback);
}

function test3() {
	document.write('test 3<br />');
	var tags = 'tag1,tag2 OR tag 3   , tag4';
	var delimiters = [ ',', ' OR ' ];
	var splits = tags.multiSplit(delimiters);

	var i, j;
	for (i = 0; i < splits.length; i++) {
		document.write('[ \"' + splits[i][0] + '\",\"' + splits[i][1] +
			'\" ]<br />');
	}
}

test1();
document.write('<br />');
test2();
document.write('<br />');
test3();
