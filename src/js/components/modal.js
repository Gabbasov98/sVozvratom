let modalTogglers = document.querySelectorAll("[data-modal]")
let modals = document.querySelectorAll(".modal")
let modalDialogs = document.querySelectorAll(".modal__dialog")
let modalClose = document.querySelectorAll(".modal__close")
let body = document.querySelector("body")

if(modalTogglers){
    modalTogglers.forEach(el => {
        let modalId = el.getAttribute("data-modal")
        el.onclick = function() {
            openModal(modalId)
        }
    });
}

if(modals){
    modals.forEach(modal => {
        modal.onclick = function() {
            closeModal()
        }
    });
}

if(modalDialogs){
    modalDialogs.forEach(modalDialog => {
        modalDialog.onclick = function(e) {
            e.stopPropagation()
        }
    });
}

if(modalClose){
    modalClose.forEach(el => {
        el.onclick = function() {
            closeModal()
        }
    });
}

function openModal(modalId) {
    let modal = document.getElementById(`${modalId}`)
    modal.classList.add("modal--active")
    body.classList.add("fixed-body")
}

function closeModal() {
    let modal = document.querySelector(".modal--active")
    modal.classList.remove("modal--active")
    body.classList.remove("fixed-body")
}
