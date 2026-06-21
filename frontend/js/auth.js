const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const message = document.getElementById("message");

const API_URL = "http://127.0.0.1:5000";

showSignup.addEventListener("click", () => {

    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");

});

showLogin.addEventListener("click", () => {

    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");

});

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {
        name: document.getElementById("signupName").value,
        email: document.getElementById("signupEmail").value,
        age: document.getElementById("signupAge").value,
        password: document.getElementById("signupPassword").value
    };

    try {

        const response = await fetch(
            `${API_URL}/signup`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if(response.ok){

            message.textContent =
                "Account created successfully";

            signupForm.reset();

        }else{

            message.textContent =
                data.error;

        }

    } catch(error){

        message.textContent =
            "Server error";

    }

});

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    try {

        const response = await fetch(
            `${API_URL}/login`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if(response.ok){

            localStorage.setItem(
                "user_id",
                data.user_id
            );

            localStorage.setItem(
                "user_name",
                data.name
            );

            window.location.href =
                "../index.html";

        }else{

            message.textContent =
                data.error;

        }

    } catch(error){

        message.textContent =
            "Server error";

    }

});