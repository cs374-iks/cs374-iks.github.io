let currentTravelStatus = [
    {
        profile_img: "./static/img/user_profile_img.jpg",
        username: "Anthony Edward Stark",
        total_points: "1200",
        level: "35",
        countries_visited: "1",
        quests_completed: "6",
        gained_points: "180",
    }
]

let QuestCompleted = [
    {
        place_img: "./static/img/img1.jpg",
        imgID : "img_1",
        comment_uploaded: "It's Great",
        quest_content: "Visit the Statue of Liberty, and take photo",
        quest_provider_name : "Ronald Rump",
        quest_provider_picture: "./static/images/people1.jpg",
        place_name: "Statue of Liberty, New York",
        country_name: "United States America",
        quest_id: "QuestCompleted1"
    },
    {
        place_img: "./static/img/img2.jpg",
        imgID : "img_2",
        comment_uploaded: "It's Bad",
        quest_content: "Visit the Empire State Building, and take photo",
        quest_provider_name : "Obama",
        quest_provider_picture: "./static/images/people2.jpg",
        place_name: "Empire State Building, New York",
        country_name: "United States America",
        quest_id: "QuestCompleted2"
    },
    {
        place_img: "./static/img/img3.jpg",
        imgID : "img_3",
        comment_uploaded: "It feels as if I am meeting George W Bush",
        quest_content: "Visit Times Square, and take photo",
        quest_provider_name : "Dwight Eisenhower",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "Times Square, New York",
        country_name: "United States America",
        quest_id: "QuestCompleted3"
    },
    {
        place_img: "./static/img/img5.jpg",
        imgID : "img_4",
        comment_uploaded: "It feels as if I am meeting George W Bush",
        quest_content: "Visit somewhere around New York",
        quest_provider_name : "George W Bush",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "Somewhere around New York",
        country_name: "United States America",
        quest_id: "QuestCompleted4"
    },
    {
        place_img: "./static/img/img6.jpg",
        imgID : "img_5",
        comment_uploaded: "I am Iron Man",
        quest_content: "Visit Hollywoord",
        quest_provider_name : "Ronald Reagan",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "Hollywood",
        country_name: "United States America",
        quest_id: "QuestCompleted5"
    },
    {
        place_img: "./static/img/img7.jpeg",
        imgID : "img_6",
        comment_uploaded: "I am Iron Man",
        quest_content: "Visit Hollywoord",
        quest_provider_name : "Nicolas Fury",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "Hollywood",
        country_name: "United States America",
        quest_id: "QuestCompleted6"
    },
    {
        place_img: "./static/img/img8.jpg",
        imgID : "img_7",
        comment_uploaded: "Battle of New York",
        quest_content: "Battling Ultron in New York",
        quest_provider_name : "Avengers",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "New York City",
        country_name: "United States America",
        quest_id: "QuestCompleted7"
    }
];

let profile_image = document.getElementById("user_profile_image");
let username = document.getElementById("username");
let level = document.getElementById("level");
let profile_status = document.getElementById("profile_status");
let countries_visited = document.getElementById("countries_visited");
let quests_completed = document.getElementById("quests_completed");
let gained_points = document.getElementById("gained_points");
let total_points = document.getElementById("total_points");
let table = document.getElementById("photo_section");
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");

function fillContent(divObj, content) {
    divObj.innerHTML = content;
}

function fillProfileImage(divObj, img) {
    let createImage = document.createElement("img");
    createImage.src = img;
    createImage.height = "350";
    createImage.width = "350";
    createImage.style.borderRadius = "50%";
    divObj.appendChild(createImage);
}

function fillPhotoImage(divObj, img, imgID) {
    let createImage = document.createElement("img");
    createImage.src = img;
    createImage.id = imgID;
    createImage.height = "350";
    createImage.width = "350";
    divObj.appendChild(createImage);
}

