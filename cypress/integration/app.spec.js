describe('app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays three habits by default', () => {
    cy.get('.habits ul li').should('have.length', 3);

    cy.get('[data-testid=habit-name]').first().should('have.text', 'Reading');
    cy.get('[data-testid=habit-name]').eq(1).should('have.text', 'Running');
    cy.get('[data-testid=habit-name]').last().should('have.text', 'Coding');
  });

  context('can add new habit', () => {
    const newHabit = 'Exercise';
    it('by Enter', () => {
      cy.get('.add-input').type(`${newHabit}{enter}`);
      cy.get('.habit-name')
        .should('have.length', 4)
        .last()
        .should('have.text', newHabit);
    });

    it('by Click', () => {
      cy.get('.add-input').type(`${newHabit}`);
      cy.get('.add-button').click();
      cy.get('.habit-name')
        .should('have.length', 4)
        .last()
        .should('have.text', newHabit);
    });
  });

  context('habit', () => {
    it('can increase count', () => {
      cy.get('[title=increase]').first().click();
      cy.get('[data-testid=habit-count').first().should('have.text', 1);
    });

    it('can decrease count', () => {
      cy.get('[title=increase]').first().click();
      cy.get('[title=increase]').first().click();
      cy.get('[title=decrease]').first().click();
      cy.get('[data-testid=habit-count').first().should('have.text', 1);
    });

    it('can decrease until 0 ', () => {
      cy.get('[title=decrease]').first().click();
      cy.get('[data-testid=habit-count').first().should('have.text', 0);
    });

    it('can delete ', () => {
      cy.get('[title=delete]').first().click();

      cy.get('.habits ul li').should('have.length', 2);
    });

    it('can reset all habit counts', () => {
      cy.get('[title=increase]').first().click();
      cy.get('[title=increase]').first().click();
      cy.get('[title=increase]').last().click();
      cy.get('.habits-reset').click();
      cy.get('.habit-count').then(($counts) => {
        [...$counts].forEach(($count) => cy.get($count).should('have.text', 0));
      });
    });
  });
});
