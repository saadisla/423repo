var _db; 

export function initFirebase(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            console.log("There is a user");
            populateAll();
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
export function filterByGenre(genre){
    $(".title").html('');

    if(genre === "None"){
        console.log("test");
        $(".content").html('');
        populateAll();
    }else{
    
        $(".content").html('');
        $(".title").append(`<h3>${genre} Albums</h3>`);

        _db
        .collection("Albums")
        .where("genre", "==", genre)
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                let album = doc.data();
                $(".content")
                .append(`<div class="row"><img src="${album.albumPhoto}"><h4>${album.albumName}</h4><h4> ${album.artistName }</h4></div>`);
            });
        });
    }
}

function populateAll(){
    $(".content").html('');
    $(".title").html('');
    $(".title").append(`<h3>All Albums</h3>`);

    _db
    .collection("Albums")
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            let album = doc.data();
            $(".content")
            .append(`<div class="row"><img src="${album.albumPhoto}"><h4>${album.albumName}</h4><h4> ${album.artistName }</h4></div>`);
        });
    });
}