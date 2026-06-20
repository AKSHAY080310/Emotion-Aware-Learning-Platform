const userId = localStorage.getItem("user_id");
const userName = localStorage.getItem("user_name");


if (!userId) {

    window.location.href = "pages/auth.html";

}


if (userName) {

    document.getElementById("username").textContent =
        userName;

}


const profileBtn =
    document.getElementById("profileBtn");

const profileMenu =
    document.getElementById("profileMenu");

profileBtn.addEventListener("click", () => {

    profileMenu.classList.toggle("show");

});


document.addEventListener("click", (event) => {

    if (
        !profileBtn.contains(event.target) &&
        !profileMenu.contains(event.target)
    ) {

        profileMenu.classList.remove("show");

    }

});


document.getElementById("logoutBtn")
    .addEventListener("click", (e) => {

        e.preventDefault();

        localStorage.clear();

        window.location.href =
            "pages/auth.html";

    });