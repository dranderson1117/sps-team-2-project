async function validateLogin()
{
  const email = document.getElementById("email");
  sessionStorage.setItem("email", email.value);
  const password = document.getElementById("password");

  const submitButton = document.getElementById("login-button");
  if((email.value != "") && (password.value != ""))
  {
    submitButton.disabled = false;
  }
  else{
    submitButton.disabled = true;
  }
  location.href = 'https://summer22-sps-2.uc.r.appspot.com/';
} 