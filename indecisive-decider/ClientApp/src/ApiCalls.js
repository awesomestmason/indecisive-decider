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
            token = response.token;
            return response;
        })
    );
}

//TODO
export function addCustomList(list){
    fetch('api/', {
        headers: {'Bearer': token}
    })
}

export function fetchPresets(){
    
    return(
        fetch('api/preset')
            .then(response => response.json())
        );
}

