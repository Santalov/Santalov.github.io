# Репозиторий с тестовыми стендами для service worker и emscripten imgui

Репозиторий предназначен для развертки в Github pages и на localhost. 
Инструкция по развертке написана в фаиле index.html. Содержит дубликаты кода для
упрощения развертки на localhost: фаилы в папках x и x-demo абсолютно идентичны, за исключением
пары строк с эндпоинтами.

## Emscripten-demo и emscripten-local

Тестовый стенд для открытия диалога web payments api с нужным содержимым. Содержимое диалога
хранится в папке /emscripten-local/checkout. В диалоге отображается фаил index.html и у диалога
убрана связь с окружением (передать в него инфу нельзя).

#### Фаилы

+checkout/* - то, что отображается внутри диалога - копия фаилов из папки 
imgui/examples/form2, но фаил example_emscripten.html переименован в index.js
+icon.png - не имеет отношения к функционалу, обязателен (на самом деле нет) 
для web payments api
+index.html - визуал установки service worker и открытия диалога
+installer.js - проверка, установлен ли service worker и установка и удаление.
+interaction.js - открытие окна (вызов web payments api)
+worker.js - сам service worker, открывает окно
+manifest.json - служебный фаил с инфой для браузера
+payment-manifest.json - служебный фаил с инфой для браузера

## Demo и local

Тестовый стенд для общения с service worker через сообщения (postMessage) и web payments api.

#### Файлы

+checkout/index.html - форма и кнопка для отправки сообщения внутри диалога
+checkout/checkout.js - общение с service worker внутри диалога
+icon.png - не имеет отношения к функционалу, обязателен (на самом деле нет) 
для web payments api
+index.html - визуал установки service worker, отправки сообщения и открытия диалога
+installer.js - проверка, установлен ли service worker и установка и удаление.
+interaction.js - открытие окна (вызов web payments api), отправка сообщений в service worker и получение ответ.
+worker.js - сам service worker, открывает окно, обрабатывает сообщения и paymentsapirequest.
+manifest.json - служебный фаил с инфой для браузера.
+payment-manifest.json - служебный фаил с инфой для браузера.