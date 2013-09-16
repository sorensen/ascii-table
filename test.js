'use strict';

var assert = require('assert')
  , ase = assert.strictEqual
  , ade = assert.deepEqual
  , Table = require('./index')
  , info = require('./package.json')

describe('Ascii Table v' + info.version, function() {

  describe('Static methods', function() {

    it('#version', function() {
      ase(info.version, Table.VERSION)
    })

    it('#alignLeft', function() {
      var str = Table.alignLeft('foo', 30)
      ase(str, 'foo                           ')

      var str = Table.alignLeft('bar', 10, '-')
      ase(str, 'bar-------')
    })

    it('#alignRight', function() {
      var str = Table.alignRight('foo', 30)
      ase(str, '                           foo')

      var str = Table.alignRight('bar', 10, '-')
      ase(str, '-------bar')
    })

    it('#alignCenter', function() {
      var str = Table.alignCenter('foo', 30)
      ase(str, '             foo              ')

      var str = Table.alignCenter('bar', 10, '-')
      ase(str, '---bar----')

      var str = Table.alignCenter('bars', 10, '-')
      ase(str, '---bars---')

      var str = Table.alignCenter('bar', 11, '-')
      ase(str, '----bar----')
    })

    it('#alignAuto', function() {
      
    })

    it('#arrayFill', function() {
      
    })
  })

  describe('Instance methods', function() {


    it('#setBorder', function() {
      
    })

    it('#removeBorder', function() {
      
    })

    it('#setAlign', function() {
      
    })

    it('#setAlignLeft', function() {
      
    })

    it('#setAlignCenter', function() {
      
    })

    it('#setAlignRight', function() {
      
    })

    it('#setTitle', function() {
      
    })

    it('#sort', function() {
      
    })

    it('#sortColumn', function() {
      
    })

    it('#setHeading', function() {
      
    })

    it('#addRow', function() {
      
    })

    it('#setJustify', function() {
      
    })

    it('#toString', function() {
      
    })

    it('#_seperator', function() {
      
    })

    it('#_rowSeperator', function() {
      
    })

    it('#_renderTitle', function() {
      
    })

    it('#_renderRow', function() {
      
    })

  })
})
