Ascii Table
===========

[![Build Status](https://secure.travis-ci.org/sorensen/ascii-table.png)](http://travis-ci.org/sorensen/ascii-table) 

Easy table output for node debugging, but you could probably do more with it, 
since its just an string.


Usage
-----

Node.js

```js
var AsciiTable = require('ascii-table')
```

Browser

```html
<script src="ascii-table.min.js"></script>
```

*Note*: If using in the browser, it will be placed under `window.AsciiTable`


Example
-------

Basic usage

```js
var table = new AsciiTable('A Title')
table
  .setHeading('', 'Name', 'Age')
  .addRow(1, 'Bob', 52)
  .addRow(2, 'John', 34)
  .addRow(3, 'Jim', 83)

console.log(table.toString())
```

```
.------------------.
|      A Title     |
|------------------|
|    | Name  | Age |
|----|-------|-----|
|  1 | Bob   |  52 |
|  2 | John  |  34 |
|  3 | Jim   |  83 |
'------------------'
```

Or if we use data from arrays

```js
var table = new AsciiTable('A Title')
  , headings = ['', 'Name', 'Age']
  , row = [1, 'Bob', 52]

var matrix = [
  [2, 'John', 34]
, [3, 'Jim', 83]
]

table
  .setHeading(heading)
  .addRow(row)
  .addRowMatrix(matrix)

console.log(table.render())
```

```
.------------------.
|      A Title     |
|------------------|
|    | Name  | Age |
|----|-------|-----|
|  1 | Bob   |  52 |
|  2 | John  |  34 |
|  3 | Jim   |  83 |
'------------------'
```

Lets sort by age

```js
table.sortColumn(2, function(a, b) {
  return a - b
})
console.log(table.toString())
```

```
.------------------.
|      A Title     |
|------------------|
|    | Name  | Age |
|----|-------|-----|
|  2 | John  |  34 |
|  1 | Bob   |  52 |
|  3 | Jim   |  83 |
'------------------'
```

We can make a simple table as well.

```js
var table = new AsciiTable()

table
  .addRow('a', 'apple', 'Some longer string')
  .addRow('b', 'banana', 'hi')
  .addRow('c', 'carrot', 'meow')
  .addRow('e', 'elephants')


console.log(table.toString())
```

```
.--------------------------------------.
| a  | apple      | Some longer string |
| b  | banana     | hi                 |
| c  | carrot     | meow               |
| e  | elephants  |                    |
'--------------------------------------'
```


Columns can also have different alignments

```js
table
  .setAlign(2, AsciiTable.RIGHT)
  .setAlign(1, AsciiTable.CENTER)

console.log(table.toString())
```

```
.--------------------------------------.
| a  |   apple    | Some longer string |
| b  |   banana   |                 hi |
| c  |   carrot   |               meow |
| e  | elephants  |                    |
'--------------------------------------'
```

We can also remove the borders

```js

table
  .setHeading('#', 'Fruit', 'Thing')
  .setAlign(1, AsciiTable.RIGHT)
  .setAlign(2, AsciiTable.CENTER)
  .removeBorder()
  
console.log('' + table)
```

```
  #      Fruit            Thing
 ---- ------------ --------------------
  a         apple   Some longer string
  b        banana           hi
  c        carrot          meow
  e     elephants
```

Methods
-------

### AsciiTable

See: `AsciiTable.factory` for details on instantiation

### AsciiTable.factory([title])

Table instance creator

* `title` - table title (optional, default `null`)

```js
var table = AsciiTable.factory('')
```


### AsciiTable.align(direction, value, length, [padding])

Shortcut to one of the three following methods

* `direction` - alignment direction (`AsciiTable.LEFT`, `AsciiTable.CENTER`, `AsciiTable.RIGHT`)
* `value` - string to align
* `length` - total length of created string
* `padding` - padding / fill char (optional, default `' '`)

```js
table.align(AsciiTable.LEFT, 'hey', 7) // 'hey    '
```


### AsciiTable.alignLeft(value, length, [padding])

* `value` - string to align
* `length` - total length of created string
* `padding` - padding / fill char (optional, default `' '`)

```js
table.align(AsciiTable.LEFT, 'hey', 7) // 'hey    '
```


### AsciiTable.alignCenter(value, length, [padding])

* `value` - string to align
* `length` - total length of created string
* `padding` - padding / fill char (optional, default `' '`)

```js
table.align(AsciiTable.CENTER, 'hey', 7) // '  hey  '
```


### AsciiTable.alignRight(value, length, [padding])

* `value` - string to align
* `length` - total length of created string
* `padding` - padding / fill char (optional, default `' '`)

```js
table.align(AsciiTable.LEFT, 'hey', 7) // '    hey'
```


### AsciiTable.alignAuto(value, length, [padding])

Attempt to do intelligent alignment of provided `value`, `String` input will 
be left aligned, `Number` types will be right aligned.

* `string` - string to align
* `length` - total length of created string
* `padding` - padding / fill char (optional, default `' '`)

```js
table.align(AsciiTable.LEFT, 'hey', 7) // 'hey    '
```


### AsciiTable.arrayFill(length, value)

Create a new array at the given length, filled with the given value, mainly used internally

* `length` - length of array
* `value` - fill value (optional)

```js
AsciiTable.arrayFill(4, 0) // [0, 0, 0, 0]
```


### instance.setBorder()

* `enabled` - 

```js
```


### instance.removeBorder()

* `enabled` - 

```js
```


### instance.setAlign(rowIndex, direction)

* `enabled` - 

```js
```


### instance.setAlignLeft(rowIndex)

* `enabled` - 

```js
```


### instance.setAlignCenter(rowIndex)

* `enabled` - 

```js
```


### instance.setAlignRight(rowIndex)

* `enabled` - 

```js
```


### instance.setTitle(title)

* `enabled` - 

```js
```


### instance.setTitleAlign(direction)

* `enabled` - 

```js
```


### instance.setTitleAlignLeft()

Alias to `instance.setTitleAlign(AsciiTable.LEFT)`


### instance.setTitleAlignCenter()

Alias to `instance.setTitleAlign(AsciiTable.CENTER)`


### instance.setTitleAlignRight()

Alias to `instance.setTitleAlign(AsciiTable.RIGHT)`


### instance.sort(iterator)

* `enabled` - 

```js
```


### instance.sortColumn(index, iterator)

* `enabled` - 

```js
```


### instance.setHeading([arguments])

* `enabled` - 

```js
```


### instance.setHeadingAlign(direction)

* `enabled` - 

```js
```


### instance.setHeadingAlignLeft()

Alias to `instance.setHeadingAlignLeft(AsciiTable.LEFT)`


### instance.setHeadingAlignCenter()

Alias to `instance.setHeadingAlignLeft(AsciiTable.CENTER)`


### instance.setHeadingAlignRight()

Alias to `instance.setHeadingAlignLeft(AsciiTable.RIGHT)`


### instance.addRow([arguments])

* `enabled` - 

```js
```


### instance.addRowMatrix(rows)

* `enabled` - 

```js
```


### instance.setJustify(enabled)

* `enabled` - 

```js
```


### instance.toString()

**Alias**: [`valueOf`, `render`]

```js
```

### instance.toJSON()

* `enabled` - 

```js
```




Install
-------

With [npm](https://npmjs.org)

```
npm install ascii-table
```


License
-------

(The MIT License)

Copyright (c) 2013 Beau Sorensen

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
