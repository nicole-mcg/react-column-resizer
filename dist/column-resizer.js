"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ColumnResizer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ColumnResizer, _React$Component);

  function ColumnResizer(props) {
    var _this;

    _classCallCheck(this, ColumnResizer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColumnResizer).call(this, props));
    _this.startDrag = _this.startDrag.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.endDrag = _this.endDrag.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    if (props.disabled) {
      return _possibleConstructorReturn(_this);
    }

    _this.dragging = false;
    _this.mouseX = 0;
    _this.startPos = 0;
    _this.startWidthPrev = 0;
    _this.startWidthNext = 0;
    return _this;
  }

  _createClass(ColumnResizer, [{
    key: "startDrag",
    value: function startDrag() {
      if (this.props.disabled) {
        return;
      }

      this.dragging = true;
      this.startPos = this.mouseX;
      this.startWidthPrev = 0;
      this.startWidthNext = 0;

      if (this.refs.ele) {
        var prevSibling = this.refs.ele.previousSibling;
        var nextSibling = this.refs.ele.nextSibling;

        if (prevSibling) {
          this.startWidthPrev = prevSibling.clientWidth;
        }

        if (nextSibling) {
          this.startWidthNext = nextSibling.clientWidth;
        }
      }
    }
  }, {
    key: "endDrag",
    value: function endDrag() {
      if (this.props.disabled) {
        return;
      }

      this.dragging = false;
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      if (this.props.disabled) {
        return;
      }

      this.mouseX = e.touches ? e.touches[0].screenX : e.screenX;

      if (!this.dragging) {
        return;
      }

      var ele = this.refs.ele;
      var moveDiff = this.startPos - this.mouseX;
      var newPrev = this.startWidthPrev - moveDiff;
      var newNext = this.startWidthNext + moveDiff;

      if (newPrev < this.props.minWidth) {
        var offset = newPrev - this.props.minWidth;
        newPrev = this.props.minWidth;
        newNext += offset;
      } else if (newNext < this.props.minWidth) {
        var _offset = newNext - this.props.minWidth;

        newNext = this.props.minWidth;
        newPrev += _offset;
      }

      ele.previousSibling.style.width = newPrev + 'px';
      ele.nextSibling.style.width = newNext + 'px';
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.disabled) {
        return;
      }

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.endDrag);
      document.addEventListener("touchmove", this.onMouseMove);
      document.addEventListener("touchend", this.endDrag);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.disabled) {
        return;
      }

      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchmove', this.onMouseMove);
      document.removeEventListener('touchend', this.endDrag);
    }
  }, {
    key: "render",
    value: function render() {
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

      return _react.default.createElement("td", {
        ref: "ele",
        style: style,
        className: this.props.className,
        onMouseDown: !this.props.disabled && this.startDrag,
        onTouchStart: !this.props.disabled && this.startDrag
      });
    }
  }]);

  return ColumnResizer;
}(_react.default.Component);

exports.default = ColumnResizer;
ColumnResizer.defaultProps = {
  disabled: false,
  minWidth: 50,
  className: ""
};
ColumnResizer.propTypes = {
  disabled: _propTypes.bool,
  minWidth: _propTypes.number,
  className: _propTypes.string
};