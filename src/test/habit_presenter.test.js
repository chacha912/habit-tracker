import HabitPresenter from '../habit_presenter';

describe('HabitPresenter', () => {
  let habitPresenter;
  const habits = [
    { id: 1, name: 'first-habit', count: 1 },
    { id: 2, name: 'second-habit', count: 0 },
  ];
  let callBackFn;
  beforeEach(() => {
    callBackFn = jest.fn();
    habitPresenter = new HabitPresenter(habits);
  });

  it('gets habits', () => {
    expect(habitPresenter.getHabits()).toEqual(habits);
  });

  it('increment', () => {
    habitPresenter.increment(habits[0], callBackFn);

    expect(habitPresenter.getHabits()).toEqual(
      habits.map((habit) => {
        if (habit.id === 1) return { ...habit, count: habit.count + 1 };
        return habit;
      })
    );

    expect(callBackFn).toHaveBeenCalledTimes(1);
  });

  describe('decrement', () => {
    it('regular', () => {
      habitPresenter.decrement(habits[0], callBackFn);

      expect(habitPresenter.getHabits()).toEqual(
        habits.map((habit) => {
          if (habit.id === 1) return { ...habit, count: habit.count - 1 };
          return habit;
        })
      );

      expect(callBackFn).toHaveBeenCalledTimes(1);
    });

    it('minus', () => {
      habitPresenter.decrement(habits[1], callBackFn);

      expect(habitPresenter.getHabits()).toEqual(
        habits.map((habit) => {
          if (habit.id === 2) return { ...habit, count: 0 };
          return habit;
        })
      );

      expect(callBackFn).toHaveBeenCalledTimes(1);
    });
  });

  it('delete', () => {
    habitPresenter.delete(habits[0], callBackFn);

    expect(habitPresenter.getHabits()).toEqual(
      habits.filter((habit) => habit.id !== 1)
    );

    expect(callBackFn).toHaveBeenCalledTimes(1);
  });

  it('add', () => {
    habitPresenter.add('new-habit', callBackFn);

    expect(habitPresenter.getHabits()).toEqual([
      ...habits,
      { id: Date.now(), name: 'new-habit', count: 0 },
    ]);

    expect(callBackFn).toHaveBeenCalledTimes(1);
  });

  it('reset', () => {
    habitPresenter.reset(callBackFn);

    expect(habitPresenter.getHabits()).toEqual(
      habits.map((habit) => ({ ...habit, count: 0 }))
    );

    expect(callBackFn).toHaveBeenCalledTimes(1);
  });
});
