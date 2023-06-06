//Author: Bibin Antony, Nik M
//https://github.com/bibinantony1998/react-table-column-resizer

import React from 'react';
import { bool, number, string } from 'prop-types';

export default class ColumnResizer extends React.Component {

    constructor(props) {
        super(props);

        this.startDrag = this.startDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.dragging = false;
        this.mouseX = 0
        this.startPos = 0;
        this.startWidthPrev = 0;
        this.lastDraggedWidth = 0;
        this.draggedCol = null;
        this.resizeRef = React.createRef();
    }

    startDrag() {
        if (this.props.disabled) {
            return;
        }
        this.draggedCol = this.props.id;
        if(this.props.resizeStart && this.draggedCol === this.props.id) {
            this.props.resizeStart()
        }
        this.dragging = true;
        this.startPos = this.mouseX;

        this.startWidthPrev = 0;       

        if (this.resizeRef.current) {
            let prevSibling = this.resizeRef.current.previousSibling;

            if (prevSibling) {
                this.startWidthPrev = prevSibling.clientWidth;
            }
        }
    }

    endDrag() {
        if (this.props.disabled) {
            return;
        }
        this.dragging = false;  
        if(this.props.resizeEnd && this.draggedCol === this.props.id) {
            this.props.resizeEnd(this.lastDraggedWidth);
        }
        this.draggedCol = null
    }

    onMouseMove(e) {
        if (this.props.disabled) {
            return;
        }

        this.mouseX = e.touches ? e.touches[0].screenX : e.screenX;
        if (!this.dragging) {
            return;
        }

        const ele = this.resizeRef.current;

        const moveDiff = this.startPos - this.mouseX;
        let newPrev = this.startWidthPrev - moveDiff;

        if((!this.props.minWidth || newPrev >= this.props.minWidth) && (!this.props.maxWidth || newPrev <= this.props.maxWidth)) {
            ele.previousSibling.style.width = newPrev + 'px';
            ele.previousSibling.style.minWidth = newPrev + 'px';
            ele.previousSibling.style.maxWidth = newPrev + 'px';
            this.lastDraggedWidth = newPrev;
        }    
    }

    componentDidMount() {
        const ele = this.resizeRef.current;
        if(this.props.defaultWidth && ele) {
            ele.previousSibling.style.minWidth = this.props.defaultWidth + 'px';
        }
        if (this.props.disabled) {
            if(this.props.defaultWidth && ele) {
                ele.previousSibling.style.defaultWidth = this.props.defaultWidth + 'px';
                ele.previousSibling.style.width = this.props.defaultWidth + 'px';
            }
            if(this.props.maxWidth && ele) {
                ele.previousSibling.style.maxWidth = this.props.maxWidth + 'px';
            }
            return;
        }  
        this.addEventListenersToDocument();
    }

    componentWillUnmount() {
        if (this.props.disabled) {
            return;
        }

        this.removeEventListenersFromDocument();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.disabled && !this.props.disabled) {
            this.addEventListenersToDocument();
        }

        if (!prevProps.disabled && this.props.disabled) {
            this.removeEventListenersFromDocument();
        }
    }

    addEventListenersToDocument() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.endDrag);

        document.addEventListener("touchmove", this.onMouseMove);
        document.addEventListener("touchend", this.endDrag);
    }

    removeEventListenersFromDocument() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.endDrag);

        document.removeEventListener('touchmove', this.onMouseMove);
        document.removeEventListener('touchend', this.endDrag);
    }

    render() {

        var style = {
            userSelect: "none"
        };

        if (!this.props.disabled) {
            style.cursor = 'ew-resize';
        }

        if (this.props.className === "") {
            style.width = '6px';
            style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }

        return (
            <th ref={this.resizeRef} 
                style={style}
                disabled={this.props.disabled}
                className={`${this.props.disabled ? "disabled_column_resize" : ""} ${this.props.className}`}
                onMouseDown={!this.props.disabled ? this.startDrag : null}
                onTouchStart={!this.props.disabled ? this.startDrag : null}
            />
        );
    }

}

ColumnResizer.defaultProps = {
    disabled: false,
    minWidth: 0,
    className: "",
}

ColumnResizer.propTypes = {
    disabled: bool,
    minWidth: number,
    className: string,
}
