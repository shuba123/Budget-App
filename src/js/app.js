//BUDGET CONTROLLER MODULE

var budgetController = (function () {

    var Expense = function(id,description,value)
    {
        this.id = id;
        this.description =description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome)
    {
        if(totalIncome>0)
        {
        this.percentage = Math.round((this.value/totalIncome)  *100) ;
        }
        else{
            this.percentage = -1;
        }
    };
    Expense.prototype.getPercentage = function ()
    {
        return this.percentage;
    };

    var Income = function(id,description,value)
    {
        this.id = id;
        this.description =description;
        this.value = value;
    };
   
    var data = {
        allitems : { // Object inside an object
            exp:[],
            inc:[]
        },

        totals:{
            exp :0,
            inc :0
        },
        budget : 0,
        percentage : -1

    };

    var calculateTotal =function(type)
    {
        var sum =0;

        data.allitems[type].forEach(function(curr)
        {
            sum = sum+curr.value;

        });
        data.totals[type] = sum;

    };

    return {
        addItem : function (type,des,val)
    {
        var newItem,ID;
        //Create new ID
        if(data.allitems[type].length > 0)
        ID = data.allitems[type][data.allitems[type].length -1].id +1 ;
        else
        ID= 0;
        //Create a new item based on type 'inc' or 'exp'
        if(type === 'exp')
            {
            newItem =  new Expense(ID,des,val);
        }
        else if(type === 'inc'){
            newItem =  new Income(ID,des,val);

        }   

        /// Push it into our data structure
        data.allitems[type].push(newItem);
         // To access an array element ie. inc [] or exp [] of an object allitems which is inside an object data we use (.) operator
         //Return  new element    
         return newItem;
    },
    deleteItem: function(type,id)
    {
        //If we want to delete an item of od '6' then index of 3 must be selected
        //id = 6
        //data.allItems[type][id];
        //ids= [1 2 4 6 8]
        //index = 3 
        //Create an ID array with all ID elements
            var ids = data.allitems[type].map(function(current)
            {
//map() returns a brand new array unlike forEach() method which will loop over an array
           return current.id;

            });
            index=ids.indexOf(id);
            if(index !== -1)
            {
                data.allitems[type].splice(index,1); 
            }
    },
    calculateBudget : function()
    {
        //1. Calculate total income and expenses

        calculateTotal('exp');
        calculateTotal('inc');

        //2.Calculate budget = income - expenses
        data.budget = data.totals.inc - data.totals.exp;

        //3. Calculate percentage = income/expenses *100
        if(data.totals.inc > 0)
        {
            data.percentage = Math.round((data.totals.exp/data.totals.inc) *100 );

        }
        else{
            data.percentage = -1;
        }
        
    },

    calculatepercentages: function()
    {
        /*Total income = 100
        Expense :
        a=10, b=20,c=30
        then 10%, 20%,30 %
        */

        data.allitems.exp.forEach(function(cur)
        {
            cur.calcPercentage(data.totals.inc);

        });

    },
    getPercentage : function()
    {
        var allPerc= data.allitems.exp.map(function(cur)
        {
            return cur.getPercentage();

        });
        return allPerc;

    },

    getBudget:function()
    {
        return{
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            totalPercent: data.percentage
        }
    },

  testing : function()
 {
     console.log(data);
 }

};
 }) ();
    //IIFE for Budget Controller

// UI CONTROLLER

var UIController= ( function() {
    var DOMstrings = { //To give names to all class names of CSS
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue : '.add__value',
        inputbtn : '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentexpLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel:'.item__percentage',
        dateLabel: '.budget__title--month'
        };

 var formatNumber = function(num,type)
{
    /* comma separating the thousands and + or - before number exactly 2 decimal points
    2310.4567 - > +2,310.46
    */
   num = Math.abs(num);
   num = num.toFixed(2);//for  2 decimal places with the help of num method
   numSplit = num.split('.');
   int =  numSplit[0];
    if(int.length >3)
    {
        int = int.substr(0,int.length -3)+','+int.substr(int.length-3,3);// position,no.of characters // input 2310 -> output 2,310    
        //substring() allows to take only a part of the string
    }
   dec = numSplit[1];
   return (type=== 'exp' ? '-': '+') +' '+ int +'.'+ dec;

};

var  nodeListForEach = function(list,callback){
    for(var i=0;i<list.length;i++)
    {
        callback(list[i],i);
    }

};  

    return {
        getDOMstrings : function() // Ww can't access DOMstrings outside scope so again return a single object with two functions getInput() and getDOMstrings()
        {
            return DOMstrings;
        },
        getInput : function() // this method has to be public in order for other controllers to access this method 
        {
            return {

            type : document.querySelector(DOMstrings.inputType).value,// 'inc' or 'exp'
            description : document.querySelector(DOMstrings.inputDescription).value,
            value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }

        },
        clearFields  : function ()
        {
            var fields,fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription+','+DOMstrings.inputValue);
           //querySelectorAll returns a list not an array
           fieldsArr=  Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array) //only three arguments for this callback function
            {
                current.value = "";

            });
            fieldsArr[0].focus();
        },
displayBudget : function(obj)
{
    var type;
    type= obj.budget > 0 ? 'inc' : 'exp';
document.querySelector(DOMstrings.budgetLabel).textContent= formatNumber(obj.budget,type);
document.querySelector(DOMstrings.incomeLabel).textContent= formatNumber(obj.totalInc,'inc');
document.querySelector(DOMstrings.expensesLabel).textContent= formatNumber(obj.totalExp,'exp');
document.querySelector(DOMstrings.percentexpLabel).textContent= obj.totalPercent;

if(obj.totalPercent>0)
{
    document.querySelector(DOMstrings.percentexpLabel).textContent= obj.totalPercent + '%';
}

else{
    document.querySelector(DOMstrings.percentexpLabel).textContent= '----';
}

},

