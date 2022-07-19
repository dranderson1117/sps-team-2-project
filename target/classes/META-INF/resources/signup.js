async function submit()
{
  const email = document.getElementById("email");
  sessionStorage.setItem("email", email.value);
  //location.href = 'https://summer22-sps-2.uc.r.appspot.com/';
  const loginForm = document.getElementById("signup-form");
  loginForm.submit();
} 