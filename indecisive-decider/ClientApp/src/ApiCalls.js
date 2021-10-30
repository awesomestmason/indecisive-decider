let token = "";


export function fetchRegister(name, email, password){ 
    return fetch('api/account/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user: {
                username: name,
                email: email,
            },
            password: password,
            confirmpassword: password
        })
    })
    .then(async response => {
        if(response.ok){
            return response;
        }
        let errmsg = await response.text();
        throw new Error(errmsg);
    });
}

export function fetchLogin(email, password){
    return (
        fetch('api/account/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            token = response.jwtToken;
            return response;
        })
    );
}

//TODO
export function addCustomList(name, list){
    return(
        fetch('api/preset', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 
                      'Authorization': "Bearer "+ token},
            body: JSON.stringify({
                name: name,
                preset: list
            })
        })
        .then(async response => {
            if(response.ok){
                return response;
            }
            let errmsg = await response.text();
            throw new Error(errmsg);
        })
    );
}

export function fetchPresets(){
    console.log(token);
    return(
        fetch('api/preset',{
            method: 'get',
            headers: {'Authorization': "Bearer "+ token},
        })
        .then(response => response.json())
    );
        
}

export function fetchPresetsDefaults(){
    
    return(
        fetch('api/preset/defaults')
            .then(response => response.json())

    );
        
}

