/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Habit Tracker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByText('Habit Tracker').should('be.visible');
  });

  it('displays three habits by default', () => {
    cy.get('.habits ul li').should('have.length', 3);

    cy.get('[data-testid=habit-name]').first().should('have.text', 'Reading');
    cy.get('[data-testid=habit-name]').eq(1).should('have.text', 'Running');
    cy.get('[data-testid=habit-name]').last().should('have.text', 'Coding');
  });

  context('adds new habit at the end', () => {
    const newHabit = 'Exercise';
    it('by Enter', () => {
      cy.get('.add-input').type(`${newHabit}{enter}`);
      cy.get('.habit-name')
        .should('have.length', 4)
        .last()
        .should('have.text', newHabit);
    });

    it('by Click', () => {
      cy.findByPlaceholderText('Habit').type(`${newHabit}`);
      cy.findByText('Add').click();
      cy.findAllByTestId('habit-name')
        .should('have.length', 4)
        .last()
        .should('have.text', newHabit);
      cy.findAllByTestId('habit-count')
        .should('have.length', 4)
        .last()
        .should('have.text', 0);
    });
  });

  context('habit', () => {
    it('can increase count', () => {
      cy.findAllByTitle('increase').first().click();
      cy.findAllByTestId('habit-count').first().should('have.text', 1);
    });

    it('can decrease count', () => {
      cy.findAllByTitle('increase').first().click();
      cy.findAllByTitle('increase').first().click();
      cy.findAllByTitle('decrease').first().click();
      cy.findAllByTestId('habit-count').first().should('have.text', 1);
    });

    it('does not decrease below 0', () => {
      cy.findAllByTitle('decrease').first().click();
      cy.findAllByTestId('habit-count').first().should('have.text', 0);
    });

    it('shows active count on the header', () => {
      cy.findAllByTitle('increase').first().click();
      cy.findAllByTitle('increase').last().click();
      cy.findByTestId('total-count').should('have.text', 2);
    });

    it('deletes an item', () => {
      cy.findAllByTitle('delete').first().click();
      cy.findAllByTestId('habit-name')
        .findByText('Reading')
        .should('not.exist');
      cy.get('.habits ul li').should('have.length', 2);
    });

    it('can reset all habtsto 0 when clicking reset all', () => {
      cy.findAllByTitle('increase').first().click();
      cy.findAllByTitle('increase').first().click();
      cy.findAllByTitle('increase').last().click();
      cy.findByText('Reset All').click();
      cy.findAllByTestId('habit-count').each((item) =>
        cy.wrap(item).should('have.text', 0)
      );
    });
  });
});
