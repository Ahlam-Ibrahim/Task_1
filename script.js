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
    localStorage.setItem(localStorage.clickcount, "c" + JSON.stringify(category));
  } else {
    localStorage.clickcount = 1;
    localStorage.setItem(1, "c" + JSON.stringify(category));
  }
  window.location.href = "categories.html";
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
    localStorage.setItem(localStorage.clickcount, "u" + JSON.stringify(userObj));
  } else {
    localStorage.clickcount = 1;
    localStorage.setItem(1, "u" + JSON.stringify(userObj));
  }
  window.location.href = "users.html";
}

function addPost() {
  //create the obj
  var post = new Object();
  //Retrive entered data
  post.title = document.getElementById("postTitle").value;
  var e = document.getElementById("postCategory");
  post.category = e.options[e.selectedIndex].text;
  post.content = editor.getData();
  post.date = new Date();
  post.date = post.date.toLocaleString('default', {
    month: 'short'
  }) + " " + post.date.getDate() + " " + post.date.getFullYear();
  //setItem post in the localStorage
  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
    // "p" is used to indicate that this item is a post object
    localStorage.setItem(localStorage.clickcount, "p" + JSON.stringify(post));
  } else {
    localStorage.clickcount = 1;
    localStorage.setItem(1, "p" + JSON.stringify(post));
  }
  window.location.href = "posts.html";
}


function edit(i) {
  localStorage.setItem("postKey", i);
  window.location.href = "postPage.html";
}

function editContent() {
  if (localStorage.getItem("postKey")) {
    var i = localStorage.getItem("postKey");
    editpost = localStorage.getItem(i);
    editpost = editpost.replace(editpost.charAt(0), "");
    editpost = JSON.parse(editpost);
    document.getElementById("editTitle").placeholder = editpost.title;
    var val = editpost.category;
    var sel = document.getElementById('editCategory');
    var opts = sel.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
      if (opt.value == val) {
        sel.selectedIndex = j;
        break;
      }
    }
  }
}
