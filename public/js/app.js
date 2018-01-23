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

// anywhere clicked
$('body').on('click', function(event) {
    // thats not the modal or search button
    if (event.target === modal || event.target === searchIcon) {
        // do noting

    }else{
        closeModal();
    }
});



