(function openSubmitInputLogin () {
  var inputUser, inputPass, inputSubmit;
  
  inputUser     = document.querySelector("#userLogin");
  inputPass     = document.querySelector("#passLogin");
  inputSubmit   = document.querySelector("#submitLogin");  

    inputUser.onblur = function () {
      if(inputUser.value !== ""){
        inputPass.classList.add("activeSubmitBt");
      }else {
        inputPass.classList.remove("activeSubmitBt");
      }
     }
    inputPass.onblur = function () {
      if(inputPass.value !== ""){
        inputSubmit.classList.add("activeSubmitBt");
      }else {
        inputSubmit.classList.remove("activeSubmitBt");
        inputUser.focus();
      }
     }
}());