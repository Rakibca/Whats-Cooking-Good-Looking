// async function rcpsearchHandler(event) {
//     event.preventDefault();
//     const keywords = document.querySelector('input[id="search-form"]').value;
//     const response = await fetch(`/api/rcps/search`, {
//         method: 'POST',
//         body: JSON.stringify({
//             keywords
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     if (response.ok) {
//         // document.location.replace('/api/rcps/onlinercps');
//     } else {
//         alert('hello failed');
//     }
// }


async function rcpsearchHandler(event) {
    event.preventDefault();
    const keywords = document.querySelector('input[id="search-form"]').value;
    // keywords = String(keywords);
    // keywords.replaceAll("%20","-");
    document.location.replace('/api/rcps/onlinercps/' + keywords);
}


// ______________________________________________________________________________________

// async function rcpsearchHandler(event) {
//     event.preventDefault();
//     const keywords = document.querySelector('input[id="search-form"]').value;
//     const options = {
//         method: 'GET',
//         url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
//         params: {
//           query: keywords,
//         },
//         headers: {
//           'X-RapidAPI-Key': 'a766c1ba87mshd3cf5bc6f455972p120e21jsne9c4889c2932',
//           'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
//         }
//     };
//     axios.request(options).then(rcpData => {
//         return res.render('login', rcpData);
//     })
    
// }





document.querySelector('#search-btn').addEventListener('click', rcpsearchHandler);