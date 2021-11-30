import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Habits from '../habits';
import renderer from 'react-test-renderer';

describe('Habits', () => {
  const habits = [
    { id: 1, name: 'first-habit', count: 1 },
    { id: 2, name: 'second-habit', count: 0 },
  ];
  let HabitsComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;
  let onAdd;
  let onReset;

  beforeEach(() => {
    onDecrement = jest.fn();
    onDelete = jest.fn();
    onAdd = jest.fn();
    onReset = jest.fn();
    onIncrement = jest.fn();
    HabitsComponent = (
      <Habits
        habits={habits}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
        onAdd={onAdd}
        onReset={onReset}
      />
    );
  });

  it('renders', () => {
    // 스냅샷 테스트
    const component = renderer.create(HabitsComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Button Click', () => {
    beforeEach(() => {
      render(HabitsComponent);
    });

    it('calls onAdd when clicking the "Add" button', () => {
      const input = screen.getByPlaceholderText('Habit');
      const button = screen.getByText('Add');
      const newHabit = 'New Habit';

      userEvent.type(input, newHabit);
      userEvent.click(button);
      expect(onAdd).toHaveBeenCalledWith(newHabit);
    });

    it("calls onIncrement when clicking the 'increase' button", () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habits[0]);
    });

    it("calls onDecrement when clicking the 'decrease' button", () => {
      const button = screen.getAllByTitle('decrease')[0];
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habits[0]);
    });

    it("calls onDelete when clicking the 'delete' button", () => {
      const button = screen.getAllByTitle('delete')[0];
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habits[0]);
    });

    it("calls onReset when clicking the 'Reset All' button", () => {
      const button = screen.getByText('Reset All');
      userEvent.click(button);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });
});
