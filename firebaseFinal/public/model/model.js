var _db; 

export function initFirebase(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            console.log("There is a user");
            
        }else{
            console.log("No user");
            _db = ""; 
        }
    
        //callback();
    });
    
}

export function signIn(callback){
    firebase
    .auth()
    .signInAnonymously()
    .then(function(result){
        _db = firebase.firestore(); 
        callback();
    });
}
/*
export function getStudentByClassNumber(classNumber){
    $(".content").html('');
    $(".content").append(`<h3>${classNumber}</h3>`);

    _db
    .collection("names")
    .where("classNumber", "==", classNumber)
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let student = doc.data();
            $(".content").append(`<p>${student.fName} ${student.lName}</p>`);
        });
    });
}
*/

export function populateAll(){
    $(".content").html('');
    document.getElementById("signup").style.display = "none";
    $(".header").html(`<div class="buttonwrapper">
    <button id="callMonday">Monday</button>
    <button id="callTuesday">Tuesday</button>
    <button id="callWednesday">Wednesday</button>
    <button id="callThursday">Thursday</button>
    <button id="callFriday">Friday</button>
    <button id="callSaturday">Saturday</button>
    <button id="callSunday">Sunday</button></div>`);
    var user = $('#username').val();
    var pword = $('#pasword').val();

    _db
    .collection("workoutApp")
    .where("username", "==", user, "password", "==", pword)
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let info = doc.data();
            console.log(info);
            //alert(info.username);
            $(".user")
            .append(`<div class="row"><h4>Hello, ${info.username}!</h4>
            <h5 id="removal">Please Select a Day to View your Workouts</h5></div>`);
            

            var id = info.docref;
            var person = info.username
            //alert(id);

            sessionStorage.setItem("username", id);
            //^^^^^^^^^^^^^^^^^^^^^^^THIS 
            $( "#callMonday" ).click(function() {
                pullCollectionMonday();
            });
            $( "#callTuesday" ).click(function() {
                pullCollectionTuesday();
            });
            $( "#callWednesday" ).click(function() {
                pullCollectionWednesday();
            });
            $( "#callThursday" ).click(function() {
                pullCollectionThursday();
            });
            $( "#callFriday" ).click(function() {
                pullCollectionFriday();
            });
            $( "#callSaturday" ).click(function() {
                pullCollectionSaturday();
            });
            $( "#callSunday" ).click(function() {
                pullCollectionSunday();
            });
        });
        
    });
}

