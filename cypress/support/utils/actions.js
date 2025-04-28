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