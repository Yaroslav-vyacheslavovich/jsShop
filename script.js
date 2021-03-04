const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsList = list => {
    let goodsList = list.map(item =>
        `<div class="goods-item">
        <div class = "item-img"></div>
        <div class = "item-title-price">
        <h3>${item.title}</h3><p>${item.price}</p>
        </div>
        <div class ="add-cart"><button class="add-button" type="button">Добавить</button></div>
        </div>`
    ).join('');
    document.querySelector('.goods-list').insertAdjacentHTML('beforeEnd', goodsList);
}
renderGoodsList(goods);

