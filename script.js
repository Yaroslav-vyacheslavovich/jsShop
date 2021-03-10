class Good {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }
    getHtml() {
        return `<div class="goods-item">
        <div class = "item-img"></div>
        <div class = "item-title-price">
        <h3>${this.title}</h3><p>${this.price}</p>
        </div>
        <div class ="add-cart"><button class="add-button" onclick = "cart.addGood(${this.id})" type="button">Добавить</button></div>
        </div>`
    }
}
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, id: 12 },
            { title: 'Socks', price: 50, id: 2 },
            { title: 'Jacket', price: 350, id: 34 },
            { title: 'Shoes', price: 250, id: 48 },
        ]
    }
    render() {
        this.goods.forEach
            (item => {
                const goodsItem = new Good(item.title, item.price,item.id);
                document.querySelector('.goods-list').insertAdjacentHTML('beforeEnd', goodsItem.getHtml());
            })
    }
}
class Cart{
    constructor(title, price, id, quanity) { 
        this.title = title;
        this.price = price;
        this.id = id;
        this.quanity = quanity;
    }
    getHtml() {
        return `<p>${this.title}&nbsp;&nbsp;&nbsp;${this.quanity} &nbsp;&nbsp;&nbsp;
        <span onclick="cart.addGood(${this.id})">+</span>&nbsp;&nbsp;&nbsp;<span onclick="cart.delGood(${this.id})">-</span>&nbsp;&nbsp;&nbsp;</p><br>`
    }
}
class CartList {
    constructor() {
        this.cartGoods = []
    }
    addGood(id) {
        let newCart = list.goods.find(item => item.id === id);
        let alreadyCart = this.cartGoods.find(item => item.id === id);
        if (alreadyCart != undefined) {
            let i = this.cartGoods.findIndex(item => item.id === id);
            this.cartGoods[i].quanity += 1;
        }
        else {
            newCart.quanity = 1;
            this.cartGoods.push(newCart);
        }
        this.cartCreate()
        this.summary();
    }
    cartCreate() { 
        document.querySelector('.cart').innerHTML = "";
        this.cartGoods.forEach(item => { 
            const cartView = new Cart(item.title, item.price, item.id, item.quanity)
            document.querySelector('.cart').insertAdjacentHTML('beforeEnd', cartView.getHtml());
            })
        }
    delGood(id) {
        let i = this.cartGoods.findIndex(item => item.id === id);
        this.cartGoods[i].quanity -= 1;
        if (this.cartGoods[i].quanity <=0) {
            this.cartGoods.splice(i,1);
        }
        this.cartCreate()
        this.summary();
     }
    openCart() {
        if (document.querySelector(".cart").style.visibility === 'visible') {
            document.querySelector(".cart").style.visibility = 'hidden';
        }
        else {
            document.querySelector(".cart").style.visibility = 'visible';
        }
    }
    summary() {
        let sum = 0
        this.cartGoods.forEach
            (item => {
                let x = item.price*item.quanity;
                sum += x;
            })
        document.querySelector(".cart-value").innerHTML = sum;      
    }
}
const list = new GoodsList();
list.fetchGoods();
list.render();
const cart = new CartList();