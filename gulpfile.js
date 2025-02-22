/*
  Copyright (C) 2014 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
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

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');

var TEST = [ 'test/*.js' ];

var LINT = [
    'gulpfile.js',
    'escodegen.js'
];

var ESLINT_OPTION = {
    'rulesPaths': [ 'tools/rules/' ],
    'rules': {
        // 'push-with-multiple-arguments': 2,
        'quotes': 0,
        'eqeqeq': 0,
        'no-use-before-define': 0,
        'dot-notation': 0,
        'no-shadow': 0,
        'no-unused-vars': [
            2,
            {
                'vars': 'all',
                'args': 'none'
            }
        ],
        'no-multi-spaces': 0,
        'new-cap': [
            2,
            {
                'capIsNew': false
            }
        ]
    },
    'env': {
        'node': true
    }
};

gulp.task('test', function () {
    return gulp.src(TEST)
        .pipe(mocha({
            reporter: 'spec',
            timeout: 100000 // 100s
        }));
});

gulp.task('lint', function () {
    return gulp.src(LINT)
        .pipe(eslint(ESLINT_OPTION))
        .pipe(eslint.formatEach('stylish', process.stderr))
        .pipe(eslint.failOnError());
});

gulp.task('travis', gulp.parallel('lint', 'test'));
gulp.task('default', gulp.parallel('travis'));
