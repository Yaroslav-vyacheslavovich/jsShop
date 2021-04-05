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