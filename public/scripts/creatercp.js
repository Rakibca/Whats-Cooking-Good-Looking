async function createPostHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard/newpost')
}

document.querySelector('#new-rcp-btn').addEventListener('click', createPostHandler);