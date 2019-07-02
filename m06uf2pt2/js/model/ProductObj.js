/**
@name: ProductObj.js
@description: class to save the data of a product
@date: 11/01/2019
@author: Elisabet M. Aguayo Sedano
@version: 1.0
@properties:
  _id: id of the Product
  _productType: product Type object of the Product
  _name: name of the Product
  _code: genetic code of the Product
  _tested: if the Product is tested or not
  _entryDate: entry Date of the Product
**/
class ProductObj {

  constructor(pId, pProductType, pName, pCode, pTested, pEntryDate){
    this._id = pId;
    this._productType = pProductType;
    this._name = pName;
    this._code = pCode;
    this._tested = pTested;
    this._entryDate = pEntryDate;
  }

  get id(){
    return this._id;
  }
  set id(pId){
    this._id = pId;
  }
  get idProductType(){
    return this._productType;
  }
  set idProductType(pProductType){
    this._ProductType = pProductType;
  }
  get name(){
    return this._name;
  }
  set name(pName){
    this._name = pName;
  }
  get code(){
    return this._code;
  }
  set code(pCode){
    this._code = pCode;
  }
  get tested(){
    return this._tested;
  }
  set tested(pTested){
    this._tested = pTested;
  }

  get entryDate(){
    return this._entryDate;
  }
  set entryDate(pEntryDate){
    this._entryDate = pEntryDate;
  }

  /*
  @name= validateDNA(code)
    @author= Elisabet M. Aguayo Sedano
    @version= 1.0
    @description= This function checks if the introduced DNA code is valid according to a regexp.
    @date = 11-01-2019
    @params= code
    @return = boolean
  */
validateDNA(code){

    var dna = new RegExp("[^ACGT]","i");
    var flag = false;

      if (dna.test(code)) {
            flag=true;
      }
    return flag;
}

/*
@name= validateRNA(code)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if the introduced RNA code is valid according to a regexp.
  @date = 11-01-2019
  @params= code
  @return = boolean
*/
validateRNA(code){
  var rna = new RegExp("[^ACGU]","i");
  var flag=false;

  if (rna.test(code)) {
        flag=true;
  }
  return flag;
}

/*
@name= validateProtein(code)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if the introduced Protein code is valid according a regexp.
  @date = 11-01-2019
  @params= code
  @return = boolean
*/
validateProtein(code){
  var protein = new RegExp("[^ACDEFGHIKLMNPQRSTVWY]","i");
  var flag=false;

  if (protein.test(code)) {
        flag=true;
  }
  return flag;
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
isBlank(param){
  return (param =="");
}
}
