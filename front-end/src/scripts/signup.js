document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault(); 
    handleSignup();
});

function usernameCheck() {
    let username = document.getElementById("fullName").value.trim();
    let message = "";
    switch (true) {
        case (username === ""):
            message = "Please fill in this field";
            break;
        case (username.length < 5 || username.length > 10):
            message = "Name must be at least 5-10 characters";
            break;
        default:
            message = "";
    }
    document.getElementById("validName").innerHTML = message; 
}

function emailCheck() {
    let email = document.getElementById("email").value;
    const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    let message = "";
    switch (true) {
        case (email === ""):
            message = "Please fill in this field";
            break;
        case (!emailPattern.test(email)):
            message = "Invalid Email";
            break;
        default:
            message = "";
    }
    document.getElementById("validEmail").innerHTML = message;
}

function passwordCheck() {
    let password = document.getElementById("password").value;
    let message = "";
    switch (true) {
        case (password === ""):
            message = "Please fill in this field";
            break;
        case (password.length < 5 || password.length > 10):
            message = "Password must be at least 5-10 characters";
            break;
        default:
            message = "";
    }
    document.getElementById("validPassword").innerHTML = message;
}

function confirmPasswordCheck() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let message = "";
    switch (true) {
        case (confirmPassword === ""):
            message = "Please fill in this field";
            break;
        case (confirmPassword !== password):
            message = "Passwords do not match";
            break;
        default:
            message = "";
    }
    document.getElementById("validConfirmPassword").innerHTML = message;
}

function handleSignup() {
    usernameCheck();
    emailCheck();
    passwordCheck();
    confirmPasswordCheck();

    if (!validName && !validEmail && !validPassword && !validConfirmPassword) {
        window.location.href = "src/pages/login.html"; 
    }
}