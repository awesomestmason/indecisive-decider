import { saveUser } from './util/localStorageUtil'

// This file contains all functions used to make request to the backend server 

// Keep track of user token, used to authenticate users
let token = "";

export function setToken(jwtToken){
    token = jwtToken;
}

// Register a new account
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

// Login request from a user
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
            saveUser(response);
            return response;
        })
    );
}

// Fetch Presets for logged in user
export function fetchPresets(){
    //console.log(token);
    return(
        fetch('api/preset',{
            method: 'get',
            headers: {'Authorization': "Bearer "+ token},
        })
        .then(response => response.json())
    );
        
}

// get preset defaults for guests
// to be used if guest funtionality is implemented
export function fetchPresetsDefaults(){
    
    return(
        fetch('api/preset/defaults')
            .then(response => response.json())

    );
        
}

//Add customized lists request for logged in accounts
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

//Delete customized lists for logged in users
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

//Edit customized list for logged in users
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

//Update credentials for logged in users
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

//Update password for logged in users
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

/*
* This section contains all API Calls related to the friends list
*/

// Gets all Friend Requests
export function fetchFriendRequests(){
    return(
        fetch('api/Friends/requests',{
            method: 'get',
            headers: {'Authorization': "Bearer "+ token},
        })
        .then(response => response.json())
    );       
}

// Searches for a friend by username/email
export function fetchFriendSearch(query){
    return(
        fetch(`api/Friends/search/${query}`,{
            method: 'get',
            headers: {'Authorization': "Bearer "+ token},
        })
        .then(response => response.json())
    );       
}

// Make a friend request to another user
export function fetchSendFriendRequest(userId){
    return(
        fetch(`api/Friends/request/${userId}`,{
            method: 'get',
            headers: {'Authorization': "Bearer "+ token},
        })
        //.then(response => response.json())
        .then(async response => {
             if(response.ok){
                 return response;
             }
             let errmsg = await response.text();
             alert(errmsg)})
        //     throw new Error(errmsg);
        // })
    );       
}

//Decline a friend request from another user
export function fetchDeclineFriend(friendshipId){
    return(
        fetch(`api/Friends/request/${friendshipId}/decline`,{
            method: 'get',
            headers: {'Authorization': "Bearer "+ token},
        })
        //.then(response => response.json())
    );       
}

// Accept the friend request from another user
export function fetchAcceptFriend(friendshipId){
    return(
        fetch(`api/Friends/request/${friendshipId}/accept`,{
            method: 'get',
            headers: {'Authorization': "Bearer "+ token},
        })
        //.then(response => response.json())
    );       
}

//Get all friends of the user
export function fetchFriends(){
    return(
        fetch(`api/Friends`,{
            method: 'get',
            headers: {'Authorization': "Bearer "+ token},
        })
        .then(response => response.json())
    );       
}

//Delete a friend that is connected to user
export function fetchDeleteFriend(friendshipId){
    return(
        fetch(`api/Friends/${friendshipId}`,{
            method: 'delete',
            headers: {'Authorization': "Bearer "+ token},
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

/*
* This section contains all API Calls related to the Notification Feed
*/

// Share a result to notification feed
export function fetchShareToFeed(result, presetId){
    console.log(`posting feed: ${result} id: ${presetId}`)
    return(
        fetch('api/Feed', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 
                      'Authorization': "Bearer "+ token},
            body: JSON.stringify({
                result: result,
                presetId: presetId
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

// Fetch feed results from friends
export function fetchFeed(){
    return(
        fetch(`api/Feed`,{
            method: 'get',
            headers: {'Authorization': "Bearer "+ token},
        })
        .then(response => response.json())
    );       
}

//Fetches all the posted comments on a feed item
export function fetchPostComment(feedItemId, comment){
    return(
        fetch(`api/Feed/${feedItemId}`,{
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': "Bearer "+ token},
            body: JSON.stringify({
                comment: comment
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

//Deletes a comment from the feed item
export function fetchDeleteComment(commentId){
    return(
        fetch(`api/Feed/${commentId}`,{
            method: 'delete',
            headers: {'Authorization': "Bearer " + token},
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

export function fetchImageUpload (formData) {
    return(
        fetch(`api/ProfilePicture/upload`,{
            method: 'post',
            headers: {'Authorization': "Bearer " + token},
            body: formData,
        })
        .then(async data => {
            if(data.ok){
                return data;
            }
            let errmsg = await data.text();
            throw new Error(errmsg);
        }) 
    );
}

export function resetToken(){
    token = "";
}
