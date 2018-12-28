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

        const td = wrapper.find('td');
        expect(td).toHaveLength(1);
        expect(td.children()).toHaveLength(0);

        const props = td.props();
        expect(props).toHaveProperty('style', expectedStyle);
        expect(props).toHaveProperty('className', "");
        expect(props).toHaveProperty('onMouseDown', wrapper.instance().startDrag);
        expect(props).toHaveProperty('onTouchStart', wrapper.instance().startDrag);
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

        expect(document.addEventListener).toHaveBeenCalledWith("mousemove", instance.onMouseMove);
        expect(document.addEventListener).toHaveBeenCalledWith("mouseup", instance.endDrag);
        expect(document.addEventListener).toHaveBeenCalledWith("touchmove", instance.onMouseMove);
        expect(document.addEventListener).toHaveBeenCalledWith("touchend", instance.endDrag);

        wrapper.unmount();

        expect(document.removeEventListener).toHaveBeenCalledWith("mousemove", instance.onMouseMove);
        expect(document.removeEventListener).toHaveBeenCalledWith("mouseup", instance.endDrag);
        expect(document.removeEventListener).toHaveBeenCalledWith("touchmove", instance.onMouseMove);
        expect(document.removeEventListener).toHaveBeenCalledWith("touchend", instance.endDrag);

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
        expect(instance.startWidthNext).toBe(startWidthNext);

        instance.onMouseMove({ screenX: moveDistance });

        expect(prevSibling.style.width).toBe(`${startWidthPrev + moveDistance}px`)
        expect(nextSibling.style.width).toBe(`${startWidthNext - moveDistance}px`)
    });

    it('can have a min width', () => {
        const startWidthPrev = 99;
        const startWidthNext = 100;
        const totalWidth = startWidthPrev + startWidthNext;
        const minWidth = 60;

        const prevSibling = { clientWidth: startWidthPrev, style: {} };
        const nextSibling = { clientWidth: startWidthNext, style: {} };

        const wrapper = shallow(<ColumnResizer minWidth={minWidth}/>);
        const instance = wrapper.instance();

        instance.refs = {
            ele: {
                previousSibling: prevSibling,
                nextSibling,
            }
        }
        instance.mousePos = 0;
        instance.startDrag();

        instance.onMouseMove({ screenX: 50 });
        expect(prevSibling.style.width).toBe(`${totalWidth - minWidth}px`);
        expect(nextSibling.style.width).toBe(`${minWidth}px`);

        instance.onMouseMove({ screenX: -50 });
        expect(prevSibling.style.width).toBe(`${minWidth}px`)
        expect(nextSibling.style.width).toBe(`${totalWidth -  minWidth}px`)
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