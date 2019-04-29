let currentTravelStatus = [
    {
        profile_image: "static/img/user_profile_img.jpg",
        username: "Tony Stark",
        countries_visited: "1",
        quests_completed: "6",
        total_points: "180",
    }
]

let QuestCompleted = [
    {
        photos_uploaded: "static/img/img1.jpg",
        comment_uploaded: "It's Great",
        quest_content: "Visit the Statue of Liberty, and take photo",
        guide_profile_image: "./static/images/people1.jpg",
        location: "Statue of Liberty, New York",
        id: "QuestCompleted1"
    },
    {
        photos_uploaded: "static/img/img2.jpg",
        comment_uploaded: "It's Bad",
        quest_content: "Visit the Empire State Building, and take photo",
        guide_profile_image: "./static/images/people2.jpg",
        location: "Empire State Building, New York",
        id: "QuestCompleted2"
    },
    {
        photos_uploaded: "static/img/img3.jpg",
        comment_uploaded: "It feels as if I am meeting George W Bush",
        quest_content: "Visit Times Square, and take photo",
        guide_profile_image: "./static/images/people3.jpg",
        location: "Times Square, New York",
        id: "QuestCompleted3"
    },
    {
        photos_uploaded: "static/img/img5.jpg",
        comment_uploaded: "It feels as if I am meeting George W Bush",
        quest_content: "Visit somewhere around New York",
        guide_profile_image: "./static/images/people3.jpg",
        location: "Somewhere around New York",
        id: "QuestCompleted4"
    }
];

let profile_image = document.getElementById("user_profile_image");
let username = document.getElementById("username");
let countries_visited = document.getElementById("countries_visited");
let quests_completed = document.getElementById("quests_completed");
let total_points = document.getElementById("total_points");
let table = document.getElementById("imageTable");
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

function fillPhotoImage(divObj, img) {
    let createImage = document.createElement("img");
    createImage.src = img;
    createImage.height = "350";
    createImage.width = "350";
    divObj.appendChild(createImage);
}

function bindEvents() {
    fillProfileImage(profile_image, currentTravelStatus[0].profile_image);
    fillContent(username, currentTravelStatus[0].username);
    fillContent(countries_visited, currentTravelStatus[0].countries_visited);
    fillContent(quests_completed, currentTravelStatus[0].quests_completed);
    fillContent(total_points, currentTravelStatus[0].total_points);
    AddImageContent();
}

function AddImageContent() {
   fillPhotoImage(image1, QuestCompleted[0].photos_uploaded);
   fillPhotoImage(image2, QuestCompleted[1].photos_uploaded);
   fillPhotoImage(image3, QuestCompleted[2].photos_uploaded);
} 