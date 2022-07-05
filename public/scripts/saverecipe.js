async function rcpsaveHandler(event) {
    event.preventDefault();

    const rcp_name = document.querySelector('#rcpttl').textContent;
    const rcp_ing = document.querySelector('#rcping').textContent;
    const rcp_ins = document.querySelector('#rcpins').textContent;
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

document.querySelector('#save-rcp-btn').addEventListener('click', rcpsaveHandler);