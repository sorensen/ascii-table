Ascii Table
===========

[![Build Status](https://secure.travis-ci.org/sorensen/ascii-table.png)](http://travis-ci.org/sorensen/ascii-table) 

Easy table output for node debugging, but you could probably do more with it, 
since its just an string.


Usage
-----

Node.js

```js
var Table = require('ascii-table')
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
var table = new Table('A Title')
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
var table = new Table()
table
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
  .setAlign(2, Table.RIGHT)
  .setAlign(1, Table.CENTER)

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
  .setAlign(1, Table.RIGHT)
  .setAlign(2, Table.CENTER)
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


Install
-------

With [npm](https://npmjs.org)

```
npm install ascii-table
```


License
-------

(The MIT License)

Copyright (c) 2013 Major League Soccer

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