export function pullCollectionMonday(){
    $(".content").html(`<h3>Monday Workouts</h3>
    <button id="addWorkoutMon">Add Workout</button>
    <button id="updateWorkoutMon">Update Workout</button>
    <button id="removeWorkoutMon">Remove Workout</button>`);
    var test = "test";
    //alert(person);
    document.getElementById("removal").style.display = "none";
    //var documentReference = id;
    //var user = person;
    //console.log("the docref id: " ,documentReference);
    //console.log("the user: " ,user);
    let documentReference = sessionStorage.getItem("username");
    var docId = documentReference.trim();
    console.log("docref is" , documentReference);
    
    console.log (docId);
    var databasePrimer = _db.collection("workoutApp").doc(`${docId}`).collection("mondayWorkouts");

     // aWa5DF8AlSNyLU5e1kON
    // _db
    // .collection("workoutApp")
    // //.where("username", "==", user)
    // .doc(`aWa5DF8AlSNyLU5e1kON`)
    // // .get()
    // // .then(snapDoc=>{
    // //     console.log(snapDoc);
    // // })
    // .collection("mondayWorkouts")
    databasePrimer
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let info = doc.data();
            console.log(info);
            $(".content")
            .append(`<div class="row"><p>-----</p>
            <h4>Workout: ${info.workoutName}</h4>
            <h4>Personal Best: ${info.personalBest}</h4>
            <img src="${info.visual}">
            <h4>Personal Best: ${info.personalBest}</h4>
            <h4>Reps: ${info.reps }</h4><h4>Sets: ${info.sets }</h4>
            <h4>Notes: ${info.notes }</h4>
            
           </div>`);

                
        });
        
    });
    

    $( "#addWorkoutMon" ).click(function() {
        //console.log("bleh");
        $(".content").html(`<h3>Monday Workouts</h3>
        <h3>Add a New Workout</h3>
        <input id="workoutName" type="text" placeholder="Workout Name"></input>
        <input id="reps" type="text" placeholder="Reps (if applicable)"></input>
        <input id="sets" type="text" placeholder="Sets (if applicable)"></input>
        <input id="time" type="text" placeholder="Time (if applicable)"></input>
        <input id="visual" type="text" placeholder="Image URL"></input>
        <input id="personalBest" type="text" placeholder="Personal Best"></input>
        <input id="notes" type="text" placeholder="Notes"></input>
        <button id="formsubmit">Add New Workout</button><button id="back">Back</button>`);
        
        $( "#formsubmit" ).click(function() {
            //console.log("yes yes yes");
            var workName = $('#workoutName').val();
            var reps = $('#reps').val();
            var sets = $('#sets').val();
            var time = $('#time').val();
            var visual = $('#visual').val();
            var personalBest = $('#personalBest').val();
            var notes = $('#notes').val();
            

                databasePrimer
                .add({
                    workoutName: workName,
                    reps: reps,
                    sets: sets,
                    time: time,
                    visual:visual,
                    personalBest:personalBest,
                    notes:notes
                })
                .then(function(docRef) {
                    alert("Your workout has been added!");
                    console.log("the docref is being pulled" , docRef.id);
                    let documentReference = sessionStorage.getItem("username");
                    var docId = documentReference.trim();
                    var addFieldId = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts").doc(docRef.id);
                    

                    //update data
                    return addFieldId.update({
                        fieldref:docRef.id
                    })
                    .then(function() {
                        console.log("Document successfully updated!");

                        pullCollectionMonday();
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });

                    
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        });
        $( "#back" ).click(function() {
            pullCollectionMonday();
        });

      });


    $( "#updateWorkoutMon" ).click(function() {
        console.log("This begins the updating adventure");

        $(".content").html(`<h3>Monday Workouts</h3>
        
        <h4>Select Which Workout To Update</h4><button id="back">Back</button>`);
        

        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log("Update Data Array",info);

                

                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonUpdate" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonUpdate" ).click(function() {
                //var removalFieldRef = info.fieldref;
                //sessionStorage.setItem("updateDataInfo", JSON.stringify(info));
                

                var updateId = $(this).attr('value').trim();
                console.log("Update Pressed", updateId);
                sessionStorage.setItem("updatingId", updateId);   
                let yeetReference = sessionStorage.getItem("updatingId").trim();

                databasePrimer
                .doc(yeetReference)
                .get()
                .then(function(doc){
                    
                        let info = doc.data();
                        console.log("Update Data Array",info);

                          

                        $(".content").html(`<h3>Monday Workouts</h3>
                        <h3>Update Your Workout</h3>
                        <input id="workoutName" type="text" value="${info.workoutName}"></input>
                        <input id="reps" type="text" value="${info.reps}"></input>
                        <input id="sets" type="text" value="${info.sets}"></input>
                        <input id="time" type="text" value="${info.time}"></input>
                        <input id="visual" type="text" value="${info.visual}"></input>
                        <input id="personalBest" type="text" value="${info.personalBest}"></input>
                        <input id="notes" type="text" value="${info.notes}"></input>
                        <button id="formsubmit">Update Workout</button><button id="back">Exit</button>`);

                        $( "#formsubmit" ).click(function() {
                            console.log("Going Sicko Mode")

                            var workName = $('#workoutName').val();
                            var reps = $('#reps').val();
                            var sets = $('#sets').val();
                            var time = $('#time').val();
                            var visual = $('#visual').val();
                            var personalBest = $('#personalBest').val();
                            var notes = $('#notes').val();

                            return databasePrimer.doc(yeetReference).update({
                                workoutName: workName,
                                reps: reps,
                                sets: sets,
                                time: time,
                                visual:visual,
                                personalBest:personalBest,
                                notes:notes
                            })
                            .then(function() {
                                alert("Your workout has been updated!");
                                pullCollectionMonday();
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                        });

                        $( "#back" ).click(function() {
                            pullCollectionMonday();
                        });
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");

                    
                            
                    
                });          
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionMonday();
        });

    });

    $( "#removeWorkoutMon" ).click(function() {
        

        console.log("Thus begins the adventures of removing workouts.")
        $(".content").html(`<h3>Monday Workouts</h3>
        
        <h4>Select Which Workout To Delete</h4><button id="back">Back</button>`);


        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log(info);
                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonRemove" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonRemove" ).click(function() {
                //var removalFieldRef = info.fieldref;
                var removalId = $(this).attr('value').trim();
                console.log("button pressed", removalId );
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");
                databasePrimer.doc(removalId).delete().then(function() {
                    alert("Your Workout has been Removed!");
                    pullCollectionMonday();
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionMonday();
        });

     }); 
      
}

export function pullCollectionTuesday(){
    $(".content").html(`<h3>Tuesday Workouts</h3>
    <button id="addWorkoutTue">Add Workout</button>
    <button id="updateWorkoutTue">Update Workout</button>
    <button id="removeWorkoutTue">Remove Workout</button>`);
    var test = "test";
    //alert(person);
    document.getElementById("removal").style.display = "none";
    //var documentReference = id;
    //var user = person;
    //console.log("the docref id: " ,documentReference);
    //console.log("the user: " ,user);
    let documentReference = sessionStorage.getItem("username");
    var docId = documentReference.trim();
    console.log("docref is" , documentReference);
    
    console.log (docId);
    var databasePrimer = _db.collection("workoutApp").doc(`${docId}`).collection("tuesdayWorkouts");

     // aWa5DF8AlSNyLU5e1kON
    // _db
    // .collection("workoutApp")
    // //.where("username", "==", user)
    // .doc(`aWa5DF8AlSNyLU5e1kON`)
    // // .get()
    // // .then(snapDoc=>{
    // //     console.log(snapDoc);
    // // })
    // .collection("mondayWorkouts")
    databasePrimer
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let info = doc.data();
            console.log(info);
            $(".content")
            .append(`<div class="row"><p>-----</p>
            <h4>Workout: ${info.workoutName}</h4>
            <h4>Personal Best: ${info.personalBest}</h4>
            <img src="${info.visual}">
            <h4>Personal Best: ${info.personalBest}</h4>
            <h4>Reps: ${info.reps }</h4><h4>Sets: ${info.sets }</h4>
            <h4>Notes: ${info.notes }</h4>
            
           </div>`);

                
        });
        
    });
    

    $( "#addWorkoutTue" ).click(function() {
        //console.log("bleh");
        $(".content").html(`<h3>Tuesday Workouts</h3>
        <h3>Add a New Workout</h3>
        <input id="workoutName" type="text" placeholder="Workout Name"></input>
        <input id="reps" type="text" placeholder="Reps (if applicable)"></input>
        <input id="sets" type="text" placeholder="Sets (if applicable)"></input>
        <input id="time" type="text" placeholder="Time (if applicable)"></input>
        <input id="visual" type="text" placeholder="Image URL"></input>
        <input id="personalBest" type="text" placeholder="Personal Best"></input>
        <input id="notes" type="text" placeholder="Notes"></input>
        <button id="formsubmit">Add New Workout</button><button id="back">Back</button>`);
        
        $( "#formsubmit" ).click(function() {
            //console.log("yes yes yes");
            var workName = $('#workoutName').val();
            var reps = $('#reps').val();
            var sets = $('#sets').val();
            var time = $('#time').val();
            var visual = $('#visual').val();
            var personalBest = $('#personalBest').val();
            var notes = $('#notes').val();
            

                databasePrimer
                .add({
                    workoutName: workName,
                    reps: reps,
                    sets: sets,
                    time: time,
                    visual:visual,
                    personalBest:personalBest,
                    notes:notes
                })
                .then(function(docRef) {
                    alert("Your workout has been added!");
                    console.log("the docref is being pulled" , docRef.id);
                    let documentReference = sessionStorage.getItem("username");
                    var docId = documentReference.trim();
                    var addFieldId = _db.collection("workoutApp").doc(docId).collection("tuesdayWorkouts").doc(docRef.id);
                    

                    //update data
                    return addFieldId.update({
                        fieldref:docRef.id
                    })
                    .then(function() {
                        console.log("Document successfully updated!");

                        pullCollectionTuesday();
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });

                    
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        });
        $( "#back" ).click(function() {
            pullCollectionTuesday();
        });

      });


    $( "#updateWorkoutTue" ).click(function() {
        console.log("This begins the updating adventure");

        $(".content").html(`<h3>Tuesday Workouts</h3>
        
        <h4>Select Which Workout To Update</h4><button id="back">Back</button>`);
        

        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log("Update Data Array",info);

                

                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonUpdate" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonUpdate" ).click(function() {
                //var removalFieldRef = info.fieldref;
                //sessionStorage.setItem("updateDataInfo", JSON.stringify(info));
                

                var updateId = $(this).attr('value').trim();
                console.log("Update Pressed", updateId);
                sessionStorage.setItem("updatingId", updateId);   
                let yeetReference = sessionStorage.getItem("updatingId").trim();

                databasePrimer
                .doc(yeetReference)
                .get()
                .then(function(doc){
                    
                        let info = doc.data();
                        console.log("Update Data Array",info);

                          

                        $(".content").html(`<h3>Tuesday Workouts</h3>
                        <h3>Update Your Workout</h3>
                        <input id="workoutName" type="text" value="${info.workoutName}"></input>
                        <input id="reps" type="text" value="${info.reps}"></input>
                        <input id="sets" type="text" value="${info.sets}"></input>
                        <input id="time" type="text" value="${info.time}"></input>
                        <input id="visual" type="text" value="${info.visual}"></input>
                        <input id="personalBest" type="text" value="${info.personalBest}"></input>
                        <input id="notes" type="text" value="${info.notes}"></input>
                        <button id="formsubmit">Update Workout</button><button id="back">Exit</button>`);

                        $( "#formsubmit" ).click(function() {
                            console.log("Going Sicko Mode")

                            var workName = $('#workoutName').val();
                            var reps = $('#reps').val();
                            var sets = $('#sets').val();
                            var time = $('#time').val();
                            var visual = $('#visual').val();
                            var personalBest = $('#personalBest').val();
                            var notes = $('#notes').val();

                            return databasePrimer.doc(yeetReference).update({
                                workoutName: workName,
                                reps: reps,
                                sets: sets,
                                time: time,
                                visual:visual,
                                personalBest:personalBest,
                                notes:notes
                            })
                            .then(function() {
                                alert("Your workout has been updated!");
                                pullCollectionTuesday();
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                        });

                        $( "#back" ).click(function() {
                            pullCollectionTuesday();
                        });
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");

                    
                            
                    
                });          
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionTuesday();
        });

    });

    $( "#removeWorkoutTue" ).click(function() {
        

        console.log("Thus begins the adventures of removing workouts.")
        $(".content").html(`<h3>Tuesday Workouts</h3>
        
        <h4>Select Which Workout To Delete</h4><button id="back">Back</button>`);


        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log(info);
                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonRemove" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonRemove" ).click(function() {
                //var removalFieldRef = info.fieldref;
                var removalId = $(this).attr('value').trim();
                console.log("button pressed", removalId );
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");
                databasePrimer.doc(removalId).delete().then(function() {
                    alert("Your Workout has been Removed!");
                    pullCollectionTuesday();
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionTuesday();
        });

     }); 
      
}

export function pullCollectionWednesday(){
    $(".content").html(`<h3>Wednesday Workouts</h3>
    <button id="addWorkoutWed">Add Workout</button>
    <button id="updateWorkoutWed">Update Workout</button>
    <button id="removeWorkoutWed">Remove Workout</button>`);
    var test = "test";
    //alert(person);
    document.getElementById("removal").style.display = "none";
    //var documentReference = id;
    //var user = person;
    //console.log("the docref id: " ,documentReference);
    //console.log("the user: " ,user);
    let documentReference = sessionStorage.getItem("username");
    var docId = documentReference.trim();
    console.log("docref is" , documentReference);
    
    console.log (docId);
    var databasePrimer = _db.collection("workoutApp").doc(`${docId}`).collection("wednesdayWorkouts");

     // aWa5DF8AlSNyLU5e1kON
    // _db
    // .collection("workoutApp")
    // //.where("username", "==", user)
    // .doc(`aWa5DF8AlSNyLU5e1kON`)
    // // .get()
    // // .then(snapDoc=>{
    // //     console.log(snapDoc);
    // // })
    // .collection("mondayWorkouts")
    databasePrimer
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let info = doc.data();
            console.log(info);
            $(".content")
            .append(`<div class="row"><p>-----</p>
            <h4>Workout: ${info.workoutName}</h4>
            <h4>Personal Best: ${info.personalBest}</h4>
            <img src="${info.visual}">
            <h4>Personal Best: ${info.personalBest}</h4>
            <h4>Reps: ${info.reps }</h4><h4>Sets: ${info.sets }</h4>
            <h4>Notes: ${info.notes }</h4>
            
           </div>`);

                
        });
        
    });
    

    $( "#addWorkoutWed" ).click(function() {
        //console.log("bleh");
        $(".content").html(`<h3>Wednesday Workouts</h3>
        <h3>Add a New Workout</h3>
        <input id="workoutName" type="text" placeholder="Workout Name"></input>
        <input id="reps" type="text" placeholder="Reps (if applicable)"></input>
        <input id="sets" type="text" placeholder="Sets (if applicable)"></input>
        <input id="time" type="text" placeholder="Time (if applicable)"></input>
        <input id="visual" type="text" placeholder="Image URL"></input>
        <input id="personalBest" type="text" placeholder="Personal Best"></input>
        <input id="notes" type="text" placeholder="Notes"></input>
        <button id="formsubmit">Add New Workout</button><button id="back">Back</button>`);
        
        $( "#formsubmit" ).click(function() {
            //console.log("yes yes yes");
            var workName = $('#workoutName').val();
            var reps = $('#reps').val();
            var sets = $('#sets').val();
            var time = $('#time').val();
            var visual = $('#visual').val();
            var personalBest = $('#personalBest').val();
            var notes = $('#notes').val();
            

                databasePrimer
                .add({
                    workoutName: workName,
                    reps: reps,
                    sets: sets,
                    time: time,
                    visual:visual,
                    personalBest:personalBest,
                    notes:notes
                })
                .then(function(docRef) {
                    alert("Your workout has been added!");
                    console.log("the docref is being pulled" , docRef.id);
                    let documentReference = sessionStorage.getItem("username");
                    var docId = documentReference.trim();
                    var addFieldId = _db.collection("workoutApp").doc(docId).collection("wednesdayWorkouts").doc(docRef.id);
                    

                    //update data
                    return addFieldId.update({
                        fieldref:docRef.id
                    })
                    .then(function() {
                        console.log("Document successfully updated!");

                        pullCollectionWednesday();
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });

                    
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        });
        $( "#back" ).click(function() {
            pullCollectionWednesday();
        });

      });


    $( "#updateWorkoutWed" ).click(function() {
        console.log("This begins the updating adventure");

        $(".content").html(`<h3>Wednesday Workouts</h3>
        
        <h4>Select Which Workout To Update</h4><button id="back">Back</button>`);
        

        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log("Update Data Array",info);

                

                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonUpdate" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonUpdate" ).click(function() {
                //var removalFieldRef = info.fieldref;
                //sessionStorage.setItem("updateDataInfo", JSON.stringify(info));
                

                var updateId = $(this).attr('value').trim();
                console.log("Update Pressed", updateId);
                sessionStorage.setItem("updatingId", updateId);   
                let yeetReference = sessionStorage.getItem("updatingId").trim();

                databasePrimer
                .doc(yeetReference)
                .get()
                .then(function(doc){
                    
                        let info = doc.data();
                        console.log("Update Data Array",info);

                          

                        $(".content").html(`<h3>Wednesday Workouts</h3>
                        <h3>Update Your Workout</h3>
                        <input id="workoutName" type="text" value="${info.workoutName}"></input>
                        <input id="reps" type="text" value="${info.reps}"></input>
                        <input id="sets" type="text" value="${info.sets}"></input>
                        <input id="time" type="text" value="${info.time}"></input>
                        <input id="visual" type="text" value="${info.visual}"></input>
                        <input id="personalBest" type="text" value="${info.personalBest}"></input>
                        <input id="notes" type="text" value="${info.notes}"></input>
                        <button id="formsubmit">Update Workout</button><button id="back">Exit</button>`);

                        $( "#formsubmit" ).click(function() {
                            console.log("Going Sicko Mode")

                            var workName = $('#workoutName').val();
                            var reps = $('#reps').val();
                            var sets = $('#sets').val();
                            var time = $('#time').val();
                            var visual = $('#visual').val();
                            var personalBest = $('#personalBest').val();
                            var notes = $('#notes').val();

                            return databasePrimer.doc(yeetReference).update({
                                workoutName: workName,
                                reps: reps,
                                sets: sets,
                                time: time,
                                visual:visual,
                                personalBest:personalBest,
                                notes:notes
                            })
                            .then(function() {
                                alert("Your workout has been updated!");
                                pullCollectionWednesday();
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                        });

                        $( "#back" ).click(function() {
                            pullCollectionWednesday();
                        });
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");

                    
                            
                    
                });          
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionWednesday();
        });

    });

    $( "#removeWorkoutWed" ).click(function() {
        

        console.log("Thus begins the adventures of removing workouts.")
        $(".content").html(`<h3>Wednesday Workouts</h3>
        
        <h4>Select Which Workout To Delete</h4><button id="back">Back</button>`);


        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log(info);
                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonRemove" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonRemove" ).click(function() {
                //var removalFieldRef = info.fieldref;
                var removalId = $(this).attr('value').trim();
                console.log("button pressed", removalId );
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");
                databasePrimer.doc(removalId).delete().then(function() {
                    alert("Your Workout has been Removed!");
                    pullCollectionWednesday();
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionWednesday();
        });

     }); 
      
}

export function pullCollectionThursday(){
    $(".content").html(`<h3>Thursday Workouts</h3>
    <button id="addWorkoutThu">Add Workout</button>
    <button id="updateWorkoutThu">Update Workout</button>
    <button id="removeWorkoutThu">Remove Workout</button>`);
    var test = "test";
    //alert(person);
    document.getElementById("removal").style.display = "none";
    //var documentReference = id;
    //var user = person;
    //console.log("the docref id: " ,documentReference);
    //console.log("the user: " ,user);
    let documentReference = sessionStorage.getItem("username");
    var docId = documentReference.trim();
    console.log("docref is" , documentReference);
    
    console.log (docId);
    var databasePrimer = _db.collection("workoutApp").doc(`${docId}`).collection("thursdayWorkouts");

     // aWa5DF8AlSNyLU5e1kON
    // _db
    // .collection("workoutApp")
    // //.where("username", "==", user)
    // .doc(`aWa5DF8AlSNyLU5e1kON`)
    // // .get()
    // // .then(snapDoc=>{
    // //     console.log(snapDoc);
    // // })
    // .collection("mondayWorkouts")
    databasePrimer
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let info = doc.data();
            console.log(info);
            $(".content")
            .append(`<div class="row"><p>-----</p>
            <h4>Workout: ${info.workoutName}</h4>
            <h4>Personal Best: ${info.personalBest}</h4>
            <img src="${info.visual}">
            <h4>Personal Best: ${info.personalBest}</h4>
            <h4>Reps: ${info.reps }</h4><h4>Sets: ${info.sets }</h4>
            <h4>Notes: ${info.notes }</h4>
            
           </div>`);

                
        });
        
    });
    

    $( "#addWorkoutThu" ).click(function() {
        //console.log("bleh");
        $(".content").html(`<h3>Thursday Workouts</h3>
        <h3>Add a New Workout</h3>
        <input id="workoutName" type="text" placeholder="Workout Name"></input>
        <input id="reps" type="text" placeholder="Reps (if applicable)"></input>
        <input id="sets" type="text" placeholder="Sets (if applicable)"></input>
        <input id="time" type="text" placeholder="Time (if applicable)"></input>
        <input id="visual" type="text" placeholder="Image URL"></input>
        <input id="personalBest" type="text" placeholder="Personal Best"></input>
        <input id="notes" type="text" placeholder="Notes"></input>
        <button id="formsubmit">Add New Workout</button><button id="back">Back</button>`);
        
        $( "#formsubmit" ).click(function() {
            //console.log("yes yes yes");
            var workName = $('#workoutName').val();
            var reps = $('#reps').val();
            var sets = $('#sets').val();
            var time = $('#time').val();
            var visual = $('#visual').val();
            var personalBest = $('#personalBest').val();
            var notes = $('#notes').val();
            

                databasePrimer
                .add({
                    workoutName: workName,
                    reps: reps,
                    sets: sets,
                    time: time,
                    visual:visual,
                    personalBest:personalBest,
                    notes:notes
                })
                .then(function(docRef) {
                    alert("Your workout has been added!");
                    console.log("the docref is being pulled" , docRef.id);
                    let documentReference = sessionStorage.getItem("username");
                    var docId = documentReference.trim();
                    var addFieldId = _db.collection("workoutApp").doc(docId).collection("thursdayWorkouts").doc(docRef.id);
                    

                    //update data
                    return addFieldId.update({
                        fieldref:docRef.id
                    })
                    .then(function() {
                        console.log("Document successfully updated!");

                        pullCollectionThursday();
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });

                    
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        });
        $( "#back" ).click(function() {
            pullCollectionThursday();
        });

      });


    $( "#updateWorkoutThu" ).click(function() {
        console.log("This begins the updating adventure");

        $(".content").html(`<h3>Thursday Workouts</h3>
        
        <h4>Select Which Workout To Update</h4><button id="back">Back</button>`);
        

        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log("Update Data Array",info);

                

                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonUpdate" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonUpdate" ).click(function() {
                //var removalFieldRef = info.fieldref;
                //sessionStorage.setItem("updateDataInfo", JSON.stringify(info));
                

                var updateId = $(this).attr('value').trim();
                console.log("Update Pressed", updateId);
                sessionStorage.setItem("updatingId", updateId);   
                let yeetReference = sessionStorage.getItem("updatingId").trim();

                databasePrimer
                .doc(yeetReference)
                .get()
                .then(function(doc){
                    
                        let info = doc.data();
                        console.log("Update Data Array",info);

                          

                        $(".content").html(`<h3>Thursday Workouts</h3>
                        <h3>Update Your Workout</h3>
                        <input id="workoutName" type="text" value="${info.workoutName}"></input>
                        <input id="reps" type="text" value="${info.reps}"></input>
                        <input id="sets" type="text" value="${info.sets}"></input>
                        <input id="time" type="text" value="${info.time}"></input>
                        <input id="visual" type="text" value="${info.visual}"></input>
                        <input id="personalBest" type="text" value="${info.personalBest}"></input>
                        <input id="notes" type="text" value="${info.notes}"></input>
                        <button id="formsubmit">Update Workout</button><button id="back">Exit</button>`);

                        $( "#formsubmit" ).click(function() {
                            console.log("Going Sicko Mode")

                            var workName = $('#workoutName').val();
                            var reps = $('#reps').val();
                            var sets = $('#sets').val();
                            var time = $('#time').val();
                            var visual = $('#visual').val();
                            var personalBest = $('#personalBest').val();
                            var notes = $('#notes').val();

                            return databasePrimer.doc(yeetReference).update({
                                workoutName: workName,
                                reps: reps,
                                sets: sets,
                                time: time,
                                visual:visual,
                                personalBest:personalBest,
                                notes:notes
                            })
                            .then(function() {
                                alert("Your workout has been updated!");
                                pullCollectionThursday();
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                        });

                        $( "#back" ).click(function() {
                            pullCollectionThursday();
                        });
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");

                    
                            
                    
                });          
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionThursday();
        });

    });

    $( "#removeWorkoutThu" ).click(function() {
        

        console.log("Thus begins the adventures of removing workouts.")
        $(".content").html(`<h3>Thursday Workouts</h3>
        
        <h4>Select Which Workout To Delete</h4><button id="back">Back</button>`);


        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log(info);
                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonRemove" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonRemove" ).click(function() {
                //var removalFieldRef = info.fieldref;
                var removalId = $(this).attr('value').trim();
                console.log("button pressed", removalId );
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");
                databasePrimer.doc(removalId).delete().then(function() {
                    alert("Your Workout has been Removed!");
                    pullCollectionThursday();
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionThursday();
        });

     }); 
      
}

export function pullCollectionFriday(){
    $(".content").html(`<h3>Friday Workouts</h3>
    <button id="addWorkoutFri">Add Workout</button>
    <button id="updateWorkoutFri">Update Workout</button>
    <button id="removeWorkoutFri">Remove Workout</button>`);
    var test = "test";
    //alert(person);
    document.getElementById("removal").style.display = "none";
    //var documentReference = id;
    //var user = person;
    //console.log("the docref id: " ,documentReference);
    //console.log("the user: " ,user);
    let documentReference = sessionStorage.getItem("username");
    var docId = documentReference.trim();
    console.log("docref is" , documentReference);
    
    console.log (docId);
    var databasePrimer = _db.collection("workoutApp").doc(`${docId}`).collection("fridayWorkouts");

     // aWa5DF8AlSNyLU5e1kON
    // _db
    // .collection("workoutApp")
    // //.where("username", "==", user)
    // .doc(`aWa5DF8AlSNyLU5e1kON`)
    // // .get()
    // // .then(snapDoc=>{
    // //     console.log(snapDoc);
    // // })
    // .collection("mondayWorkouts")
    databasePrimer
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let info = doc.data();
            console.log(info);
            $(".content")
            .append(`<div class="row"><p>-----</p>
            <h4>Workout: ${info.workoutName}</h4>
            <h4>Personal Best: ${info.personalBest}</h4>
            <img src="${info.visual}">
            <h4>Personal Best: ${info.personalBest}</h4>
            <h4>Reps: ${info.reps }</h4><h4>Sets: ${info.sets }</h4>
            <h4>Notes: ${info.notes }</h4>
            
           </div>`);

                
        });
        
    });
    

    $( "#addWorkoutFri" ).click(function() {
        //console.log("bleh");
        $(".content").html(`<h3>Friday Workouts</h3>
        <h3>Add a New Workout</h3>
        <input id="workoutName" type="text" placeholder="Workout Name"></input>
        <input id="reps" type="text" placeholder="Reps (if applicable)"></input>
        <input id="sets" type="text" placeholder="Sets (if applicable)"></input>
        <input id="time" type="text" placeholder="Time (if applicable)"></input>
        <input id="visual" type="text" placeholder="Image URL"></input>
        <input id="personalBest" type="text" placeholder="Personal Best"></input>
        <input id="notes" type="text" placeholder="Notes"></input>
        <button id="formsubmit">Add New Workout</button><button id="back">Back</button>`);
        
        $( "#formsubmit" ).click(function() {
            //console.log("yes yes yes");
            var workName = $('#workoutName').val();
            var reps = $('#reps').val();
            var sets = $('#sets').val();
            var time = $('#time').val();
            var visual = $('#visual').val();
            var personalBest = $('#personalBest').val();
            var notes = $('#notes').val();
            

                databasePrimer
                .add({
                    workoutName: workName,
                    reps: reps,
                    sets: sets,
                    time: time,
                    visual:visual,
                    personalBest:personalBest,
                    notes:notes
                })
                .then(function(docRef) {
                    alert("Your workout has been added!");
                    console.log("the docref is being pulled" , docRef.id);
                    let documentReference = sessionStorage.getItem("username");
                    var docId = documentReference.trim();
                    var addFieldId = _db.collection("workoutApp").doc(docId).collection("fridayWorkouts").doc(docRef.id);
                    

                    //update data
                    return addFieldId.update({
                        fieldref:docRef.id
                    })
                    .then(function() {
                        console.log("Document successfully updated!");

                        pullCollectionFriday();
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });

                    
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        });
        $( "#back" ).click(function() {
            pullCollectionFriday();
        });

      });


    $( "#updateWorkoutFri" ).click(function() {
        console.log("This begins the updating adventure");

        $(".content").html(`<h3>Friday Workouts</h3>
        
        <h4>Select Which Workout To Update</h4><button id="back">Back</button>`);
        

        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log("Update Data Array",info);

                

                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonUpdate" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonUpdate" ).click(function() {
                //var removalFieldRef = info.fieldref;
                //sessionStorage.setItem("updateDataInfo", JSON.stringify(info));
                

                var updateId = $(this).attr('value').trim();
                console.log("Update Pressed", updateId);
                sessionStorage.setItem("updatingId", updateId);   
                let yeetReference = sessionStorage.getItem("updatingId").trim();

                databasePrimer
                .doc(yeetReference)
                .get()
                .then(function(doc){
                    
                        let info = doc.data();
                        console.log("Update Data Array",info);

                          

                        $(".content").html(`<h3>Friday Workouts</h3>
                        <h3>Update Your Workout</h3>
                        <input id="workoutName" type="text" value="${info.workoutName}"></input>
                        <input id="reps" type="text" value="${info.reps}"></input>
                        <input id="sets" type="text" value="${info.sets}"></input>
                        <input id="time" type="text" value="${info.time}"></input>
                        <input id="visual" type="text" value="${info.visual}"></input>
                        <input id="personalBest" type="text" value="${info.personalBest}"></input>
                        <input id="notes" type="text" value="${info.notes}"></input>
                        <button id="formsubmit">Update Workout</button><button id="back">Exit</button>`);

                        $( "#formsubmit" ).click(function() {
                            console.log("Going Sicko Mode")

                            var workName = $('#workoutName').val();
                            var reps = $('#reps').val();
                            var sets = $('#sets').val();
                            var time = $('#time').val();
                            var visual = $('#visual').val();
                            var personalBest = $('#personalBest').val();
                            var notes = $('#notes').val();

                            return databasePrimer.doc(yeetReference).update({
                                workoutName: workName,
                                reps: reps,
                                sets: sets,
                                time: time,
                                visual:visual,
                                personalBest:personalBest,
                                notes:notes
                            })
                            .then(function() {
                                alert("Your workout has been updated!");
                                pullCollectionFriday();
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                        });

                        $( "#back" ).click(function() {
                            pullCollectionFriday();
                        });
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");

                    
                            
                    
                });          
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionFriday();
        });

    });

    $( "#removeWorkoutFri" ).click(function() {
        

        console.log("Thus begins the adventures of removing workouts.")
        $(".content").html(`<h3>Friday Workouts</h3>
        
        <h4>Select Which Workout To Delete</h4><button id="back">Back</button>`);


        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log(info);
                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonRemove" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonRemove" ).click(function() {
                //var removalFieldRef = info.fieldref;
                var removalId = $(this).attr('value').trim();
                console.log("button pressed", removalId );
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");
                databasePrimer.doc(removalId).delete().then(function() {
                    alert("Your Workout has been Removed!");
                    pullCollectionFriday();
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionFriday();
        });

     }); 
      
}

export function pullCollectionSaturday(){
    $(".content").html(`<h3>Saturday Workouts</h3>
    <button id="addWorkoutSat">Add Workout</button>
    <button id="updateWorkoutSat">Update Workout</button>
    <button id="removeWorkoutSat">Remove Workout</button>`);
    var test = "test";
    //alert(person);
    document.getElementById("removal").style.display = "none";
    //var documentReference = id;
    //var user = person;
    //console.log("the docref id: " ,documentReference);
    //console.log("the user: " ,user);
    let documentReference = sessionStorage.getItem("username");
    var docId = documentReference.trim();
    console.log("docref is" , documentReference);
    
    console.log (docId);
    var databasePrimer = _db.collection("workoutApp").doc(`${docId}`).collection("saturdayWorkouts");

     // aWa5DF8AlSNyLU5e1kON
    // _db
    // .collection("workoutApp")
    // //.where("username", "==", user)
    // .doc(`aWa5DF8AlSNyLU5e1kON`)
    // // .get()
    // // .then(snapDoc=>{
    // //     console.log(snapDoc);
    // // })
    // .collection("mondayWorkouts")
    databasePrimer
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let info = doc.data();
            console.log(info);
            $(".content")
            .append(`<div class="row"><p>-----</p>
            <h4>Workout: ${info.workoutName}</h4>
            <h4>Personal Best: ${info.personalBest}</h4>
            <img src="${info.visual}">
            <h4>Personal Best: ${info.personalBest}</h4>
            <h4>Reps: ${info.reps }</h4><h4>Sets: ${info.sets }</h4>
            <h4>Notes: ${info.notes }</h4>
            
           </div>`);

                
        });
        
    });
    

    $( "#addWorkoutSat" ).click(function() {
        //console.log("bleh");
        $(".content").html(`<h3>Saturday Workouts</h3>
        <h3>Add a New Workout</h3>
        <input id="workoutName" type="text" placeholder="Workout Name"></input>
        <input id="reps" type="text" placeholder="Reps (if applicable)"></input>
        <input id="sets" type="text" placeholder="Sets (if applicable)"></input>
        <input id="time" type="text" placeholder="Time (if applicable)"></input>
        <input id="visual" type="text" placeholder="Image URL"></input>
        <input id="personalBest" type="text" placeholder="Personal Best"></input>
        <input id="notes" type="text" placeholder="Notes"></input>
        <button id="formsubmit">Add New Workout</button><button id="back">Back</button>`);
        
        $( "#formsubmit" ).click(function() {
            //console.log("yes yes yes");
            var workName = $('#workoutName').val();
            var reps = $('#reps').val();
            var sets = $('#sets').val();
            var time = $('#time').val();
            var visual = $('#visual').val();
            var personalBest = $('#personalBest').val();
            var notes = $('#notes').val();
            

                databasePrimer
                .add({
                    workoutName: workName,
                    reps: reps,
                    sets: sets,
                    time: time,
                    visual:visual,
                    personalBest:personalBest,
                    notes:notes
                })
                .then(function(docRef) {
                    alert("Your workout has been added!");
                    console.log("the docref is being pulled" , docRef.id);
                    let documentReference = sessionStorage.getItem("username");
                    var docId = documentReference.trim();
                    var addFieldId = _db.collection("workoutApp").doc(docId).collection("saturdayWorkouts").doc(docRef.id);
                    

                    //update data
                    return addFieldId.update({
                        fieldref:docRef.id
                    })
                    .then(function() {
                        console.log("Document successfully updated!");

                        pullCollectionSaturday();
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });

                    
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        });
        $( "#back" ).click(function() {
            pullCollectionSaturday();
        });

      });


    $( "#updateWorkoutSat" ).click(function() {
        console.log("This begins the updating adventure");

        $(".content").html(`<h3>Saturday Workouts</h3>
        
        <h4>Select Which Workout To Update</h4><button id="back">Back</button>`);
        

        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log("Update Data Array",info);

                

                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonUpdate" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonUpdate" ).click(function() {
                //var removalFieldRef = info.fieldref;
                //sessionStorage.setItem("updateDataInfo", JSON.stringify(info));
                

                var updateId = $(this).attr('value').trim();
                console.log("Update Pressed", updateId);
                sessionStorage.setItem("updatingId", updateId);   
                let yeetReference = sessionStorage.getItem("updatingId").trim();

                databasePrimer
                .doc(yeetReference)
                .get()
                .then(function(doc){
                    
                        let info = doc.data();
                        console.log("Update Data Array",info);

                          

                        $(".content").html(`<h3>Saturday Workouts</h3>
                        <h3>Update Your Workout</h3>
                        <input id="workoutName" type="text" value="${info.workoutName}"></input>
                        <input id="reps" type="text" value="${info.reps}"></input>
                        <input id="sets" type="text" value="${info.sets}"></input>
                        <input id="time" type="text" value="${info.time}"></input>
                        <input id="visual" type="text" value="${info.visual}"></input>
                        <input id="personalBest" type="text" value="${info.personalBest}"></input>
                        <input id="notes" type="text" value="${info.notes}"></input>
                        <button id="formsubmit">Update Workout</button><button id="back">Exit</button>`);

                        $( "#formsubmit" ).click(function() {
                            console.log("Going Sicko Mode")

                            var workName = $('#workoutName').val();
                            var reps = $('#reps').val();
                            var sets = $('#sets').val();
                            var time = $('#time').val();
                            var visual = $('#visual').val();
                            var personalBest = $('#personalBest').val();
                            var notes = $('#notes').val();

                            return databasePrimer.doc(yeetReference).update({
                                workoutName: workName,
                                reps: reps,
                                sets: sets,
                                time: time,
                                visual:visual,
                                personalBest:personalBest,
                                notes:notes
                            })
                            .then(function() {
                                alert("Your workout has been updated!");
                                pullCollectionSaturday();
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                        });

                        $( "#back" ).click(function() {
                            pullCollectionSaturday();
                        });
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");

                    
                            
                    
                });          
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionSaturday();
        });

    });

    $( "#removeWorkoutSat" ).click(function() {
        

        console.log("Thus begins the adventures of removing workouts.")
        $(".content").html(`<h3>Saturday Workouts</h3>
        
        <h4>Select Which Workout To Delete</h4><button id="back">Back</button>`);


        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log(info);
                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonRemove" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonRemove" ).click(function() {
                //var removalFieldRef = info.fieldref;
                var removalId = $(this).attr('value').trim();
                console.log("button pressed", removalId );
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");
                databasePrimer.doc(removalId).delete().then(function() {
                    alert("Your Workout has been Removed!");
                    pullCollectionSaturday();
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionSaturday();
        });

     }); 
      
}

export function pullCollectionSunday(){
    $(".content").html(`<h3>Sunday Workouts</h3>
    <button id="addWorkoutSun">Add Workout</button>
    <button id="updateWorkoutSun">Update Workout</button>
    <button id="removeWorkoutSun">Remove Workout</button>`);
    var test = "test";
    //alert(person);
    document.getElementById("removal").style.display = "none";
    //var documentReference = id;
    //var user = person;
    //console.log("the docref id: " ,documentReference);
    //console.log("the user: " ,user);
    let documentReference = sessionStorage.getItem("username");
    var docId = documentReference.trim();
    console.log("docref is" , documentReference);
    
    console.log (docId);
    var databasePrimer = _db.collection("workoutApp").doc(`${docId}`).collection("sundayWorkouts");

     // aWa5DF8AlSNyLU5e1kON
    // _db
    // .collection("workoutApp")
    // //.where("username", "==", user)
    // .doc(`aWa5DF8AlSNyLU5e1kON`)
    // // .get()
    // // .then(snapDoc=>{
    // //     console.log(snapDoc);
    // // })
    // .collection("mondayWorkouts")
    databasePrimer
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let info = doc.data();
            console.log(info);
            $(".content")
            .append(`<div class="row"><p>-----</p>
            <h4>Workout: ${info.workoutName}</h4>
            <h4>Personal Best: ${info.personalBest}</h4>
            <img src="${info.visual}">
            <h4>Personal Best: ${info.personalBest}</h4>
            <h4>Reps: ${info.reps }</h4><h4>Sets: ${info.sets }</h4>
            <h4>Notes: ${info.notes }</h4>
            
           </div>`);

                
        });
        
    });
    

    $( "#addWorkoutSun" ).click(function() {
        //console.log("bleh");
        $(".content").html(`<h3>Sunday Workouts</h3>
        <h3>Add a New Workout</h3>
        <input id="workoutName" type="text" placeholder="Workout Name"></input>
        <input id="reps" type="text" placeholder="Reps (if applicable)"></input>
        <input id="sets" type="text" placeholder="Sets (if applicable)"></input>
        <input id="time" type="text" placeholder="Time (if applicable)"></input>
        <input id="visual" type="text" placeholder="Image URL"></input>
        <input id="personalBest" type="text" placeholder="Personal Best"></input>
        <input id="notes" type="text" placeholder="Notes"></input>
        <button id="formsubmit">Add New Workout</button><button id="back">Back</button>`);
        
        $( "#formsubmit" ).click(function() {
            //console.log("yes yes yes");
            var workName = $('#workoutName').val();
            var reps = $('#reps').val();
            var sets = $('#sets').val();
            var time = $('#time').val();
            var visual = $('#visual').val();
            var personalBest = $('#personalBest').val();
            var notes = $('#notes').val();
            

                databasePrimer
                .add({
                    workoutName: workName,
                    reps: reps,
                    sets: sets,
                    time: time,
                    visual:visual,
                    personalBest:personalBest,
                    notes:notes
                })
                .then(function(docRef) {
                    alert("Your workout has been added!");
                    console.log("the docref is being pulled" , docRef.id);
                    let documentReference = sessionStorage.getItem("username");
                    var docId = documentReference.trim();
                    var addFieldId = _db.collection("workoutApp").doc(docId).collection("sundayWorkouts").doc(docRef.id);
                    

                    //update data
                    return addFieldId.update({
                        fieldref:docRef.id
                    })
                    .then(function() {
                        console.log("Document successfully updated!");

                        pullCollectionSunday();
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });

                    
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        });
        $( "#back" ).click(function() {
            pullCollectionSunday();
        });

      });


    $( "#updateWorkoutSun" ).click(function() {
        console.log("This begins the updating adventure");

        $(".content").html(`<h3>Sunday Workouts</h3>
        
        <h4>Select Which Workout To Update</h4><button id="back">Back</button>`);
        

        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log("Update Data Array",info);

                

                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonUpdate" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonUpdate" ).click(function() {
                //var removalFieldRef = info.fieldref;
                //sessionStorage.setItem("updateDataInfo", JSON.stringify(info));
                

                var updateId = $(this).attr('value').trim();
                console.log("Update Pressed", updateId);
                sessionStorage.setItem("updatingId", updateId);   
                let yeetReference = sessionStorage.getItem("updatingId").trim();

                databasePrimer
                .doc(yeetReference)
                .get()
                .then(function(doc){
                    
                        let info = doc.data();
                        console.log("Update Data Array",info);

                          

                        $(".content").html(`<h3>Sunday Workouts</h3>
                        <h3>Update Your Workout</h3>
                        <input id="workoutName" type="text" value="${info.workoutName}"></input>
                        <input id="reps" type="text" value="${info.reps}"></input>
                        <input id="sets" type="text" value="${info.sets}"></input>
                        <input id="time" type="text" value="${info.time}"></input>
                        <input id="visual" type="text" value="${info.visual}"></input>
                        <input id="personalBest" type="text" value="${info.personalBest}"></input>
                        <input id="notes" type="text" value="${info.notes}"></input>
                        <button id="formsubmit">Update Workout</button><button id="back">Exit</button>`);

                        $( "#formsubmit" ).click(function() {
                            console.log("Going Sicko Mode")

                            var workName = $('#workoutName').val();
                            var reps = $('#reps').val();
                            var sets = $('#sets').val();
                            var time = $('#time').val();
                            var visual = $('#visual').val();
                            var personalBest = $('#personalBest').val();
                            var notes = $('#notes').val();

                            return databasePrimer.doc(yeetReference).update({
                                workoutName: workName,
                                reps: reps,
                                sets: sets,
                                time: time,
                                visual:visual,
                                personalBest:personalBest,
                                notes:notes
                            })
                            .then(function() {
                                alert("Your workout has been updated!");
                                pullCollectionSunday();
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                        });

                        $( "#back" ).click(function() {
                            pullCollectionSunday();
                        });
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");

                    
                            
                    
                });          
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionSunday();
        });

    });

    $( "#removeWorkoutSun" ).click(function() {
        

        console.log("Thus begins the adventures of removing workouts.")
        $(".content").html(`<h3>Sunday Workouts</h3>
        
        <h4>Select Which Workout To Delete</h4><button id="back">Back</button>`);


        databasePrimer
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let info = doc.data();
                console.log(info);
                $(".content")
                .append(`<div class="row" value="${info.fieldref}"><p>-----</p>
                <button class="buttonRemove" value="${info.fieldref}">${info.workoutName}</button>
                
            </div>`);

            
                    
            });

            $( ".buttonRemove" ).click(function() {
                //var removalFieldRef = info.fieldref;
                var removalId = $(this).attr('value').trim();
                console.log("button pressed", removalId );
                
                //var databasePrimer = _db.collection("workoutApp").doc(docId).collection("mondayWorkouts");
                databasePrimer.doc(removalId).delete().then(function() {
                    alert("Your Workout has been Removed!");
                    pullCollectionSunday();
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
                
            });
        });


       
        $( "#back" ).click(function() {
            pullCollectionSunday();
        });

     }); 
      
}

