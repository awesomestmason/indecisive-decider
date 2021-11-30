
function testingCreate()
{
  var newstring = "this, should, be a, test";
  const newList = createList(newstring);
  returnRandomItem(newList);
}

function TestingRNG()
{
  var x = getRandomNum(0, 2);
  var y = getRandomNum(3, 4);
  console.log("x is " + x + " y is " + y);
}

