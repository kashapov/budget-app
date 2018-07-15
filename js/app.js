
// BUDGET CONTROLLER
var budgetController = (function () {
  // Some code

})();

// UI CONTROLLER
var UIController = (function () {
  // Some code

})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  // Some code
  document.querySelector('.add__btn').addEventListener('click', function(){
    //console.log('Button was clicked.');

    // TODO:
    // 1. Get the field input data
    // 2. Add the item to the BUDGET CONTROLLER
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI


  });

  document.addEventListener('keypress', function(event){
    //console.log(event);

    
  });

})(budgetController, UIController);

