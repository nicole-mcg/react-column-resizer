import React from 'react'
import { shallow } from 'enzyme';

import ColumnResizer from '../src/column-resizer';


describe('react-column-resizer', () => {

    it('renders one table cell with correct props', () => {
        const expectedStyle = {
            userSelect: 'none',
            cursor: 'ew-resize',
            width: '6px',
            backgroundColor: "rgba(0, 0, 0, 0.1)",
        }

        const wrapper = shallow(<ColumnResizer/>);

        const wrapperProps = wrapper.props();
        expect(wrapperProps.disabled).not.toBeTruthy();
        expect(wrapperProps.minWidth).not.toBeTruthy();
        expect(wrapperProps).toHaveProperty('className', "");

        const td = wrapper.find('td');
        expect(td).toHaveLength(1);
        expect(td.children()).toHaveLength(0);

        const tdProps = td.props();
        expect(tdProps).toHaveProperty('style', expectedStyle);
        expect(tdProps).toHaveProperty('className', "");
        expect(tdProps).toHaveProperty('onMouseDown', wrapper.instance().startDrag);
        expect(tdProps).toHaveProperty('onTouchStart', wrapper.instance().startDrag);
    });

    it('can accept a custom className', () => {
        const customClassName = "test";
        const expectedStyle = {
            userSelect: 'none',
            cursor: 'ew-resize',
        }

        const wrapper = shallow(<ColumnResizer className={customClassName}/>);
        const props = wrapper.find('td').props();

        expect(props).toHaveProperty('style', expectedStyle);
        expect(props).toHaveProperty('className', customClassName);
    });

    it('can be disabled', () => {
        const expectedStyle = {
            userSelect: 'none',
            width: '6px',
            backgroundColor: "rgba(0, 0, 0, 0.1)",
        }

        const wrapper = shallow(<ColumnResizer disabled/>);
        const props = wrapper.find('td').props();
        
        expect(props).toHaveProperty('style', expectedStyle);
        expect(props).toHaveProperty('className', "");
        expect(props).not.toHaveProperty('onMouseDown', wrapper.instance().startDrag);
        expect(props).not.toHaveProperty('onTouchStart', wrapper.instance().startDrag);
    });

    it('registers and removes events on document', () => {
        const oldRemoveEventListener = document.removeEventListener;
        const oldAddEventListener = document.addEventListener;
        document.addEventListener = jest.fn();
        document.removeEventListener = jest.fn();

        const wrapper = shallow(<ColumnResizer/>);
        const instance = wrapper.instance();

        const expectMouseEventsAdded = () => {
            expect(document.addEventListener).toHaveBeenCalledWith("mousemove", instance.onMouseMove);
            expect(document.addEventListener).toHaveBeenCalledWith("mouseup", instance.endDrag);
            expect(document.addEventListener).toHaveBeenCalledWith("touchmove", instance.onMouseMove);
            expect(document.addEventListener).toHaveBeenCalledWith("touchend", instance.endDrag);
        };

        const expectMouseEventsRemoved = () => {
            expect(document.removeEventListener).toHaveBeenCalledWith("mousemove", instance.onMouseMove);
            expect(document.removeEventListener).toHaveBeenCalledWith("mouseup", instance.endDrag);
            expect(document.removeEventListener).toHaveBeenCalledWith("touchmove", instance.onMouseMove);
            expect(document.removeEventListener).toHaveBeenCalledWith("touchend", instance.endDrag);
        }

        expectMouseEventsAdded();

        wrapper.setProps({ disabled: true });

        expectMouseEventsRemoved();

        wrapper.setProps({ disabled: false });

        expectMouseEventsAdded();

        wrapper.unmount();

        expectMouseEventsRemoved();

        document.addEventListener = oldAddEventListener;
        document.removeEventListener = oldRemoveEventListener;
    });

    it('can be dragged', () => {
        const startWidthPrev = 99;
        const startWidthNext = 100;
        const moveDistance = 50;

        const prevSibling = { clientWidth: startWidthPrev, style: {} };
        const nextSibling = { clientWidth: startWidthNext, style: {} };

        const wrapper = shallow(<ColumnResizer/>);
        const instance = wrapper.instance();

        instance.refs = {
            ele: {
                previousSibling: prevSibling,
                nextSibling,
            }
        }

        instance.mousePos = 0;
        instance.startDrag();

        expect(instance.dragging).toBe(true);
        expect(instance.startWidthPrev).toBe(startWidthPrev);

        instance.onMouseMove({ screenX: moveDistance });

        expect(prevSibling.style.width).toBe(`${startWidthPrev + moveDistance}px`)
    });

    it('can have a min width', () => {
        const startWidthPrev = 99;
        const startWidthNext = 100;
        const totalWidth = startWidthPrev + startWidthNext;
        const minWidth = 60;

        const prevSibling = { clientWidth: startWidthPrev, style: {} };

        const wrapper = shallow(<ColumnResizer minWidth={minWidth}/>);
        const instance = wrapper.instance();

        instance.refs = {
            ele: {
                previousSibling: prevSibling,
            }
        }
        instance.mousePos = 0;
        instance.startDrag();

    });

    it('supports touch events', () => {
        const touchEvent = {
            touches: [{ screenX: 1 }]
        }

        const wrapper = shallow(<ColumnResizer/>);
        wrapper.instance().onMouseMove(touchEvent);

        expect(wrapper.instance().mouseX).toBe(1);
    })

})