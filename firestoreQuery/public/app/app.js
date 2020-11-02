import * as Model from "../model/model.js";

function initListeners(){
    $("#classes").change(function(){
        Model.getStudentByClassNumber(this.value);
    })
    $("#genre").change(function(){
        console.log(this.value);
        Model.filterByGenre(this.value);
    })
}

$(document).ready(function() {
    Model.initFirebase(); 
    Model.signIn(initListeners);
    
});