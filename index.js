'use strict';

/*
 * Javascript Diff Algorithm
 *    By John Resig (http://ejohn.org/)
 *    Modified by Chu Alan "sprite"
 *    Modified by Le Roux Bodenstein to fit with more modern js style, fixed some bugs.
 *
 * Released under the MIT license.
 *
 * More Info:
 *    http://ejohn.org/projects/javascript-diff-algorithm/
 */

const internals = {};

internals.escape = function (s) {

    let n = s;
    n = n.replace(/&/g, '&amp;');
    n = n.replace(/</g, '&lt;');
    n = n.replace(/>/g, '&gt;');
    n = n.replace(/"/g, '&quot;');

    return n;
};

internals.diff = function (o, n) {

    const ns = {};
    const os = {};

    for (let i = 0; i < n.length; ++i) {
        const key = n[i];
        if (!ns[key]) {
            ns[key] = { rows: [], o: null };
        }
        ns[key].rows.push(i);
    }

    for (let i = 0; i < o.length; ++i) {
        const key = o[i];
        if (!os[key]) {
            os[key] = { rows: [], n: null };
        }
        os[key].rows.push(i);
    }

    for (const i in ns) {
        if (ns[i].rows.length === 1 && os[i] !== undefined && os[i].rows.length === 1) {
            n[ns[i].rows[0]] = { text: n[ns[i].rows[0]], row: os[i].rows[0] };
            o[os[i].rows[0]] = { text: o[os[i].rows[0]], row: ns[i].rows[0] };
        }
    }

    return { o, n };
};

internals.split = function (string) {

    return string.split(/(\s+)/);
};

module.exports = function (o, n) {

    const oTerms = o === '' ? [] : internals.split(o);
    const nTerms = n === '' ? [] : internals.split(n);
    const out = internals.diff(oTerms, nTerms);
    let str = '';

    if (out.n.length) {
        if (out.n[0].text === undefined) {
            for (n = 0; n < out.o.length && out.o[n].text === undefined; ++n) {
                str += '<del>' + internals.escape(out.o[n]) + '</del>';
            }
        }

        for (let i = 0; i < out.n.length; ++i) {
            if (out.n[i].text === undefined) {

                str += '<ins>' + internals.escape(out.n[i]) + '</ins>';
            }
            else {
                let pre = '';

                for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text === undefined; ++n) {
                    pre += '<del>' + internals.escape(out.o[n]) + '</del>';
                }
                str += out.n[i].text + pre;
            }
        }
    }

    // merge adjacent tags
    str = str.replace(/<\/ins><ins>/g, '');
    str = str.replace(/<\/del><del>/g, '');

    return str;
};
