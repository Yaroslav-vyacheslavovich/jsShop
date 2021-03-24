
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
