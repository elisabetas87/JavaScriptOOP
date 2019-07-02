/**
@name: ProductTypeObj.js
@description: class to save the Product type data
@date: 11/01/2019
@author: Elisabet M. Aguayo Sedano
@version: 1.0
@properties:
  _id: id of the product type
  _name: name of the product type

**/
class ProductTypeObj {

  constructor(pId, pName){
    this._id = pId;
    this._name = pName;
  }

  get id(){
    return this._id;
  }
  set id(pId){
    this._id = pId;
  }
  get name(){
    return this._name;
  }
  set name(pName){
    this._name = pName;
  }
}
