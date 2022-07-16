async function validateLogin()
{
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const submitButton = document.getElementById("login-button");
  if((email.value != "") && (password.value != ""))
  {
    submitButton.disabled = false;
  }
  else{
    submitButton.disabled = true;
  }
} 