document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email= document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === 'email' && password === 'password') {
            const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
            
            localStorage.setItem('authToken', authToken);

            window.location.href = 'dashboard.html';
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    });
});
