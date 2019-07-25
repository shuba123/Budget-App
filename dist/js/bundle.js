/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//BUDGET CONTROLLER\n\nvar budgetController = (function () {\n\n    var Expense = function(id,description,value)\n    {\n        this.id = id;\n        this.description =description;\n        this.value = value;\n        this.percentage = -1;\n    };\n\n    Expense.prototype.calcPercentage = function(totalIncome)\n    {\n        if(totalIncome>0)\n        {\n        this.percentage = Math.round((this.value/totalIncome)  *100) ;\n        }\n        else{\n            this.percentage = -1;\n        }\n    };\n    Expense.prototype.getPercentage = function ()\n    {\n        return this.percentage;\n    };\n\n    var Income = function(id,description,value)\n    {\n        this.id = id;\n        this.description =description;\n        this.value = value;\n    };\n   \n    var data = {\n        allitems : { // Object inside an object\n            exp:[],\n            inc:[]\n        },\n\n        totals:{\n            exp :0,\n            inc :0\n        },\n        budget : 0,\n        percentage : -1\n\n    };\n\n    var calculateTotal =function(type)\n    {\n        var sum =0;\n\n        data.allitems[type].forEach(function(curr)\n        {\n            sum = sum+curr.value;\n\n        });\n        data.totals[type] = sum;\n\n    };\n\n    return {\n        addItem : function (type,des,val)\n    {\n        var newItem,ID;\n        //Create new ID\n        if(data.allitems[type].length > 0)\n        ID = data.allitems[type][data.allitems[type].length -1].id +1 ;\n        else\n        ID= 0;\n        //Create a new item based on type 'inc' or 'exp'\n        if(type === 'exp')\n            {\n            newItem =  new Expense(ID,des,val);\n        }\n        else if(type === 'inc'){\n            newItem =  new Income(ID,des,val);\n\n        }   \n\n        /// Push it into our data structure\n        data.allitems[type].push(newItem);\n         // To access an array element ie. inc [] or exp [] of an object allitems which is inside an object data we use (.) operator\n         //Return  new element    \n         return newItem;\n    },\n    deleteItem: function(type,id)\n    {\n        //If we want to delete an item of od '6' then index of 3 must be selected\n        //id = 6\n        //data.allItems[type][id];\n        //ids= [1 2 4 6 8]\n        //index = 3 \n        //Create an ID array with all ID elements\n            var ids = data.allitems[type].map(function(current)\n            {\n//map() returns a brand new array unlike forEach() method which will loop over an array\n           return current.id;\n\n            });\n            index=ids.indexOf(id);\n            if(index !== -1)\n            {\n                data.allitems[type].splice(index,1); \n            }\n    },\n    calculateBudget : function()\n    {\n        //1. Calculate total income and expenses\n\n        calculateTotal('exp');\n        calculateTotal('inc');\n\n        //2.Calculate budget = income - expenses\n        data.budget = data.totals.inc - data.totals.exp;\n\n        //3. Calculate percentage = income/expenses *100\n        if(data.totals.inc > 0)\n        {\n            data.percentage = Math.round((data.totals.exp/data.totals.inc) *100 );\n\n        }\n        else{\n            data.percentage = -1;\n        }\n        \n    },\n\n    calculatepercentages: function()\n    {\n        /*Total income = 100\n        Expense :\n        a=10, b=20,c=30\n        then 10%, 20%,30 %\n        */\n\n        data.allitems.exp.forEach(function(cur)\n        {\n            cur.calcPercentage(data.totals.inc);\n\n        });\n\n    },\n    getPercentage : function()\n    {\n        var allPerc= data.allitems.exp.map(function(cur)\n        {\n            return cur.getPercentage();\n\n        });\n        return allPerc;\n\n    },\n\n    getBudget:function()\n    {\n        return{\n            budget: data.budget,\n            totalInc: data.totals.inc,\n            totalExp: data.totals.exp,\n            totalPercent: data.percentage\n        }\n    },\n\n  testing : function()\n {\n     console.log(data);\n }\n\n};\n }) ();\n    //IIFE for Budget Controller\n\n// UI CONTROLLER\n\nvar UIController= ( function() {\n    var DOMstrings = { //To give names to all class names of CSS\n        inputType: '.add__type',\n        inputDescription: '.add__description',\n        inputValue : '.add__value',\n        inputbtn : '.add__btn',\n        incomeContainer: '.income__list',\n        expensesContainer: '.expenses__list',\n        budgetLabel: '.budget__value',\n        incomeLabel: '.budget__income--value',\n        expensesLabel: '.budget__expenses--value',\n        percentexpLabel: '.budget__expenses--percentage',\n        container: '.container',\n        expensesPercLabel:'.item__percentage',\n        dateLabel: '.budget__title--month'\n        };\n\n var formatNumber = function(num,type)\n{\n    /* comma separating the thousands and + or - before number exactly 2 decimal points\n    2310.4567 - > +2,310.46\n    */\n   num = Math.abs(num);\n   num = num.toFixed(2);//for  2 decimal places with the help of num method\n   numSplit = num.split('.');\n   int =  numSplit[0];\n    if(int.length >3)\n    {\n        int = int.substr(0,int.length -3)+','+int.substr(int.length-3,3);// position,no.of characters // input 2310 -> output 2,310    \n        //substring() allows to take only a part of the string\n    }\n   dec = numSplit[1];\n   return (type=== 'exp' ? '-': '+') +' '+ int +'.'+ dec;\n\n};\n\nvar  nodeListForEach = function(list,callback){\n    for(var i=0;i<list.length;i++)\n    {\n        callback(list[i],i);\n    }\n\n};  \n\n    return {\n        getDOMstrings : function() // Ww can't access DOMstrings outside scope so again return a single object with two functions getInput() and getDOMstrings()\n        {\n            return DOMstrings;\n        },\n        getInput : function() // this method has to be public in order for other controllers to access this method \n        {\n            return {\n\n            type : document.querySelector(DOMstrings.inputType).value,// 'inc' or 'exp'\n            description : document.querySelector(DOMstrings.inputDescription).value,\n            value : parseFloat(document.querySelector(DOMstrings.inputValue).value)\n            }\n\n        },\n        clearFields  : function ()\n        {\n            var fields,fieldsArr;\n            fields = document.querySelectorAll(DOMstrings.inputDescription+','+DOMstrings.inputValue);\n           //querySelectorAll returns a list not an array\n           fieldsArr=  Array.prototype.slice.call(fields);\n            fieldsArr.forEach(function(current, index, array) //only three arguments for this callback function\n            {\n                current.value = \"\";\n\n            });\n            fieldsArr[0].focus();\n        },\ndisplayBudget : function(obj)\n{\n    var type;\n    type= obj.budget > 0 ? 'inc' : 'exp';\ndocument.querySelector(DOMstrings.budgetLabel).textContent= formatNumber(obj.budget,type);\ndocument.querySelector(DOMstrings.incomeLabel).textContent= formatNumber(obj.totalInc,'inc');\ndocument.querySelector(DOMstrings.expensesLabel).textContent= formatNumber(obj.totalExp,'exp');\ndocument.querySelector(DOMstrings.percentexpLabel).textContent= obj.totalPercent;\n\nif(obj.totalPercent>0)\n{\n    document.querySelector(DOMstrings.percentexpLabel).textContent= obj.totalPercent + '%';\n}\n\nelse{\n    document.querySelector(DOMstrings.percentexpLabel).textContent= '----';\n}\n\n},\n\ndisplayPercentages: function(percentages)\n{\n    var fields = document.querySelectorAll(DOMstrings.expensesPercLabel); // this returns a node list not a list\n   // We used slice previously to convert into an array\n   //console.log(fields);\n    \n   nodeListForEach(fields,function(current,index)\n   {\n       console.log(current);\n       if(percentages[index]>0)\n       current.textContent= percentages[index] + '%';\n        else\n        current.textContent = '---';\n        //console.log(fields);\n   });\n\n\n},\n\ndisplayMonth :function()\n{\n    var now, year, month,months;\n    months = ['January','February','March','April','May','June','July','June','September','October','November','December'];\n    \n     now= new Date();\n     month = now.getMonth();\n    var christmas = new Date(2019,11,25);\n    console.log(christmas);\n    year = now.getFullYear(2019);\n    console.log(year);\n    document.querySelector(DOMstrings.dateLabel).textContent = months[month+1]+ ' ' + year;\n},\nchangedType: function()\n{\n    var fields = document.querySelectorAll(DOMstrings.inputType+','+DOMstrings.inputDescription+','+DOMstrings.inputValue);\n\n    nodeListForEach(fields,function(cur)\n    {\n        cur.classList.toggle('red-focus');\n    }); \n    document.querySelector(DOMstrings.inputbtn).classList.toggle('red');\n},\n\naddListItem : function(obj,type)\n{\n    //Create a HTML string with placeholder\n    var html,newhtml,element;\n    \n\n    if(type === 'inc'){\n    element = DOMstrings.incomeContainer;\n    //Hardcoding HTML code here\n    html = '<div class=\"item clearfix\" id=\"inc-%id%\">  <div class=\"item__description\">%description%</div><div class=\"right clearfix\"><div class=\"item__value\">%value%</div><div class=\"item__delete\"><button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button></div></div></div>';\n\n    }\n    else if (type === 'exp')\n    {\n\n    element = DOMstrings.expensesContainer;                \n    html = '<div class=\"item clearfix\" id=\"exp-%id%\"><div class=\"item__description\">%description%</div><div class=\"right clearfix\"><div class=\"item__value\">%value%</div><div class=\"item__percentage\">21%</div><div class=\"item__delete\"><button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button></div></div></div>';\n    }\n\n\n    //Replace the placeholder with some actual values\n\n    newhtml = html.replace('%id%',obj.id);\n    newhtml = newhtml.replace('%description%',obj.description);\n    newhtml = newhtml.replace('%value%',formatNumber(obj.value,type));\n\n\n    //Insert the HTML into the DOM\n    document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);\n},\n\ndeleteListItem : function(selectorID)\n{\n    var el = document.getElementById(selectorID);\n    el.parentNode.removeChild(el); //DOM API and jQuery refer in the resource page\n\n}\n\n\n\n\n\n    };\n\n}) ();// //IIFE for User Interface\n\n\n\n// GLOBAL APP CONTROLLER for controlling event listeners and handlers and decide what should be done and then delegate these tasks to other controllers \n\nvar controller= ( function(budgetctrl, UIctrl) {// We have used different names for good practice or no arguments at all \n    //since we can access the all other modules from here because they are in outside scope //but if we want to change the name of any of the modules  then we have to do this all over our code.So we have used a different names \n        \n    \nvar setupEventListeners = function()\n{\n\n  var DOM = UIctrl.getDOMstrings();\n  document.querySelector(DOM.inputbtn).addEventListener('click', ctrlAddItem);\n\n\n  document.addEventListener('keypress',function(event) /// In Global document we give this EventListener because anywhere this enter/return key is pressed we want to do this function\n  {// Pass argument to function for particularly select the enter key press any name can be given\n      if(event.keyCode === 13 || event.which === 13) // keyCode property of KeyboardEvent object or 'which' can also be used \n      {\n      ctrlAddItem();\n\n      }\n\n  });\n\n      document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);\n\n      document.querySelector(DOM.inputType).addEventListener('change',UIctrl.changedType);\n\n\n\n    \n}\n\nvar updateBudget = function()\n{\n// 1. Calculate the budget\nbudgetctrl.calculateBudget();\n//2. Return the budget\n\nvar budget = budgetctrl.getBudget();\n//3. Display budget on the UI\nUIctrl.displayBudget(budget);\nconsole.log(budget);\n\n}\n\nvar updatePercentages = function()\n{\n    //1. Calculate Percentages\n\n    budgetctrl.calculatepercentages();\n\n   //2. Read percentages from the budget controller\n   var percentages = budgetctrl.getPercentage();\n\n\n\n   //3. Update the percentages on the UI\n    UIctrl.displayPercentages(percentages);\n   //console.log(percentages);\n   \n   \n\n}\n\nvar ctrlAddItem = function()\n{\n var input, newitem;\n    \n// 1. Get the field input data\n input = UIctrl.getInput(); \n    console.log(input);\n\nif(input.description !== \"\" && !isNaN(input.value) && input.value >0)\n{\n\n\n// 2. Add item to the budget controller\n\nnewitem = budgetctrl.addItem(input.type,input.description,input.value);\n\n// 3. Add the item to UI\n\nUIctrl.addListItem(newitem,input.type);\n\n//4. Clear the fields\nUIctrl.clearFields();\n\n//5. Calculate and update the budget\n\nupdateBudget();\n\n//6. Calculate and update percentages\n\nupdatePercentages();\n\n\n};\n\n\n\n}\n\nvar ctrlDeleteItem = function(event)\n{ //Hardcoding DOM here\n    var itemID,type,splitID,ID;\n    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; //target property returns a html node\n    if(itemID)\n    {\n        splitID= itemID.split('-'); // To split a string into two elements in an array based on some separation here it is (-)\n        type = splitID[0];\n        ID= parseInt(splitID[1]); //This is a string so convert to a number before comparing with -1 in deleteItem() function\n        \n\n        // 1. Delete the item from the data structure\n\n        budgetctrl.deleteItem(type,ID);\n        //2.Delete the item from the UI\n\n        UIctrl.deleteListItem(itemID);\n\n\n        //3. update and show the new budget  \n        updateBudget();\n\n        //4.Calculate and update percentages\n\n        updatePercentages();\n    }\n}\nreturn {\n    init: function()\n    {   \n        console.log('Application has started!');\n        UIctrl.displayMonth();\n        UIctrl.displayBudget(\n        {\n            budget: 0,\n            totalInc: 0,\n            totalExp: 0,\n            totalPercent:-1\n\n        });\n\n        setupEventListeners();\n\n    }\n}\n    \n})(budgetController,UIController);// //IIFE for App controller\n\ncontroller.init();\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ })

/******/ });