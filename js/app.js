
// BUDGET CONTROLLER
var budgetController = (function () {
  var Expense = function (is, description, value) {
    this.id = is;
    this.description = description;
    this.value = value;
  };

  var Income = function (is, description, value) {
    this.id = is;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function (type, desc, val) {
      var newItem, ID;

      // create new ID
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }

      // push it into data structure
      data.allItems[type].push(newItem);

      // retuen new element
      return newItem;
    },
    testting: function () {
      console.log(data);
    }
  };

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
        type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
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

  var setupEventListeners = function () {
    var DOM = UICtrl.getDomStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
      //console.log(event);

      if (event.keyCode === 13 || event.which === 13) {
        //console.log('Enter was pressed.');
        ctrlAddItem();
      }
    });
  };



  var ctrlAddItem = function () {
    console.log('it works.');

    var input, newItem;

    // TODO:
    // 1. Get the field input data
    input = UICtrl.getInput();
    //console.log(input);

    // 2. Add the item to the BUDGET CONTROLLER
    newItem = budgetController.addItem(input.type, input.description, input.value);

    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI

  };

  return {
    init: function () {
      //console.log('Application has started.');
      setupEventListeners();
    }
  };

})(budgetController, UIController);


controller.init();
