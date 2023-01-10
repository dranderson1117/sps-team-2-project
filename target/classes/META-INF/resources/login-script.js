async function validateLogin()
{
    const email = document.getElementById("email");
    sessionStorage.setItem("email", email.value);
  location.href = 'https://sps-team-2-nexum.appspot.com/';
  
  const loginForm = document.getElementById("login-form");
  loginForm.submit();
} 