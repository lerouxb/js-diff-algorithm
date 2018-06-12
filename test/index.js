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

internals.dictionary = 'ad adipiscing aliqua aliquip amet anim aute cillum commodo consectetur consequat culpa cupidatat deserunt do dolor dolore duis ea eiusmod elit enim esse est et eu ex excepteur exercitation fugiat id in incididunt ipsum irure labore laboris laborum lorem magna minim mollit nisi non nostrud nulla occaecat officia pariatur proident qui quis reprehenderit sed sint sit sunt tempor ullamco ut velit veniam voluptate'.split(' ');

internals.makeText = function () {

    const words = [];
    const length = Math.floor(Math.random() * 10);
    const dictionarySize = internals.dictionary.length;
    for (let i = 0; i < length; ++i) {
        words.push(internals.dictionary[Math.floor(Math.random() * dictionarySize)]);
    }
    return words.join(' ');
};

describe('js-diff-algorithm', () => {

    for (const [name, left, right, expected] of internals.testCases) {

        it(name, () => {

            expect(Diff(left, right)).to.equal(expected);
        });
    }

    it.only('deals with randomness', () => {

        for (let i = 0; i < 1000000; ++i) {
            const left = internals.makeText();
            const right = internals.makeText();
            const diff = Diff(left, right);
            console.log({ left, right, diff });
        }
    });
});

