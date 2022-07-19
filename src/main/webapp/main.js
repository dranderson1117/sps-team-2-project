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

// Load the users as modals in the tags modal when the "Tags" button is clicked
function loadAllUsers(){
  console.log("Loading All Users in Tags Modal");
  let users = sessionStorage.userList;
  for(let i = 0; i < users.length; i++){
    let currUser = users[i];
    console.log("Loading current user email: " + currUser.email + ", password: " + currUser.password);
  } 
}