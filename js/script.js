// Name field is focused when page is just opened or refreshed;
const nameInput = document.getElementById("name");
nameInput.focus();

// Ability to type your own job only if 'other' is selected
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

// T-Shirt color available depends on the chosen design
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

// Total cost of activities depends on which ones are chosen 
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

// Since only one payment option can be selected, info for non-selected options must then be hidden
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

// Form Validation and Accessibility applied
const email = document.getElementById("email");
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const CVV = document.getElementById("cvv");
const form = document.querySelector("form");
const legendActivities = document.querySelector("#activities legend");

function alert(input) {
    event.preventDefault();
    input.style.border = "2px solid red";
    input.parentElement.classList.add("not-valid");
    input.parentElement.classList.remove("valid");
    input.parentElement.lastElementChild.style.display = "block";
}

function validNow(input) {
    input.style.border = "initial";
    input.parentElement.classList.add("valid");
    input.parentElement.classList.remove("not-valid");
    input.parentElement.lastElementChild.style.display = "none";
}

function inputIsEmpty(){
    const invalidName = /^\s*$/.test(nameInput.value);

    if (invalidName == true) {
        alert(nameInput)
    } else {
        validNow(nameInput)
    }

    return invalidName;
}

function isValidEmail() {
    const emailHint = document.getElementById("email-hint")
    const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);

    if (validEmail == false) {
        alert(email)
    } else {
        validNow(email)
    }

    if (email.value === "") { 
        emailHint.innerHTML = "Email field cannot be blank"
    } else {
        emailHint.innerHTML = "Email address must be formatted correctly";
    }

    return validEmail;
}

function activityIsSelected() {
    const activitySelected = /^[1-9]\d*$/.test(total);

    if (activitySelected == false) {
       alert(legendActivities)
       legendActivities.style.border = "initial";
    } else {
        validNow(legendActivities)
    }

    return activitySelected;
}

function cardNumberisValid() {
    const validCardNumber = /^\d{13,16}$/.test(cardNumber.value);

    if (validCardNumber == false) {
        alert(cardNumber)
    }  else {
        validNow(cardNumber)
        }

    return validCardNumber;
}

function zipIsValid() {
    const validZip = /^\d{5}$/.test(zipCode.value);

    if (validZip == false) {
        alert(zipCode)
    } else {
        validNow(zipCode)
    }

    return validZip;
}

function cvvIsValid() {
    const validCVV =  /^\d{3}$/.test(CVV.value);

    if (validCVV == false) {
        alert(CVV)
    } else {
        validNow(CVV)
    }

    return validCVV;
}

form.addEventListener('submit', (event) => {
    inputIsEmpty()
    isValidEmail()
    activityIsSelected()

    if (payment.value == 'credit-card') {
        cardNumberisValid()
        zipIsValid()
        cvvIsValid()
    }
})

// Activity option is focused when accessing it with tab
const activityInputs = document.querySelectorAll('[type="checkbox"]')

for (i = 0; i < activityInputs.length; i++) {
    activityInputs[i].addEventListener('focus', (event) => {
        event.target.parentElement.className = "focus";
    })

    activityInputs[i].addEventListener('blur', (event) => {
        event.target.parentElement.className = "blur";
    })
}

// EXCEEDS
activities.addEventListener('click', (event) => {    
    const eventAttribute = event.target.getAttribute('data-day-and-time');

    for (i = 0; i < activityInputs.length; i++) {
    const compare = activityInputs[i].getAttribute('data-day-and-time');

    if (eventAttribute == compare && event.target !== activityInputs[i]) {
        activityInputs[i].disabled = true;

        if (event.target.checked == true) {
        activityInputs[i].parentElement.classList.add("disabled");
        activityInputs[i].disabled = true;
        } else {
        activityInputs[i].parentElement.classList.remove("disabled");
        activityInputs[i].disabled = false;
        }
    }
    }   
})


creditCard.addEventListener('keyup', () => {
    cardNumberisValid()
    zipIsValid()
    cvvIsValid()
})










