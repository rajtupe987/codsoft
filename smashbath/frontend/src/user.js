
// testing//
let form = document.querySelector("#signin");

const URL = "http://localhost:3090";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        email: form.email.value,
        password: form.password.value
    }
    console.log(formData)
    // http://localhost:3090/user/login
    const request = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const response = await request.json();
    if (response.ok) {

        
        const token=response.token;
        const username = response.username;
        const userID=response.user_id

        localStorage.setItem("token",token)
        localStorage.setItem("username", username);
        localStorage.setItem("userID",userID)

        Swal.fire(
            response.msg,
            '',
            'success'
        )
        // const show_line = document.querySelector("#n_user");


        // if (find_username) {
        //     show_line.style.display = "block";

        //     const userSpan=document.querySelector("#username");
        //     userSpan.textContent=localStorage.getItem("username");

        // } else {
        //     show_line.style.display = "none"
        // }

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.msg,
            footer: `<b><u><a href="../register/customer_register.html">Register Here!</a></u></b>`
        });
    }
    form.email.value = "";
    form.password.value = "";
})
