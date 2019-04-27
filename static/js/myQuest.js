let current_quest = [
    {
        profile_img:"./static/images/people1.jpg",
        quest_content: "Visit Statue of Liberty, and take photo",
        place_img : "./static/images/table1.jpg",
        place_name : "statue of liberty",
        quest_status : false
    },
    {
        profile_img:"./static/images/people1.jpg",
        quest_content: "Visit Statue of Liberty, and take photo",
        place_img : "./static/images/table1.jpg",
        place_name : "statue of liberty",
        quest_status : false
    },
    {
        profile_img:"./static/images/people1.jpg",
        quest_content: "Visit Statue of Liberty, and take photo",
        place_img : "./static/images/table1.jpg",
        place_name : "statue of liberty",
        quest_status : false
    }
];
let quest_table =document.getElementById('quest_table');
let google_map = document.getElementById('map');

function fillContent(divObj, content) {
    divObj.innerHTML = content;
}
function initializeTable() {
    /*
      Initialize the courses in the right plane
    */
    let numRow = quest_table.rows.length;
    for (let i = 0; i < numRow - 1; i++){
        quest_table.deleteRow(1);
    }

}

function addAllContentsToTable() {
    for (let i = 0; i < current_quest.length; i++) {
        let row = quest_table.insertRow(quest_table.rows.length);
        let col1 = row.insertCell(0);
        let col2 = row.insertCell(1);
        let col3 = row.insertCell(2);
        let col4 = row.insertCell(3);


        if (current_quest.quest_status) { //when quest is completed
            col1.innerHTML = `<img src=${current_quest[i].profile_img} width = 100em alt="donald trump">`;

            col2.innerHTML = `${current_quest[i].quest_content}`;

            col3.innerHTML = `<img src=${current_quest[i].place_img} width = 100em alt="donald trump">`

            col4.innerHTML = `<a data-target = "#modal_map" data-toggle = "modal" role = 'button' onclick="updateGoogleMap('${current_quest[i].place_name}');">
                        <img src="./static/images/quest_map.png" width = 100em alt="map icon">
                    </a>
                    <a class = "btn btn-success" data-target = "#modal_finish_quest" data-toggle = "modal" role = 'button' >I finish my quest!</a>
                    <button class="btn btn-danger">Quit quest </button>`

        } else { //when quest is not completed
            col1.innerHTML = `<img src=${current_quest[i].profile_img} width = 100em alt="donald trump">`;

            col2.innerHTML = `${current_quest[i].quest_content}`;

            col3.innerHTML = `<img src=${current_quest[i].place_img} width = 100em alt="donald trump">`

            //col4.innerHTML = `<a data-target = "#modal_map" data-toggle = "modal" role = 'button' onclick=`+"updateGoogleMap(${current_quest[i].place_name});>press here </a>"

            col4.innerHTML = `<a data-target = "#modal_map" data-toggle = "modal" role = 'button' onclick="updateGoogleMap('${current_quest[i].place_name}');">
                        <img src="./static/images/quest_map.png" width = 100em alt="map icon">
                    </a>
                    <a class = "btn btn-success" data-target = "#modal_finish_quest" data-toggle = "modal" role = 'button' >I finish my quest!</a>
                    <button class="btn btn-danger">Quit quest </button>`

        }
    }
}

function updateGoogleMap(update_place){
    google_map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBO_WwFts0d4UEd2BBjxoBTTqLHvi0FyqA&q=${update_place}&maptype=roadmap&language=en&zoom=15`


}

initializeTable();
addAllContentsToTable();