function bindEvents() {
    fillProfileImage(profile_image, currentTravelStatus[0].profile_img);
    fillContent(username, currentTravelStatus[0].username);
    fillContent(level, ("Level " + currentTravelStatus[0].level));
    fillContent(countries_visited, currentTravelStatus[0].countries_visited);
    fillContent(quests_completed, currentTravelStatus[0].quests_completed);
    fillContent(gained_points, currentTravelStatus[0].gained_points);
    AddImageContent();
}

function AddImageContent() {
    fillPhotoImage(image1, QuestCompleted[0].photos_uploaded, QuestCompleted[0].imgID);
    fillPhotoImage(image2, QuestCompleted[1].photos_uploaded, QuestCompleted[1].imgID);
    fillPhotoImage(image3, QuestCompleted[2].photos_uploaded, QuestCompleted[2].imgID);

    let numQuests = QuestCompleted.length;
    if (numQuests > 3) {
        let numRow = Math.floor(numQuests / 3);
        let numCell= numQuests % 3;

        let countRow = 1;
        while (countRow < numRow) {
            let countCell = 0;
            let img1 = countRow * 3 + countCell;
            let img2 = countRow * 3 + countCell + 1;
            let img3 = countRow * 3 + countCell + 2;
            AddRows(img1, img2, img3);
            countRow += 1;
        }
        
        let countCell = 0;
        if (numCell == 1) {
            let lastImg1 = countRow * 3 + countCell;
            let lastImg2 = "..";
            let lastImg3 = "..";
            AddRows(lastImg1, lastImg2, lastImg3);

        } if (numCell == 2) {
            let lastImg1 = countRow * 3 + countCell;
            let lastImg2 = countRow * 3 + countCell + 1;
            let lastImg3 = "..";
            AddRows(lastImg1, lastImg2, lastImg3);
        } if (numCell == 0) {
            let lastImg1 = countRow * 3 + countCell;
            let lastImg2 = countRow * 3 + countCell + 1;
            let lastImg3 = countRow * 3 + countCell + 2;
            AddRows(lastImg1, lastImg2, lastImg3);
        }
    }
}

function AddRows(img1, img2, img3) {
    createRow = document.createElement("div");
    createRow.className = "row justify-content-md-center";
    var cell1 = document.createElement("div");
    var cell2 = document.createElement("div");
    var cell3 = document.createElement("div");
    cell1.className = "col-sm-auto";
    cell1.style.paddingBottom = "30px";
    cell2.className = "col-sm-auto";
    cell3.className = "col-sm-auto";

    fillPhotoImage(cell1, QuestCompleted[img1].place_img, QuestCompleted[img1].imgID);
    if (img2 == "..") {
        cell2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        //fillPhotoImage(cell2, "./static/img/transparent_background.png", "blank");
    } else {
        cell2.style.paddingBottom = "30px";
        fillPhotoImage(cell2, QuestCompleted[img2].place_img, QuestCompleted[img2].imgID);
    }

    if (img3 == "..") {
        cell3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        //fillPhotoImage(cell3, "./static/img/transparent_background.png", "blank");
    } else {
        cell3.style.paddingBottom = "30px";
        fillPhotoImage(cell3, QuestCompleted[img3].place_img, QuestCompleted[img3].imgID);
    }

    createRow.appendChild(cell1);
    createRow.appendChild(cell2);
    createRow.appendChild(cell3);

    table.appendChild(createRow);
}

/*
    Everything below this code is coded for the xp bar animation
*/

function flicker(){
    $("#xp-increase-fx-flicker").css("opacity", "1");
    $("#xp-increase-fx-flicker").animate({"opacity":Math.random()}, 100, flicker);
  }
  
  function doit(){
    $("#xp-increase-fx").css("display","inline-block");
    $("#xp-bar-fill").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");
    setTimeout(function(){$("#xp-bar-fill").css("-webkit-transition","all 2s ease");
   $("#xp-bar-fill").css("width","75%");},100);
    setTimeout(function(){$("#xp-bar-fill").css({"-webkit-transition":"all 0.5s ease","box-shadow":""});},2000);
  }  


/*
  Everything below this code is coded for image Modals
*/
  function createModal(imgID, modalID) {
    $(imgID).click(function(){
        $(modalID).modal();
      });
  };