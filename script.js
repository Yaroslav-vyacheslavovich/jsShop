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
                    reject(document.querySelector('.goods-list').innerHTML = `Ошибка ${xhr.status}: ${xhr.statusText}`)
                }
                else {
                    resolve(callback(xhr.responseText)
                    )
                }
            }
        }
        xhr.open('GET', url);
        xhr.send();
    })
}
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

var app = new Vue({
    el: '#app',
    data: {
        message: 'Привет, Vue!',
        noData: 'Нет данных',
        emptyCart: 'В корзине пока нет товаров',
        goods: [],
        cartGoods: [],
        sum: 0,
        title: '',
    },
    methods: {
        openCart() {
            if (document.querySelector(".cart").style.visibility === 'visible') {
                document.querySelector(".cart").style.visibility = 'hidden';
            }
            else {
                document.querySelector(".cart").style.visibility = 'visible';
            }
        },
        addGood(id) {
            let newCart = this.goods.find(item => item.id_product === id);
            let alreadyCart = this.cartGoods.find(item => item.id_product === id);
            if (alreadyCart != undefined) {
                let i = this.cartGoods.findIndex(item => item.id_product === id);
                this.cartGoods[i].quanity += 1;
            }
            else {
                newCart.quanity = 1;
                this.cartGoods.push(newCart);
            }
            this.summary();
        },
        delGood(id) {
            let i = this.cartGoods.findIndex(item => item.id_product === id);
            this.cartGoods[i].quanity -= 1;
            if (this.cartGoods[i].quanity <= 0) {
                this.cartGoods.splice(i, 1);
            }
            this.summary();
        },
        summary() {
            this.sum = 0
            this.cartGoods.forEach(item => {
                let x = item.price * item.quanity;
                this.sum += x;
            })
        },
        search() {
            let cancel = document.querySelectorAll(".goods-item");
            cancel.forEach(item => {item.style.border = "1px solid black" })
            let regexp = new RegExp("^"+this.title+"+", 'i')
            this.goods.forEach(item => {
                if (regexp.test(item.product_name) == true) {
                    let red = document.querySelector("."+item.product_name);
                        red.style.border = "1px solid red";
                }
            })
        }
    }
})

makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
    app.goods = JSON.parse(goods)
});


// class Good {
//     constructor(title, price, id) {
//         this.title = title;
//         this.price = price;
//         this.id = id;
//     }
//     getHtml() {
//         return `<div class="goods-item">
//         <div class = "item-img"></div>
//         <div class = "item-title-price">
//         <h3>${this.title}</h3><p>${this.price}</p>
//         </div>
//         <div class ="add-cart"><button class="add-button" onclick = "cart.addGood(${this.id})" type="button">Добавить</button></div>
//         </div>`
//     }
// }
// class GoodsList {
//     constructor() {
//         this.goods = [];
//     }
//     fetchGoods() {
//         const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//         let p = new Promise((resolve, reject) => {
//             makeGETRequest(`${API_URL}goods.json`, (goods) => {
//                 resolve(this.goods = JSON.parse(goods))
//                 p.then(this.render())
//             })
//         })
//     }
//     render() {
//         if (this.goods.length <= 0){
//             document.querySelector('.goods-list').innerHTML = "Нет данных";
//     }
//     else{
//         this.goods.forEach
//             (item => {
//                 const goodsItem = new Good(item.product_name, item.price,item.id_product);
//                 document.querySelector('.goods-list').insertAdjacentHTML('beforeEnd', goodsItem.getHtml());
//             })
// }}
// }

// class Cart{
//     constructor(title, price, id, quanity) { 
//         this.title = title;
//         this.price = price;
//         this.id = id;
//         this.quanity = quanity;
//     }
//     getHtml() {
//         return `<p>${this.title}&nbsp;&nbsp;&nbsp;${this.quanity} &nbsp;&nbsp;&nbsp;
//         <span onclick="cart.addGood(${this.id})">+</span>&nbsp;&nbsp;&nbsp;<span onclick="cart.delGood(${this.id})">-</span>&nbsp;&nbsp;&nbsp;</p><br>`
//     }
// }
// class CartList {
//     constructor() {
//         this.cartGoods = []
//     }
//     addGood(id) {
//         let newCart = list.goods.find(item => item.id_product === id); // !!!!
//         let alreadyCart = this.cartGoods.find(item => item.id_product === id);
//         if (alreadyCart != undefined) {
//             let i = this.cartGoods.findIndex(item => item.id_product === id);
//             this.cartGoods[i].quanity += 1;
//         }
//         else {
//             newCart.quanity = 1;
//             this.cartGoods.push(newCart);
//         }
//         this.cartCreate();
//         this.summary();
//     }
//     cartCreate() {
//             document.querySelector('.cart-list').innerHTML = "";
//             this.cartGoods.forEach(item => {
//                 const cartView = new Cart(item.product_name, item.price, item.id_product, item.quanity) //!!!!
//                 document.querySelector('.cart-list').insertAdjacentHTML('beforeEnd', cartView.getHtml());
//             })
//     }
//     delGood(id) {
//         let i = this.cartGoods.findIndex(item => item.id_product === id);
//         this.cartGoods[i].quanity -= 1;
//         if (this.cartGoods[i].quanity <=0) {
//             this.cartGoods.splice(i,1);
//         }
//         this.cartCreate();
//         this.emptyCart();
//         this.summary();
//      }
//     openCart() {
//         if (document.querySelector(".cart").style.visibility === 'visible') {
//             document.querySelector(".cart").style.visibility = 'hidden';
//         }
//         else {
//             document.querySelector(".cart").style.visibility = 'visible';
//             this.emptyCart();
//         }
//     }
//     summary() {
//         let sum = 0
//         this.cartGoods.forEach
//             (item => {
//                 let x = item.price*item.quanity;
//                 sum += x;
//             })
//         let y = document.querySelectorAll(".cart-value")
//             y.forEach(item => {
//                 item.innerHTML = sum;
//             });

//     }
//     emptyCart(){
//         if (this.cartGoods.length <= 0) {
//             document.querySelector('.cart-list').innerHTML = "В корзине пока нет товаров";
//             } 
//     }
// }
// const list = new GoodsList();
// list.fetchGoods();
// const cart = new CartList();


