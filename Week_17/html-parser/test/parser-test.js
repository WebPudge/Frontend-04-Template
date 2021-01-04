const assert = require('assert');

import { parseHTML } from '../src/parser';

describe('parse html:', () => {
  it('<a></a>', () => {
    const tree = parseHTML('<a></a>')
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].children.length, 0);
  });
  it('<a href="//test.com"></a>', () => {
    const tree = parseHTML('<a href="//test.com"></a>')
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].attributes[0].name, 'href');
    assert.strictEqual(tree.children[0].attributes[0].value, '//test.com');
  });
  it('<a href ></a>', () => {
    const tree = parseHTML('<a href ></a>')
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].attributes[0].name, 'href');
    assert.strictEqual(tree.children[0].attributes[0].value, '');
  });
  it('<a href ></a>', () => {
    const tree = parseHTML('<a href ></a>')
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].attributes[0].name, 'href');
    assert.strictEqual(tree.children[0].attributes[0].value, '');
  });
  it('<a href id ></a>', () => {
    const tree = parseHTML('<a href id ></a>')
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].attributes[0].name, 'href');
    assert.strictEqual(tree.children[0].attributes[0].value, '');
    assert.strictEqual(tree.children[0].attributes[1].name, 'id');
    assert.strictEqual(tree.children[0].attributes[1].value, '');
  });
  it('<a href=\'//test.com\'></a>', () => {
    const tree = parseHTML('<a href=\'//test.com\'></a>')
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].attributes[0].name, 'href');
    assert.strictEqual(tree.children[0].attributes[0].value, '//test.com');
  });
  it('<a href=test></a>', () => {
    const tree = parseHTML('<a href=test></a>')
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].attributes[0].name, 'href');
    assert.strictEqual(tree.children[0].attributes[0].value, 'test');
  });
  it('<a href=test/>', () => {
    const tree = parseHTML('<a href=test/>')
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].isSelfClosing, true);
    assert.strictEqual(tree.children[0].attributes[0].name, 'href');
    assert.strictEqual(tree.children[0].attributes[0].value, 'test');
  });
  it('<style>body {margin: 0;}</style><body></body>', () => {
    const tree = parseHTML('<style>body {margin: 0;}</style><body></body>')
    assert.strictEqual(tree.children[0].tagName, 'style');
    assert.strictEqual(tree.children[1].tagName, 'body');
    assert.strictEqual(tree.children[1].computedStyle.margin.value, '0');
  });
  it('<style>body {margin: 0;} .test {margin: 10px;}</style><body class="test"></body>', () => {
    const tree = parseHTML('<style>body {margin: 0;} .test {margin: 10px;}</style><body class="test"></body>')
    console.log(tree.children[1].computedStyle)
    assert.strictEqual(tree.children[0].tagName, 'style');
    assert.strictEqual(tree.children[1].tagName, 'body');
    assert.strictEqual(tree.children[1].computedStyle.margin.value, '10px');
  });
  it('<style>body {margin: 0;} #test {margin: 10px;}</style><body id="test"></body>', () => {
    const tree = parseHTML('<style>body {margin: 0;} test {margin: 10px;}</style><body id="test"></body>')
    console.log(tree.children[1].computedStyle)
    assert.strictEqual(tree.children[0].tagName, 'style');
    assert.strictEqual(tree.children[1].tagName, 'body');
    assert.strictEqual(tree.children[1].computedStyle.margin.value, '10px');
  });
});
