$(function() {

  // init variables
  var mainElt = $('#main-content');

  var fieldController = new FieldsController();
  // create 3 fields
  for(var ii=0; ii<3; ii++) {
    var field = new Field();
    var viewField = new FieldView(field, mainElt);
    fieldController.addField({field: field, view: viewField});
  }


});