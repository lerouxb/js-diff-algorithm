'use strict';

const Code = require('code');
const Lab = require('lab');

const Diff = require('..');

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

const internals = {};

internals.testCases = [
    [
        'blank input and output',
        '',
        '',
        ''
    ],
    [
        'no change',
        'foo',
        'foo',
        'foo'
    ],
    [
        'insert',
        'foo',
        'foo bar',
        'foo<ins> bar</ins>'
    ],
    [
        'delete',
        'foo bar',
        'foo',
        'foo<del> bar</del>'
    ],
    [
        'replace',
        'foo',
        'bar',
        '<del>foo</del><ins>bar</ins>'
    ],
    [
        'insert multiple identical terms',
        'foo',
        'foo foo foo',
        '<del>foo</del><ins>foo foo foo</ins>'
    ],
    [
        'delete multiple identical terms',
        'foo foo foo',
        'foo',
        '<del>foo foo foo</del><ins>foo</ins>'
    ],
    [
        'go multi-line',
        'foo bar',
        'foo\nbar',
        'foo<del> </del><ins>\n</ins>bar'
    ],
    [
        'go single-line',
        'foo\nbar',
        'foo bar',
        'foo<del>\n</del><ins> </ins>bar'
    ],
    [
        'Lots of words',
        'Lorem ipsum (dolor sit amet), consectetur',
        'Lorem: ipsum (dolor changed amet), consectetur',
        '<del>Lorem</del><ins>Lorem:</ins> ipsum (dolor <del>sit</del><ins>changed</ins> amet), consectetur'
    ],
    [
        'Lots of words with duplicates',
        'Lorem ipsum ipsum (dolor sit amet), consectetur',
        'Lorem: ipsum (dolor dolor changed amet), consectetur',
        '<del>Lorem ipsum</del><ins>Lorem:</ins> ipsum (dolor <del>sit</del><ins>dolor changed</ins> amet), consectetur'
    ]
];

describe('js-diff-algorithm', () => {

    for (const [name, left, right, expected] of internals.testCases) {

        it(name, () => {

            expect(Diff(left, right)).to.equal(expected);
        });
    }
});

