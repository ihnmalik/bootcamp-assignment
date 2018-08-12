document.getElementById("userSearchForm").addEventListener("submit", e => {
  e.preventDefault();

  let username = document.getElementById("searchbox").value;

  if (username !== "") {
    fetch(`https://api.github.com/users/${username}/followers`)
      .then(res => res.json())
      .then(followers => {
        console.log(followers);
        if (followers.length > 0) {
          allFollowers(followers);
        } else {
          errorDiv("*Usernot Found Please enter correct username");
        }
      })
      .catch(err => console.log(err));
  } else {
    errorDiv(" Please Enter a Username");
  }
});

const errorDiv = err => {
  document.getElementById("searchbox").innerHTML = "";
  document.getElementById("errorContainer").innerHTML = err;
  var followersDiv = document.getElementById("followersDiv");
  followersDiv.innerHTML = "";
};

const allFollowers = followers => {
  //   document.getElementById("errorContainer").innerHtml = "";
  var followersDiv = document.getElementById("followersDiv");
  followersDiv.innerHTML = "";

  followers.map((follower, index) => {
    followersDiv.innerHTML += `
        <div class="col-md-5 m-4">
            <div class="card card-container">
                <div class="card-header">
                    <h5 >${follower.login}</h5>
                </div>
                <img class="card-img-top margin-img" src="${
                  follower.avatar_url
                }">
               
                <div class="card-body">
                    <a href="${
                      follower.html_url
                    }" class="btn"><i class= fab fa-github></i>View Profile</a>
                </div>
            </div>
        </div>`;
  });
};
