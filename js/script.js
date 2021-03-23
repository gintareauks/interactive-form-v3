// Variable declarations
const otherJob = document.getElementById("other-job-role");
const jobRole = document.getElementById("title");

const color = document.getElementById("color");
const colorOptions = color.children;
const design = document.getElementById("design");

const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
const registerActivities = document.querySelector("#activities legend");
const activityInputs = document.querySelectorAll('[type="checkbox"]')

const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const CVV = document.getElementById("cvv");
const form = document.querySelector("form");
const emailHint = document.getElementById("email-hint")

const paymentOptions = [creditCard, paypal, bitcoin]
let total = 0;


// Name field is focused when page is loaded or refreshed;
nameInput.focus();


// Enables to type in a job only if 'other' option is selected
otherJob.style.display = "none";

jobRole.addEventListener('change', (event) => {
    if (event.target.value == 'other') {
        otherJob.style.display = 'block';
     } else if (event.target.value !== 'other'){
    otherJob.style.display = 'none';
}
})


// T-Shirt color available depends on the chosen design
color.disabled = true;

design.addEventListener('change', (event) => {
    color.disabled = false;
    for (i = 0; i < colorOptions.length; i++){
        const theme = event.target.value;
        const dataTheme = colorOptions[i].getAttribute("data-theme");
        if (theme === dataTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute("selected", true)
        } else if (theme !== dataTheme) {
            colorOptions[i].removeAttribute("selected", true)
            colorOptions[i].hidden = true;
        }
    }
})


// The total cost of activities is calculated when they are selected or unselected. 
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


// Accessibility. Activity option is focused when passing through it with tab. 
for (i = 0; i < activityInputs.length; i++) {
    activityInputs[i].addEventListener('focus', (event) => {
        event.target.parentElement.className = "focus";
    })

    activityInputs[i].addEventListener('blur', (event) => {
        event.target.parentElement.className = "blur";
    })
}


// When user selects activity, he cannot select another activity that will be held on the same day and time
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


// Since only one payment option can be selected, info for non-selected payment options should be hidden
paypal.style.display = "none";
bitcoin.style.display = "none";
creditCard.style.display = "block";
payment.children[1].setAttribute('selected', true);

payment.addEventListener('change', (event) => {
    for (i = 0; i < paymentOptions.length; i++) {
        if (event.target.value === paymentOptions[i].id) {
            paymentOptions[i].style.display = "block"
        } else  {
            paymentOptions[i].style.display = "none"
        }
    }
})


// The user is informed if the form is invalid
function alert(input) {
    event.preventDefault();
    input.style.border = "2px solid red";
    input.parentElement.classList.add("not-valid");
    input.parentElement.classList.remove("valid");
    input.parentElement.lastElementChild.style.display = "block";
}


// The user is informed if the form is valid again
function validNow(input) {
    input.style.border = "initial";
    input.parentElement.classList.add("valid");
    input.parentElement.classList.remove("not-valid");
    input.parentElement.lastElementChild.style.display = "none";
}


// Validating important forms 
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
    const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);

    if (validEmail == false) {
        alert(email)
    } else {
        validNow(email)
    }

    // Conditional messages if error found
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
       alert(registerActivities)
       registerActivities.style.border = "initial";
    } else {
        validNow(registerActivities)
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

    // card validation is only checked if card payment method is selected
    if (payment.value == 'credit-card') {
        cardNumberisValid()
        zipIsValid()
        cvvIsValid()
    }
})


// Real time error message for credit card details
creditCard.addEventListener('keyup', () => {
    cardNumberisValid()
    zipIsValid()
    cvvIsValid()
})

















