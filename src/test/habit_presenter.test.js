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
    checkUpdateIsCalled();
  });

  describe('decrement', () => {
    it('decrements habit count and call update callback', () => {
      presenter.decrement(habits[0], update);

      expect(presenter.getHabits()[0].count).toBe(0);
      checkUpdateIsCalled();
    });

    it('does not set the count value below 0 when decrements', () => {
      presenter.decrement(habits[0], update);
      presenter.decrement(habits[0], update);

      expect(presenter.getHabits()[0].count).toBe(0);
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

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
});
