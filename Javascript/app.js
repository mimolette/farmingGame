$(function() {

  // init variables
  var mainElt = $('#main-content');

  // create a new field
  var field1 = new Field();
  var viewField1 = new FieldView(field1, mainElt);
  var fieldController = new FieldsController();
  fieldController.addField({field: field1, view: viewField1});

});