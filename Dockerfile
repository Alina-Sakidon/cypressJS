FROM cypress/browsers:node-22.16.0-chrome-136.0.7103.113-1-ff-139.0.1-edge-136.0.3240.76-1

WORKDIR /e2e/tests/guiTests

# Копіюємо package.json і package-lock.json, щоб встановити залежності
COPY package*.json ./

RUN npm install --include=dev

# Копіюємо весь код (тести, конфіг і все інше)
COPY . .

RUN apt-get update && apt-get install -y xvfb

RUN npx cypress verify

# Запускаємо тести автоматично при старті контейнера
CMD ["npx", "cypress", "run"]
