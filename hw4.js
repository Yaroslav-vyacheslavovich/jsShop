const text = document.querySelector(".text");
const regexp = /(?<=[^A-z])'/g;
const text2 = text.innerHTML.replace(regexp, '"');
text.innerHTML = text2;

const validation = () => {
    let name = document.querySelector(".name");
    let regexp1 = /^[A-zА-я]+$/;
    onError(regexp1, name);
    let phone = document.querySelector(".phone");
    let regexp2 = /^\+7\(\d+\)\d+$/;
    onError(regexp2, phone);
    let mail = document.querySelector(".mail");
    let regexp3 = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    onError(regexp3, mail);
    function onError(regexp, name) {
        if (regexp.test(name.value) == false) {
            name.className += " error";
            name.value = "";
            document.querySelector("span." + name.classList[0]).style.visibility = "visible";
        }
        else {
            name.className = name.classList[0];
            document.querySelector("span." + name.classList[0]).style.visibility = "hidden";
        }
    }
    if (regexp1.test(name.value) == true&&regexp2.test(phone.value) == true&&regexp3.test(mail.value) == true) {
    alert("Имя: "+name.value+"\nТелефон: "+phone.value+"\nПочта: "+mail.value);
    }
}

