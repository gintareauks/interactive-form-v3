// The "Name" Field
const nameInput = document.getElementById("name");
nameInput.focus();

// "Job Role" Section
const otherJob = document.getElementById("other-job-role");
otherJob.style.display = "none";

const jobRole = document.getElementById("title");

jobRole.addEventListener('change', (event) => {
    if (event.target.value == 'other') {
        otherJob.style.display = 'block';
     } else if (event.target.value !== 'other'){
    otherJob.style.display = 'none';
}
})

// "T-Shirt Info" Section
const color = document.getElementById("color");
color.disabled = true;

const design = document.getElementById("design");
const colorOptions = color.children;

design.addEventListener('change', (event) => {
    color.disabled = false;
    for (i = 0; i < colorOptions.length; i++){
        const theme = event.target.value;
        const dataTheme = colorOptions[i].getAttribute("data-theme");
        if (theme === dataTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute("selected", true)
        } else if (theme !== dataTheme) {
            colorOptions[i].hidden = true;
            colorOptions[i].setAttribute("selected", false)
        }
    }
})

// "Register for Activities" section
const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
let total = 0;

activities.addEventListener('change', (event) => {
    const priceString = event.target.getAttribute("data-cost");
    const price = +priceString;

    if (event.target.checked == true) {
        total += price;
    } else if (event.target.checked == false) {
        total -= price;
    }
   activitiesCost.innerHTML = `Total: $${total}`;
})

// "Payment Info" section
const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

paypal.style.display = "none";
bitcoin.style.display = "none";

payment.children[1].setAttribute('selected', true);

payment.addEventListener('change', (event) => {
    if (event.target.value == 'paypal') {
        paypal.style.display = "block";
        bitcoin.style.display = "none";
        creditCard.style.display = "none";
    } else if (event.target.value == 'bitcoin') {
        paypal.style.display = "none";
        bitcoin.style.display = "block";
        creditCard.style.display = "none"
    } else if (event.target.value == 'credit-card') {
        paypal.style.display = "none";
        bitcoin.style.display = "none";
        creditCard.style.display = "block";
    }
})

// Form Validation
const email = document.getElementById("email");
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const CVV = document.getElementById("cvv");
const form = document.querySelector("form");

console.log(form);

function required(input){
        event.preventDefault();

    if (input.value.length == 0){
        input.style.border = "2px solid red";
        return false;
    } else if(input.value.length !== 0){
        input.style.borderColor = 'initial';
        return true;
    }
    
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const testName = required(nameInput);
    
})