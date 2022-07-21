function renderSelects(){
    const prefix  = '_select';
    const selects = document.getElementsByClassName('js-custom_select');
    // Html set
    for(let i = 0; i < selects.length; i++) {
        let isCustom = selects[i].nextElementSibling;
        if ( !isCustom ) {
            selects[i].classList.add('hide_select');
            let selectClassByName = selects[i].getAttribute('name');
            let takePlaceholder = selects[i].getAttribute('data-placeholder');
            let selectedOption = selects[i].querySelector('option:checked');
            let optionText = ''
            if (selectedOption){
                optionText = selectedOption.innerHTML
            }
            let placeholder = '';
            if(takePlaceholder) placeholder = takePlaceholder;
            selects[i].insertAdjacentHTML('afterend', '\n <div class="select_common ' + selectClassByName + prefix + '">\n <input class="placeholder_select" readonly value=" ' + optionText + '"/>' + '\n <ul class="select_items"></ul>\n </div>');
            let checkTextPlaceholder = selects[i].nextElementSibling.querySelector('.placeholder_select');
            if( !checkTextPlaceholder.textContent ) {
                for ( let o = 0; o < selects[i].children.length; o++ ) {
                    if ( selects[i].children[o].selected ) {
                        checkTextPlaceholder.insertAdjacentHTML('afterbegin', selects[i].children[o].textContent);
                    }
                }
            }
            // Add fixed placholder
            let fixedPlaholder = selects[i].getAttribute('data-fixed-placeholder');
            if( fixedPlaholder ) {
                selects[i].nextElementSibling.querySelector('.placeholder_select').insertAdjacentHTML('afterbegin', '\n <span class="fixed_placeholder">' + fixedPlaholder + '</span>');
            }
            // Add options


            let selectOptions = selects[i].querySelectorAll('option');
            let checkOptionText = selects[i].nextElementSibling.querySelector('.select_items');
            if( !checkOptionText.textContent ) {
                for(let j = 0; j < selectOptions.length; j++) {
                    checkOptionText.insertAdjacentHTML('beforeend', '\n  <li>' + selectOptions[j].textContent + '</li>');
                }
            }
        }
    }

    // Click on document and remove class .active from customSelect
    document.addEventListener('click', function() {
        for(let i = 0; i < selects.length; i++) {
            let getSelectName = selects[i].getAttribute('name');
            let customSelect = document.querySelectorAll('.'+getSelectName+prefix);
            for(let j = 0; j < customSelect.length; j++) {
                customSelect[j].classList.remove('select_active');
            }
        }
    });
    /* Add events */
    function loop(i) {
        if ( !selects[i].nextElementSibling.getAttribute('data-event') ) {
            // Set attribute added
            selects[i].nextElementSibling.setAttribute('data-event', true);
            // Click on placeholder
            selects[i].nextElementSibling.querySelector('.placeholder_select').addEventListener('click', function(e) {
                let takeCurrentEl = e.currentTarget.parentNode;
                for(let o = 0; o < selects.length; o++) {
                    if( takeCurrentEl !== selects[o].nextElementSibling ) {
                        selects[o].nextElementSibling.classList.remove('select_active');
                    }
                }
                e.currentTarget.parentNode.classList.toggle('select_active');
            });
            selects[i].nextElementSibling.addEventListener('click', function(e) { e.stopPropagation(); });
            // Click on options
            let addEventToLi = selects[i].nextElementSibling.querySelector('.select_items');
            let itemsLi = addEventToLi.querySelectorAll('li');
            function loopInner(l) {
                itemsLi[l].addEventListener('click', function(e) {
                    // Change text in placeholder
                    let optionVal = e.currentTarget.textContent;
                    let takePlaceholder = selects[i].getAttribute('data-fixed-placeholder');
                    if( takePlaceholder ) {
                        selects[i].nextElementSibling.querySelector('.placeholder_select').setAttribute("value", optionVal);
                    } else {
                        selects[i].nextElementSibling.querySelector('.placeholder_select').setAttribute("value", optionVal);
                    }
                    selects[i].nextElementSibling.classList.remove('select_active');
                    // Add value in native select
                    let optionsNative = selects[i].querySelectorAll('option');
                    for(let j = 0; j < optionsNative.length; j++) {
                        optionsNative[j].removeAttribute('selected');
                    }
                    optionsNative[l].setAttribute('selected', 'selected');

                    calcPrice()
                });
            }
            for(let l = 0; l < itemsLi.length; l++) {
                loopInner(l);
            }
        }
    }
    for(let i = 0; i < selects.length; i++) {
        loop(i);
    }
}
document.addEventListener('DOMContentLoaded', renderSelects());
