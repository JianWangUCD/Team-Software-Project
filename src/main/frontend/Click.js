var user = new Map([["123","123"]])

function login(){
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    if(user.get(username)===password){
        window.location.href="LoginSuccess.html";
    }else{
        alert("invalid username or password");
    }
}

function register(){
    var username = document.getElementById("register-username").value;
    var password = document.getElementById("register-password").value;

    user.set(username,password);
    alert("register success! Please login!");
    document.getElementById("register-username").value="";
    document.getElementById("register-password").value="";
    document.getElementById("register-email").value="";
}