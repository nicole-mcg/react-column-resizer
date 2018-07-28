'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnResizer = function (_React$Component) {
    _inherits(ColumnResizer, _React$Component);

    function ColumnResizer(props) {
        _classCallCheck(this, ColumnResizer);

        var _this = _possibleConstructorReturn(this, (ColumnResizer.__proto__ || Object.getPrototypeOf(ColumnResizer)).call(this, props));

        _this.state = {
            hovered: false
        };

        _this.dragging = false;

        _this.onMouseMoveBound = null;
        _this.endDragBound = null;

        _this.mouseX = 0;

        _this.startPos = 0;
        _this.startWidthPrev = 0;
        _this.startWidthNext = 0;
        return _this;
    }

    _createClass(ColumnResizer, [{
        key: 'startDrag',
        value: function startDrag(e) {
            this.dragging = true;

            this.startPos = this.mousePos;
            this.startWidthNext = this.refs.ele.nextSibling.clientWidth;
            this.startWidthPrev = this.refs.ele.previousSibling.clientWidth;
        }
    }, {
        key: 'endDrag',
        value: function endDrag(e) {
            this.dragging = false;
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            this.mousePos = e.touches ? e.touches[0].screenX : e.screenX;
            if (!this.dragging) {
                return;
            }

            console.log(this.mousePos);
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
    }, {
        key: 'onMouseOver',
        value: function onMouseOver() {
            this.setState({
                hovered: true
            });
        }
    }, {
        key: 'onMouseOut',
        value: function onMouseOut() {
            this.setState({
                hovered: false
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onMouseMoveBound = this.onMouseMove.bind(this);
            document.addEventListener('mousemove', this.onMouseMoveBound);
            document.addEventListener("touchmove", this.onMouseMoveBound, false);

            this.endDragBound = this.endDrag.bind(this);
            document.addEventListener('mouseup', this.endDragBound);
            document.addEventListener("touchend", this.endDragBound, false);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousemove', this.onMouseMoveBound);
            document.removeEventListener('mouseup', this.endDragBound);
        }
    }, {
        key: 'render',
        value: function render() {

            var style = {
                cursor: 'ew-resize'
            };

            if (this.props.className === "") {
                style.width = '6px';
                style.backgroundColor = 'rgba(0, 0, 0, 0.1)';

                if (this.state.hovered) {
                    style.backgroundColor = 'background-color: rgba(0, 0, 0, 0.25)';
                }
            }

            return _react2.default.createElement('td', { ref: 'ele',
                style: style,
                className: this.props.className,
                onMouseDown: this.startDrag.bind(this),
                onMouseOver: this.onMouseOver.bind(this),
                onMouseOut: this.onMouseOut.bind(this),
                onTouchStart: this.startDrag.bind(this) });
        }
    }]);

    return ColumnResizer;
}(_react2.default.Component);

exports.default = ColumnResizer;


ColumnResizer.propTypes = {
    minWidth: _react2.default.PropTypes.number,
    className: _react2.default.PropTypes.string
};

ColumnResizer.defaultProps = {
    minWidth: 50,
    className: ""
};