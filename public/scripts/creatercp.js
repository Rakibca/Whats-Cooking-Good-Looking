async function createPostHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard/newrcp')
}

document.querySelector('#new-rcp-btn').addEventListener('click', createPostHandler);