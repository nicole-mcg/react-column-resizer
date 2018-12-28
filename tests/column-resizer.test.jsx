import React from 'react'
import { shallow } from 'enzyme';

import ColumnResizer from '../src/column-resizer';


describe('react-column-resizer', () => {

    it('renders one table cell', () => {
        const wrapper = shallow(<ColumnResizer/>);
        expect(wrapper.children).toHaveLength(1);
        expect(wrapper.find('td')).toHaveLength(1);
    });

})