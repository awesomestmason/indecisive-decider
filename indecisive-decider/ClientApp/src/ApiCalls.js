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

export function addCustomList(name, list){
    return(
        fetch('api/preset', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 
                      'Authorization': "Bearer "+ token},
            body: JSON.stringify({
                name: name,
                items: list.map(string => ({value: string}))
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

export function deleteCustomList(id){
    return(
        fetch(`api/preset/${id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json', 
                      'Authorization': "Bearer "+ token},
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

export function editCustomList(id, name, list){
    return(
        fetch(`api/preset/${id}`, {
            method: 'patch',
            headers: {'Content-Type': 'application/json', 
                      'Authorization': "Bearer "+ token},
            body: JSON.stringify({
                    name: name,
                    items: list.map(string => ({value: string}))
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

export function updateCred(name, email){
    return(
        fetch(`api/Account/settings`, {
            method: 'patch',
            headers: {'Content-Type': 'application/json', 
                      'Authorization': "Bearer "+ token},
            body: JSON.stringify({
                    name: name,
                    email: email,
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

export function updatePasswordCred(oldPassword, newPassword, confirmNewPassword){
    return(
        fetch(`api/Account/password`, {
            method: 'patch',
            headers: {'Content-Type': 'application/json', 
                      'Authorization': "Bearer "+ token},
            body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
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
