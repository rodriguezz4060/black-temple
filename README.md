## Getting Started
First, run the development server:

```bash
npm i

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## TODO

### Users
 - [x] Собрать seed призмы для генерации дефолтных данных

### Users
 - [x] Сделать регистрацию
	 - [x] Настроить примешены для юзеров, чтоб можно было выдавать права для авторов и они могли создавать гайды и управлять своими публикациями 
 
#### Main page
- [x] Сделать главную страницу, пока идея в том что на главной будут линки на гайды. Рендер всех спеков с переходом по роутам (прим. /hacoc , /dk, /prist )

#### Main Guides page
- [x] Страница гайдов, на ней будет рендер всех написанных гайдов, с дефолт сортировкой по класу и группировкой по патчу ( как группировать их я пока до конца не решил, пока идея в привязке к патчу, мб вы предложите что-то лучше) 
- [x] Фильтр по класу и спеку для страницы гайдов [пример](https://imgur.com/a2wo3lK) 
 
### Left Side menu
- [ ]  Блок с данными про автора гайда, аватар и имя
- [ ] Left Side menu для на странице гайда  с якорями для быстрой навигации по разделам (Обзор, Героические таланты, Таланты, Ротация, Подробный разбор, Подземелья, Приоритет характеристик, Экипировка, Расходники, Макросы, Аддоны, Изменения в патче, Changelog)

#### Guide page
- [x] Страница конкретного гайда, для отображения url будет использоваться slug + guideId, для уникальности ссылок 
- [x] Подключения скрипта wowhead для тултипов
- [ ] Собрать рендер страници по разделам Left Side menu
- [ ] Changelog компонента которая будет отображать когда изменялся гайд
- [ ] 
#### Create Guide
- [x] Кнопка по клику на которую будет предложено выбрать класс спек, режим и ввести номер патча для того чтоб создать страницу гайда, после успешного создания происходит редикрект в едитор. Создание гайда это создание полей в таблице для всех разделов гайда

#### Edit Guide page
- [ ]  Страница редактирования повторяет структуру как страница гайда, но с возможностью редактировать каждый раздел
- [ ] Сохранение должно быть возможно как всего гайда, так и каждого раздела отдельно
- [ ] Кнопка публикации, при создании гайда он должен иметь статус PROCESSING (CREATING или EDIT как будет понятней), когда автор будет готов его опубликовать он сможет изменить его статус на PUBLIC или обратно вернуть в статус редактирования.
##### Обзор
- [x] Банер класса, отображение классового банера в зависимости в какой гайд открыл
- [x] Эффективность класса, (компонент готов)
- [x] Бис лист, готова только верстка
- [ ] Компоненты:
#####  Героические таланты
- [ ] Компонент с MDEditor и табами в который так же встроен MDEditor. Структура - сначала MDEditor  потом Табы (Табы с MDEditor готов)
##### Таланты
- [ ] Компонент с MDEditor и табами в который так же встроен MDEditor. Структура - сначала Табы потом MDEditor  (Табы с MDEditor готов)
##### Ротация
- [ ] Компонента для тайм лайна спелов опенера [пример](https://imgur.com/ULsWWac). Структура MDEditor Табы для СТ и такое же для АОЕ
##### Подробный разбор
- [ ] Компонента с MDEditor 
##### Подземелья
- [ ] Компонента с Табами+MDEditor где будут эбеты с талантами
##### Приоритет характеристик
- [ ] Компонента который будет отображать приоритеты статов + MDEditor [пример](https://imgur.com/undefined) 
##### Экипировка
- [ ] Табы с столбцами слот, предмет (ссылка на вовхед) и локаци (где/с кого падает) + под ними MDEditor
##### Расходники
- [ ] Компонента с MDEditor + таблица с чартами и блок где все в слотах персонажа стоит [пример](https://imgur.com/KSA0iB1)
##### Расы
- [ ] Компонента с MDEdito
##### Макросы
- [ ] Создание аккордеона  в котором будет MDEditor и возможность создавать новые аккордионы
##### Аддоны
- [ ] Создание аккордеона в котором будет MDEditor  и возможность новые аккордионы
##### Изменения в патче
- [ ] Создание аккордеона в котором будет MDEditor 
