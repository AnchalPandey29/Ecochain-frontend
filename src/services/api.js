
const apiRequest=async(url,method,body=null,header)=>{
    let data=null;
    if(body){
        data=JSON.stringify(body);
    }
    const options={
        method,
        body:data,
        header:header||{
            'Content-Type':'application/json'
        }
    };
    const response=await fetch(url,options);
    if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export default apiRequest;