const nameCardTemplate = document.createElement('template');
nameCardTemplate.innerHTML = 

`   
    
    <style>
    .name-card{
        display: flex;
        flex-direction: row;
        border-radius: 5px;
        background-color: #F7F9FE;
        margin: 10px;
        width: 90%;
        height: 40px;
        align-items: center;
        
    }
    .pic{
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 5px;
        margin-right:20px;
        width: 30px;
        height: 30px;
        background-size: 100% 100%;
        overflow: cover;
        border-radius: 50%;
        border: 2px solid rgb(60, 60, 113);
        
    }
    .name-card:hover{
        border: 2px solid rgb(208, 208, 255);
    }
    p{
        color: black;
        margin-top: 5px;
        margin-bottom: 0px;
        margin-left: 0px;
        margin-left: 0px;
    }
    </style>
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

// let classObj = {classId:"CSCI-UA 101",className:"Introduction to Computer Science", classList:["Jonny Yu","Amy Stamper","Annie Tian Fan","Yuewen Yang","Grace Yang"]};
// function add(){
//     console.log(document.querySelector('#class-id').innerHTML);
// }

let classObj = {classId:"CSCI-UA 102",className:"Data Structures", classList:["Jason Hu","Amy Stamper","Annie Tian Fan","Yuewen Yang","Grace Yang"]};


var classCardCount = 0;
// assign each class card with a unique class-class-code by the sequence when they're generated
var classCardId = "class-card-" +  classCardCount.toString();
function createClassCard(courseAdd, userListAdd){
    let newClassCard = document.createElement('div');
    const newClass = $('#selectClasses').val();

    const {courseId, courseName} = parseCourseName(courseAdd);
    // set the innerHTML of the new class card to the following template
    // let numFix = "class-card-" +  classCardCount.toString();
    // <div class="class-card"></div>
    newClassCard.innerHTML = `
    <div class="class-card" id=${classCardId}>
            <span id="class-season">FALL 2022</span>
            <p class="class-content" id="class-id">${courseId}</p>
            <p class="class-content" id="class-name">${courseName}</p>
            <hr/>
            <div style="padding: 0;"  class="classmates"></div>
        </div>
    `;
    // need to change body to main-app
    const users =  JSON.parse(sessionStorage.getItem('userList'));

    let userNames = [];
    for (const user of userListAdd) {
        if (user.courses.includes(newClass)) {
            userNames.push(user.username);
        }
    }

    document.querySelector(`.class-cards-wrapper`).appendChild(newClassCard);
    addClassmates(userNames);
}
// append the created classcard to main-app-page
function addClassCard(){
    const users =  JSON.parse(sessionStorage.getItem('userList'));
    const newClass = $('#selectClasses').val();

    createClassCard(newClass, users);
    classCardCount++;
    classCardId = "class-card-" +  classCardCount.toString();
    // console.log("classCardCount: "+classCardCount);
    // console.log("==============");
}

function parseCourseName(course) {
    const courseId = course.split(' ').slice(0,2).join(' ');
    const courseName = course.split(' ').slice(2).join(' ');
    return {
        courseId: courseId,
        courseName: courseName
    }
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

