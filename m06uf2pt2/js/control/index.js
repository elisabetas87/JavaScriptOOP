/*
@name= Biotech with OOP & JQuery
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This aplication generates a form where a user can introduce a type of product an the number of products desired.
  Then, another div will appear, where this user will be able to introduce the name, the genetic code previously selected, and
  if the products are cheched or not. Finally, all of these results will be shown in a pop-up window.
  @date = 11-01-2019
*/

var productType; //declaring a global variable to pick the ProductTypeObj through the different functions

/*
@name= initializeProductTypeObj(codeType)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function generates a new ProductTypeObj with its corresponding attributes
  @date = 11-01-2019
  @params= codeType
  @return = none
*/
function initializeProductTypeObj(codeType){

  var types = ["DNA","RNA","Protein"]; //array with names
  productType = new ProductTypeObj(codeType,types[codeType]); //generating an object

}

//JQUERY
$(document).ready(function(){ //when de document is ready

  $('#form').trigger("reset"); //reset the form, in order to clean the values introduced before
  $("#2ndpart").hide(); //hide

  $("#butIntroduce").click(function(event){ //when a user clicks the introduce button
    event.preventDefault();

    $("#1stpart").hide(); //hide
    $("#2ndpart").show(); //show
    createTableProducts(); //calling this function

  });


  $("#butIntroduceDB").click(function(event){ //when a user clicks the introduce the products in de DataBase button
    event.preventDefault();

    introduceinDB(); //calling this function

  });

  $("#cancelButton").click(function(event){ //when a user clicks the cancel button
    event.preventDefault();

    shownDivs(); //calling this function
    $("#errors").html(""); //error messages in blank
    $("#numberProducts").val(""); //cleaning the value of the input
    location.reload(); //refresh the page
  });


});

//--> OWN CODE

