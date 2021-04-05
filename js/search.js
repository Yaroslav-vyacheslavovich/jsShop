

const search = Vue.component('search', {
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

export default search