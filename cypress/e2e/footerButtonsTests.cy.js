describe('Footer social media links', () => {
  const socialLinks = [
    { name: 'YouTube', domain: 'youtube.com' },
    { name: 'Telegram', domain: 't.me' },
    { name: 'LinkedIn', domain: 'linkedin.com' },
    { name: 'Instagram', domain: 'instagram.com' },
    { name: 'Hillel', domain: 'ithillel.ua' },
    { name: 'Support Email', domain: 'mailto:developer@ithillel.ua' }
  ];

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  socialLinks.forEach(({ name, domain }) => {
    it(`Should display visible ${name} link with correct href`, () => {
      cy.get(`#contactsSection a[href*="${domain}"]`)
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', domain);
    });
  });
});
