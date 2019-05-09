let currentTravelStatus = [
    {
        profile_img: "./static/img/user_profile_img.jpg",
        background_image: "./static/img/background_image.jpg",
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
        url: "./static/img/img1.jpg",
        imgID : "img_1",
        diary: "It's Great",
        quest_content: "Visit the Statue of Liberty, and take photo",
        quest_provider_name : "Ronald Rump",
        quest_provider_picture: "./static/images/people1.jpg",
        place_name: "Statue of Liberty, New York",
        country_name: "United States America",
    },
    {
        url: "./static/img/img2.jpg",
        imgID : "img_2",
        diary: "It's Bad",
        quest_content: "Visit the Empire State Building, and take photo",
        quest_provider_name : "Obama",
        quest_provider_picture: "./static/images/people2.jpg",
        place_name: "Empire State Building, New York",
        country_name: "United States America",
    },
    {
        url: "./static/img/img3.jpg",
        imgID : "img_3",
        diary: "It feels as if I am meeting George W Bush",
        quest_content: "Visit Times Square, and take photo",
        quest_provider_name : "Dwight Eisenhower",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "Times Square, New York",
        country_name: "United States America",
    },
    {
        url: "./static/img/img5.jpg",
        imgID : "img_4",
        diary: "It feels as if I am meeting George W Bush",
        quest_content: "Visit somewhere around New York",
        quest_provider_name : "George W Bush",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "Somewhere around New York",
        country_name: "United States America",
    },
    {
        url: "./static/img/img6.jpg",
        imgID : "img_5",
        diary: "I am Iron Man",
        quest_content: "Visit Hollywoord",
        quest_provider_name : "Ronald Reagan",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "Hollywood",
        country_name: "United States America",
    },
    {
        url: "./static/img/img7.jpeg",
        imgID : "img_6",
        diary: "I am Iron Man",
        quest_content: "Visit Hollywoord",
        quest_provider_name : "Nicolas Fury",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "Hollywood",
        country_name: "United States America",
    },
    {
        url: "./static/img/img8.jpg",
        imgID : "img_7",
        diary: "Battle of New York",
        quest_content: "Battling Ultron in New York",
        quest_provider_name : "Avengers",
        quest_provider_picture: "./static/images/people3.jpg",
        place_name: "New York City",
        country_name: "United States America",
    },
    
];

let profile_image = document.getElementById("user_profile_image");
let background = document.getElementById("background");
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
let myModal = document.getElementById("exampleModal");

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
    AddBackgroundImage(currentTravelStatus[0].background_image);
}

function AddImageContent() {

    let numQuests = QuestCompleted.length;
    let numRow = Math.floor(numQuests / 3);
    let numCell= numQuests % 3;

    let countRow = 0;
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
    
    
    //let image_id = "#" + imgID;
    cell1.addEventListener("click", openModal);


    fillPhotoImage(cell1, QuestCompleted[img1].url, QuestCompleted[img1].imgID);
    if (img2 == "..") {
        cell2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    } else {
        cell2.style.paddingBottom = "30px";
        fillPhotoImage(cell2, QuestCompleted[img2].url, QuestCompleted[img2].imgID);
        cell2.addEventListener("click", function(){
            document.getElementById("modal-body").innerHTML = "";
            document.getElementById("diary").innerHTML = "";
            let createImg = document.createElement("img");
            createImg.src = QuestCompleted[img2].url;
            createImg.height = "350";
            createImg.width = "350";
            let modalBody = document.getElementById("modal-body")
            modalBody.appendChild(createImg);
            let diaryText = document.getElementById("diary");
            diaryText.innerHTML = QuestCompleted[img2].diary;
            $("#exampleModal").modal("toggle");
        });
    }

    if (img3 == "..") {
        cell3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    } else {
        cell3.style.paddingBottom = "30px";
        fillPhotoImage(cell3, QuestCompleted[img3].url, QuestCompleted[img3].imgID);
        cell3.addEventListener("click", openModal);
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
  Use this function to add the background image (chosen by the user)
*/

function AddBackgroundImage(background_image) {
    imageURL = "url(" + background_image + ")";
    document.getElementById("background").style.backgroundImage = imageURL;
}  

function openModal() {
    $("#exampleModal").modal("toggle");
}