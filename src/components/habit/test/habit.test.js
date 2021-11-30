import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Habit from '../habit';
import renderer from 'react-test-renderer';

describe('Habit', () => {
  const habit = { id: 1, name: 'first-habit', count: 4 };
  let HabitComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    HabitComponent = (
      <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    );
  });

  it('renders', () => {
    // 스냅샷 테스트
    const component = renderer.create(HabitComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Button Click', () => {
    beforeEach(() => {
      render(HabitComponent);
    });

    it('calls onIncrement when clicking "increment" buttons', () => {
      const button = screen.getByTitle('increase');
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habit);
    });

    it('calls onDecrement when clicking "decrement" buttons', () => {
      const button = screen.getByTitle('decrease');
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habit);
    });

    it('calls onDelete when clicking "delete" buttons', () => {
      const button = screen.getByTitle('delete');
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habit);
    });
  });
});
