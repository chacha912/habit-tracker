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

  it('deletes habit from the list and call update callback', () => {
    presenter.delete(habits[0], update);

    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe('second-habit');
    checkUpdateIsCalled();
  });

  it('adds new habit to the list and call update callback', () => {
    presenter.add('new-habit', update);

    expect(presenter.getHabits()[2].name).toBe('new-habit');
    expect(presenter.getHabits()[2].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('resets all habit counts to 0 and call update callback', () => {
    presenter.reset(update);

    expect(presenter.getHabits()[0].count).toBe(0);
    expect(presenter.getHabits()[1].count).toBe(0);
    checkUpdateIsCalled();
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
});
