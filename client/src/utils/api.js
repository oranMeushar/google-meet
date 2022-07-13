

export const post = async(endPoint, content, header=null) => {
    let url = `http://localhost:5000/${endPoint}`;
    let headers = {
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
    
    if(header){
        headers.Authorization = `Bearer ${header}`
    }
    try{
        const result = await fetch(url, {
            method: 'POST',
            headers,
            body:JSON.stringify({...content})
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}




export const get = async(endPoint, header=null) => {
    let url = `http://localhost:5000/${endPoint}`;
    let headers = {}
    if(header){
        headers.Authorization = `Bearer ${header}`
    }
    try{
        const result = await fetch(url, {
            method: 'GET',
            headers
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}

export const postWithFile = async(endPoint, content) => {
    let url = `http://localhost:5000/${endPoint}`;
    try{
        const result = await fetch(url, {
            method: 'POST',
            body:content
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}

