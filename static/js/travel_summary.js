let currentTravelStatus = [
    {
        profile_image: "./static/img/user_profile_img.jpg",
        username: "Tony Stark",
        profile_status: "Genius billionare, playboy, philantropist",
        level: "35",
        countries_visited: "1",
        quests_completed: "6",
        total_points: "180",
    }
]

let QuestCompleted = [
    {
        photos_uploaded: "./static/img/img1.jpg",
        comment_uploaded: "It's Great",
        quest_content: "Visit the Statue of Liberty, and take photo",
        guide_profile_image: "./static/images/people1.jpg",
        location: "Statue of Liberty, New York",
        id: "QuestCompleted1"
    },
    {
        photos_uploaded: "./static/img/img2.jpg",
        comment_uploaded: "It's Bad",
        quest_content: "Visit the Empire State Building, and take photo",
        guide_profile_image: "./static/images/people2.jpg",
        location: "Empire State Building, New York",
        id: "QuestCompleted2"
    },
    {
        photos_uploaded: "./static/img/img3.jpg",
        comment_uploaded: "It feels as if I am meeting George W Bush",
        quest_content: "Visit Times Square, and take photo",
        guide_profile_image: "./static/images/people3.jpg",
        location: "Times Square, New York",
        id: "QuestCompleted3"
    },
    {
        photos_uploaded: "./static/img/img5.jpg",
        comment_uploaded: "It feels as if I am meeting George W Bush",
        quest_content: "Visit somewhere around New York",
        guide_profile_image: "./static/images/people3.jpg",
        location: "Somewhere around New York",
        id: "QuestCompleted4"
    },
    {
        photos_uploaded: "./static/img/img6.jpg",
        comment_uploaded: "I am Iron Man",
        quest_content: "Visit Hollywoord",
        guide_profile_image: "./static/images/people3.jpg",
        location: "Hollywood",
        id: "QuestCompleted5"
    },
    {
        photos_uploaded: "./static/img/img7.jpeg",
        comment_uploaded: "I am Iron Man",
        quest_content: "Visit Hollywoord",
        guide_profile_image: "./static/images/people3.jpg",
        location: "Hollywood",
        id: "QuestCompleted6"
    },
    {
        photos_uploaded: "./static/img/img8.jpg",
        comment_uploaded: "Battle of New York",
        quest_content: "Battling Ultron in New York",
        guide_profile_image: "./static/images/people3.jpg",
        location: "New York City",
        id: "QuestCompleted6"
    }
];

let profile_image = document.getElementById("user_profile_image");
let username = document.getElementById("username");
let level = document.getElementById("level");
let profile_status = document.getElementById("profile_status");
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
    fillContent(level, ("Level " + currentTravelStatus[0].level));
    fillContent(profile_status, currentTravelStatus[0].profile_status);
    fillContent(countries_visited, currentTravelStatus[0].countries_visited);
    fillContent(quests_completed, currentTravelStatus[0].quests_completed);
    fillContent(total_points, currentTravelStatus[0].total_points);
    AddImageContent();
}

function AddImageContent() {
    fillPhotoImage(image1, QuestCompleted[0].photos_uploaded);
    fillPhotoImage(image2, QuestCompleted[1].photos_uploaded);
    fillPhotoImage(image3, QuestCompleted[2].photos_uploaded);

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
            AddRows(countRow, img1, img2, img3);
            countRow += 1;
        }
        
        let countCell = 0;
        if (numCell == 1) {
            let lastImg1 = countRow * 3 + countCell;
            let lastImg2 = "..";
            let lastImg3 = "..";
            AddRows(countRow, lastImg1, lastImg2, lastImg3);

        } if (numCell == 2) {
            let lastImg1 = countRow * 3 + countCell;
            let lastImg2 = countRow * 3 + countCell + 1;
            let lastImg3 = "..";
            AddRows(countRow, lastImg1, lastImg2, lastImg3);
        } if (numCell == 0) {
            let lastImg1 = countRow * 3 + countCell;
            let lastImg2 = countRow * 3 + countCell + 1;
            let lastImg3 = countRow * 3 + countCell + 2;
            AddRows(countRow, lastImg1, lastImg2, lastImg3);
        }
    }
}

function AddRows(insertNumRow, img1, img2, img3) {
    createRow = table.insertRow(insertNumRow);
    var cell1 = createRow.insertCell(0);
    var cell2 = createRow.insertCell(1);
    var cell3 = createRow. insertCell(2);

    fillPhotoImage(cell1, QuestCompleted[img1].photos_uploaded);
    if (img2 == "..") {
        cell2.innerHTML = "";
    } else {
        fillPhotoImage(cell2, QuestCompleted[img2].photos_uploaded);
    }

    if (img3 == "..") {
        cell3.innerHTML = "";
    } else {
        fillPhotoImage(cell3, QuestCompleted[img3].photos_uploaded);
    }


}