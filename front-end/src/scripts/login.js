document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault(); 
    handleLogin();
});

async function handleLogin() {
    emailCheck();
    passwordCheck();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const validEmail = !document.getElementById("validEmail").innerHTML;
    const validPassword = !document.getElementById("validPassword").innerHTML;

    if (validEmail && validPassword) {
        try {
            const response = await fetch('http://192.168.1.3:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Validation Errors:', errorData.errors);
                alert(errorData.message || 'Login failed. Please try again.');
                return;
            }

            const data = await response.json();
            alert(data.message); 
            window.location.href = 'http://127.0.0.1:5500/src/pages/home.html'; 
            
        } 
        catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }
}

function emailCheck() {
    let email = document.getElementById("email").value;
    const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    let message = "";
    if (email === "") {
        message = "Please fill in this field";
    } else if (!emailPattern.test(email)) {
        message = "Invalid Email";
    }
    document.getElementById("validEmail").innerHTML = message;
}

function passwordCheck() {
    let password = document.getElementById("password").value;
    let message = "";
    if (password === "") {
        message = "Please fill in this field";
    } else if (password.length < 5 || password.length > 10) {
        message = "Password must be at least 5-10 characters";
    }
    document.getElementById("validPassword").innerHTML = message;
}