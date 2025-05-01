export function selectOption(selector, expectedValue) {
    cy.get(selector)
        .find('option')
        .each(($option) => {
            const value = $option.val();
            if (value.endsWith(expectedValue)) {
                cy.get(selector).select(value);
            }
        });
}

export function selectOptionByText(selector, expectedText) {
    cy.log('Trying to select option with text: ' + expectedText);  // Логируем текст, который пытаемся выбрать
    cy.get(selector, { timeout: 10000 })
      .should('be.visible')
      .then($select => {
        const found = [...$select.find('option')].some(option =>
          option.textContent.trim() === expectedText
        );
  
        if (!found) {
          throw new Error(`Option with text "${expectedText}" not found in select`);
        }
  
        cy.wrap($select).select(expectedText);
      });
  }