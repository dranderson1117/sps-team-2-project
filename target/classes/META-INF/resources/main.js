// When the user clicks anywhere outside of the modal, close it


const getUsers = async function() {
  const email = this.sessionStorage.getItem("email");
  const params = new URLSearchParams();
  params.append('email', email)

  await fetch('/get-user', {
      method: 'POST',
      body: params
    }).then(response => response.text())
    .then((usersList) => {
      let users = JSON.parse(usersList);
      let email = sessionStorage.getItem("email");
      let newUserList = [];
      for(let i = 0; i < users.length; i++)
      {
        let user = users[i];
        if(user.email == email)
          sessionStorage.setItem("user", JSON.stringify(user));
        else
          newUserList.push(user);
      }
      sessionStorage.setItem("userList", JSON.stringify(newUserList));
    });
}

window.onload = getUsers();



// const open = document.getElementById('open');
// const close = document.getElementById('close');
// const modal_container = document.getElementById('modal-container');

// document.getElementById('open').addEventListener('click', ()=> {
//   modal_container.classList.add('show');
// })


// document.getElementById('close').addEventListener('click', ()=> {
//   modal_container.classList.remove('show');
// })

/*async function submit()
{
  const email =   sessionStorage.getItem('email');
  //location.href = 'https://summer22-sps-2.uc.r.appspot.com/';
  const loginForm = document.getElementById("signup-form");
  loginForm.submit();
} */

async function updateProf(){

    const email =   sessionStorage.getItem('email');
    const userTag = sessionStorage.getItem('tag');
    const username = $('#user-name-input').val()
    const school = $('#select-school').val()
    const major = $('#major').val()
    const major2 = $('#major2').val()
    const minor = $('#minor').val()
    
    const params = new URLSearchParams();
    params.append('tag', userTag)
    params.append('username', username);
    params.append('email', email);
    params.append('school', school);
    params.append('major', major);
    params.append('major2', major2);
    params.append('minor', minor);

    await fetch('/form-handler', {
      method: 'POST',
      body: params
    }).then(response => response.text())
    .then((sentiment) => {
      //resultContainer.innerText = "Sentiment Analysis Score: " +sentiment;
    });

    location.reload();


}
async function addClass(){

    const email =  sessionStorage.getItem('email');
    const newClass = $('#selectClasses').val()

    const params = new URLSearchParams();
    params.append('newClass', newClass);
    params.append('email', email);


    console.log(email);
    console.log(newClass);
    await fetch('/add-class', {
      method: 'POST',
      body: params
    }).then(response => response.text())
    .then((sentiment) => {
      //resultContainer.innerText = "Sentiment Analysis Score: " +sentiment;
    });

    //location.reload();
}

function addSchoolOptions(){
  //fetch school data here
  let schools = ["University of Pennsylvania", "Washington University in St. Louis", "University of Notre Dame","University of California--Los Angeles (UCLA)","Tufts University","University of North Carolina at Chapel Hill","University of Virginia","University of Illinois Urbana-Champaign (UIUC)","University of Pittsburgh"];
  var selectSchool = document.getElementById("select-school");
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
async function addFriend(event)
{
  let friendButton = event.currentTarget;
  let friendEmail = friendButton.name;
  const email =  sessionStorage.getItem('email');

  const params = new URLSearchParams();
  params.append('friendEmail', friendEmail);
  params.append('email', email);

  friendButton.innerText = "Friend";
  friendButton.setAttribute("disabled", "true");
  friendButton.setAttribute("style", "background-color: green;");

  //friendButton.setAttribute("style", "visibility: hidden;");

  let user = JSON.parse(sessionStorage.getItem("user"));
  user.friends.push(friendEmail);
  sessionStorage.setItem("user", JSON.stringify(user));

  console.log(email);
  console.log(friendEmail);
  await fetch('/add-friend', {
    method: 'POST',
    body: params
  }).then(response => response.text())
  .then((sentiment) => {
    //resultContainer.innerText = "Sentiment Analysis Score: " +sentiment;
  });
}


