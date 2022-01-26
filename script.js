
  const $btn = document.querySelectorAll("button.btn-num"),
    $operator = document.getElementsByClassName("operator"),
    $btnClear = document.querySelector(".btn-clear"),
    $btnEqual = document.querySelector(".operator-equal"),
    $btnDelete = document.querySelector(".btn-backspace"),
    $decimal = document.querySelector(".decimal"),
    $currentDisplay = document.querySelector(".currentDisplay"),
    $lastDisplay = document.querySelector(".lastDisplay");

  let firstNum = "";
  let secondNum = "";
  let operator = "";
  let total = "";
  

  document.addEventListener("click", e => {
    if(e.target.matches(".btn-num")){
        if($currentDisplay.textContent === "0") {
          $currentDisplay.textContent = "";
        }
        /* STORE DISPLAY VALUE  */
        if(operator === ""){
          $currentDisplay.textContent += e.target.value;
          firstNum = $currentDisplay.textContent;
        } else {
          $currentDisplay.textContent += e.target.value;
          secondNum = $currentDisplay.textContent;
        }

        console.log(`primer numero: ${firstNum}`);
        console.log(`segundo numero: ${secondNum}`);
    }
    
    if(e.target.matches(".operator")){
      if(e.target.value === "-" && $currentDisplay.textContent === "0") {
        $currentDisplay.textContent = e.target.value;
        return;
      };
      if(operator !== ""){
        total = operate(firstNum, secondNum, operator);
        $lastDisplay.textContent = `${total} ${e.target.value}`
        operator = e.target.value;
        firstNum = total;

      } else {
        operator = e.target.value;
      }

      if($lastDisplay.textContent === ""){
        /* SHOW LAST OPERATION */
        $lastDisplay.textContent = `${firstNum}  ${operator}`;
      }

      if($currentDisplay.textContent !== "") {
        $currentDisplay.textContent = "";
      };
    }
  });
/****** DECIMAL ******/
$decimal.addEventListener("click", e => {
  if($currentDisplay.textContent === "") $currentDisplay.textContent = "0"
  if($currentDisplay.textContent.includes(".")) return;
  $currentDisplay.textContent += ".";
});

  $btnEqual.addEventListener("click", e => {
    if(firstNum !== ""){
      if($currentDisplay.textContent !== ""){
        total = operate(firstNum, secondNum, operator);
        $lastDisplay.textContent = total;

        $currentDisplay.textContent = "";
        console.log(total);
      }
    };
    return;
  });

/****** CLEAR BUTTON ******/
  $btnClear.addEventListener("click", e => {
    firstNum = "";
    secondNum = "";
    operator = "";

    $currentDisplay.textContent = 0;
    $lastDisplay.textContent = "";
  })

  /***** DELETE BTN ******/
  $btnDelete.addEventListener("click", e => {
    let numDelete = String(firstNum).slice(0, -1);
    firstNum = numDelete;

    $currentDisplay.textContent = firstNum;

    if(numDelete.length < 1){
      firstNum = 0;
      $currentDisplay.textContent = firstNum;
    }
  });


/******  OPERATOR FUNCTIONS ******/
function add(firstNum,secondNum){
  return firstNum + secondNum;
}

function substract(firstNum,secondNum){
  return firstNum - secondNum;
}

function multiply(firstNum,secondNum){
  return firstNum * secondNum;
}

function divide(firstNum,secondNum){
  if(secondNum === 0){
    $currentDisplay.textContent = "ERROR"
    return alert("You cannot divide by zero!");
  }
  return firstNum / secondNum;
}

function operate(firstNum, secondNum, operator){
  firstNum = parseFloat(firstNum);
  secondNum = parseFloat(secondNum);

  if(operator === "+") return add(firstNum, secondNum);
  if(operator === "-") return substract(firstNum, secondNum);
  if(operator === "x") return multiply(firstNum, secondNum);
  if(operator === "÷") return divide(firstNum, secondNum);
 
};