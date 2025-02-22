/*
 Copyright (C) 2019 Guy Lewin <guy@lewin.co.il>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

var fs = require('fs'),
    esprima = require('esprima'),
    escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect;

function test(tree) {
    var tree, actual;
    var code = "{\n    }";
    var options = {
        sourceCode: code,
        format: {
            preserveBlankLines: true
        }
    };

    actual = escodegen.generate(tree, options);
    expect(actual).to.be.equal(code);
}

describe('test building trees with and without range', function () {
    it("with range - Esprima built", function () {
        // Parsed by Esprima
        test({
            "type": "Program",
            "body": [{
                "type": "BlockStatement",
                "body": [],
                "range": [
                    0,
                    7
                ]
            }],
            "sourceType": "module",
            "range": [
                0,
                7
            ]
        });
    });

    it("without range - Acorn built", function () {
        // Parsed by Acorn
        test({
            "type": "Program",
            "start": 0,
            "end": 7,
            "body": [{
                "type": "BlockStatement",
                "start": 0,
                "end": 7,
                "body": []
            }],
            "sourceType": "module"
        });
    });
});

/* vim: set sw=4 ts=4 et tw=80 : */
