import './style.css'

let colorInput = document.getElementById("color");
let createBtn = document.getElementById("createBtn");
let list  = document.getElementsByClassName('list')


createBtn?.addEventListener('click' , function creatNOTE(){
    let newNote = document.createElement('div')
    newNote.classList.add('note');
    newNote.innerHTML = `
            <span class="close">x</span>
            <textarea name="text" id="text" cols="30" rows="10" placeholder="Write Content..."></textarea>
    `;
    newNote.style.borderColor = (colorInput as HTMLInputElement)?.value;
    (list[0] as HTMLElement).appendChild(newNote);
} )

document?.addEventListener('click' , (e)=>{
    console.log(e.target);
    (e.target as HTMLElement)?.parentNode
    if ((e.target as HTMLElement)?.classList.contains('close')) {
        const parent = (e.target as HTMLElement)?.parentNode as HTMLElement | null;
        parent?.remove();
    }
})

interface Cursor{
    x : number
    y : number
}

interface Note{
    dom: HTMLElement | EventTarget | null;
    x:number 
    y:number 
}

let mouse: Cursor = {
        x: 0,
        y: 0,
};
let note: Note = {
        dom: null,
        x: 0,
        y: 0,
};
document?.addEventListener('mousedown', (e) => {
    
    
    if((e.target as HTMLElement).classList.contains('note')){
        mouse = {
            x: (e as MouseEvent).clientX,
            y: (e as MouseEvent).clientY,
        };
        note = {
            dom : e.target,
            x : (e.target as HTMLElement).getBoundingClientRect().left,
            y : (e.target as HTMLElement).getBoundingClientRect().top
            
        }
    }
});

document?.addEventListener('mousemove' , (e) =>{
    if(note.dom == null) return;
    let currentCursor : Cursor ={
        x: e.clientX,
        y: e.clientY
    } 
    let distance: Cursor = {
        x: currentCursor.x - mouse.x,
        y: currentCursor.y - mouse.y,
    };
    if (note.dom instanceof HTMLElement) {
        note.dom.style.left = `${note.x + distance.x}px`;
        note.dom.style.top = `${note.y + distance.y}px`;
    }
})
document?.addEventListener('mouseup' , ()=>{
    if (note.dom instanceof HTMLElement) {
        note.dom.style.cursor = "auto";
    }
    note.dom = null
})