async function rcpformHandler(event) {
    event.preventDefault();

    const rcp_name = document.querySelector('input[id="rcp-name"]').value;
    const rcp_ing = document.querySelector('textarea[id="rcp-ing"]').value.trim();
    const rcp_ins = document.querySelector('textarea[id="rcp-ins"]').value.trim();

    const response = await fetch(`/api/rcps`, {
        method: 'POST',
        body: JSON.stringify({
            rcp_name,
            rcp_ing,
            rcp_ins
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

document.querySelector('.rcp-form').addEventListener('submit', rcpformHandler);