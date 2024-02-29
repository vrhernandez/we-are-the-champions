import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-1c537-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputEl = document.getElementById("input-el")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementsEl = document.getElementById("endorsements-el")

//when pressing publish, add input to database and clear input box
publishBtnEl.addEventListener("click", function() {
    //create variable to store input
    let inputValue = inputEl.value;
    //PUSH variable to DB
    push(endorsementsInDB, inputValue)
    //clear input box
    clearInputEl()
})

//Runs when database is changed
onValue(endorsementsInDB, function(snapshot) {
    //if data exists, clear list and render new data
    if(snapshot.exists()) {
        //turn DB Object into array
        let endorsementsArray = Object.entries(snapshot.val())
        //clear endorsementsEl
        clearEndorsementsEl()
        //add items from array to endorsementsEl
        for(let i=endorsementsArray.length-1; i >= 0; i--) {
            let currentItem = endorsementsArray[i]
            appendItemToEndorsementsEl(currentItem)
        }
    }
    //if db is empty, use filler text
    else {
        endorsementsEl.innerHTML = "It's quiet down here! Add your endorsement above :)"
    }
})

//clears input box
function clearInputEl() {
    inputEl.value = ""
}

//clears endorsementsEl
function clearEndorsementsEl() {
    endorsementsEl.innerHTML = ""
}

//add item to bottom of list
function appendItemToEndorsementsEl(item) {
    //record value
    let itemValue = item[1]
    //create new li element
    let newEl = document.createElement("li")
    //set textContent to value
    newEl.textContent = itemValue
    //append to list
    endorsementsEl.append(newEl)
}