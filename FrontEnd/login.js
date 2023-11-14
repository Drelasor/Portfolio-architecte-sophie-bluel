document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) =>{
        event.preventDefault();
        const email= document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch( "http://localhost:5678/api/users/login",{
                method : 'POST',
                headers: {
                   "Content-Type": "application/json",
                   Accept: "application/json",
                },
                body : JSON.stringify({email,password}),
            });

            if(!response.ok){
                alert("Vos identifiants sont incorrects");
                return
            }
    
         const data  = await response.json();

         localStorage.setItem("token",data.token);
            
         window.location.href = "./index.html";
        
        }catch (error){
            alert("erreur lors du login");
        }

 });
}) ;
 

