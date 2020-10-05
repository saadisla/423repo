

var students = {
  Students: [],
};

function clicklisten() {
  

  var name1 = document.getElementById("firstName").value;
  var name2 = document.getElementById("lastName").value;
  var newAge = document.getElementById("age").value;
  var newPhone = document.getElementById("phone").value;
  var newEmail = document.getElementById("email").value;
  var newAddress = document.getElementById("address").value;
  var newClasses = document.getElementById("classes").value;

  students.Students.push({
    firstName: name1,
    lastName: name2,
    age: newAge,
    phone: newPhone,
    email: newEmail,
    address: newAddress,
    classes: newClasses,
  });
  localStorage.setItem("students", JSON.stringify(students));

  alert("Student Added: " + name1 + " " + name2);

  var parsedInfo = JSON.parse(localStorage.getItem("students"));
  console.log(parsedInfo);

  var i = "";

  for (i in parsedInfo.Students) {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").innerHTML +=
      "<h2>Most Recent Addition:</h2><p>Name= " +
      parsedInfo.Students[i].firstName +
      " " +
      parsedInfo.Students[i].lastName +
      "</p>" +
      "<p> Age= " +
      parsedInfo.Students[i].age +
      "</p>" +
      "<p> Phone Number= " +
      parsedInfo.Students[i].phone +
      "</p>" +
      "<p>Email= " +
      parsedInfo.Students[i].email +
      "</p>" +
      "<p>Address= " +
      parsedInfo.Students[i].address +
      "</p>" +
      "<p>Classes= " +
      parsedInfo.Students[i].classes +
      "</p>";
  }
}

function clickShow() {
  document.getElementById("content").innerHTML = "";
  var parsedInfo = JSON.parse(localStorage.getItem("students"));
  console.log(parsedInfo);

  var i = "";

  for (i in parsedInfo.Students) {
    console.log(parsedInfo.Students[i].firstName);
    document.getElementById("content").innerHTML +=
      "<h2>" +
      parsedInfo.Students[i].firstName +
      " " +
      parsedInfo.Students[i].lastName +
      "</h2>" +
      "<p> Age= " +
      parsedInfo.Students[i].age +
      "</p>" +
      "<p> Phone Number= " +
      parsedInfo.Students[i].phone +
      "</p>" +
      "<p>Email= " +
      parsedInfo.Students[i].email +
      "</p>" +
      "<p>Address= " +
      parsedInfo.Students[i].address +
      "</p>" +
      "<p>Classes= " +
      parsedInfo.Students[i].classes +
      "</p> <p>-----------------------</p>" ;
  }
}
