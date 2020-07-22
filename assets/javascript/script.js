function selectCategory() {
  //Displaying the list of categories titles in the select input
  var i, counterC = 0;
  for (i = 1; i <= localStorage.clickcount; i++) {
    if (localStorage.getItem(i)) {
      var storedVar = localStorage.getItem(i);
      if (storedVar.startsWith("c")) {
        counterC++;
        storedVar = storedVar.replace(storedVar.charAt(0), "");
        var categoryObject = JSON.parse(storedVar);
        var $container = $(".slectCategory");
        $container.append('<option>' + categoryObject.title + '</option>');
        localStorage.setItem(i, "c" + JSON.stringify(categoryObject));
      }
    }
  }
}

function index() {
  //Initilazing WYSIWYG - in index.html
  let editor;
  ClassicEditor
    .create(document.querySelector('#editor'))
    .then(newEditor => {
      editor = newEditor;
    })
    .catch(error => {
      console.error(error);
    });
  //Displaying the categories title in - add Post modal
  selectCategory();
  //Displaying the posts in - latest posts table
  posts();
  //to Update the number of post-categories-users displayed in the cards
  users();
  //Filling the cards
  document.getElementById('categoryNum').innerHTML = localStorage.getItem("categoryNum");
  document.getElementById('postNum').innerHTML = localStorage.getItem("postNum");
  document.getElementById('userNum').innerHTML = localStorage.getItem("userNum");
}

function categories() {
  //displaying the categories title in the latest category table
  var i, counterC = 0;
  for (i = 1; i <= localStorage.clickcount; i++) {
    if (localStorage.getItem(i)) {
      var storedVar = localStorage.getItem(i);
      if (storedVar.startsWith("c")) {
        counterC++;
        storedVar = storedVar.replace(storedVar.charAt(0), "");
        var categoryObject = JSON.parse(storedVar);
        var $container = $("#repeatC");
        $container.append('<tr><th>' + counterC + '</th><td>' + categoryObject.title + '</td><td>' + categoryObject.date +
          '</td><td> <button type = "button" class = "btn btn-secondary"> <i class = "fa fa-angle-double-right"> </i>Details</button> </td></tr>');
        localStorage.setItem(i, "c" + JSON.stringify(categoryObject));
      }
    }
  }
  localStorage.setItem("categoryNum", counterC);
}

function posts() {
  //displaying the posts in the latest posts table
  var i, counterP = 0;
  for (i = 1; i <= localStorage.clickcount; i++) {
    if (localStorage.getItem(i)) {
      var storedVar = localStorage.getItem(i);
      if (storedVar.startsWith("p")) {
        counterP++;
        storedVar = storedVar.replace(storedVar.charAt(0), "");
        var post = JSON.parse(storedVar);
        var $container = $("#showPosts, #showPosts2");
        $container.append('<tr><td>' + counterP + '</td><td>' + post.title + '</td><td>' + post.category +
          '</td><td>' + post.date + '</td><td><button type = "button" class = "btn btn-secondary" onclick="edit(' + i + ')"><i class = "fa fa-angle-double-right"></i>Details</button></td></tr>');
        localStorage.setItem(i, "p" + JSON.stringify(post));
      }
    }
  }
  localStorage.setItem("postNum", counterP);
}

function editContent() {
  let editor;
  ClassicEditor
    .create(document.querySelector('#editor1'))
    .then(newEditor => {
      editor = newEditor;
    })
    .catch(error => {
      console.error(error);
    });
    //Displaying the categories titles in - select input
    selectCategory();
    //Displaying info of the post in the input
  if (localStorage.getItem("postKey")) {
    var i = localStorage.getItem("postKey");
    editpost = localStorage.getItem(i);
    editpost = editpost.replace(editpost.charAt(0), "");
    editpost = JSON.parse(editpost);
    //title in the title input
    document.getElementById("editTitle").placeholder = editpost.title;
    //selected category in the select input
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

function users() {
  //Displaying user in - latest users table
  var i, counterU = 0;
  for (i = 1; i <= localStorage.clickcount; i++) {
    if (localStorage.getItem(i)) {
      var storedVar = localStorage.getItem(i);
      if (storedVar.startsWith("u")) {
        counterU++;
        storedVar = storedVar.replace(storedVar.charAt(0), "");
        var user = JSON.parse(storedVar);
        var $container = $("#repeatU");
        $container.append('<tr><td>' + counterU + '</td><td>' + user.name + '</td><td>' + user.email +
          '</td><td> <button type = "button" class = "btn btn-secondary"> <i class = "fa fa-angle-double-right"> </i>Details</button> </td></tr>');
        localStorage.setItem(i, "u" + JSON.stringify(user));
      }
    }
  }
  localStorage.setItem("userNum", counterU);
}

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
}

function addUser() {
  //create the obj
  var user = new Object();
  //Retrive entered data
  user.name = document.getElementById("userName").value;
  user.email = document.getElementById("email").value;
  //setItem user in the localStorage
  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
    // "u" is used to indicate that this item is a user object
    localStorage.setItem(localStorage.clickcount, "u" + JSON.stringify(user));
  } else {
    localStorage.clickcount = 1;
    localStorage.setItem(1, "u" + JSON.stringify(user));
  }
}

function addPost() {
  //create the obj
  var post = new Object();
  //Retrive entered data
  post.title = document.getElementById("postTitle").value;
  var e = document.getElementById("postCategory");
  post.category = e.options[e.selectedIndex].text;
  post.content = "nn"; /*editor.getData(); Erroe!! FIX THIS ***********/
  post.date = new Date();
  post.date = post.date.toLocaleString('default', {
    month: 'short'
  }) + " " + post.date.getDate() + " " + post.date.getFullYear();
  //setItem post in the localStorage
  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
    // "p" is used to indicate that this item is a post object
    //    alert("mew item" + localStorage.clickcount);
    localStorage.setItem(localStorage.clickcount, "p" + JSON.stringify(post));
  } else {
    localStorage.clickcount = 1;
    localStorage.setItem(1, "p" + JSON.stringify(post));
  }
}


function edit(i) {
  //Sending the key of the post the user clicked on
  localStorage.setItem("postKey", i);
  window.location.href = "editPost.html";
}

function savePost() {
  //Saving the chamges made by the user
  if (localStorage.getItem("postKey")) {
    var i = localStorage.getItem("postKey");
    editpost = localStorage.getItem(i);
    editpost = editpost.replace(editpost.charAt(0), "");
    editpost = JSON.parse(editpost);
    editpost.title = document.getElementById("editTitle").value;
    editpost.category = document.getElementById("editCategory").value;
    editpost.date = new Date();
    editpost.date = editpost.date.toLocaleString('default', {
      month: 'short'
    }) + " " + editpost.date.getDate() + " " + editpost.date.getFullYear();
    //setItem post in the localStorage
    localStorage.setItem(i, "p" + JSON.stringify(editpost));
  }
  window.location.href = 'posts.html';
}

function deletePost() {
  if (localStorage.getItem("postKey")) {
    localStorage.removeItem(localStorage.getItem("postKey"));
  }
  window.location.href = "posts.html";
}
