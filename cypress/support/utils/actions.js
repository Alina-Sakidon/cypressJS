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

export function selectOptionByText(selector, expectedValue) {
    cy.get(selector, { timeout: 10000 })
        .should('be.visible');
    cy.get(selector)
        .find('option', { timeout: 5000 })
        .each(($option) => {
            const optionText = $option.text().trim();
            if (optionText === expectedValue) {
                cy.get(selector).select(optionText);
            }
        });
}