document.addEventListener("DOMContentLoaded", function () {

  const APIKEY = "65bc7e87bef88d03e0d2f577";

  document.getElementById("contact-submit").addEventListener("click", function (e) {
    e.preventDefault();

    let playerName = document.getElementById("player-username").value;
    let playerPass = document.getElementById("player-password").value;
    let playerEmail = document.getElementById("player-email").value;


    let jsondata = {
      "pUsername": playerName,
      "pPassword": playerPass,
      "pEmail": playerEmail,
      "pScore": "0"
    };


    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata),
      beforeSend: function () {
        document.getElementById("contact-submit").disabled = true;
      }
    }

    fetch("https://fedassg-c160.restdb.io/rest/players", settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("contact-submit").disabled = false;
        window.location.href = "index.html"

      });
  });


  function getContacts(limit = 10, all = true) {

    let settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    }

    fetch("https://fedassg-c160.restdb.io/rest/players", settings)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let content = "";

        for (var i = 0; i < response.length && i < limit; i++) {

          content = `${content}<tr id='${response[i]._id}'>
            <td>${response[i].pName}</td>
            <td>${response[i].pPassword}</td>
            <td>${response[i].pEmail}</td>
            <td>${response[i].pScore}</td>
            <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td>
            <td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-name='${response[i].name}' data-sID='${response[i].sID}' data-sMentor='${response[i].sMentor}' data-sClass='${response[i].sClass}' data-sEmail='${response[i].sEmail}' data-sContact='${response[i].sContact}'>Update</a></td></tr>`;
        }


        document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;

        document.getElementById("total-contacts").innerHTML = response.length;
      })
  }
})