const nameCardTemplate = document.createElement('template');
nameCardTemplate.innerHTML = 
`   
    <link rel="stylesheet" href="/Users/yuewenyang/Desktop/team-2-project/sps-test-collab-tutorial/src/main/webapp/class-card/name-card.css">
    <div class="name-card">
        <img class="pic" src="pic2.jpeg"/>
        <p>Name</p>
    </div>
`

class NameCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(nameCardTemplate.content.cloneNode(true));
    }
    update(){
        this.shadowRoot.querySelector('p').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src=this.getAttribute('imglink');
    }
}
// window.customElements.define('name-card', NameCard);
customElements.define('name-card', NameCard);

// hard coded class object
// shold fetch the class object each time when one class is added through the "add class" modal
let classObj = {classId:"CSCI-UA 101",className:"Introduction to Computer Science", classList:["Jonny Yu","Amy Stamper","Annie Tian Fan","Yuewen Yang","Grace Yang"]};
var classCardCount = 0;
// assign each class card with a unique class-class-code by the sequence when they're generated
var classCardId = "class-card-" +  classCardCount.toString();
function createClassCard(classObj){
    let newClassCard = document.createElement('div');
    // set the innerHTML of the new class card to the following template
    // let numFix = "class-card-" +  classCardCount.toString();
    console.log(classCardId);
    console.log(classCardCount);
    // <div class="class-card"></div>
    newClassCard.innerHTML = `
    <div class="class-card" id=${classCardId}>
            <p id="class-season">FALL 2022</p>
            <p class="class-content" id="class-id">${classObj.classId}</p>
            <p class="class-content" id="class-name">${classObj.className}</p>
            <hr/>
            <div style="padding: 0;"  class="classmates"></div>
        </div>
    `;
    // need to change body to main-app
    document.querySelector(`.class-cards-wrapper`).appendChild(newClassCard);
    addClassmates(classObj.classList);
}
// append the created classcard to main-app-page
function addClassCard(){
    createClassCard(classObj);
    classCardCount++;
    classCardId = "class-card-" +  classCardCount.toString();
    // console.log("classCardCount: "+classCardCount);
    // console.log("==============");
}


// Now we have our class card

// Following we will add the list of classmates onto the class card

//function to create one name card
    function createNameCard(name, imglink){
        let nameCard = document.createElement("name-card")
        nameCard.setAttribute('name', name);
        nameCard.setAttribute('imglink', imglink);
    
        nameCard.update();
        console.log(classCardId);
        console.log(document.querySelector("#"+classCardId));
        document.querySelector("#"+classCardId).querySelector(".classmates").appendChild(nameCard);
    }
    //hard coded name list
    // const names = ["Jonny Yu","Amy Stamper","Annie Tian Fan","Yuewen Yang","Grace Yang"];
    
    function addClassmates(names){
        for(let i= 0; i < names.length; i++){
            console.log(i);
            const num  = Math.floor(Math.random() * 8);
            createNameCard(names[i], "images/pic"+ num.toString()+".jpeg");
        }
    }


    // let x = 2;
    function u(){
        const y =2;
        let x = 2;
        var i = 2;
        x++;
        // y++;
        console.log(i);
        console.log("y: "+y);
        console.log("x: "+x);
    }
u();
    
    // console.log(x++);
    // console.log(y);
    // console.log(i);