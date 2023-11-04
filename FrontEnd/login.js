document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) =>{
        event.preventDefault();
        debugger;
        const email= document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch( "http://localhost:5678/api/users/login",{
            method : POST,
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
               Authorization: "Bearer" + token
            },
            body : JSON.stringify({email,password}),
        });

     const data  = await response.json();

     console.log(data.token)

 });
}) ;
