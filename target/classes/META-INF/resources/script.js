async function getUser(){
    const response = await fetch("/get-user");
    const user = await response.json();

    //const dateContainer = document.getElementById('userContainer');
    //dateContainer.innerText = textFromResponse;
    const statsListElement = document.getElementById('userContainer');
    statsListElement.innerHTML = '';
  
    statsListElement.appendChild(
        createListElement('Name: ' + user.name));
    statsListElement.appendChild(
        createListElement('Email: ' + user.email));
    statsListElement.appendChild(
        createListElement('Phone Number: ' + user.phoneNumber));
    statsListElement.appendChild(
        createListElement('Major: ' + user.major));
  }
  function createListElement(text) {
    const liElement = document.createElement('li');
    liElement.innerText = text;
    return liElement;
  }
  
