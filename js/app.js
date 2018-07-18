
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
      if (data.allItems[type].length > 0) {
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
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // replace placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert HTML to the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    clearFields: function () {
      var fields, fieldsArray;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      //console.log(fields);
      fieldsArr = Array.prototype.slice.call(fields);
      //console.log(fieldsArr);
      fieldsArr.forEach(function (current, index, array) {
        current.value = '';
      });

      fieldsArr[0].focus();

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
    UIController.addListItem(newItem, input.type);

    // 4. clear the fields
    UIController.clearFields();

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
