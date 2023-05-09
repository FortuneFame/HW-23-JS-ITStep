document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const signUpButton = document.getElementById('sign-up');
    const exitButton = document.getElementById('exit');
    const saveButton = document.getElementById('save');
    
    if (signUpButton) {
        signUpButton.addEventListener('click', function() {
            if (validateRegistrationForm()) {
                window.location.href = "user.html";
            }
        });
    }

    if (exitButton) {
        exitButton.addEventListener('click', function() {
            window.location.href = "index.html";
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', function() {
            if (validateUserForm()) {
                alert("Данные успешно сохранены!");
            }
        });
    }
    
});

// ------------------------ Валидация index ------------------------

function validateRegistrationForm() {
    let isValid = true;

    clearAllErrorMessages();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    
// ------------------------ Валидация email ------------------------
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.value.match(emailRegex) || email.value.length < 3) {
        showError(email, "email-error", "Введите корректный адрес электронной почты");
        isValid = false;
    } else {
        hideError(email, "email-error");
    }
    
// ------------------------ Валидация пароля ------------------------
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!password.value.match(passwordRegex)) {
        showError(password, "password-error", "Пароль должен содержать минимум 6 символов, 1 заглавную букву и 1 цифру");
        isValid = false;
    } else {
        hideError(password, "password-error");
    }
    
// ------------------------ Валидация подтверждения пароля ------------------------
    
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "confirm-password-error", "Пароли не совпадают");
        isValid = false;
    } else {
        hideError(confirmPassword, "confirm-password-error");
    }
    
    return isValid;
}

// ------------------------ Валидация user ------------------------

function validateUserForm() {
    let isValid = true;

    clearAllErrorMessages();

    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const birthYear = document.getElementById('birth-year');
    const gender = document.getElementById('gender');
    const phone = document.getElementById('phone');
    const skype = document.getElementById('skype');

// ------------------------ Валидация имени ------------------------
    
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/;
    if (!firstName.value.match(nameRegex) || firstName.value.length > 20) {
        showError(firstName, "first-name-error", "Введите корректное имя (только буквы, максимум 20 символов)");
        isValid = false;
    } else {
        showSuccess(firstName, "first-name-error");
    }

// ------------------------ Валидация фамилии ------------------------
    
    if (!lastName.value.match(nameRegex) || lastName.value.length > 20) {
        showError(lastName, "last-name-error", "Введите корректную фамилию (только буквы, максимум 20 символов)");
        isValid = false;
    } else {
        showSuccess(lastName, "last-name-error");
    }

// ------------------------ Валидация года рождения ------------------------
    
    const currentYear = new Date().getFullYear();
    if (!birthYear.value || birthYear.value < 1900 || birthYear.value > currentYear) {
        showError(birthYear, "birth-year-error", "Введите корректный год рождения (от 1900 до текущего года)");
        isValid = false;
    } else {
        showSuccess(birthYear, "birth-year-error");
    }

// ------------------------ Валидация пола ------------------------
    
    if (!gender.value) {
        showError(gender, "gender-error", "Пожалуйста, выберите пол");
        isValid = false;
    } else {
        showSuccess(gender, "gender-error");
    }

// ------------------------ Валидация номера телефона ------------------------
    
    const phoneRegex = /^[\d\s()+-]+$/;
    const phoneDigits = phone.value.replace(/\D/g, '');
    if (phone.value && (!phone.value.match(phoneRegex) || phoneDigits.length < 10 || phoneDigits.length > 12)) {
        showError(phone, "phone-error", "Введите корректный номер(от 10 до 12 цифр, пробел и () -");
        isValid = false;
    } else {
        hideError(phone, "phone-error");
    }

// ------------------------ Валидация Skype ------------------------
    
    const skypeRegex = /^[a-zA-Z0-9._-]+$/;
    if (skype.value && !skype.value.match(skypeRegex)) {
        showError(skype, "skype-error", "Введите корректное имя Skype(только буквы, цифры и (.-_)");
        isValid = false;
    } else {
        hideError(skype, "skype-error");
    }

    return isValid;
}

// ------------------------ Очистка сообщений ------------------------

function clearAllErrorMessages() {
    const errorElements = document.getElementsByClassName("error");

    for (let errorElement of errorElements) {
        errorElement.innerHTML = "";
    }

    const inputElements = document.querySelectorAll("input, select");

    for (let inputElement of inputElements) {
        inputElement.classList.remove("error-border");
    }
}

// ------------------------ Обводка ------------------------

function updateBorder(element, isValid) {
    if (isValid) {
        element.classList.add('success-border');
        element.classList.remove('error-border');
    } else {
        element.classList.remove('success-border');
        element.classList.add('error-border');
    }
}

function showError(element, errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.innerHTML = message;
    updateBorder(element, false);
    errorElement.classList.remove('hidden');
}

function showSuccess(element, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.innerHTML = "";
    updateBorder(element, true);
    errorElement.classList.add('hidden');
}

function hideError(element, errorId) {
    const errorElement = document.getElementById(errorId);
    updateBorder(element, true);
    errorElement.classList.add('hidden');
}