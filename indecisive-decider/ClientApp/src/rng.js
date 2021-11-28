/*
This is the code in order to split whatever list the user
wants out of the choices they made. It is split by a , between words/items in the text box.
*/
export function createList(wordlist)
{
    const userList = wordlist.split(",");
    for(let i = 0; i < userList.length; i++)
    {
        userList[i].trim();
    }
    return userList;
}

/*
This should choose a random number based on the list length and return a random
item within that list.
*/
export function returnRandomItem(userList)
{
    var rand = Math.floor(Math.random() * (userList.length));
    return userList[rand];
}

//Just getting a random number from a chosen min and max value
export function getRandomNum(min, max)
{
    return Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1) + parseInt(min));
}

//function for the presets
//list should already have the items in an array/list order
//presets assumed in array functionality with objects.
//take in presets
export function getPreset(items)
{
    var counter = items.length;
    var rand = Math.floor(Math.random() * (counter));
    return items[rand].value;
}

/*function getRandomFromList()
{
    var x = Math.floor(Math.random() * (userList.length + 1));
    return userList[x];
}*/