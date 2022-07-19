const tagTemplate = document.createElement('template');
tagTemplate.innerHTML = 
`
    <style>
        .tag-btn{
            border: 2px solid rgb(29, 35, 71);
            background-color: white;
            color:rgb(29, 35, 71);
            padding: 14px 28px;
            align-content: center;
            font-size: small;
            cursor: pointer;
            border-radius: 5px;
            width: fit-content;
            height: fit-content;
            padding: 3px 6px;
            margin: 6px;
            overflow: scroll;
        }
        .tag-btn:hover{
            background-color: rgb(29, 35, 71);
            border-radius: 5px;
            width: fit-content;
            height: fit-content;
            padding: 3px 6px;
            margin: 6px;
            color: white;
        }
        .tag-btn-selected{
            background-color: rgb(29, 35, 71);
            border-radius: 5px;
            width: fit-content;
            height: fit-content;
            padding: 3px 6px;
            margin: 6px;
            color: rgb(255, 255, 255);
        }
    </style>
    <div class="tag-btn">
            <span>hello</span>
    </div>
    
`

class Tag extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(tagTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('span').innerText = this.getAttribute('tag-type');

    }

    
    saveTag(tagButton){
        if(!tagButton.classList.contains("tag-btn-selected")){
            tagButton.classList.add("tag-btn-selected");
            console.log(this.getAttribute("tag-type"));
            console.log("selected!")
        }else{
            tagButton.classList.remove("tag-btn-selected");
            console.log(this.getAttribute("tag-type"));
            console.log("removed!")
        }
        
    }

    connectedCallback(){
        const tagButton = this.shadowRoot.querySelector(".tag-btn");
        console.log(tagButton.classList.contains("tag-btn-selected"));
        tagButton.addEventListener('click', ()=> this.saveTag(tagButton));
    }

    

}
window.customElements.define('user-tag', Tag);