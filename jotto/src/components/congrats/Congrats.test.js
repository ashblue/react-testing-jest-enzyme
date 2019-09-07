import React from 'react';
import {shallow} from 'enzyme';
import Congrats from "./Congrats";
import {findByTestAttr, checkProps} from "../../../test/testUtils";

const defaultProps = {
  success: false,
};

const setup = (props = {}) => {
  const setupProps = {...defaultProps, ...props};
  return shallow(<Congrats {...setupProps} />)
};

it('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'congrats');

  expect(component.length).toBe(1);
});

it('renders no text when `success` prop is false', () => {
  const wrapper = setup({success: false});
  const component = findByTestAttr(wrapper, 'congrats');

  expect(component.text()).toBe('');
});

it('renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup({success: true});
  const message = findByTestAttr(wrapper, 'congrats-message');

  expect(message.text()).not.toBe('');
});

it('does not throw warning with expected props', () => {
  const expectedProps = {success: false};
  checkProps(Congrats, expectedProps);
});
