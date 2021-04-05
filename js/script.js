

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
            this.makePOSTRequest('/statistic', stat, (error) => {
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
        this.makeGETRequest('/stat', (goods) => {

        }
        );


    }

})


export default app