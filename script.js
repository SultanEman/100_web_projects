'use strict';

const createNote = document.getElementById('create_note');

const createNoteContainer = document.querySelector('.create__note__container');
const noteTitle = document.getElementById('title');

const createButton = document.getElementById('create');

const deleteNote = document.getElementById('delete_note');

const showNotes = document.getElementById('show_notes');

const notesWrapper = document.querySelector('.notes__wrapper');


const savedNotes = [];


createNote.addEventListener('click', function () {
    createNoteContainer.style.display = 'grid';
    noteTitle.focus();
});


const addToSaved = function (title, id, date, noteBody, e) {
    const flag = savedNotes.findIndex(el => {
        return el?.id === id;
    });

    if (flag === -1) {
        savedNotes.push({ title, id, date, noteBody });
    } else {
        savedNotes[flag].noteBody = noteBody;
    }

    const existingItems = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    existingItems.push(...savedNotes);
    localStorage.setItem('savedNotes', JSON.stringify(existingItems));

}


const closeNote = function (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
        e.target.parentElement.remove();
    })
}

createButton.addEventListener('click', function () {
    let time = '' + (new Date().getTime());
    let id = time.slice(-5);


    const title = noteTitle.value;
    noteTitle.value = '';
    const date = Intl.DateTimeFormat('en-US', {
        month: "long",
        year: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "numeric"
    }).format(new Date());


    console.log(id);

    createNoteContainer.style.display = 'none';
    const html = `
        <article class="notes__container">
          <div class="note__head">
            <h2>${title}</h2>
            <p class="note__id">${id}</p>
            <p class="note__date">${date}</p>
          </div>
          <div class="note__body">
            <textarea class="note"></textarea>
          </div>
          <button class="save_note">Save</button>
          <button class="close_note">Delete</button>
        </article>`;

    notesWrapper.insertAdjacentHTML('afterbegin', html);
    document.querySelector('.note__body .note').focus();
    document.querySelector('.save_note').addEventListener('click', function (e) {
        const elID = Number(e.target.previousElementSibling.previousElementSibling.children[1].textContent);
        const noteBody = e.target.previousElementSibling.children[0].value;
        addToSaved(title, elID, date, noteBody, e);
    });

    closeNote(document.querySelector('.close_note'));

});



const editSaved = function (id, noteBody) {
    const existingItems = JSON.parse(localStorage.getItem('savedNotes'));

    const element = existingItems.findIndex(el => {
        return el.id = id;
    });

    existingItems[element].noteBody = noteBody;

    localStorage.setItem('savedNotes', JSON.stringify(existingItems));
}

showNotes.addEventListener('click', function () {
    try {
        const storedNotes = JSON.parse(localStorage.getItem('savedNotes'));
        for (const { title, id, date, noteBody } of storedNotes) {
            const html = `
        <article class="notes__container">
          <div class="note__head">
            <h2>${title}</h2>
            <p class="note__id">${id}</p>
            <p class="note__date">${date}</p>
          </div>
          <div class="note__body">
            <textarea class="note"></textarea>
          </div>
          <button class="save_note">Save</button>
          <button class="close_note">Delete</button>
        </article>`;
            notesWrapper.insertAdjacentHTML('afterbegin', html);
            document.querySelector('.note').value = noteBody;
            document.querySelector('.save_note').addEventListener('click', function (e) {
                const elID = Number(e.target.previousElementSibling.previousElementSibling.children[1].textContent);
                const noteBody = e.target.previousElementSibling.children[0].value;
                editSaved(elID, noteBody);
            });

            closeNote(document.querySelector('.close_note'))
        }
    } catch (error) {
        console.log("No data");
    }
});

// Delete Note

const deleteNoteByTitle = document.querySelector('.delete__note__container');
const deleteBtn = document.getElementById('delete');
const deleteInput = document.getElementById('deleteTitle');

deleteNote.addEventListener('click', function () {
    deleteNoteByTitle.style.display = 'grid';
});

deleteBtn.addEventListener('click', function () {
    const noteDelete = (deleteInput.value).toLowerCase();
    const noteIndex = JSON.parse(localStorage.getItem('savedNotes')).findIndex(el => {
        return (el.title).toLowerCase() === noteDelete;
    });

    const existingItems = JSON.parse(localStorage.getItem('savedNotes'));
    existingItems.splice(noteIndex, 1);

    localStorage.setItem('savedNotes', JSON.stringify(existingItems));

    deleteNoteByTitle.style.display = 'none';
})
