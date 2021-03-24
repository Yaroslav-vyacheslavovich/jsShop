
const makeGETRequest = (url, callback) => {
    return new Promise((resolve, reject) => {
        var xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
            if (xhr.status != 200) {
                    reject(`Ошибка ${xhr.status}: ${xhr.statusText}`)
            } else {
                resolve(callback(xhr.responseText)
                    )
          }
            }
        }
        xhr.open('GET', url);
        xhr.send();
    })
}


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

        const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            let p = new Promise((resolve, reject) =>
            resolve(this.goods = JSON.parse(goods))
            ).then(this.render())
        })
    }
    
    render() {
        this.goods.forEach
            (item => {
                const goodsItem = new Good(item.product_name, item.price,item.id_product);

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

        let newCart = list.goods.find(item => item.id_product === id); // !!!!
        let alreadyCart = this.cartGoods.find(item => item.id_product === id);
        if (alreadyCart != undefined) {
            let i = this.cartGoods.findIndex(item => item.id_product === id);

            this.cartGoods[i].quanity += 1;
        }
        else {
            newCart.quanity = 1;
            this.cartGoods.push(newCart);
        }

        this.cartCreate();


        this.summary();
    }
    cartCreate() { 
        document.querySelector('.cart').innerHTML = "";
        this.cartGoods.forEach(item => { 

            const cartView = new Cart(item.product_name, item.price,item.id_product, item.quanity) //!!!!

            document.querySelector('.cart').insertAdjacentHTML('beforeEnd', cartView.getHtml());
            })
        }
    delGood(id) {

        let i = this.cartGoods.findIndex(item => item.id_product === id);

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

const cart = new CartList();



