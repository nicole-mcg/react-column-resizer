
//Author: Connor McGrogan
//https://github.com/nik-m2/react-column-resizer

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
        this.startWidthNext = 0;
    }

    startDrag() {
        if (this.props.disabled) {
            return;
        }

        this.dragging = true;
        this.startPos = this.mouseX;

        this.startWidthPrev = 0;
        this.startWidthNext = 0;        

        if (this.refs.ele) {
            let prevSibling = this.refs.ele.previousSibling;
            let nextSibling = this.refs.ele.nextSibling;

            if (prevSibling) {
                this.startWidthPrev = prevSibling.clientWidth;
            }
    
            if (nextSibling) {
                this.startWidthNext = nextSibling.clientWidth;            
            }
        }
    }

    endDrag() {
        if (this.props.disabled) {
            return;
        }

        this.dragging = false;
    }

    onMouseMove(e) {
        if (this.props.disabled) {
            return;
        }

        this.mouseX = e.touches ? e.touches[0].screenX : e.screenX;
        if (!this.dragging) {
            return;
        }

        const ele = this.refs.ele;

        const moveDiff = this.startPos - this.mouseX;
        let newPrev = this.startWidthPrev - moveDiff;
        let newNext = this.startWidthNext + moveDiff;

        if (newPrev < this.props.minWidth) {
            const offset = newPrev - this.props.minWidth;
            newPrev = this.props.minWidth;
            newNext += offset;
        } else if (newNext < this.props.minWidth) {
            const offset = newNext - this.props.minWidth;
            newNext = this.props.minWidth;
            newPrev += offset;
        }

        ele.previousSibling.style.width = newPrev + 'px';
        ele.nextSibling.style.width = newNext + 'px';
    }

    componentDidMount() {
        if (this.props.disabled) {
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
            <td ref="ele" 
                style={style}
                className={this.props.className}
                onMouseDown={!this.props.disabled && this.startDrag}
                onTouchStart={!this.props.disabled && this.startDrag}/>
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
