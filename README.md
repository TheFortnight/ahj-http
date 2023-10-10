# Домашнее задание к занятию "7. Работа с HTTP"

Правила сдачи задания:

1. **Важно**: в рамках этого ДЗ нужно использовать npm (а значит, никакого `yarn.lock` в репозитории быть не должно)
1. Frontend должен собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через Appveyor
1. В README.md должен быть размещён бейджик сборки и ссылка на Github Pages
1. В качестве результата присылайте проверяющему ссылки на GitHub-репозиторий
1. Авто-тесты писать не требуется

**Важно**: в данном ДЗ вам потребуется выполнить мини-проект. Мы понимаем, что он может занять чуть больше времени, чем обычные ДЗ, но тема HTTP настолько важна, что стоит уделить этому чуть больше времени.

---

### HelpDesk

#### Легенда

Backend-разработчик вернулся из отпуска, поэтому писать прототип API для сервиса управления заявками уже не нужно, оно готово.

#### Описание

Описание API. Для хранения данных мы будем оперировать следующими структурами:
```javascript
Ticket {
    id // идентификатор (уникальный в пределах системы)
    name // краткое описание
    status // boolean - сделано или нет
    description // полное описание
    created // дата создания (timestamp)
}
```

Примеры запросов:
* `GET    ?method=allTickets`           - список тикетов
* `GET    ?method=ticketById&id=<id>` - полное описание тикета (где `<id>` - идентификатор тикета)
* `POST   ?method=createTicket`         - создание тикета (`<id>` генерируется на сервере, в теле формы `name`, `description`, `status`)

Соответственно:
* `POST   ?method=createTicket`         - в теле запроса форма с полями для объекта типа `Ticket` (с `id` = `null`)
* `POST   ?method=updateById&id=<id>` - в теле запроса форма с полями для обновления объекта типа `Ticket` по `id`
* `GET    ?method=allTickets `          - массив объектов типа `Ticket` (т.е. без `description`)
* `GET    ?method=ticketById&id=<id>` - объект типа `Ticket`
* `GET    ?method=deleteById&id=<id>` - удалить объект типа `Ticket` по `id`, при успешном запросе статус ответа 204

Код ниже позволит обработать полученный ответ от сервера во Frontend:
```js
xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
        } catch (e) {
            console.error(e);
        }
    }
});
```

---

### HelpDesk: Frontend

#### Легенда

API готово, пора приступить к своим прямым обязанностям - написанию фронтенда, который будет с этим API работать.

#### Описание

Общий вид списка тикетов (должны загружаться с сервера в формате JSON):

![](./pic/helpdesk.png) 

Модальное окно добавления нового тикета (вызывается по кнопке "Добавить тикет" в правом верхнем углу):

![](./pic/helpdesk-2.png)

Модальное окно редактирования существующего тикета (вызвается по кнопке с иконкой "✎" - карандашик):

![](./pic/helpdesk-3.png)

Модальное окно подтверждения удаления (вызывается по кнопке с иконкой "x" - крестик):

![](./pic/helpdesk-4.png)

Для просмотра деталей тикета нужно нажать на тело тикета (но не на кнопки - "сделано", "редактировать" или "удалить"):

![](./pic/helpdesk-5.png)

Ваше приложение должно реализовывать следующий функционал:
* Отображение всех тикетов
* Создание нового тикета
* Удаление тикета
* Изменение тикета
* Получение подробного описание тикета
* Отметка о выполнении каждого тикета

Весь этот функционал должен быть связан с сервером через методы. Например, для удаления нужно отправить запрос с соответствующим методом, получить подтверждение и подтянуть обновлённый список тасков.

В качестве бонуса можете отображать какую-нибудь иконку загрузки (см. https://loading.io) на время подгрузки.

Авто-тесты к данной задаче не требуются. Все данные и изменения должны браться/сохраняться на сервере.

<details>
<summary>Заметка</summary>
    
Для получения данных с сервера вы можете использовать [XMLHttpRequest](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) или [fetch API](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch). Мы рекомендуем в fetch, но выбор остаётся за вами.
</details>

P.S. Подгрузка подробного описания специально организована в виде отдельного запроса. Мы понимаем, что на малых объёмах информации нет смысла делать её отдельно.

---

### Image Manager (задача со звёздочкой)

Важно: данная задача не является обязательной

#### Легенда

Настало время докрутить менеджер картинок, который вы делали на протяжении нескольких лекций. Теперь нужно, чтобы все картинки загружались и хранились на сервере, а при удалении удалялись с сервера.

#### Описание API. Для хранения данных мы будем оперировать следующими структурами:
```javascript
File {
    id // идентификатор (уникальный в пределах системы)
    filename // имя файла
    path // путь, по которому можно получить файл
}
```

Endpoints:
* `GET    /files`                      - список всех загруженных файлов
* `GET    /files/<id>`              - идентификатор файла (где `<id>` - идентификатор файла) получение одного файла
* `POST   /files`                       - загрузка и создание файла (`<id>` генерируется на сервере)
* `DELETE /files/<id>`             - идентификатор файла (где `<id>` - идентификатор файла) удаление одного файла

![](./pic/image.png)

Вы можете реализовать развёртывание в удобном для вас формате: либо так, как это было описано на лекции (отдельно для frontend + GitHub Pages и backend), либо собрать frontend и настроить backend так, чтобы он обрабатывал frontend так же, как картинки.

Используйте `FormData` для отправки данных. Авто-тесты к данной задаче не нужны.
