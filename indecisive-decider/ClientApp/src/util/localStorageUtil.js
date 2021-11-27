const keyName = "user";

export function hasSavedUser(){
  return !!getSavedUser();
}

export function getSavedUser(){
  const saved = localStorage.getItem(keyName);
  const initial = JSON.parse(saved);
  return initial;
}

export function saveUser(user){
  localStorage.setItem(keyName, JSON.stringify(user));
}

export function deleteUser(){
  localStorage.removeItem(keyName)
}