async function deletercpHandler(event) {
    event.preventDefault();

    const rcp_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/rcps/${rcp_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#rcp-delete-btn').addEventListener('click', deletercpHandler);