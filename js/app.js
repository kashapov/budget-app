
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

  var calculateTotal = function (type) {
    var sum = 0;

    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });

    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
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

    calculateBudget: function () {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }

    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
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
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    persentageLabel: '.budget__expenses--percentage'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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

    displayBudget: function (obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
      
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.persentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.persentageLabel).textContent = '---';
      }

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

  var updateBudget = function () {

    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. return the budget
    var budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    //console.log(budget);
    UICtrl.displayBudget(budget);

  };


  var ctrlAddItem = function () {
    console.log('it works.');

    var input, newItem;

    // TODO:
    // 1. Get the field input data
    input = UICtrl.getInput();
    //console.log(input);

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the BUDGET CONTROLLER
      newItem = budgetController.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UIController.addListItem(newItem, input.type);

      // 4. clear the fields
      UIController.clearFields();

      // 5. calculat and update budget
      updateBudget();
    }




  };

  return {
    init: function () {
      console.log('Application has started.');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };

})(budgetController, UIController);


controller.init();
