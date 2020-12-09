# 423repo
 N423 Saad Islam

Weather App: https://in-info-web4.informatics.iupui.edu/~saadisla/weatherProject/index.html

Local Storage: https://in-info-web4.informatics.iupui.edu/~saadisla/localstorage/

Album Firebase [UNAVAILABLE RIGHT NOW]: https://n423-data-saad.web.app/


==========FINAL PROJECT============


FIREBASE LINK: https://n423-data-saad.web.app/


++++++++++++++++++++++++++++++++++++++++++++++++++


INFORMATION ABOUT THE APP: 


This is a workout organizing crud application based on the previous prototype presented.
(Not as polished as the prototype, but it gets the job done!)
Uses firebase for database storage, css for styling, and jquery to run the backend.


I would've used scss, but my computer is properly out of storage and scss functions failed to function and I needed to have a little bit of styling done. 


++++++++++++++++++++++++++++++++++++++++++++++++++


CRUD FEATURES: 


==SIGN UP== 


Clicking the sign up button lets you create an account, currently rudimentary and only asks for username and password. Adds it to the database then updates the document with docref id for dynamic access to subcollections. 


==DAY WORKOUT==


Once you log in with your username, you will be greeted with a list of days and a welcome message. Clicking on a day will open "XXXXXXX Workouts" with the options to add, update, and delete. If there are no workouts already/this is your first time after signing up, you will want to click on add workout first.


==ADD WORKOUT==


Clicking add workout gives you a form. Simply fill the information out and click on the "Add New Workout" button. This will send you back to the page for the day you were on with the workout updated. Image URLs for images. (Create + Read)


==UPDATE WORKOUT==


Clicking the update workout button pulls a dropdown of each workout you have in the day, and then you can click on the workout you wish to update. This opens a form with the information you currently have. Change the information fields you wish to change and click on "Update Workout" to update the workout. (Update)


==DELETE WORKOUT==


Click on the "Remove Workout" button, which lists a dropdown with each workout you have. Click the workout you wish to delete and it will be deleted. (Delete)

==========N322 FINAL PROJECT============


WEB4 LINK: https://in-info-web4.informatics.iupui.edu/~saadisla/artBookUnlimited/www/home
++++++++++++++++++++++++++++++++++++


INFORMATION ABOUT THE APP:


This is an open access partial CRUD application which currently features the abilities to add and read information from a firebase collection. The purpose of this application is for anyone in the world to upload art for anyone else (in possession of this link) to view. All of this art is then displayed on an ionic framework application. Primary languages used include angular, ionic html elements, and scss. The application was built into a PWA and uploaded to web4 for viewing. 


++++++++++++++++++++++++++++++++++++


CRUD INFORMATION: 


Currently, the app features Create and Read. I intend to revisit this over break and improve upon it by adding the full CRUD suite, as well as admin authentication for increased access. Additionally, some additional error handling features will be added.


========CREATE + READ========


Visitors can click on the “Add Art” button and fill out the required fields to upload an image of their choice to Firestore. In the future, we will improve upon the app by allowing image uploads instead only URL image uploads. This information is sent to the Cloud Firestore and added as a new document. The page then refreshes, including the newly added item. They are displayed using ionic cards and spaced out using SCSS and flex.


========ABOUT========


Clicking the about button uses Angular’s in built routing system to take you to an about page, which more information and guidelines about the website. Clicking back to home will return you to the home page.


=================HAVE A GOOD DAY===================