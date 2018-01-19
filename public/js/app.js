const $searchIcon = $('#searchIcon');
const $submitSearch = $('#submitSearch');

const $modal = $('.modal');

const openModal = () => {
    $modal.css('display', 'block');
};

const closeModal = () => {
    $modal.css('display', 'none');
};

$searchIcon.on('click', openModal);

$submitSearch.on('click', closeModal);