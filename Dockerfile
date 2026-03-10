# Используем Node.js версии 20.x
FROM node:20-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости, включая TypeScript
RUN npm cache clean --force && \
    npm ci && \
    npm install typescript

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем переменные окружения
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Создаем пользователя без прав root
RUN addgroup -S nodejs && \
    adduser -S nextjs -G nodejs && \
    mkdir .next && \
    chown -R nextjs:nodejs .

# Собираем приложение
RUN npm run build --verbose

# Переключаемся на непривилегированного пользователя
USER nextjs

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", ".next/server/index.js"]