export function signUp(){
    console.log("signUp");
    

    $(".content").html(`
    <h3>Sign Up</h3>
    <input id="signUpUser" type="text" placeholder="username"></input>
    <input id="signUpPass" type="text" placeholder ="password"></input>
    <button id="formsubmit">Register</button><button id="back">Exit</button>`);

    $( "#formsubmit" ).click(function() {
        //console.log("yes yes yes");
        var signUpUserName = $('#signUpUser').val();
        var signUpPassword = $('#signUpPass').val();
        //var signUpPrimer = _db.collection("workoutApp");

        _db.collection("workoutApp").add({
            username: signUpUserName,
            password: signUpPassword
        })
        .then(function(docRef) {
            alert("You have been added! Please Log In!");
            console.log("Document written with ID: ", docRef.id);
            sessionStorage.setItem("signUpRef", docRef.id);
            let signUpReference = sessionStorage.getItem("signUpRef");

            var docId = signUpReference.trim();
            console.log("DocID ",docId)
            var addFieldId = _db.collection("workoutApp").doc(docId);
            console.log("DocID ",docId)
             //update data
             return addFieldId.update({
                docref:docId
            })
            .then(function() {
                console.log("Document successfully updated!");

                $(".content").html('')
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
            
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

        

    });

    $( "#back" ).click(function() {
        
        $(".content").html('')
    });
    
}



