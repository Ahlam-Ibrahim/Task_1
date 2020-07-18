
function addCategory() {
  //create the obj
  var category = new Object();
  //Retrive entered data
  category.title = document.getElementById("catTitle").value;
  //Fill the category.date property
  category.date = new Date();
  category.date = category.date.toLocaleString('default', {
    month: 'short'
  }) + " " + category.date.getDate() + " " + category.date.getFullYear();
  //setItem category in the localStorage
  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
    // "c" is used to indicate that this item is a category object
    localStorage.setItem(localStorage.clickcount, "c"+JSON.stringify(category));
  } else {
    localStorage.clickcount = 1;
    localStorage.setItem(1, "c"+JSON.stringify(category));
  }
}

function addUser() {
  //create the obj
  var userObj = new Object();
  //Retrive entered data
  userObj.name = document.getElementById("userName").value;
  userObj.email = document.getElementById("email").value;
  //setItem user in the localStorage
  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
    // "u" is used to indicate that this item is an user object
    localStorage.setItem(localStorage.clickcount, "u"+JSON.stringify(userObj));
  } else {
    localStorage.clickcount = 1;
    localStorage.setItem(1, "u"+JSON.stringify(userObj));
  }
}
