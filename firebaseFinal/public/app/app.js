import * as Model from "../model/model.js";

function initListeners(){
    // $("#classes").change(function(){
    //     Model.getStudentByClassNumber(this.value);
    // })
    $("#genre").change(function(){
        console.log(this.value);
        Model.filterByGenre(this.value);
    })
}

$(document).ready(function() {
    Model.initFirebase(); 
    Model.signIn(initListeners);
    
});



  $( "#login" ).click(function() {
    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    

    if(user != '' && password !=''){
    Model.populateAll();}else{
        alert("Please input a valid username or password. If you don't have an account, sign up.")
    }
  });

  $( "#registration" ).click(function() {
      console.log("signup clicked");
        Model.signUp();
  });

