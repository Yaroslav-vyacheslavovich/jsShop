
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
            let regexp = new RegExp("^" + this.title + "+", 'i')
            this.goods.forEach(item => {
                if (regexp.test(item.product_name) == true) {
                    let red = document.querySelector("." + "prod" + item.id_product);
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
            message: 'Нет данных',
            load: 'Loading...'
        };
    },
    props: [
        'nodata',
        'loading'
    ],
    template: `
    <h4 v-if="loading === true">{{load}} </h4>
    <h4 v-else-if="nodata == true">{{message}} </h4>
    `
})

var app = new Vue({
    el: '#app',
    data: {
        isLoading: true,
        noData: false,
        emptyCart: 'В корзине пока нет товаров',
        goods: [],
        cartGoods: [],
        sum: 0,
        API_URL: 'Data',
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
            let stat = { added: newCart.product_name + ' ' + new Date() };
            this.makePOSTRequest('/statistic', stat, (newCart) => {
            });

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

            this.makePOSTRequest('/addGood', this.cartGoods, (error) => {
            });




        },
        delGood(id) {
            let i = this.cartGoods.findIndex(item => item.id_product === id);
            let stat = { deleted: this.cartGoods[i].product_name + ' ' + new Date }
            this.makePOSTRequest('/statistic', stat, () => {
            });
            this.cartGoods[i].quanity -= 1;
            if (this.cartGoods[i].quanity <= 0) {
                this.cartGoods.splice(i, 1);
            }
            this.summary();
            this.makePOSTRequest('/addGood', this.cartGoods, (call) => {
            });

        },
        summary() {
            this.sum = 0
            this.cartGoods.forEach(item => {
                let x = item.price * item.quanity;
                this.sum += x;
            })
        },

        makePOSTRequest(url, data, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            data = JSON.stringify(data);
            xhr.send(data);
        },

        makeGETRequest(url, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status != 200) {
                        document.querySelector('.goods-list').innerHTML = `Ошибка ${xhr.status}: ${xhr.statusText}`;
                    }
                    else {
                        callback(xhr.responseText);
                    }
                }
            }
            xhr.open('GET', url);
            xhr.send();
        }

    },
    mounted() {
        this.makeGETRequest(this.API_URL, (goods) => {
            this.isLoading = false,
                this.goods = JSON.parse(goods)
            let i = 1;
            this.goods.forEach(
                item => item.id_product = i++
            )
            if (this.goods.length == 0) {
                this.noData = true;
            }
        }
        );
        this.makeGETRequest('/cart', (goods) => {
            this.cartGoods = JSON.parse(goods)
            this.summary();
        }
        );


    }

})


