import { Component } from '@angular/core';
import { ModelService } from '../services/model.service';
import { OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home, bloop',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate = new Date();
  public info : any;
  public bleh : any;
  private user: any;
  public chartData: any;
  public itemname :any;
  public author :any;
  public image :any;
  public description :any;
  public date :any;
  public hideMe : boolean;
  

  constructor(private modelService: ModelService, private firestore:AngularFirestore, private auth:AngularFireAuth) {
    this.auth.onAuthStateChanged((user) =>{
      if(user){
        console.log("Logged In: " , user);
        this.user = user;
        this.hideMe = false;
        this.getFirestoreData();
      }else{
        console.log("no user");
        this.user="";
        this.auth.signInAnonymously();
      }
    });

   
   }

  

  // signInAnonymously():void{
  //   this.auth.signInAnonymously();
  // }

  getData(event: any){
    console.log("this begins the adding adventure");
    let name = event.target.itemname.value;
    let poster = event.target.author.value;
    let img = event.target.image.value;
    let desc = event.target.description.value;
    let tiempo = event.target.date.value;

    console.log(name);
    console.log(poster);
    console.log(img);
    console.log(desc);

    if(name != '' && poster != '' && img != '' && desc !='' && tiempo !=''){

    let fireStoreAccess = this.firestore.collection("scrapbook");

    fireStoreAccess
    .add({
      itemname: name,
      author: poster,
      image: img, 
      description: desc,
      date: tiempo
    }).then(function() {
      console.log("Document successfully written!");
      window.location.reload();
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }else{
    alert("Please Input Information for all Input Fields!")
  }
    

  }

  getFirestoreData():void{

    if(this.user){
      console.log("getting firestore data");

      let fireStoreAccess = this.firestore.collection("scrapbook");

      fireStoreAccess
      .get()
      .subscribe((querySnapshot)=>{
        console.log(querySnapshot);
        this.chartData = querySnapshot.docs.map(doc => doc.data());
        console.log("chartdata:  ", this.chartData);
        
      });
    }  
  }

  hide():void {
    if(this.hideMe ==false){
    this.hideMe = true;
  }else{
    this.hideMe = false;
  }
  }


}
