async function searchbtnHandler(event) {
    event.preventDefault();
    document.location.replace('/api/rcps/onlinercps')
}

document.querySelector('#search-btn').addEventListener('click', searchbtnHandler);