// UI를 위한 로직
// MVP (model, view, presenter) 패턴 중 Presenter 만 사용해봄

export default class HabitPresenter {
  constructor(habits) {
    this.habits = habits;
  }

  getHabits() {
    return this.habits;
  }

  increment(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
    });

    update(this.habits);
  }
}
