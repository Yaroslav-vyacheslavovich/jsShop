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