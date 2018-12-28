
//Author: Connor McGrogan
//https://github.com/c-mcg/react-column-resizer

import React from 'react';
import { bool, number, string } from 'prop-types';

export default class ColumnResizer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hovered: false
        }

        this.startDrag = this.startDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);

        if (props.disabled) {
            return;
        }

        this.dragging = false;

        this.mouseX = 0

        this.startPos = 0;
        this.startWidthPrev = 0;
        this.startWidthNext = 0;
    }

    startDrag(e) {
        if (this.props.disabled) {
            return;
        }

        this.dragging = true;

        this.startPos = this.mousePos;
        this.startWidthNext = this.refs.ele.nextSibling.clientWidth;
        this.startWidthPrev = this.refs.ele.previousSibling.clientWidth;
    }

    endDrag(e) {
        if (this.props.disabled) {
            return;
        }

        this.dragging = false;
    }

    onMouseMove(e) {
        if (this.props.disabled) {
            return;
        }

        this.mousePos = e.touches ? e.touches[0].screenX : e.screenX;
        if (!this.dragging) {
            return;
        }

        var ele = this.refs.ele;

        var diff = this.startPos - this.mousePos;

        var newPrev = this.startWidthPrev - diff;
        var newNext = this.startWidthNext + diff;

        if (newPrev < this.props.minWidth || newNext < this.props.minWidth) {
            return;
        }

        ele.previousSibling.style.width = newPrev + 'px';
        ele.nextSibling.style.width = newNext + 'px';
    }

    onMouseOver() {
        if (this.props.disabled) {
            return;
        }

        this.setState({
            hovered: true
        })
    }

    onMouseOut() {
        if (this.props.disabled) {
            return;
        }

        this.setState({
            hovered: false
        })
    }

    componentDidMount() {
        if (this.props.disabled) {
            return;
        }

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener("touchmove", this.onMouseMove, false);

        document.addEventListener('mouseup', this.endDrag);
        document.addEventListener("touchend", this.endDrag, false);
    }

    componentWillUnmount() {
        if (this.props.disabled) {
            return;
        }

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.endDrag);
    }

    render() {

        var style = {
            userSelect: "none"
        };

        if (!this.props.disabled) {
            style['cursor'] = 'ew-resize';
        }

        if (this.props.className === "") {
            style.width = '6px';
            style.backgroundColor = 'rgba(0, 0, 0, 0.1)';

            if (this.state.hovered) {
                style.backgroundColor = 'background-color: rgba(0, 0, 0, 0.25)';
            }
        }

        return (
            <td ref="ele" 
                style={style}
                className={this.props.className}
                onMouseDown={this.startDrag}
                onMouseOver={this.onMouseOver} 
                onMouseOut={this.onMouseOut}
                onTouchStart={this.startDrag}/>
        );
    }

}

ColumnResizer.defaultProps = {
    disabled: false,
    minWidth: 50,
    className: "",
}

ColumnResizer.propTypes = {
    disabled: bool,
    minWidth: number,
    className: string,
}
