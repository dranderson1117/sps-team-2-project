function addModal(){
  /* Adding modals based on external */
  userName = ["Mikey", "Jon", "Philip"];
  userProfilePic = ["https://storage.googleapis.com/rwasim-sps-summer22.appspot.com/static/Rohaans_New_LinkedIn_Profile_Pic.jpg", "https://storage.googleapis.com/rwasim-sps-summer22.appspot.com/static/Rohaans_New_LinkedIn_Profile_Pic.jpg", "https://storage.googleapis.com/rwasim-sps-summer22.appspot.com/static/Rohaans_New_LinkedIn_Profile_Pic.jpg"];
  userBio = ["Hi, I'm Mikey! I love to ski.", "I'm Jon. I love hiking and camping.", "I'm Philip. I like roadtrips and sailing."];
  let tagMatchingModalContents = document.getElementById("modal-body");
  for(let i = 0; i < 3; i++){
    let newModal = document.createElement("div");
    newModal.class = "modal fade";
    newModal.tabIndex = "-1";
    newModal.innerHTML = `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h2 class="modal-title">${userName[i]}</h2>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <img src=${userProfilePic[i]} class="modal-img">
                              <p>${userBio[i]}</p>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-primary">Send Connection Request </button> 
                            </div> 
                          </div> 
                        </div>`;
    tagMatchingModalContents.appendChild(newModal);
    console.log("Adding modal?");
  }
}

function removeModals(){
  let tagMatchingModalContents = document.getElementById("modal-body");
  tagMatchingModalContents.innerHTML = "";
  console.log("Removed all Modals!");
}