import React from 'react';
import PropTypes from 'prop-types';

export default class ColumnResizer extends React.Component {
    displayName: "ColumnResizer";
    constructor(props) {
        super(props);

        this.state = {
            hovered: false
        }

        this.dragging = false;

        this.onMouseMoveBound = null;
        this.endDragBound = null;

        this.mouseX = 0

        this.startPos = 0;
        this.startWidthPrev = 0;
        this.startWidthNext = 0;
    }

    startDrag(e) {
        this.dragging = true;

        this.startPos = this.mousePos;
        this.startWidthNext = this.refs.ele.nextSibling.clientWidth;
        this.startWidthPrev = this.refs.ele.previousSibling.clientWidth;
    }

    endDrag(e) {
        this.dragging = false;
    }

    onMouseMove(e) {
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
        this.setState({
            hovered: true
        })
    }

    onMouseOut() {
        this.setState({
            hovered: false
        })
    }

    componentDidMount() {
        this.onMouseMoveBound = this.onMouseMove.bind(this);
        document.addEventListener('mousemove', this.onMouseMoveBound);
        document.addEventListener("touchmove", this.onMouseMoveBound, false);

        this.endDragBound = this.endDrag.bind(this);
        document.addEventListener('mouseup', this.endDragBound);
        document.addEventListener("touchend", this.endDragBound, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMoveBound);
        document.removeEventListener('mouseup', this.endDragBound);
    }

    render() {

        var style = {
            cursor: 'ew-resize',
            userSelect: "none"
        };

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
                onMouseDown={this.startDrag.bind(this)}
                onMouseOver={this.onMouseOver.bind(this)} 
                onMouseOut={this.onMouseOut.bind(this)}
                onTouchStart={this.startDrag.bind(this)}/>
        );
    }

}

ColumnResizer.defaultProps = {
    minWidth: 50,
    className: ""
}
