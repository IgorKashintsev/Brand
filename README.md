Проект верстал по макету https://www.figma.com/file/7XhT5EWfZX0W6ohgd57Pny/shop?node-id=0%3A1
Все на чистом JS, плюс TypeScript, сборка на Webpack. С использования методологии ООП, модульных стилей.
В макете ограниченное количество материала для полноценного проекта, поэтому на JS прописал только основную логику: 
Переход на страницу Catalog по кнопке внизу главной "Browse All Product", вернуться на главную - кликнуть на Logo в навигационной панели header. Там же можно перейти в регистрацию и корзину. Есть выпадающее меню.
Кликнув по изображению товара - продукт добавляется в корзину. С корзины можно удалять и уменьшать его количество. Одновременно идет подсчет итоговой суммы покупки.
Кликнув на наименование товара (под изображением), осуществляется переход на страницу Product. Здесь не стал отображать конкретный товар, т.к. в макете нет подходящих фото.

Создал бэкенд-сервер с использованием node.js и express.js. Прописал логику для взаимодействия клиента с сервером (отправка запроса, получение данных и их запись на стороне сервера). Также внедрил хранение данных параллельно в localstorage.

ссылка на проект: https://igorkashintsev.github.io/Brand/
