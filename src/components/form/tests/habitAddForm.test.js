import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitAddForm from '../habitAddForm';

describe('HabitAddForm', () => {
  let onAdd;

  beforeEach(() => {
    onAdd = jest.fn();
  });

  it('calls onAdd when button is clicked', () => {
    // given
    render(<HabitAddForm onAdd={onAdd} />);
    const input = screen.getByPlaceholderText('Habit');
    const button = screen.getByText('Add');

    // when
    // input 에 원하는 습관의 이름을 타이핑한 다음에
    // add 라는 버튼을 클릭하면
    userEvent.type(input, 'New Habit');
    userEvent.click(button);
    // fireEvent 하위레벨의 이벤트를 발생 -> 버튼 focus 안됨
    // userEvent 실제 사용자가 클릭하는것처럼 효과

    // then
    // onAdd 가 input에 입력된 이름과 함께 호출되어야 함!
    expect(onAdd).toHaveBeenCalledWith('New Habit');
  });
});
