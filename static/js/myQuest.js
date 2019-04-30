let current_quest = [
    {
        profile_img:"./static/images/people1.jpg",
        quest_content: "Visit Statue of Liberty, and take photo",
        place_img : "./static/images/table1.jpg",
        place_name : "statue of liberty",
        quest_status : false,
        id : "1"
    },
    {
        profile_img:"./static/images/people2.jpg",
        quest_content: "Go to Times Squre, and eat Mcdonald's",
        place_img : "./static/images/table3.jpg",
        place_name : "Times Square",
        quest_status : false,
        id : "2"
    },
    {
        profile_img:"./static/images/people3.jpg",
        quest_content: "Visit The Metroplitan museum ",
        place_img : "./static/images/table4.jpg",
        place_name : "metropolitan museum",
        quest_status : false,
        id : "3"
    }
];

let profile= [
    {
        quest_provider_picture: "./static/images/people1.jpg",
        quest_provider_name : "Ronald Rump",
        quest_provider_introduction : "Hello, my name is Ronald Rump. I love trucks and wall. BING BING BONG!"

    }
    ,
    {
        profile_img:"./static/images/people1.jpg",
        quest_content: "Visit Statue of Liberty, and take photo",
        place_img : "./static/images/table1.jpg",
        place_name : "statue of liberty",
        quest_status: false,
        id : "1"
    },
    {
        profile_img:"./static/images/people1.jpg",
        quest_content: "Visit Broadway, and choose one musical and watch it!",
        place_img : "./static/images/table2.jpg",
        place_name : "Broadway",
        quest_status: false,
        id : "4"
    }

]


let quest_table =document.getElementById('quest_table');
let google_map = document.getElementById('map');
let remove_quest_button = document.getElementById('remove_quest_button');
let submit_quest_button = document.getElementById('submit_quest_button');
let profile_quest_table = document.getElementById('quest_on_profile');
let profile_instruction = document.getElementById('profile_instruction');

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


        if (current_quest[i].quest_status) { //when quest is completed
            col1.innerHTML = `<img src=${current_quest[i].profile_img} width = 50em height = 50em alt="donald trump" data-target = "#modal_profile" data-toggle = "modal" role = 'button' onclick="clickProfile()" > `;

            col2.innerHTML = `${current_quest[i].quest_content}`;

            col3.innerHTML = `<img src=${current_quest[i].place_img} width = 50em height = 50em alt="donald trump" data-target = "#modal_map" data-toggle = "modal" role = 'button' onclick="updateGoogleMap('${current_quest[i].place_name}')">`


            col4.innerHTML =
                `Quest complete!`

        } else { //when quest is not completed
            col1.innerHTML = `<img src=${current_quest[i].profile_img} width = 50em height = 50em alt="donald trump" data-target = "#modal_profile" data-toggle = "modal" role = 'button' onclick="clickProfile()" > `;

            col2.innerHTML = `${current_quest[i].quest_content}`;

            col3.innerHTML = `<img src=${current_quest[i].place_img} width = 50em height = 50em alt="donald trump" data-target = "#modal_map" data-toggle = "modal" role = 'button' onclick="updateGoogleMap('${current_quest[i].place_name}')">`


            col4.innerHTML =
                    `
                    <a class = "btn btn-outline-success" data-target = "#modal_finish_quest" data-toggle = "modal" role = 'button' 
                    onclick = "setOnclickOfButton(submit_quest_button,'completeQuest(${current_quest[i].id})')" style = "font-size : 10px; width:70px" >Complete
                    
                    </a>
                    <p></p>
                    <a class="btn btn-outline-danger" data-target = "#modal_quit_quest" data-toggle = "modal" role = 'button' 
                    onclick="setOnclickOfButton(remove_quest_button,'removeById(${current_quest[i].id})')" style = "font-size : 10px; width: 70px" >Quit</a>`

        }
    }
}

function updateGoogleMap(update_place){
    google_map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBO_WwFts0d4UEd2BBjxoBTTqLHvi0FyqA&q=${update_place}&maptype=roadmap&language=en&zoom=15`

}

function removeById(id){//function when 'Quit quest'
    for (let i = 0; i < current_quest.length; i++){
        if (current_quest[i].id ==id){
            current_quest.splice(i,1);
        }
        initializeTable();
        addAllContentsToTable();
    }
}

function completeQuest(id){ //function when 'click I finish my quest!'
    for (let i = 0; i < current_quest.length; i++){
        if (current_quest[i].id ==id){
            current_quest[i].quest_status = true;
        }
        initializeTable();
        addAllContentsToTable();
    }

}

function clickProfile(){ //function when click profile image

    let numRow = profile_quest_table.rows.length;

    profile_instruction.innerHTML = `<img src="${profile[0].quest_provider_picture}" class="mr-3" style="height:128px; width:128px; overflow:hidden;">
                    <div class="media-body">
                      <h6 class="mt-0">
                        ${profile[0].quest_provider_name}
                      </h6>
                      <p>${profile[0].quest_provider_introduction}</p>
                    </div>`

    for (let i = 0; i < numRow ; i++){
        profile_quest_table.deleteRow(0);
    }
    for (let i = 1; i < profile.length; i ++){
        console.log(i)
        let row = profile_quest_table.insertRow(profile_quest_table.rows.length);
        let col1 = row.insertCell(0);
        let col2 = row.insertCell(1);
        let col3 = row.insertCell(2);

        let alreadyAdded = false;

        col1.innerHTML = `<li>${profile[i].quest_content}</li>`;

        col2.innerHTML = `<img src=${profile[i].place_img} width = 70em height = 70em alt="donald trump">`

        //col4.innerHTML = `<a data-target = "#modal_map" data-toggle = "modal" role = 'button' onclick=`+"updateGoogleMap(${profile[i].place_name});>press here </a>"

        for (let j = 0; j < current_quest.length ; j ++){
            if (profile[i].id == current_quest[j].id){
                alreadyAdded = true;
            }
        }
        if (alreadyAdded){
            col3.innerHTML = `<button id="button_${profile[i].id}" class = 'btn btn-outline-warning' onclick = addThisQuest('${profile[i].id}') disabled = true style = 'font-size:10px'>Already Added</button>`
        }
        else{
            col3.innerHTML = `<button id="button_${profile[i].id}" class = 'btn btn-outline-primary' onclick = addThisQuest('${profile[i].id}') style = 'font-size:10px'>Add Quest</button>`
        }



    }


}

function addThisQuest(id){
    for (let i = 1; i < profile.length; i++){
        if (profile[i].id ==id){
            current_quest.push(profile[i])
            let disable_button = document.getElementById(`button_${profile[i].id}`);
            disable_button.disabled = true;
            disable_button.class = 'btn btn-outline-warning';
            disable_button.innerHTML = "Already Added"

        }

    }

    initializeTable();
    addAllContentsToTable();

}

function setOnclickOfButton(button,handle_function){
    button.setAttribute('onClick',handle_function);
}
initializeTable();
addAllContentsToTable();
