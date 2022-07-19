// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const open = document.getElementById('open');
const close = document.getElementById('close');
const modal_container = document.getElementById('modal-container');

document.getElementById('open').addEventListener('click', ()=> {
  modal_container.classList.add('show');
})


document.getElementById('close').addEventListener('click', ()=> {
  modal_container.classList.remove('show');
})


$(document).ready(function(){
  $('.search-select select').selectpicker();
})

/*async function submit()
{
  const email =   sessionStorage.getItem('email');
  //location.href = 'https://summer22-sps-2.uc.r.appspot.com/';
  const loginForm = document.getElementById("signup-form");
  loginForm.submit();
} */

async function submit(){

    const email =   sessionStorage.getItem('email');
    const username = $('#username').val()
    const school = $('#school').val()
    const major = $('#major').val()
    const major2 = $('#major2').val()
    const minor = $('#minor').val()




        const params = new URLSearchParams();
        params.append('username', username);
        params.append('email', email);
        params.append('school', school);
        params.append('major', major);
        params.append('major2', major);
        params.append('minor', minor);
    fetch('/form-handler', {
      method: 'POST',
      body: params
    }).then(response => response.text())
    .then((sentiment) => {
      //resultContainer.innerText = "Sentiment Analysis Score: " +sentiment;
    });

    location.reload();

}

async function addSchoolOptions(){
  //fetch school data here
  let schools = ["UniA", "UniB", "UniC"];
  var selectSchool = document.getElementById("select-school");
  Array.from(schools).forEach(function(el){
      let option = new Option(el);
      selectSchool.appendChild(option);
  }
  );
}
addSchoolOptions();
