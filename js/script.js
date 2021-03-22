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
creditCard.style.display = "block";

payment.children[1].setAttribute('selected', true);

payment.addEventListener('change', (event) => {
    if (event.target.value === 'paypal') {
        paypal.style.display = "block";
        bitcoin.style.display = "none";
        creditCard.style.display = "none";
    } else if (event.target.value === 'bitcoin') {
        paypal.style.display = "none";
        bitcoin.style.display = "block";
        creditCard.style.display = "none"
    } else if (event.target.value === 'credit-card') {
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
const legendActivities = document.querySelector("#activities legend");


function inputEmpty(input){
    return /^\s*$/.test(input);
}

function isValidEmail(input) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(input);
}

function activitySelected(input) {
    return /^[1-9]\d*$/.test(input);
}

function validCardNumber(input) {
    return /^\d{13,16}$/.test(input);
}

function validZip(input) {
    return /^\d{5}$/.test(input);
}

function validCVV(input) {
    return /^\d{3}$/.test(input);
}

form.addEventListener('submit', (event) => {
    const nameValue = nameInput.value;
    if (inputEmpty(nameValue) == true) {
        nameInput.style.border = "2px solid red";
        event.preventDefault();

        nameInput.parentElement.classList.add("not-valid");
        nameInput.parentElement.classList.remove("valid");
        nameInput.parentElement.lastElementChild.style.display = "block";
    } 
    
    if (isValidEmail(email.value) == false) {
        email.style.border = "2px solid red";
        event.preventDefault();

        email.parentElement.classList.add("not-valid");
        email.parentElement.classList.remove("valid");
        email.parentElement.lastElementChild.style.display = "block";
    }

    if (activitySelected(total) == false) {
        legendActivities.style.color = 'red';
        event.preventDefault();

        legendActivities.parentElement.classList.add("not-valid");
        legendActivities.parentElement.classList.remove("valid");
        legendActivities.parentElement.lastElementChild.style.display = "block";
    }

    if (creditCard.style.display == 'block') {
        if (validCardNumber(cardNumber.value) == false) {
            cardNumber.style.border = "2px solid red";
            event.preventDefault();

            cardNumber.parentElement.classList.add("not-valid");
            cardNumber.parentElement.classList.remove("valid");
            cardNumber.parentElement.lastElementChild.style.display = "block";
        }

        if (validZip(zipCode.value) == false) {
            zipCode.style.border = "2px solid red";
            event.preventDefault();

            zipCode.parentElement.classList.add("not-valid");
            zipCode.parentElement.classList.remove("valid");
            zipCode.parentElement.lastElementChild.style.display = "block";
        }

        if (validCVV(CVV.value) == false) {
            CVV.style.border = "2px solid red";
            event.preventDefault();

            CVV.parentElement.classList.add("not-valid");
            CVV.parentElement.classList.remove("valid");
            CVV.parentElement.lastElementChild.style.display = "block";
        }
    }
})

// Accessibility 
const activityInputs = document.querySelectorAll('[type="checkbox"]')

for (i = 0; i < activityInputs.length; i++) {
    activityInputs[i].addEventListener('focus', (event) => {
        event.target.parentElement.className = "focus";
    })

    activityInputs[i].addEventListener('blur', (event) => {
        event.target.parentElement.className = "blur";
    })
}
