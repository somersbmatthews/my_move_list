const searchIcon = $('#searchIcon')[0];
const $submitSearch = $('#submitSearch');

const modal = $('.modal')[0];


const openModal = () => {
    $(modal).css('display', 'block');
};

$(searchIcon).on('click', openModal);

const closeModal = () => {
    $(modal).css('display', 'none');
};

$submitSearch.on('click', closeModal);

// anywhere clicked
$('body').on('click', function (event) {
    let form = $('.modalForm').children();

    if (event.target === modal ||
        form[0] === event.target ||
        form[1] === event.target ||
        form[2] === event.target ||
        form[3] === event.target ||
        form[4] === event.target ||
        form[5] === event.target ||
        event.target === searchIcon) {
        // do noting

    } else {
        closeModal();
    }

});





















