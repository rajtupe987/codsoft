
let form = document.querySelector("#signup");


const URL = "http://localhost:3090";


form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const payload = {
        username:form.username.value,
        email:form.email.value,
        password:form.password.value
    }
   
    const request = await fetch(`${URL}/user/signup`, {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(payload)
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data){
            Swal.fire(
            data.msg,
            '',
            'success'
        )
        setTimeout(()=>{
            window.location.href = "../HTML/index.html";
        },2500)

        }else{
            
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.msg,
            footer: `<b><u><a href="../HTML/user.html">Login Here!</a></u></b>`
        });
        }
    })
    .catch((err)=>console.log(err.message))
    // form.reg_name.value=""
    // form.reg_email.value=""
    // form.reg_pass.value=""
})