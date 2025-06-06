FROM cypress/browsers:node-20.9.0-chrome-118.0.5993.88-1-ff-118.0.2-edge-118.0.2088.46-1

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /e2e

COPY package*.json ./

RUN npm install

RUN npm install cypress@10.11.0

COPY . .

RUN rm -f /etc/apt/sources.list.d/microsoft-edge*.list && \
    apt-get update -o Acquire::AllowInsecureRepositories=true \
                   -o Acquire::AllowDowngradeToInsecureRepositories=true || true && \
    apt-get install -y --no-install-recommends xvfb xauth && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

CMD ["xvfb-run", "-a", "npx", "cypress", "run", "--browser", "firefox", "--headless", "--spec", "cypress/e2e/tests/guiTests/*.cy.js"]
