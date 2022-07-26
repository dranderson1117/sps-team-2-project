// When the user clicks anywhere outside of the modal, close it
//document.querySelector('#side-bar-user-name').textContent = JSON.parse(sessionStorage.user).username;

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
    $('#side-bar-user-name').text(username);

}
async function addClass(){

    const email =  sessionStorage.getItem('email');
    const newClass = $('#selectClasses').val()

    const params = new URLSearchParams();
    params.append('newClass', newClass);
    params.append('email', email);

    let user = JSON.parse(sessionStorage.getItem("user"));
    user.courses.push(newClass);
    sessionStorage.setItem("user", JSON.stringify(user));

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

  let users = JSON.parse(sessionStorage.getItem("userList"));
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

  let users = JSON.parse(sessionStorage.getItem("userList"));
  let user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user.friends);
  /* Add modals for users whose email addresses are in the current user's friends list --> are the current user's friends) */
  for(let i = 0; i < users.length; i++){
    let currUser = users[i];
    console.log("Loading current user email: " + currUser.email + ", password: " + currUser.password);

    console.log(user.friends.includes(currUser.email));
    if(!user.friends.includes(currUser.email))
      continue;

    let newModal = document.createElement("div");
    newModal.class = "modal fade";
    newModal.tabIndex = "-1";
    newModal.innerHTML = populateUserModal(currUser);
    myFriendsModal.appendChild(newModal);
  } 
}


/**
 * Creates a modal for the passed in user and returns the HTML code for the modal
 * @param currUser - User object containing the user's information
 * @returns userModal - String containing HTML code for modal populated with values from currUser object
 */
function populateUserModal(currUser)
{
  //Currently adding the button based on a random value --- will need to change so that "Add Friend" button appears based on whether user is in friends list
  let user = JSON.parse(sessionStorage.getItem("user"));
  //currUser.friends.includes(user)
  //let isUserFriend = Math.random(Date.now()) >= 0.5;
  //${true ? "add-friend-button-stranger" : "add-friend-button-friend"}
  let userIsFriend = user.friends.includes(currUser.email);
  console.log(userIsFriend)
  let userModal = `<div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h2 class="modal-title">${currUser.username}</h2>
                      </div>
                      <div class="modal-body">
                        <p>${currUser.school}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary ${userIsFriend ? "add-friend-button-friend" : "add-friend-button-stranger"}" name="${currUser.email}" ${userIsFriend ? "disabled" : ""} onclick="addFriend(event)">${userIsFriend ? "Friend!" : "Add Friend"}</button> 
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

  friendButton.innerText = "Friend!";
  //friendButton.class = "add-friend-button-friend";
  friendButton.setAttribute("disabled", "true");
  friendButton.setAttribute("class", "btn btn-primary add-friend-button-friend");

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

async function searchTag(){
  const tagSearchResult = [];
  const targetTag = document.querySelector(".tag-option-selected").textContent;
  console.log(targetTag.textContent);
  let users = JSON.parse(sessionStorage.userList);
  users.forEach(user => {
    if(user.tag === targetTag){
      tagSearchResult.push(user);
    }
  });
  console.log(tagSearchResult.length);
  if (tagSearchResult.length===0){
    let emptySearchResult = document.createElement('p');
    emptySearchResult.innerHTML = `Could not find them here...`;
    document.querySelector('.tag-search-result').appendChild(emptySearchResult);
  }
  return tagSearchResult;
}

async function addTagSearchResult(){
  const tagSearchResult = searchTag();
  (await tagSearchResult).forEach(user => {
    // here we should insert usermodal
    let resultUser = document.createElement('p');
    resultUser.innerHTML = `${user.username}`;
    document.querySelector('.tag-search-result').appendChild(resultUser);
  });  
}

async function clearTagSearchResult(){
  document.querySelector('.tag-search-result').textContent='';
  document.querySelectorAll('.tag-option').forEach(tagElement => {tagElement.classList.remove('tag-option-selected')});
}

