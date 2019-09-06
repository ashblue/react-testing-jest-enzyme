import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) {
    wrapper.setState(state);
  }

  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
};

let wrapper = null;
beforeEach(() => {
  wrapper = setup();
});

describe('when rendering', () => {
  it('shows app', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
  });

  it('shows counter display', () => {
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
  });

  it('has an error message area', () => {
    const errorMessage = findByTestAttr(wrapper, 'error-message');
    expect(errorMessage.length).toBe(1);
  });
});

describe('counter interaction', () => {
  it('should start the counter at 0', () => {
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
  });

  const counterSetup = (counter, buttonTestAttr) => {
    wrapper = setup(null, {counter});
    const button = findByTestAttr(wrapper, buttonTestAttr);

    button.simulate('click');
    wrapper.update();

    return findByTestAttr(wrapper, 'counter-display');
  };

  describe('increment', () => {
    it('shows increment button', () => {
      const button = findByTestAttr(wrapper, 'increment-button');
      expect(button.length).toBe(1);
    });

    it('clicking button increments counter display', () => {
      const counter = 7;
      const counterDisplay = counterSetup(counter, 'increment-button');

      expect(counterDisplay.text()).toContain(counter + 1);
    });
  });

  describe('decrement', () => {
    it('shows decrement button', () => {
      const button = findByTestAttr(wrapper, 'decrement-button');
      expect(button.length).toBe(1);
    });

    it('clicking button decrements counter display', () => {
      const counter = 7;
      const counterDisplay = counterSetup(counter, 'decrement-button');

      expect(counterDisplay.text()).toContain(counter - 1);
    });

    it('should not set the counter less than zero', () => {
      const counter = 0;
      const counterDisplay = counterSetup(counter, 'decrement-button');

      expect(counterDisplay.text()).toContain(counter);
    });

    describe('error message less than zero handling', () => {
      it('should display an error message when the counter drops below zero', () => {
        const counter = 0;
        counterSetup(counter, 'decrement-button');
        const errorMessage = findByTestAttr(wrapper, 'error-message');

        expect(errorMessage.text()).not.toBe('');
      });

      it('should clear error messages on success', () => {
        const counter = 0;
        counterSetup(counter, 'decrement-button');

        const button = findByTestAttr(wrapper, 'increment-button');
        button.simulate('click');
        wrapper.update();

        const errorMessage = findByTestAttr(wrapper, 'error-message');

        expect(errorMessage.text()).toBe('');
      });

      it('should increment as normal after an error', () => {
        const counter = 0;
        counterSetup(counter, 'decrement-button');

        const button = findByTestAttr(wrapper, 'increment-button');
        button.simulate('click');
        wrapper.update();

        const counterDisplay = findByTestAttr(wrapper, 'counter-display');

        expect(counterDisplay.text()).toContain(1);
      });
    });
  });
});
