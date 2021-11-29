import HabitPresenter from '../habit_presenter';

describe('HabitPresenter', () => {
  const habits = [
    { id: 1, name: 'first-habit', count: 1 },
    { id: 2, name: 'second-habit', count: 0 },
  ];
  let presenter;
  let update;

  beforeEach(() => {
    update = jest.fn();
    presenter = new HabitPresenter(habits);
  });

  it('inits with habits', () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it('increments habit count and call update callback', () => {
    presenter.increment(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(2);
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  });

  describe('decrement', () => {
    it('regular', () => {
      presenter.decrement(habits[0], update);

      expect(presenter.getHabits()).toEqual(
        habits.map((habit) => {
          if (habit.id === 1) return { ...habit, count: habit.count - 1 };
          return habit;
        })
      );

      expect(update).toHaveBeenCalledTimes(1);
    });

    it('minus', () => {
      presenter.decrement(habits[1], update);

      expect(presenter.getHabits()).toEqual(
        habits.map((habit) => {
          if (habit.id === 2) return { ...habit, count: 0 };
          return habit;
        })
      );

      expect(update).toHaveBeenCalledTimes(1);
    });
  });

  it('delete', () => {
    presenter.delete(habits[0], update);

    expect(presenter.getHabits()).toEqual(
      habits.filter((habit) => habit.id !== 1)
    );

    expect(update).toHaveBeenCalledTimes(1);
  });

  it('add', () => {
    presenter.add('new-habit', update);

    expect(presenter.getHabits()).toEqual([
      ...habits,
      { id: Date.now(), name: 'new-habit', count: 0 },
    ]);

    expect(update).toHaveBeenCalledTimes(1);
  });

  it('reset', () => {
    presenter.reset(update);

    expect(presenter.getHabits()).toEqual(
      habits.map((habit) => ({ ...habit, count: 0 }))
    );

    expect(update).toHaveBeenCalledTimes(1);
  });
});
