
// BUDGET CONTROLLER
var budgetController = (function () {
  // Some code

})();

// UI CONTROLLER
var UIController = (function () {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDomStrings: function () {
      return DOMstrings;
    }
  };

})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  
  var DOM = UICtrl.getDomStrings();


  var ctrlAddItem = function () {
    console.log('it works.');

    // TODO:
    // 1. Get the field input data
    var input = UICtrl.getInput();
    console.log(input);
    // 2. Add the item to the BUDGET CONTROLLER
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI

  }

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function (event) {
    //console.log(event);

    if (event.keyCode === 13 || event.which === 13) {
      //console.log('Enter was pressed.');
      ctrlAddItem();
    }
  });

})(budgetController, UIController);

