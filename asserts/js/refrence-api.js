//url
//https://jsonplaceholder.typicode.com/posts  //Get

//http methods
// 1. Get
// 2. Post
// 3. PATCH
// 4. Delete
// 5. Put


// Http Response
// 304
// 200
// 201
// 202
// 404
// 401 
// 500 
// 503


//fetch
//axois
//Ajax


let url = 'https://jsonplaceholder.typicode.com/posts';

let postdata = [];

fetch(url, {
    method: 'GET',
}).then(res => {
    return res.json()
}).then(res => {

    // res.filter((val, index) => {
    //     if (index < 5) {
    //         postdata.push(val);
    //     } 
    // })

    for (let i = 0; i < 5; i++) {
        postdata.push(res[i])
    }

    console.log(postdata)
}).catch(err => {
    console.log(err)
})