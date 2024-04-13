const screenEL = document.querySelector(".screen");
let counstString = 0;

function returnOne()
{
    upDateScreen("1");
}

function returnTwo()
{
    upDateScreen("2");
}

function returnThree()
{
    upDateScreen("3");
}

function returnFour()
{
    upDateScreen("4");
}

function returnFive()
{
    upDateScreen("5");
}

function returnSix()
{
    upDateScreen("6");
}

function returnSeven()
{
    upDateScreen("7");
}

function returnEight()
{
    upDateScreen("8");
}

function returnNine()
{
    upDateScreen("9");
}



function upDateScreen(x)
{   
    if(1 <= counstString <= 8)
    {
        screenEL.innerHTML += x;
        counstString += 1;
    }
    else
    {   
        screenEL.innerHTML = "";
        screenEL.innerHTML += x;
        counstString += 1;

    }
}

function reset()
{
    screenEL.innerHTML = "0";
    counstString = 0;
}