async function saveeditedrcpHandler(event) {
    event.preventDefault();

    const rcp_name = document.querySelector('input[id="rcp-name"]').value;
    const rcp_ing = document.querySelector('textarea[id="rcp-ing"]').value.trim();
    const rcp_ins = document.querySelector('textarea[id="rcp-ins"]').value.trim();
    const rcp_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/rcps/${rcp_id}`, {
        method: 'PUT',
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
        alert(response.statusText);
    }
}

document.querySelector('.rcp-form').addEventListener('submit', saveeditedrcpHandler);