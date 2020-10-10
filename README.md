This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Описание

Мультимедийная база данных по мультсериалу "Рик и Морти", содержащая информацию по эпизодам, персонажам и локациям.

### Страница "Characters"
1. Панель поиска персонажей по критериям: имя, пол, статус, тип, подтип.
2. Информационный блок, содержаций информацию об источнике вывода персонажей (все, поиск, эпизод, локация) и количество персонажей, соответствующих источнику.
3. Пагинация по страницам.
4. Карточки персонажей с основной информацией: изображение и имя. Карточка одновременно является ссылкой на страницу персонажа.

#### Страница персонажа
1. Навигационный блок кнопок: следующий/предыдущий персонаж из источника и кпопка возврата ко всем персонажам из источника.
2. Блок информации о персонаже: изображение, имя, пол, тип, подтип, статус, оригинальная локация и локация где последний раз был персонаж.
3. Количество и список эпизодов мультсериала (код и название), где встречается этот персонаж. Каждый элемент списка является ссылкой на страницу эпизода.

### Страница "Locations"
1. Панель поиска локаций по критериям: название, тип, измерение.
2. Информационный блок, содержаций информацию об источнике вывода локаций (все, поиск) и количество локаций, соответствующих источнику.
3. Фильтр выбора локаций по певой букве названия.
4. Список локаций (название). Каждый элемент списка является ссылкой на страницу локации.

#### Страница локации
1. Навигационный блок кнопок: следующая/предыдущая локация из источника и кпопка возврата ко всем локациям из источника.
2. Блок информации о локации: название, тип, измерение.
3. Количество и список персонажей, посетивших локацию. Каждый элмемент списка является ссылкой на страницу персонажа.

### Episodes
1. Панель поиска эпизодов по критериям: название, код.
2. Информационный блок, содержаций информацию об источнике вывода эпизодов (все, поиск) и количество эпизодов, соответствующих источнику.
3. Список эпизодов (код и название). Каждый элемент списка является ссылкой на страницу эпизода.

#### Страница эпизода
1. Навигационный блок кнопок: следующий/предыдущий эпизодя из источника и кпопка возврата ко всем эпизодам из источника.
2. Блок информации об эпизодеи: код, название, дата выхода.
3. Количество и список персонажей (изображение и имя), кто учавствовал в эпизоде. Каждый элмемент списка является ссылкой на страницу персонажа.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
