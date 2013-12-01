/**
 * (c) 2013 Beau Sorensen
 * MIT Licensed
 * For all details and documentation:
 * https://github.com/sorensen/ascii-table
 */

;(function() {
'use strict';

/*!
 * Module dependencies
 */

var slice = Array.prototype.slice
  , toString = Object.prototype.toString

/**
 * Table constructor
 *
 * @param {String|Object} title or JSON table
 * @constructor
 * @api public
 */

function Table(name) {
  this.reset(name)
}

/*!
 * Current library version, should match `package.json`
 */

Table.VERSION = '0.0.3'

/*!
 * Alignment constants
 */

Table.LEFT = 0
Table.CENTER = 1
Table.RIGHT = 2

/*!
 * Static methods
 */

/**
 * Create a new table instance
 *
 * @param {String|Object} title or JSON table
 * @api public
 */

Table.factory = function(name) {
  return new Table(name)
}

/**
 * Align the a string at the given length
 *
 * @param {Number} direction
 * @param {String} string input
 * @param {Number} string length
 * @param {Number} padding character
 * @api public
 */

Table.align = function(dir, str, len, pad) {
  if (dir === Table.LEFT) return Table.alignLeft(str, len, pad)
  if (dir === Table.RIGHT) return Table.alignRight(str, len, pad)
  if (dir === Table.CENTER) return Table.alignCenter(str, len, pad)
  return Table.alignAuto(str, len, pad)
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

Table.alignCenter = function(str, len, pad) {
  if (!len || len < 0) return ''
  if (typeof str === 'undefined') str = ''
  if (typeof pad === 'undefined') pad = ' '
  if (typeof str !== 'string') str = str.toString()
  var nLen = str.length
    , half = Math.floor(len / 2 - nLen / 2)
    , odds = Math.abs((nLen % 2) - (len % 2))
    , len = str.length

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

/*!
 * Instance methods
 */

/**
 * Reset the table state back to defaults
 *
 * @param {String|Object} title or JSON table
 * @api public
 */

Table.prototype.reset = 
Table.prototype.clear = function(name) {
  this.__name = ''
  this.__nameAlign = Table.CENTER
  this.__rows = []
  this.__maxCells = 0
  this.__aligns = []
  this.__colMaxes = []
  this.__spacing = 1
  this.__heading = null
  this.__headingAlign = Table.CENTER
  this.setBorder()

  if (toString.call(name) === '[object String]') {
    this.__name = name
  } else if (toString.call(name) === '[object Object]') {
    this.fromJSON(name)
  }
}

/**
 * Set the table border
 *
 * @param {String} horizontal edges (optional, default `|`)
 * @param {String} vertical edges (optional, default `-`)
 * @param {String} top corners (optional, default `.`)
 * @param {String} bottom corners (optional, default `'`)
 * @api public
 */

Table.prototype.setBorder = function(edge, fill, top, bottom) {
  this.__border = true
  if (arguments.length === 1) {
    fill = top = bottom = edge
  }
  this.__edge = edge || '|'
  this.__fill = fill || '-'
  this.__top = top || '.'
  this.__bottom = bottom || "'"
  return this
}

/**
 * Remove all table borders
 *
 * @api public
 */

Table.prototype.removeBorder = function() {
  this.__border = false
  this.__edge = ' '
  this.__fill = ' '
  return this
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
 * Get the title of the table
 *
 * @return {String} title
 * @api public
 */

Table.prototype.getTitle = function() {
  return this.__name
}

/**
 * Set table title alignment
 *
 * @param {Number} direction
 * @api public
 */

Table.prototype.setTitleAlign = function(dir) {
  this.__nameAlign = dir
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

Table.prototype.setHeading = function(row) {
  if (arguments.length > 1 || toString.call(row) !== '[object Array]') {
    row = slice.call(arguments)
  }
  this.__heading = row
  return this
}

/**
 * Get table heading for columns
 *
 * @return {Array} copy of headings
 * @api public
 */

Table.prototype.getHeading = function() {
  return this.__heading.slice()
}

/**
 * Set heading alignment
 *
 * @param {Number} direction
 * @api public
 */

Table.prototype.setHeadingAlign = function(dir) {
  this.__headingAlign = dir
  return this
}

/**
 * Add a row of information to the table
 * 
 * @param {...|Array} argument values in order of columns
 * @api public
 */

Table.prototype.addRow = function(row) {
  if (arguments.length > 1 || toString.call(row) !== '[object Array]') {
    row = slice.call(arguments)
  }
  this.__maxCells = Math.max(this.__maxCells, row.length)
  this.__rows.push(row)
  return this
}

/**
 * Get a copy of all rows of the table
 *
 * @return {Array} copy of rows
 * @api public
 */

Table.prototype.getRows = function() {
  return this.__rows.slice().map(function(row) {
    return row.slice()
  })
}

/**
 * Add rows in the format of a row matrix
 *
 * @param {Array} row matrix
 * @api public
 */

Table.prototype.addRowMatrix = function(rows) {
  for (var i = 0; i < rows.length; i++) {
    this.addRow(rows[i])
  }
  return this
}

/**
 * Reset the current row state
 *
 * @api public
 */

Table.prototype.clearRows = function() {
  this.__rows = []
  this.__maxCells = 0
  this.__colMaxes = []
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
 * Convert the current instance to a JSON structure
 *
 * @return {Object} json representation
 * @api public
 */

Table.prototype.toJSON = function() {
  return {
    title: this.getTitle()
  , heading: this.getHeading()
  , rows: this.getRows()
  }
}

/**
 * Populate the table from a JSON object
 *
 * @param {Object} json representation
 * @api public
 */

Table.prototype.fromJSON = function(obj) {
  return this
    .clear()
    .setTitle(obj.title)
    .setHeading(obj.heading)
    .addRowMatrix(obj.rows)
}

/**
 * Render the table with the current information
 *
 * @return {String} formatted table
 * @api public
 */

Table.prototype.render =
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
  border && body.push(this._seperator(total - mLen + 1, this.__top))
  if (this.__name) {
    body.push(this._renderTitle(total - mLen + 1))
    border && body.push(this._seperator(total - mLen + 1))
  }
  if (this.__heading) {
    body.push(this._renderRow(this.__heading, ' ', this.__headingAlign))
    body.push(this._rowSeperator(mLen, this.__fill))
  }
  for (var i = 0; i < this.__rows.length; i++) {
    body.push(this._renderRow(this.__rows[i], ' '))
  }
  border && body.push(this._seperator(total - mLen + 1, this.__bottom))
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
 * @return {String} seperator
 * @api private
 */

Table.prototype._rowSeperator = function() {
  var blanks = Table.arrayFill(this.__maxCells, this.__fill)
  return this._renderRow(blanks, this.__fill)
}

/**
 * Render the table title in a centered box
 *
 * @param {Number} string size
 * @return {String} formatted title
 * @api private
 */

Table.prototype._renderTitle = function(len) {
  var name = ' ' + this.__name + ' '
    , str = Table.align(this.__nameAlign, name, len - 1, ' ')
  return this.__edge + str + this.__edge
}

/**
 * Render an invdividual row
 *
 * @param {Array} row
 * @param {String} column seperator
 * @param {Number} total row alignment (optional, default `auto`)
 * @return {String} formatted row
 * @api private
 */

Table.prototype._renderRow = function(row, str, align) {
  var tmp = ['']
    , max = this.__colMaxes

  for (var k = 0; k < this.__maxCells; k++) {
    var cell = row[k]
      , just = this.__justify ? Math.max.apply(null, max) : max[k]
      // , pad = k === this.__maxCells - 1 ? just : just + this.__spacing
      , pad = just
      , cAlign = this.__aligns[k]
      , use = align
      , method = 'alignAuto'
  
    if (typeof align === 'undefined') use = cAlign

    if (use === Table.LEFT) method = 'alignLeft'
    if (use === Table.CENTER) method = 'alignCenter'
    if (use === Table.RIGHT) method = 'alignRight'

    tmp.push(Table[method](cell, pad, str))
  }
  var front = tmp.join(str + this.__edge + str)
  front = front.substr(1, front.length)
  return front + str + this.__edge
}

/*!
 * Aliases
 */

// Create method shortcuts to all alignment methods for each direction
;['Left', 'Right', 'Center'].forEach(function(dir) {
  var constant = Table[dir.toUpperCase()]

  ;['setAlign', 'setTitleAlign', 'setHeadingAlign'].forEach(function(method) {
    // Call the base method with the direction constant as the last argument
    Table.prototype[method + dir] = function() {
      var args = slice.call(arguments).concat(constant)
      return this[method].apply(this, args)
    }
  })
})

/*!
 * Module exports.
 */

if (typeof exports !== 'undefined') {
  module.exports = Table
} else {
  this.AsciiTable = Table
}

}).call(this);
