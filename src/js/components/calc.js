let calcFormInputs = document.querySelectorAll('.calc__form input')
let countInput = document.querySelector("#productCount")
let priceInput = document.querySelector("#productPrice")
let rentPeriod = document.querySelector("#rentPeriod")
let priceOutput = document.querySelector("#price")

calcFormInputs.forEach(el => {
    el.onchange = function(){
        calcPrice()
    }
})


countInput.onchange = function () {
    let val = this.value
    if(val < 1){
        this.classList.add("input-error")
    } else{
        this.classList.remove("input-error")
    }
}

calcPrice()

function calcPrice() {
    let count = +countInput.value
    let rentPeriodValue = +rentPeriod.options[rentPeriod.selectedIndex].value;
    let priceInputValue = +priceInput.value * 0.1
    let price = priceInputValue * count * rentPeriodValue
    priceOutput.innerHTML = price.toLocaleString()
}
