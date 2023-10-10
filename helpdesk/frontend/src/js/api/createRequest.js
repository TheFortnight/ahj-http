module.exports = async (options) => {

  if (options.method === 'GET') {
    let url = 'http://localhost:3000';
    if (options.url) url += options.url;
    if (options.body)  {
      url += '?';
      for (const key in options.body) {
        url += (key + '=' + options.body[key] + '&');
      }
    };

    
    try {
      const response = await fetch(url, {
        method: options.method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    const resp = await response.json();
    console.log('RESP: '+ JSON.stringify(resp));
    options.callback(resp);
    } catch(e) {
      console.error('Request error: '+e.message);
    }
    



//return resp;
  }
  
  /*const response = await fetch('http://localhost:3000?method=allTickets', {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
})*/

   
     
}


