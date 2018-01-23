const searchIcon = $('#searchIcon')[0];
const $submitSearch = $('#submitSearch');

//setting $modal to the output of something that uses querySelectorAll
// so $modal is An array
const modal = $('.modal')[0];

const openModal = () => {
    $(modal).css('display', 'block');
};

const closeModal = () => {
    $(modal).css('display', 'none');
};


$(searchIcon).on('click', openModal);

$submitSearch.on('click', closeModal);


//parent
console.log(modal)


//form
let form = $('.modalForm').children()
console.log(form.prevUntil("button"))

console.log(form.each)

let inputs = document.querySelectorAll('form')
console.log(inputs)

console.log(typeof modal.childNodes)

$("input").each(function (index) {
    console.log("each input")
})


// anywhere clicked
$('body').on('click', function (event) {

    // thats not the modal or search button
    // if the click is on a modal or anything inside the modal



        if (event.target === modal || form.each === event.target || event.target === searchIcon) {
            // do noting

        } else {
            closeModal();
        }

});




