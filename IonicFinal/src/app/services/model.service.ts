import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable,Subject} from 'rxjs';
// import { HomePage } from '../home/home.page';





@Injectable({
  providedIn: 'root'
})
export class ModelService{
  private user: any;
  public info: any;
  //myDate = new Date();
  //private homePage: HomePage,
  constructor(private firestore:AngularFirestore, private auth:AngularFireAuth) {
    // this.auth.onAuthStateChanged((user) =>{
    //   if(user){
    //     console.log("Logged In: " , user);
    //     this.user = user;
    //     this.getFirestoreData();
    //   }else{
    //     console.log("no user");
    //     this.user="";
    //     this.auth.signInAnonymously();
    //   }
    // });
   }

  

  // signInAnonymously():void{
  //   this.auth.signInAnonymously();
  // }

  // getFirestoreData():void{

  //   if(this.user){
  //     console.log("getting firestore data");

  //     let fireStoreAccess = this.firestore.collection("scrapbook");

  //     fireStoreAccess
  //     .get()
  //     .subscribe((querySnapshot)=>{
  //       querySnapshot.forEach((doc)=>{
  //         //console.log(doc.data());
  //         //console.log(doc.id);

  //         this.info = doc.data();
  //         let bleh = JSON.stringify(this.info);
          
  //         console.log("Information Demonstration", bleh)

  //         //sessionStorage.setItem('whatever', bleh);

  //       });
  //     });
  //   }  
  // }





}
