/**
 * (c) 2013 Beau Sorensen
 * MIT Licensed
 * For all details and documentation:
 * https://github.com/sorensen/console-table
 */

;(function() {
'use strict';

/*!
 * Module dependencies
 */

var slice = Array.prototype.slice
  , toString = Object.prototype.toString
  , colors = typeof require !== 'undefined' ? require('colors') : null

/**
 * Table constructor
 *
 * @param {String} name
 */

function Table(name) {
  this.__name = name
  this.__rows = []
  this.__maxCells = 0
  this.__aligns = []
  this.__colMaxes = []
  this.__spacing = 1
  this.setBorder()
}

/*!
 * Current library version, should match `package.json`
 */

Table.VERSION = '0.0.1'

/*!
 * Alignment constants
 */

Table.LEFT = 0
Table.CENTER = 1
Table.RIGHT = 2

/**
 *
 *
 * @api public
 */

Table.prototype.setBorder = function() {
  this.__border = true
  this.__edge = '|'
  this.__fill = '-'
}

/**
 *
 *
 * @api public
 */

Table.prototype.removeBorder = function() {
  this.__border = false
  this.__edge = ' '
  this.__fill = ' '
}

/**
 * Set the column alignment at a given index
 *
 * @param {Number} column index
 * @param {Number} alignment direction
 * @api public
 */

Table.prototype.setAlign = function(idx, dir) {
  this.__aligns[idx] = dir
  return this
}

/**
 * Set left alignment at given index
 *
 * @param {Number} column index
 * @api public
 */

Table.prototype.setAlignLeft = function(idx) {
  return this.setAlign(idx, Table.LEFT)
}

/**
 * Set center alignment at given index
 *
 * @param {Number} column index
 * @api public
 */

Table.prototype.setAlignCenter = function(idx) {
  return this.setAlign(idx, Table.CENTER)
}

/**
 * Set right alignment at given index
 *
 * @param {Number} column index
 * @api public
 */

Table.prototype.setAlignRight = function(idx) {
  return this.setAlign(idx, Table.RIGHT)
}

/**
 * Left align a string by padding it at a given length
 *
 * @param {String} str
 * @param {Number} string length
 * @param {String} padding character (optional, default '')
 * @api public
 */

Table.alignLeft = function(str, len, pad) {
  if (!len || len < 0) return ''
  if (typeof str === 'undefined') str = ''
  if (typeof pad === 'undefined') pad = ' '
  if (typeof str !== 'string') str = str.toString()
  return str + Array(len + 1 - str.length).join(pad)
}

/**
 * Center align a string by padding it at a given length
 *
 * @param {String} str
 * @param {Number} string length
 * @param {String} padding character (optional, default '')
 * @api public
 */

Table.alignCenter = function(str, len, pad, color) {
  if (!len || len < 0) return ''
  if (typeof str === 'undefined') str = ''
  if (typeof pad === 'undefined') pad = ' '
  if (typeof str !== 'string') str = str.toString()
  var nLen = str.length
    , half = Math.floor(len / 2 - nLen / 2)
    , odds = Math.abs((nLen % 2) - (len % 2))
    , len = str.length

  color && colors && (str = str[color])
  return Table.alignRight('', half, pad) 
    + str
    + Table.alignLeft('', half + odds, pad)
}

/**
 * Right align a string by padding it at a given length
 *
 * @param {String} str
 * @param {Number} string length
 * @param {String} padding character (optional, default '')
 * @api public
 */

Table.alignRight = function(str, len, pad) {
  if (!len || len < 0) return ''
  if (typeof str === 'undefined') str = ''
  if (typeof pad === 'undefined') pad = ' '
  if (typeof str !== 'string') str = str.toString()
  return Array(len + 1 - str.length).join(pad) + str
}

/**
 * Auto align string value based on object type
 *
 * @param {Any} object to string
 * @param {Number} string length
 * @param {String} padding character (optional, default '')
 * @api public
 */

Table.alignAuto = function(str, len, pad) {
  if (typeof str === 'undefined') str = ''
  var type = toString.call(str)
  pad || (pad = ' ')
  len = +len
  if (type !== '[object String]') {
    str = str.toString()
  }
  if (str.length < len) {
    switch(type) {
      case '[object Number]': return Table.alignRight(str, len, pad)
      default: return Table.alignLeft(str, len, pad)
    }
  }
  return str
}

/**
 * Fill an array at a given size with the given value
 *
 * @param {Number} array size
 * @param {Any} fill value
 * @return {Array} filled array
 * @api public
 */

Table.arrayFill = function(len, fill) {
  var arr = new Array(len)
  for (var i = 0; i !== len; i++) {
    arr[i] = fill;
  }
  return arr
}

/**
 * Set the title of the table
 *
 * @param {String} title
 * @api public
 */

Table.prototype.setTitle = function(name) {
  this.__name = name
  return this
}

/**
 * Table sorting shortcut to sort rows
 *
 * @param {Function} sorting method
 * @api public
 */

Table.prototype.sort = function(method) {
  this.__rows.sort(method)
  return this
}

/**
 * Sort rows based on sort method for given column
 *
 * @param {Number} column index
 * @param {Function} sorting method
 * @api public
 */

Table.prototype.sortColumn = function(idx, method) {
  this.__rows.sort(function(a, b) {
    return method(a[idx], b[idx])
  })
  return this
}

/**
 * Set table heading for columns
 *
 * @api public
 */

Table.prototype.setHeading = function() {
  this.__heading = slice.call(arguments)
  return this
}

/**
 * Add a row of information to the table
 * 
 * @param {...} argument values in order of columns
 */

Table.prototype.addRow = function() {
  var row = slice.call(arguments)
  this.__maxCells = Math.max(this.__maxCells, row.length)
  this.__rows.push(row)
  return this
}

/**
 * Apply an even spaced column justification
 *
 * @param {Boolean} on / off
 * @api public
 */

Table.prototype.setJustify = function(val) {
  arguments.length === 0 && (val = true)
  this.__justify = !!val
  return this
}

/**
 * Render the table with the current information
 *
 * @api public
 */

Table.prototype.valueOf =
Table.prototype.toString = function() {
  var self = this
    , body = []
    , mLen = this.__maxCells
    , max = Table.arrayFill(mLen, 0)
    , total = mLen * 3
    , rows = this.__rows
    , justify
    , border = this.__border
    , all = this.__heading 
        ? [this.__heading].concat(rows)
        : rows

  // Calculate max table cell lengths across all rows
  for (var i = 0; i < all.length; i++) {
    var row = all[i]
    for (var k = 0; k < mLen; k++) {
      var cell = row[k]
      max[k] = Math.max(max[k], cell ? cell.toString().length : 0)
    }
  }
  this.__colMaxes = max
  justify = this.__justify ? Math.max.apply(null, max) : 0

  // Get 
  max.forEach(function(x) {
    total += justify ? justify : x + self.__spacing
  })
  justify && (total += max.length)
  total -= this.__spacing

  // Heading
  border && body.push(this._seperator(total, '.'))
  if (this.__name) {
    body.push(this._renderTitle(total))
    border && body.push(this._seperator(total))
  }
  if (this.__heading) {
    body.push(this._renderRow(this.__heading, ' ', Table.CENTER, 'cyan'))
    body.push(this._rowSeperator(mLen, this.__fill))
  }
  for (var i = 0; i < this.__rows.length; i++) {
    body.push(this._renderRow(this.__rows[i], ' '))
  }
  border && body.push(this._seperator(total, "'"))
  return body.join('\n')
}

/**
 * Create a line seperator
 *
 * @param {Number} string size
 * @param {String} side values (default '|')
 * @api private
 */

Table.prototype._seperator = function(len, sep) {
  sep || (sep = this.__edge)
  return sep + Table.alignRight(sep, len, this.__fill)
}

/**
 * Create a row seperator
 *
 * @api private
 */

Table.prototype._rowSeperator = function() {
  var blanks = Table.arrayFill(this.__maxCells, '-')
  return this._renderRow(blanks, '-')
}

/**
 * Render the table title in a centered box
 *
 * @param {Number} string size
 * @api private
 */

Table.prototype._renderTitle = function(len) {
  var str = Table.alignCenter(this.__name, len, ' ')
  str = str.substr(0, str.length - 1)
  return this.__edge + str + this.__edge
}

/**
 * Render an invdividual row
 *
 * @param {Array} row
 * @param {String} column seperator
 * @param {Number} total row alignment (optional, default `auto`)
 * @api private
 */

Table.prototype._renderRow = function(row, str, align, color) {
  var tmp = ['']
    , max = this.__colMaxes

  for (var k = 0; k < this.__maxCells; k++) {
    var cell = row[k]
      , just = this.__justify ? Math.max.apply(null, max) : max[k]
      , pad = k === this.__maxCells - 1 ? just : just + this.__spacing
      , cAlign = this.__aligns[k]
      , use = align
      , method = 'alignAuto'
  
    if (typeof align === 'undefined') use = cAlign

    if (use === Table.LEFT) method = 'alignLeft'
    if (use === Table.CENTER) method = 'alignCenter'
    if (use === Table.RIGHT) method = 'alignRight'

    tmp.push(Table[method](cell, pad, str, color))
  }
  var front = tmp.join(str + this.__edge + str)
  front = front.substr(1, front.length)
  return front + str + this.__edge
}

/*!
 * Module exports.
 */

if (typeof exports !== 'undefined') {
  module.exports = Table
} else {
  this.AsciiTable = Table
}

}).call(this);
