async function signup()
{
  const email = document.getElementById("email");
  sessionStorage.setItem("email", email.value);
  
  const signupForm = document.getElementById("signup-form");
  signupForm.submit();
} 