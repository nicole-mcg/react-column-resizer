## React Column Resizer [![npm version](https://badge.fury.io/js/react-column-resizer.svg)](https://badge.fury.io/js/react-column-resizer) [![Build Status](https://travis-ci.org/c-mcg/react-column-resizer.svg?branch=master)](https://travis-ci.org/c-mcg/react-column-resizer)

Place in between `td` tags to add resizing functionality. Works with touch and mouse events. 

Demo: https://codesandbox.io/s/1olmx0q4w7

### Setup

`npm install react-column-resizer`

### Props

| Prop Name  | Type | Default Value | Description |
| ------------- | ------------- | ------------- | ------------- |
| disabled | bool | `false` | Set to true if you want to disable resizing |
| minWidth | number | `0` | The minimum width for the columns (in pixels) |
| className | string | `""` | Any custom classes. If set, default `width` and `backgroundColor` styles will not be applied |

### Usage: 

`import ColumnResizer from 'react-column-resizer'`

...

```
<table>
    <tbody>
    
        <tr>
            <td>Header 1</td>
            
            <ColumnResizer/>
            
            <td>Header 2</td>
            
            <ColumnResizer/>
            
            <td>Header 3</td>
        </tr>
        
        <tr>
            <td>1</td>
            
            <td/>
            
            <td>2</td>
            
            <td/>
            
            <td>3</td>
        </tr>
        
    </tbody>
</table>
```

### Flaws
- You have to put filler `<td/>`'s in rows you don't use the resizer
- The resizer needs to be wide enough to actually grab. To do this while maintaining a thin bar, set the background color to `transparent` and assign a value to `border-left`
