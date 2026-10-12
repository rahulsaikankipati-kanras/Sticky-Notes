
let button=document.querySelector("#submit")
let noteCount=0;
button.addEventListener("click",()=>{
    let input=document.getElementById("note-input");
    if(input.value===""){
        return;
    }
    const root=document.querySelector(".notes-container")
    let newElement=document.createElement("div");
    newElement.classList.add('sticky-note');
    if(noteCount%2===0){
        newElement.style.backgroundColor="#d1e1ff";
    }else{
        newElement.style.backgroundColor="#fefffe"
    }
    noteCount++;
    const para=document.createElement('p');
    para.textContent=input.value;
    const deleteButton=document.createElement('button');
    deleteButton.textContent="X";
    deleteButton.classList.add("delete");

    deleteButton.addEventListener("click",()=>{
        newElement.remove();
        noteCount--;
    })
    newElement.appendChild(deleteButton);
    newElement.appendChild(para);
    root.appendChild(newElement);
    input.value="";
})