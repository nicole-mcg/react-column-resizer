## React Table Column Resizer 
A simple column resizer component for Html 5 Table

Inspired from  React Column Resizer, Fixed width and drag problems

Place in between `td` tags to add resizing functionality. Works with touch and mouse events. 

Note: Don't add any min-width through css for table columns other than resize component

For react version 16 use version 1.0.2


Demo: https://codesandbox.io/s/react-table-column-resizer-3yuqv

### Usage: 

`npm install react-table-column-resizer`

<sup>* Requires `react` as a peer dependency: `npm install react`</sup>


```
import React from "react";
import { render } from "react-dom";
import ColumnResizer from "react-table-column-resizer";

const App = () => (
  <div>
    <table>
      <tbody>
        <tr>
          <td>1</td>
          <ColumnResizer className="columnResizer" minWidth={0} />
          <td>2</td>
        </tr>

        <tr>
          <td>3</td>
          <td />
          <td>4</td>
        </tr>
      </tbody>
    </table>
  </div>
);

render(<App />, document.body);
```

### Props

| Prop Name  | Type | Default Value | Description |
| ------------- | ------------- | ------------- | ------------- |
| id (mandatory) | number |  | Uniq id for each column resize  |
| disabled | bool | `false` | Set to true if you want to disable resizing |
| minWidth (optional) | number | `undefined` | The minimum width for the columns (in pixels) |
| maxWidth (optional) | number | null | `undefined` | The maximum width for the columns (in pixels) |
| resizeStart (optional) | function | function(): void | Trigger when resize start |
| resizeEnd (optional) | function | function(): number | Trigger when resize end and return the last dragged column width |
| className | string | `""` | Any custom classes. If set, default `width` and `backgroundColor` styles will not be applied |


### Limitations
- You have to put filler `<td/>`'s in rows
- The width in table column need to be in logic of table css, it must leave a column without max-width
