const searchIcon = $('#searchIcon')[0];
const $submitSearch = $('#submitSearch');

//setting $modal to the output of something that uses querySelectorAll
// so $modal is An array
const modal = $('.modal')[0];

// switch that signifies modal is displayed
let modalDisplayed = false;





//form

// console.log(form.prevUntil("button"))
//
// console.log(form.each)
//
// let inputs = document.querySelectorAll('form')
//
//
// console.log(typeof modal.childNodes)
//
// $("input").each(function () {
//     console.log("each input")
// })
//
// console.log($.inArray('input', form, 3));


const openModal = () => {
    //alert("openModal");
    $(modal).css('display', 'block');
    modalDisplayed = true;
};

$(searchIcon).on('click', openModal);

const closeModal = () => {
    $(modal).css('display', 'none');
    modalDisplayed = false;
};

$submitSearch.on('click', closeModal);

// anywhere clicked
$('body').on('click', function (event) {
    console.log(event.target);

    console.log(formElements)

    if ($(modal).css('display') === 'block') {
        let formElements = $('.modalForm').children();

        const clickedOnSearch = event.target === searchIcon;
        const clickedOnModal = event.target === modal; //evaluates to boolean and saved in variable
        const clickedOnModalChildren = formElements(event.target);

        if (!clickedOnSearch && !clickedOnModal && !clickedOnModalChildren){
            closeModal();
        }
    }
});





























// if event.currentTarget is a child of modal
// if modalDisplayed use boolean above
// hide it
// if modal is the curre
// console.log(modal.children)
//
// if(modal.children === event.currentTarget.children || event.currentTarget === $submitSearch){
//     $(modal).css('display', 'block');
//     modalDisplayed = true;
// }else{
//     $(modal).css('display', 'none');
//     modalDisplayed = false;
// }
//
// console.log(modal)





// console.log( form.length)
// //console.log($(form).children)
//
// for(let i=0; i < form.length; i++) {
//     if (form[i] !== event.currentTarget) {
//         closeModal()
//     }
//
//     if (event.target === modal || event.target === searchIcon) {
//         /* ||  form[0] === event.target || form[1] === event.target || form[2] === event.target || form[3] === event.target || form[4] === event.target || form[5] === event.target  */
//         // do noting
//
//     } else {
//         closeModal();
//     }
// }