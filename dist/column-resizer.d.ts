import { JSX } from "react";

declare module "react-table-column-resizer" {


	export interface Props {
        minWidth: number;
        maxWidth: number | null;
        id: number;
        resizeStart(): void;
        resizeEnd(width: number): void;
        className: string;
        disabled: boolean;
        defaultWidth?: number
      }
    
    export default function ColumnResizer(props: Props): JSX.Element;

}
