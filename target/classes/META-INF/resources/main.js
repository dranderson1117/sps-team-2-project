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

async function updateProf(){

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
async function addClass(){

    const email =   sessionStorage.getItem('email');
    const newClass = $('#selectClasses').val()

    const params = new URLSearchParams();
    params.append('newClass', newClass);
    params.append('email', email);

    fetch('/add-class', {
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
    var selectSchool = document.getElementById("school");
    Array.from(schools).forEach(function(el){
        let option = new Option(el);
        selectSchool.appendChild(option);
    }
    );
}
addSchoolOptions();

/**
 * Loads all users via modals in the "Tags" modal 
 */
function loadAllUsers(){
  console.log("Loading All Users in Tags Modal");

  let tagsModal = document.getElementById("tags-modal-body");
  tagsModal.innerHTML = "";

  /*
  if(tagsModal.childElementCount() > 0){
    return;
  }*/

  let users = JSON.parse(sessionStorage.userList);
  for(let i = 0; i < users.length; i++){
    let currUser = users[i];
    console.log("Loading current user email: " + currUser.email + ", password: " + currUser.password);
    let newModal = document.createElement("div");
    newModal.class = "modal fade";
    newModal.tabIndex = "-1";
    newModal.innerHTML = populateUserModal(currUser);
    tagsModal.appendChild(newModal);
  } 
}

/**
 * Loads the user's friends via modals in the "My Friends" modal 
 */
function loadFriends(){
  console.log("Loading Friends in My Friends Modal");

  let myFriendsModal = document.getElementById("friends-modal-body");
  myFriendsModal.innerHTML = "";

  let users = JSON.parse(sessionStorage.userList);
  for(let i = 0; i < users.length; i++){
    let currUser = users[i];
    console.log("Loading current user email: " + currUser.email + ", password: " + currUser.password);
    let newModal = document.createElement("div");
    newModal.class = "modal fade";
    newModal.tabIndex = "-1";
    newModal.innerHTML = populateUserModal(currUser);
    myFriendsModal.appendChild(newModal);
  } 
}


/**
 * Creates a modal for the passed in user and returns the HTML code for the modal
 * @param user - User object containing the user's name, email, password, major, and minor
 * @returns userModal - String containing HTML code for modal populated with values from user object
 */
function populateUserModal(user)
{
  //Currently adding the button based on a random value --- will need to change so that "Add Friend" button appears based on whether user is in friends list
  let isUserFriend = Math.random(Date.now()) >= 0.5;
  let userModal = `<div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h2 class="modal-title">${user.email}</h2>
                      </div>
                      <div class="modal-body">
                        <p>${user.password}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" name="${user.email}" style="visibility: ${(isUserFriend ? "hidden" : "visible")};" onclick="addFriend(event)">Add Friend</button> 
                      </div> 
                    </div> 
                  </div>`;
  return userModal;
}

/**
 * Event handler for when a "Add Friend" button is clicked
 * @param {event} Event object 
 */
function addFriend(event)
{
  let friendEmail = event.currentTarget.name;

  /* TODO - Add Code to add friend to User Object in Session Storage */

  /* TODO - Add Code to add friend to User Objcet in Datastore  */
  
}


