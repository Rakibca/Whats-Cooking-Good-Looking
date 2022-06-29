async function postformHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[id="post-t"]').value;
    const post_content = document.querySelector('textarea[id="post-c"]').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('hello failed');
    }
}

document.querySelector('.postform-form').addEventListener('submit', postformHandler);