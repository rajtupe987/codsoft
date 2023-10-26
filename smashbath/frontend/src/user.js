// testing//
let form = document.querySelector("#signin");

const URL = "http://localhost:3090";

form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    
    const formData = {
        email:form.email.value,
        password:form.password.value
    }
    console.log(formData)
    
    const request = await fetch(`${URL}/user/login`, {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(formData)
    });
    const response = await request.json();
    if(response.ok){

        console.log(response);

        console.log("success");
        const username = response.username;
        console.log(`Username: ${username}`);
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
