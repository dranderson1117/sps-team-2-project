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
        height: 40px
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
        <img class="pic" src="codingGirl.jpeg">
        <p>Name</p>
    </div>
    
`

class NameCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(nameCardTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('p').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src=this.getAttribute('imglink');
        // console.log(this.shadowRoot.querySelector('img').src);
        // console.log(this.getAttribute("imglink"))
    }
}
// window.customElements.define('name-card', NameCard);
customElements.define('name-card', NameCard);

function addNameCard(){
    let nameCard = document.createElement("name-card", { name: "word-count", imglink: "pic1.jpeg" });
    // console.log(nameCard.getAttributeNames);
    // nameCard.setAttribute("name", "name");
    // console.log(nameCard);
    // nameCard.setAttribute("imglink", "/Users/yuewenyang/team-project/class-chat-team2/class-chat-app/src/main/webapp/name-card/pic1.jpeg");
    document.querySelector(".classmates").appendChild(nameCard);

}
