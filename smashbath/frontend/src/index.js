
const user_name = localStorage.getItem("username");
const user_id = localStorage.getItem("userID");

if (user_name) {
    document.querySelector("#user_verify").innerText = `welcome to smashBath ${user_name}`;


    document.querySelector("#logout").style.display="block"


} else {
    document.querySelector("#user_verify").innerText = "Please login to move"
}

