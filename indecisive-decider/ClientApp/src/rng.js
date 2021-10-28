export function createList(wordlist)
{
    const userList = wordlist.split(", ");
    var counter = userList.length;
    for(let i = 0; i < userList.length; i++)
    {
        userList[i].trim();
    }
    var rand = Math.floor(Math.random() * (counter + 1));
    return userList[rand];
}

//just a getting random function from a min and max value
export function getRandomNum(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function for the presets
//list should already have the items in an array/list order
//presets assumed in array functionality with objects.
//take in presets
export function getPreset(items)
{
    var counter = items.length;
    var rand = Math.floor(Math.random() * (counter + 1));
    return items[rand].value;
}

/*function getRandomFromList()
{
    var x = Math.floor(Math.random() * (userList.length + 1));
    return userList[x];
}*/