## React Column Resizer

NPM Link: https://www.npmjs.com/package/react-column-resizer

Install: `npm install react-column-resizer`

Demo: https://codesandbox.io/s/wyqm25jmk

Place in between `td` tags to add resizing functionality. Works with touch and mouse events. 

Currently only supports resizing between columns. 

### Props

`number minWidth` - The minimum width for the columns (in pixels)

`string className`- Any classes you want to add (inline style will be disabled if this is set)

### Usage: 

`import ColumnResizer from 'react-column-resizer`

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
            <td>Cell (0, 0)</td>
            
            <td/>
            
            <td>Cell (0, 1)</td>
            
            <td/>
            
            <td>Cell(0, 2)</td>
        </tr>
        
    </tbody>
</table>
```

### Flaws
- You have to put filler `<td/>`'s in rows you don't use the resizer
- The resizer needs to be wide enough to actually grab. To do this while maintaining a thin bar, set the background color to `transparent` and assign a value to `border-left`