/*
@name= createTableProducts()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function takes the values from the first div located in index.html,
  then validates them and generates a dinamic html table to pick the name, code, and check of the products
  @date = 11-01-2019
  @params= none
  @return = none
*/
function createTableProducts (){
    let codeType = $("#codeType").val();
    let numberProducts = $("#numberProducts").val();

    if(isBlank(numberProducts)){ //validating if the input of the number is empty
        $("#errors").html("Input data must not be empty");
        shownDivs();

    }else if (isNaN(numberProducts)) { //validating if the input of the number is really a number
        $("#errors").html("Input data must be a number");
        shownDivs();

    }else if(isNegative(numberProducts)){ //validating if the number is negative
        $("#errors").html("Input data must be greater than zero");
        shownDivs();

    }else{ //if data are valid
      $("#errors").html(""); //delete error messages and generate the dinamic table
    var strClient="";
      for(var i=0; i<numberProducts; i++){
          strClient += "<tr>";
          strClient += "<td><input type='text' class= 'clname' id='nameProduct"+i+"' placeholder='Name product'></td>";
          strClient += "<td><input type='text' id='code"+i+"' class='clcode' placeholder='Code product'></td>";
          strClient += "<td><input type='checkbox' class='clcheck' id='ckeck"+i+"' value='yes'>Tested</td>";
          strClient += "</tr>";
        }
        $("#tableProducts").append(strClient); //appending the table in the html div
      }

      initializeProductTypeObj(codeType); //generating an object

      $("#head1").html("Enter products for category " + productType.name + " Code"); //writing the title using the object created before
}
/*
@name= shownDivs()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function order what div must be hidden and what must be shown
  @date = 11-01-2019
  @params= none
  @return = none
*/
function shownDivs(){
  $("#1stpart").show(); //show
  $("#2ndpart").hide(); //hide
}
/*
@name= introduceinDB()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function takes the values from the second div located in index.html, previously generated dinamicly,
  and validates them before entering into the pop-up window.
  @date = 11-01-2019
  @params= none
  @return = none
*/
function introduceinDB(){
  var names = $(".clname"); //obtaining arrays with the class values
  var codes = $(".clcode");
  var check = $(".clcheck");
  let codeType = $("#codeType").val(); //obtaining the codeType value in order to generate a product object

  var flag = false; //declaring a flag

    var products = initializeProductObjs(names,codes,check); //generating an object

    for(var i=0; i<products.length; i++){
      //validating name and code
      if(products[i].isBlank(products[i].name)){ //validating name
        $("#errors").html("Name of product must not be empty");
        flag=true;
      }else if (products[i].isBlank(products[i].code)) { //validating code
        $("#errors").html("Code of product must not be empty");
        flag=true;
      }
      //validating all types of products
      if(productType.name=="DNA"){ //validating DNA
        if (products[i].validateDNA(products[i].code)) {
          $("#errors").html("Not valid DNA code");
          flag=true;
        }
      }else if (productType.name=="RNA") { //validating RNA
        if (products[i].validateRNA(products[i].code)) {
        $("#errors").html("Not valid RNA code");
          flag=true;
        }
      }else if (productType.name=="Protein") { //validating Protein
        if (products[i].validateProtein(products[i].code)) {
        $("#errors").html("Not valid Protein code");
          flag=true;
        }
      }
    }
  if(!flag){ //if all values are valid
    $("#errors").hide();
    var decision = confirm("Do you really want to introduce these products?"); //confirmation message

    if (decision){ //if you say OK, open a pop-up window
      popupwind = window.open("./popUpWindows/popUpWindow.html", "_blank", "width=800px,height=800px");
    }
  }
}
/*
@name= loadData()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function takes the codeType from the div located in index.html, generates another dinamic html table
  with the name, code of products and check, and puts the final result in the pop-up window.
  @date = 11-01-2019
  @params= none
  @return = none
*/
function loadData(){

  let codeType = window.opener.$("#codeType").val();

  initializeProductTypeObj(codeType); //generating a productType object

  $("#title").append(productType.name + " Code"); //writing the title using the object created before

  //writing the date
  var date = currentDate();
  $("#tdate").append(date);

  var names = window.opener.$(".clname"); //obtaining arrays with the class values
  var codes = window.opener.$(".clcode");
  var check = window.opener.$(".clcheck");

var products = initializeProductObjs(names,codes,check); //generating product objects

var result="";
  for(var i=0; i<products.length; i++){ //going through the array of products
    //generating the dinamic html table
  result +="<tr>";
  result += "<td>" + products[i].name + "</td>";
  result += "<td>" + products[i].productType.name + "</td>";
  result += "<td>" + products[i].code + "</td>";
  result += "<td>" + products[i].tested + "</td>";
  result += "<td>" + products[i].entryDate + "</td>";
  result +="</tr>";
  }
  $("#finalTable").append(result); //appending the table in the html div

  $("#totalp").append(products.length); //writing the total number of products using objects
}

/*
@name= currentDate()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function calculates the current date
  @date = 11-01-2019
  @params= none
  @return = date
*/
function currentDate(){
  //declaring arrays
  var months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
  var daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var today = new Date(); //creating a new date object

  var date = daysWeek[today.getDay()] + ", " + today.getDate() + " of " + months[today.getMonth()] + " of " + today.getFullYear();

  return date;

}

/*
@name= initializeProductObjs(names,codes,check)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function generates a new ProductObj with its corresponding attributes
  @date = 11-01-2019
  @params= names, codes, check
  @return = products (array of objects)
*/
function initializeProductObjs(names,codes,check){

  var products = []; //creating an array in order to save the products

  var date = currentDate();

  for (var i=0; i<names.length; i++){ //going through the array of products

    let product = new ProductObj(); //creating a new object

    //assigning the attributes to the object
    product.productType = productType;
    product.name = names[i].value;
    product.code = codes[i].value;
    product.entryDate = date;

    var if_check="";
    if (check[i].checked) {
      if_check="YES";
    }else{
      if_check="NO";
    }
    product.tested = if_check;

    products.push(product); //pushing the objects in the array created before
  }
  return products;
}

/*
@name= isBlank(param)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if an input is empty or not
  @date = 11-01-2019
  @params= param
  @return = boolean
*/
function isBlank(param){
  return (param =="");
}

/*
@name= isNegative(param)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if a number is negative or not
  @date = 11-01-2019
  @params= param
  @return = boolean
*/
function isNegative(param){
  return (param<=0);
}
