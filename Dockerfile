FROM cypress/browsers:node-22.16.0-chrome-136.0.7103.113-1-ff-139.0.1-edge-136.0.3240.76-1

WORKDIR /e2e/tests/guiTests

COPY package*.json ./

RUN npm install --include=dev

COPY . .

RUN apt-get update && apt-get install -y xvfb

RUN npx cypress verify

CMD ["npx", "cypress", "run", "--spec", "cypress/e2e/tests/guiTests/**/*.cy.js"]

