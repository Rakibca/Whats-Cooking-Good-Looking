async function rcpsearchHandler(event) {
    event.preventDefault();
    const keywords = document.querySelector('input[id="search-form"]').value;
    const response = await fetch(`/api/rcps/search`, {
        method: 'POST',
        body: JSON.stringify({
            keywords
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // document.location.replace('/api/rcps/onlinercps');
    } else {
        alert('hello failed');
    }
}

document.querySelector('#search-btn').addEventListener('click', rcpsearchHandler);