displayPercentages: function(percentages)
{
    var fields = document.querySelectorAll(DOMstrings.expensesPercLabel); // this returns a node list not a list
   // We used slice previously to convert into an array
   //console.log(fields);
    
   nodeListForEach(fields,function(current,index)
   {
       console.log(current);
       if(percentages[index]>0)
       current.textContent= percentages[index] + '%';
        else
        current.textContent = '---';
        //console.log(fields);
   });


},

displayMonth :function()
{
    var now, year, month,months;
    months = ['January','February','March','April','May','June','July','June','September','October','November','December'];
    
     now= new Date();
     month = now.getMonth();
    var christmas = new Date(2019,11,25);
    console.log(christmas);
    year = now.getFullYear(2019);
    console.log(year);
    document.querySelector(DOMstrings.dateLabel).textContent = months[month+1]+ ' ' + year;
},
changedType: function()
{
    var fields = document.querySelectorAll(DOMstrings.inputType+','+DOMstrings.inputDescription+','+DOMstrings.inputValue);

    nodeListForEach(fields,function(cur)
    {
        cur.classList.toggle('red-focus');
    }); 
    document.querySelector(DOMstrings.inputbtn).classList.toggle('red');
},

addListItem : function(obj,type)
{
    //Create a HTML string with placeholder
    var html,newhtml,element;
    

    if(type === 'inc'){
    element = DOMstrings.incomeContainer;
    //Hardcoding HTML code here
    html = '<div class="item clearfix" id="inc-%id%">  <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

    }
    else if (type === 'exp')
    {

    element = DOMstrings.expensesContainer;                
    html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }


    //Replace the placeholder with some actual values

    newhtml = html.replace('%id%',obj.id);
    newhtml = newhtml.replace('%description%',obj.description);
    newhtml = newhtml.replace('%value%',formatNumber(obj.value,type));


    //Insert the HTML into the DOM
    document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
},

deleteListItem : function(selectorID)
{
    var el = document.getElementById(selectorID);
    el.parentNode.removeChild(el); //DOM API and jQuery refer in the resource page

}





    };

}) ();// //IIFE for User Interface



// GLOBAL APP CONTROLLER for controlling event listeners and handlers and decide what should be done and then delegate these tasks to other controllers 

var controller= ( function(budgetctrl, UIctrl) {// We have used different names for good practice or no arguments at all 
    //since we can access the all other modules from here because they are in outside scope //but if we want to change the name of any of the modules  then we have to do this all over our code.So we have used a different names 
        
    
var setupEventListeners = function()
{

  var DOM = UIctrl.getDOMstrings();
  document.querySelector(DOM.inputbtn).addEventListener('click', ctrlAddItem);


  document.addEventListener('keypress',function(event) /// In Global document we give this EventListener because anywhere this enter/return key is pressed we want to do this function
  {// Pass argument to function for particularly select the enter key press any name can be given
      if(event.keyCode === 13 || event.which === 13) // keyCode property of KeyboardEvent object or 'which' can also be used 
      {
      ctrlAddItem();

      }

  });

      document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

      document.querySelector(DOM.inputType).addEventListener('change',UIctrl.changedType);



    
}

var updateBudget = function()
{
// 1. Calculate the budget
budgetctrl.calculateBudget();
//2. Return the budget

var budget = budgetctrl.getBudget();
//3. Display budget on the UI
UIctrl.displayBudget(budget);
console.log(budget);

}

var updatePercentages = function()
{
    //1. Calculate Percentages

    budgetctrl.calculatepercentages();

   //2. Read percentages from the budget controller
   var percentages = budgetctrl.getPercentage();



   //3. Update the percentages on the UI
    UIctrl.displayPercentages(percentages);
   //console.log(percentages);
   
   

}

var ctrlAddItem = function()
{
 var input, newitem;
    
// 1. Get the field input data
 input = UIctrl.getInput(); 
    console.log(input);

if(input.description !== "" && !isNaN(input.value) && input.value >0)
{


// 2. Add item to the budget controller

newitem = budgetctrl.addItem(input.type,input.description,input.value);

// 3. Add the item to UI

UIctrl.addListItem(newitem,input.type);

//4. Clear the fields
UIctrl.clearFields();

//5. Calculate and update the budget

updateBudget();

//6. Calculate and update percentages

updatePercentages();


};



}

var ctrlDeleteItem = function(event)
{ //Hardcoding DOM here
    var itemID,type,splitID,ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; //target property returns a html node
    if(itemID)
    {
        splitID= itemID.split('-'); // To split a string into two elements in an array based on some separation here it is (-)
        type = splitID[0];
        ID= parseInt(splitID[1]); //This is a string so convert to a number before comparing with -1 in deleteItem() function
        

        // 1. Delete the item from the data structure

        budgetctrl.deleteItem(type,ID);
        //2.Delete the item from the UI

        UIctrl.deleteListItem(itemID);


        //3. update and show the new budget  
        updateBudget();

        //4.Calculate and update percentages

        updatePercentages();
    }
}
return {
    init: function()
    {   
        console.log('Application has started!');
        UIctrl.displayMonth();
        UIctrl.displayBudget(
        {
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            totalPercent:-1

        });

        setupEventListeners();

    }
}
    
})(budgetController,UIController);// //IIFE for App controller

controller.init();