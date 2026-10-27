# coop-games

Веб-приложение для планирования совместных игр. Сейчас реализован вход через Google, создание профиля с уникальным никнеймом и базовый экран библиотеки.

## Локальный запуск

1. Установите зависимости: `npm install`.
2. Скопируйте `.env.example` в `.env` и заполните значения.
3. Создайте `AUTH_SECRET` командой `npx auth secret`.
4. В Google Cloud Console создайте OAuth Client ID типа Web application и добавьте URI перенаправления `http://localhost:3000/api/auth/callback/google`.
5. Запустите приложение: `npm run dev`.

`AUTH_GOOGLE_ID` и `AUTH_GOOGLE_SECRET` — учётные данные OAuth-клиента Google. `DATABASE_URL` используется приложением для PostgreSQL в Neon; `DIRECT_URL` нужен Prisma CLI согласно `prisma7.config.ts`.

Для Google запрашивается только OpenID scope. Приложение использует стабильный Google ID, не записывает email и не передаёт поля профиля Google в сессию. При первом входе пользователь выбирает никнейм; записи `User` и `OAuthAccount` создаются после успешного выбора.

## Production

В настройках OAuth-клиента добавьте production домен и callback URI `https://<домен>/api/auth/callback/google`. Задайте те же переменные окружения на хостинге.
