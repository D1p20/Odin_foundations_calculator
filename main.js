//Globa Variables or Module level variables ?? i don't know which one is correct ??
const calculator = document.querySelector(".screen");
const keys = document.querySelectorAll("button");
const display = document.querySelector("[data-screen]");
const smolDisplay = document.querySelector("[data-smol]");
const smolDisplayLeft = document.querySelector("[data-smol-left]");
let previousKeyType = "operator";
let firstValue;
let secondValue;
let operator;
let isNegative = false;

//handle actions of keys ; I got the idea from a medium article
keys.forEach(key => {
  key.addEventListener("click", e => {
    const action = e.target.dataset.action;
    const key = e.target;
    const keyContent = key.textContent
    const displayedNum = display.textContent

    if (!action) 
    {
        if (displayedNum === "0"|| previousKeyType === "operator") 
        {
            display.textContent =keyContent;
            smolDisplay.textContent = "";
            smolDisplayLeft.textContent ="";
            previousKeyType = "non-operator";
        } else 
        {
            if((!displayedNum.includes(".") && displayedNum.length < 8) ||(displayedNum.includes(".") && displayedNum.length < 9)) 
            {
                display.textContent = displayedNum + keyContent;
                previousKeyType = "non-operator";
                console.log(displayedNum.length);
            }
        }
    } 
    else if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") 
    {
        operator = action;
        if(isNegative === true)
        {
            firstValue = displayedNum*-1;
            isNegative = false;
        }
        else
        {
            firstValue = displayedNum;
        }
        
        
        if (action === "add") 
        {
            previousKeyType = "operator";
            smolDisplay.textContent ="+";
        } 
        else if (action === "subtract") 
        {
            previousKeyType = "operator";
            smolDisplay.textContent ="-";
        } 
        else if(action ==="multiply") 
        {
            previousKeyType = "operator";
            smolDisplay.textContent ="*";
        } 
        else if(action ==="divide") 
        {
            previousKeyType = "operator";
            smolDisplay.textContent ="÷";
        }
    } 
    else if (action === "decimal") 
    {
        if (!displayedNum.includes(".")) 
        {
            display.textContent = displayedNum + ".";
            previousKeyType = "non-operator";
        }
    } 
    else if (action === "clear") 
    {
        window.location.href = window.location.href.split("#")[0];
    } 
    else if (action === "dlt") 
    {
        const displayedNum = display.textContent;
        const newDisplayContent = displayedNum.slice(0, -1);
        display.textContent = newDisplayContent;
        if (newDisplayContent === "") 
        {
            display.textContent = "0";
        }
    } 
    else if(action === "negative") 
    {
       if(isNegative === false) 
       {
        smolDisplayLeft.textContent ="-";
        isNegative = true;
       } 
       else 
       {
        smolDisplayLeft.textContent ="";
        isNegative = false;
       }
    } 
    else if (action === "calculate") 
    {
        smolDisplayLeft.textContent ="";
        if (isNegative === true)
        {
            secondValue = Number(displayedNum)*-1;
            isNegative = false;
        }
        else
        {
            secondValue = Number(displayedNum);
        }
        firstValue = Number(firstValue);
        previousKeyType = "non-operator";
        display.textContent = calculate(firstValue, operator, secondValue)
    }
  });
});

// calculate the result based on the operator
const calculate = (n1, operator, n2) => {
    let result = "";
    if (isNaN(n1) || typeof n1 === "undefined") 
    {
        smolDisplay.textContent ="=";
        result = n2;
    } 
    else if (operator === "add") 
    {
      result = n1 + n2;
      firstValue =0;
    } 
    else if (operator === "subtract") 
    {
      result = n1 - n2;
      firstValue =0;
    } 
    else if (operator === "multiply") 
    {
      result = n1 * n2;
    } 
    else if (operator === "divide") 
    {
        if(n2 === 0) 
        {
         result = "yamete!"//kudasi
        } 
        else 
        {
            result = n1 / n2;
        }
    }

    //this should be done i  a better way , may be a funciton call , but i am too lazy to fix it.
    smolDisplay.textContent ="=";
    previousKeyType = "operator";
    firstValue = undefined;
    operator = undefined;
    secondValue = undefined;

    let resultStr = result.toString();

    if (result >99999999) 
    {
        return "MEMERR";
    } 
    else if(resultStr.includes(".")) 
    {
        let a = countDigits(result);
        if (a<=7)
        {
            return result.toFixed(2);
        }
        else if (a>=8)
        {
            return result.toFixed(0);
        }
        else
        {
            return  Math.round(result);
        }
        

    }
    else
    {
        return result;
    }
    
}

//count the digits after the decimal point; this is stupid
function countDigits(num) 
{
    let str = num.toString();
    let dotIndex = str.indexOf(".");
    let digitsBeforeDecimal;
    let digitsAfterDecimal;
    if (dotIndex == -1) 
    {
      dotIndex = -1;
    }
   
    if (dotIndex == -1) 
    {
      digitsBeforeDecimal = str.length;
    } 
    else 
    {
      digitsBeforeDecimal = dotIndex;
    }
    
    if (dotIndex == -1) 
    {
      digitsAfterDecimal = 0;
    } 
    else 
    {
      digitsAfterDecimal = str.length - dotIndex - 1;
    }
    // return  digitsAfterDecimal
    return digitsBeforeDecimal
}
