

class Hamburger {
    constructor(name) {
        this.name = name;
        this.ind = func.ind;
        this.burgerPrice = []
        this.toppingsPrice = []
        this.size = [
            { name: 'small', price: 50, ccal: 20 },
            { name: 'big', price: 100, ccal: 40 },

        ];
        this.toppings = [
            { name: 'cheese', price: 10, ccal: 20 },
            { name: 'salad', price: 20, ccal: 5 },
            { name: 'potatoes', price: 15, ccal: 10 },
            { name: 'saltnpeper', price: 15, ccal: 0 },
            { name: 'mayo', price: 20, ccal: 5 },
        ]
    }

    getHtml() {
        return `<div><p>${this.name}</p>
        <p>Выберите размер</p>
        <form> <input name="size" class = "${func.ind}" type="radio" value='small' onclick="${func.ind}.selectSize()"> маленький
        <input name="size" class = "${func.ind}"type="radio" value="big" onclick="${func.ind}.selectSize()"> большой </form>
        <p>Выберите добавку</p>
        <form> <input name="toppings" class = "${func.ind}"type="checkbox" value='cheese' onclick="${func.ind}.selectToppings()"> сыр
        <input name="toppings" class = "${func.ind}"type="checkbox" value='salad' onclick="${func.ind}.selectToppings()"> салат
        <input name="toppings" class = "${func.ind}"type="checkbox" value='potatoes' onclick="${func.ind}.selectToppings()"> картошка  
        </form>
        <p>Выберите приправу</p>
        <input name="toppings" class = "${func.ind}"type="checkbox" value='saltnpeper' onclick="${func.ind}.selectToppings()"> специи
        <input name="toppings" class = "${func.ind}"type="checkbox" value='mayo' onclick="${func.ind}.selectToppings()"> майонез 
        <p>Стоимость еды: <span class= "${this.name}"></span></p>
    </div>`
    }
    selectSize() {
        let selectSize = document.querySelector("input." + this.ind + "[name = 'size']:checked");
        let ss = this.size.find(item => item.name === selectSize.value);
        this.burgerPrice.splice(0);
        this.burgerPrice.push(ss);
        this.summary();
    }
    selectToppings() {
        this.toppingsPrice.splice(0);
        let selectTopp = document.querySelectorAll("input." + this.ind + "[name = 'toppings']:checked");
        selectTopp.forEach(item => {
            let i = item.value;
            let st = this.toppings.find(item => item.name === i);
            this.toppingsPrice.push(st);
        })
        this.summary();
    }
    summary(){
            let sum = 0
            this.burgerPrice.forEach
                (item => {
                    let x = item.price;
                    sum += x;
                })
            this.toppingsPrice.forEach
                (item => {
                    let x = item.price;
                    sum += x;
                })
            document.querySelector(`.${this.name}`).innerHTML = sum;
        }
}

class Func{ 
    constructor(ind) {
        this.ind = ind;
}
}

let func = new Func('v');
const v = new Hamburger('бикмаг');
document.querySelector('.goods-list').insertAdjacentHTML('beforeEnd', v.getHtml());

func = new Func('f');
const f = new Hamburger('магбик');
document.querySelector('.goods-list').insertAdjacentHTML('beforeEnd', f.getHtml());
