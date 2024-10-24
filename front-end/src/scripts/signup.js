document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault(); 
    handleSignup();
});

async function handleSignup() {
    usernameCheck();
    emailCheck();
    passwordCheck();
    confirmPasswordCheck();

    const username = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const validName = !document.getElementById("validName").innerHTML;
    const validEmail = !document.getElementById("validEmail").innerHTML;
    const validPassword = !document.getElementById("validPassword").innerHTML;
    const validConfirmPassword = !document.getElementById("validConfirmPassword").innerHTML;

    if (validName && validEmail && validPassword && validConfirmPassword) {
        try {
            const response = await fetch('http://192.168.1.3:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username : username, email: email, password: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert(errorData.message || 'Đăng ký không thành công. Vui lòng thử lại.');
                return;
            }

            const data = await response.json();
            alert(data.message); 
            window.location.href = 'http://127.0.0.1:5500/src/pages/login.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    }
}

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
            message = "Password must be at least 6-10 characters";
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