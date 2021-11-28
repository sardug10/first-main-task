export function getData(){

    // When there is local json:server
    // return fetch('http://localhost:4000/data')
    // .then(data => data.json())

    // When there is no local json:server
    return fetch('db.json',
        {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then(function(response){
        console.log(response.json)
        return response.json();
    })
}