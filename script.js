
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

Vue.component('search', {
    data: function () {
        return {
            title: '',
        };
    },
    props: [
        'goods',
    ],
    template: `
    <div>
    <input type="text" class="search" v-model="title">
    <button class="search-button" type="button" v-on:click="search()">Поиск</button>
    </div>
    `,
    methods: {
        search() {
            let cancel = document.querySelectorAll(".goods-item");
            cancel.forEach(item => { item.style.border = "1px solid black" })
            console.log(this.title);
            let regexp = new RegExp("^" + this.title + "+", 'i')
            this.goods.forEach(item => {
                if (regexp.test(item.product_name) == true) {
                    let red = document.querySelector("." + this.goods.pop.name + item.id_product);
                    red.style.border = "1px solid red";
                }
            })
        }
    }

})
Vue.component('cart', {
    data: function () {
        return {
            emptyCart: 'В корзине пока нет товаров',
        };
    },
    props: [
        'sum',
        'cart_goods',
        'add-good',
        'del-good',
    ],
    template: `
    <div class="cart">
        <h3>Корзина</h3>
        <hr>
        <div class="cart-list">
            <h4 v-if="cart_goods.length == 0">{{emptyCart}} </h4>
            <div v-for="good in cart_goods">
                <p>{{good.product_name}}&nbsp;&nbsp;&nbsp;{{good.quanity}} &nbsp;&nbsp;&nbsp;
                    <span v-on:click="addGood(good.id_product)">+</span>&nbsp;&nbsp;&nbsp;
                    <span v-on:click="delGood(good.id_product)">-</span>&nbsp;&nbsp;&nbsp;
                </p>
            </div>
        </div>
        <hr>
        <h4><span class="cart-value">{{sum}}</span></h4>
    </div>
    `
})

Vue.component('nodata', {
    data: function () {
        return {
            noData: 'Нет данных',
        };
    },
    props: [
        'goods',
    ],
    template: `
    <h4 v-if="goods.length == 0">{{noData}} </h4>
    `
})


var app = new Vue({
    el: '#app',
    data: {
        message: 'Привет, Vue!',
        noData: 'Нет данных',
        emptyCart: 'В корзине пока нет товаров',
        goods: [],
        cartGoods: [],
        sum: 0,


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

    },


})

makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
    app.goods = JSON.parse(goods)
});

