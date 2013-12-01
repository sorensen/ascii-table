'use strict';

var assert = require('assert')
  , ase = assert.strictEqual
  , ade = assert.deepEqual
  , Table = require('./index')
  , info = require('./package.json')

describe('Ascii Table v' + info.version, function() {

  describe('Examples', function() {

    it('default', function() {
      var table = new Table('A Title')
      table
        .setHeading('', 'Name', 'Age')
        .addRow(1, 'Bob', 52)
        .addRow(2, 'John', 34)
        .addRow(3, 'Jim', 83)

      var output = ''
             + '.------------------.'
      + '\n' + '|     A Title      |'
      + '\n' + '|------------------|'
      + '\n' + '|    | Name  | Age |'
      + '\n' + '|----|-------|-----|'
      + '\n' + '|  1 | Bob   |  52 |'
      + '\n' + '|  2 | John  |  34 |'
      + '\n' + '|  3 | Jim   |  83 |'
      + '\n' + "'------------------'"

      var table2 = new Table('A Title')
        , headings = ['', 'Name', 'Age']
        , row = [1, 'Bob', 52]

      var matrix = [
        [2, 'John', 34]
      , [3, 'Jim', 83]
      ]

      table2
        .setHeading(headings)
        .addRow(row)
        .addRowMatrix(matrix)

      ase(table.toString(), output)
      ase(table2.toString(), output)
    })

    it('all', function() {
      var table = new Table('Something')
      table
        .setBorder()
        .removeBorder()
        .setAlign(0, Table.CENTER)
        .setAlignLeft(1)
        .setAlignCenter(1)
        .setAlignRight(1)
        
        .setTitle('Hi')
        .setTitleAlign(Table.LEFT)
        .setTitleAlignLeft(1)
        .setTitleAlignCenter(1)
        .setTitleAlignRight(1)

        .setHeading('one', 'two', 'three')
        .setHeading(['one', 'two', 'three'])
        .setHeadingAlign(0, Table.CENTER)
        .setHeadingAlignLeft(1)
        .setHeadingAlignCenter(1)
        .setHeadingAlignRight(1)

        .addRow(1, 2, 3)
        .addRow([4, 5, 6])
        .addRowMatrix([
          [7, 8, 9]
        , [10, 11, 12]
        ])
        .setJustify()
        .setJustify(false)

        .sort(function(a, b) { return a })
        .sortColumn(1, function(a, b) { return a })

      table.toJSON()
      table.toString()
      table.valueOf()
      table.render()
    })

    it('alignment', function() {
      var table = new Table()
      table
        .setTitle('Something')
        .setTitleAlign(Table.LEFT)
        .setHeading('', 'Name', 'Age')
        .setHeadingAlign(Table.RIGHT)
        .setAlignCenter(0)
        .setAlign(2, Table.RIGHT)
        .addRow('a', 'apple', 'Some longer string')
        .addRow('b', 'banana', 'hi')
        .addRow('c', 'carrot', 'meow')
        .addRow('efg', 'elephants')

      var str = ""
             + ".----------------------------------------."
      + "\n" + "| Something                              |"
      + "\n" + "|----------------------------------------|"
      + "\n" + "|      |       Name |                Age |"
      + "\n" + "|------|------------|--------------------|"
      + "\n" + "|  a   | apple      | Some longer string |"
      + "\n" + "|  b   | banana     |                 hi |"
      + "\n" + "|  c   | carrot     |               meow |"
      + "\n" + "| efg  | elephants  |                    |"
      + "\n" + "'----------------------------------------'"
      ase(str, table.toString())
    })
  })

  describe('Static methods', function() {

    it('#version', function() {
      ase(info.version, Table.VERSION)
    })

    it('#align', function() {
      ase(Table.align(Table.LEFT, 'a', 10), Table.alignLeft('a', 10))
      ase(Table.align(Table.CENTER, 'a', 10), Table.alignCenter('a', 10))
      ase(Table.align(Table.RIGHT, 'a', 10), Table.alignRight('a', 10))
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
      var arr = Table.arrayFill(10, '-')
      ase(arr.length, 10)
      ase(arr[0], '-')
    })

    it('#factory', function() {
      var table = Table.factory('title')
      ase(table instanceof Table, true)
      ase(table.getTitle(), 'title')
    })
  })

  describe('Instance methods', function() {

    it('#setBorder', function() {
      var table = new Table('a')
      table
        .setBorder('*')
        .setHeading('one', 'two')
        .addRow('abc', 'def')

      var str = ''
             + '**************'
      + '\n' + '*     a      *'
      + '\n' + '**************'
      + '\n' + '* one  * two *'
      + '\n' + '**************'
      + '\n' + '* abc  * def *'
      + '\n' + '**************'

      ase(str, table.toString())
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
      var table = new Table('meow')
      ase(table.getTitle(), 'meow')
      table.setTitle('bark')
      ase(table.getTitle(), 'bark')
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

    it('#toJSON', function() {
      var table = new Table('cat')
      table
        .setHeading('one', 'two', 'three')
        .addRow(1, 2, 3)
        .addRow(4, 5, 6)

      var output = {
        title: 'cat'
      , heading: ['one', 'two', 'three']
      , rows: [
          [1, 2, 3]
        , [4, 5, 6]
        ]
      }
      var js = table.toJSON()
      ade(js, output)

      js.heading[0] = 'test'
      ase(table.getHeading()[0], 'one')

      js.rows[0][0] = 'test'
      ase(table.getRows()[0][0], 1)
    })
  })
})
