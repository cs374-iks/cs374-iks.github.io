let current_quest = [

];

let profile_temp = [];
let profile= [
    {

        quest_provider_picture: "./static/images/people1.jpg",
        quest_provider_name : "Ronald Rump",
        quest_provider_introduction : "Hello, my name is Ronald Rump. I love trucks and wall. BING BING BONG!"

    }
    ,
    {
        profile_id : "asdf",
        point : "15",
        quest_content: "Visit Statue of Liberty, and take photo",
        place_img : "./static/images/table1.jpg",
        place_name : "statue of liberty",
        quest_status : false,
        quest_id : "1"
    },
    {
        profile_id : "asdf",
        point : "15",
        quest_content: "Broadway!",
        place_img : "./static/images/table2.jpg",
        place_name : "Broadway, New York city",
        quest_status : false,
        quest_id : "4"
    }

]



let quest_table =document.getElementById('quest_table');
let google_map = document.getElementById('map');
let remove_quest_button = document.getElementById('remove_quest_button');
let upload_button = document.getElementById('upload_button');
let profile_quest_table = document.getElementById('quest_on_profile');
let profile_instruction = document.getElementById('profile_instruction');
let selected_file; //variable for currently uploaded image file


function initializeTable() {
    /*
      Initialize the courses in the right plane
    */

    let numRow = quest_table.rows.length;
    for (let i = 0; i < numRow - 1; i++){
        quest_table.deleteRow(1);
    }

}

function readFromDatabase() {
    return firebase.database().ref('/Quests/Quests').on('value', function(snapshot) {
        // initializeTable();

        var myValue = snapshot.val();
        current_quest = []
        for (let key in myValue){
            current_quest.push(myValue[key])
        }



        console.log(myValue);
        addAllContentsToTable();

    });
}

function readFromDatabase_profile() {
    return firebase.database().ref('/Guides/').on('value', function(snapshot) {
        // initializeTable();

        var myValue = snapshot.val();
        profile = myValue;


        console.log(myValue);


    });
}


function addAllContentsToTable() {

    for (let i = 0; i < current_quest.length; i++) {
        if (current_quest[i] == null){
            continue;
        }
        let row = quest_table.insertRow(quest_table.rows.length);
        let col1 = row.insertCell(0);
        let col2 = row.insertCell(1);


        let col3 = row.insertCell(2);
        let col4 = row.insertCell(3);
        let col5 = row.insertCell(4);

        let quest_provider;

        for (let j = 0 ; j < profile.length; j ++ ){
            if (profile[j].id == current_quest[i].profile_id){
                quest_provider = profile[j]

            }
        }


        if (current_quest[i].quest_status) { //when quest is completed
            col1.innerHTML = `<img src="./static/img/${quest_provider.name}_profile.png" width = 50em height = 50em alt="donald trump" data-target = "#modal_profile" data-toggle = "modal" role = 'button' onclick="clickProfile('${current_quest[i].profile_id}')" > `;

            col2.innerHTML =`<div class = "img_container">
                                <img src = "./static/img/medal.png" width = 50em height = 50 em title = "Amount of point if you accomplish your goal">
                                <div class = "centered">${current_quest[i].point}</div>
    
                            </div>
                                
                                 `

            col3.innerHTML = `${current_quest[i].quest_content}`;

            col4.innerHTML = `<img src=${current_quest[i].place_img} width = 50em height = 50em alt="donald trump" data-target = "#modal_map" data-toggle = "modal" role = 'button' onclick="updateGoogleMap('${current_quest[i].place_name}')"
                            title = "click to see the location of this place "
                            >`


            col5.innerHTML =
                `quest complete!`

        } else { //when quest is not completed
            col1.innerHTML = `<img src="./static/img/${quest_provider.name}_profile.png"} width = 50em height = 50em alt="donald trump" data-target = "#modal_profile" data-toggle = "modal" role = 'button' onclick="clickProfile('${current_quest[i].profile_id}')" > `;

            col2.innerHTML =`<div class = "img_container">
                                <img src = "./static/img/medal.png" width = 50em height = 50 em title = "Amount of point if you accomplish your goal">
                                <div class = "centered">${current_quest[i].point}</div> 
    
                            </div>
                                
                                 `

            col3.innerHTML = `${current_quest[i].quest_content}`;

            col4.innerHTML = `<img src=${current_quest[i].place_img} width = 50em height = 50em alt="donald trump" data-target = "#modal_map" data-toggle = "modal" role = 'button' onclick="updateGoogleMap('${current_quest[i].place_name}')"
                                    title = "click to see the location of this place "
                                    >`


            col5.innerHTML =
                    `
                    <a class = "btn btn-outline-success" data-target = "#modal_finish_quest" data-toggle = "modal" role = 'button' 
                    onclick = "setOnclickOfButton(upload_button,'uploadFile(${current_quest[i].quest_id})')" style = "font-size : 10px; width:70px" >Complete
                    
                    </a>
                    <p></p>
                    <a class="btn btn-outline-danger" data-target = "#modal_quit_quest" data-toggle = "modal" role = 'button' 
                    onclick="setOnclickOfButton(remove_quest_button,'removeById(${current_quest[i].quest_id})')" style = "font-size : 10px; width: 70px" >Quit</a>`

        }
    }


}

function updateGoogleMap(update_place){
    google_map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBO_WwFts0d4UEd2BBjxoBTTqLHvi0FyqA&q=${update_place}&maptype=roadmap&language=en&zoom=15`

}

function removeById(id){//function when 'Quit quest'
    for (let i = 0; i < current_quest.length; i++){
        if (current_quest[i] == null){
            continue;
        }
        if (current_quest[i].quest_id ==id){
            current_quest.splice(i,1);
        }

    }
    console.log(current_quest)
    var newKey = firebase.database().ref('/Quests');
    newKey.set({
        Quests:current_quest
    });
    initializeTable();
    addAllContentsToTable();
}


function clickProfile(profile_id){ //function when click profile image

    let numRow = profile_quest_table.rows.length;
    let quest_provider;
    let quests_provided_by_provider;

    for (let i = 0 ; i < profile.length; i ++ ){
        if (profile[i].id == profile_id){
            quest_provider = profile[i]
            quests_provided_by_provider = quest_provider.quests;
        }
    }

    profile_instruction.innerHTML = `<img src="./static/img/${quest_provider.name}_profile.png" class="mr-3" style="height:128px; width:128px; overflow:hidden;">
                    <div class="media-body">
                      <h6 class="mt-0">
                        ${quest_provider.name}
                      </h6>
                      <p>${quest_provider.profile_text}</p>
                    </div>`

    for (let i = 0; i < numRow ; i++){
        profile_quest_table.deleteRow(0);
    }
    for (let i = 0; i < quests_provided_by_provider.length; i ++){
        console.log(i)
        let row = profile_quest_table.insertRow(profile_quest_table.rows.length);
        let col1 = row.insertCell(0);
        let col2 = row.insertCell(1);
        let col3 = row.insertCell(2);
        let col4 = row.insertCell(3);

        let alreadyAdded = false;

        col1.innerHTML = `<div class = "img_container">
                                <img src = "./static/img/medal.png" width = 50em height = 50 em title = "Amount of point if you accomplish your goal">
                                <div class = "centered">${quests_provided_by_provider[i].point}</div>
    
                            </div>`

        col2.innerHTML = `${quests_provided_by_provider[i].quest_content}`;

        col3.innerHTML = `<img src=${quests_provided_by_provider[i].place_img} width = 70em height = 70em alt="donald trump">`

        //col4.innerHTML = `<a data-target = "#modal_map" data-toggle = "modal" role = 'button' onclick=`+"updateGoogleMap(${profile[i].place_name});>press here </a>"

        for (let j = 0; j < current_quest.length ; j ++){
            if (current_quest[j] == null){
                continue;
            }
            if (quests_provided_by_provider[i].quest_id == current_quest[j].quest_id){
                alreadyAdded = true;
            }
        }
        if (alreadyAdded){
            col4.innerHTML = `<button id="button_${quests_provided_by_provider[i].quest_id}" class = 'btn btn-outline-warning' onclick = addThisQuest('${quests_provided_by_provider[i].quest_id}') disabled = true style = 'font-size:10px'>Already Added</button>`
        }
        else{
            col4.innerHTML = `<button id="button_${quests_provided_by_provider[i].quest_id}" class = 'btn btn-outline-primary' onclick = addThisQuest('${quests_provided_by_provider[i].quest_id}') style = 'font-size:10px'>Add Quest</button>`
        }



    }



}

function addThisQuest(id){

    for (let i =0 ; i < profile.length; i ++){
        for (let j = 0 ; j< profile[i].quests.length; j ++){
            if (profile[i].quests[j].quest_id == id) {
                current_quest.push(profile[i].quests[j])
                let disable_button = document.getElementById(`button_${profile[i].quests[j].quest_id}`);
                disable_button.disabled = true;
                disable_button.class = 'btn btn-outline-warning';
                disable_button.innerHTML = "Already Added";



                var newKey = firebase.database().ref('/Quests');
                newKey.set({
                    Quests:current_quest
                });
            }
        }
    }

    initializeTable();
    addAllContentsToTable();

}

function setOnclickOfButton(button,handle_function){
    button.setAttribute('onClick',handle_function);
}
//handling file upload
$("#file").on("change",function(event){
   selected_file = event.target.files[0];
});

function uploadFile(id){
    let filename = selected_file.name;
    let storageRef = firebase.storage().ref('/tesetImages/'+filename);
    let uploadTask = storageRef.put(selected_file);

    uploadTask.on('state_changed',function(snapshot) {
    },function (error) {
    },function(){
        let post_key = firebase.database().ref("Diary/").push().key;
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            let clicking_quest;

            for (let i = 0; i < current_quest.length; i++){
                if (current_quest[i] ==null){
                    continue
                }
                if (current_quest[i].quest_id ==id){
                    current_quest[i].quest_status = true;
                    clicking_quest = current_quest[i]
                }
            }

            let updates = {};
            let provider = profile.find(pro => pro.id ==clicking_quest.profile_id)
            let postDiary = {
                url : downloadURL,
                imgID: post_key,
                diary : $("#imageCaption").val(),
                quest_content: clicking_quest.quest_content,
                quest_provider_name : provider.id,
                quest_provider_picture: `./static/img/${provider.name}_profile.png`,
                place_name: clicking_quest.place_name,
                country_name: provider.country,
                point : clicking_quest.point


            }
            updates['/Diary/'+post_key] = postDiary;
            firebase.database().ref().update(updates);



            var newKey = firebase.database().ref('/Quests');
            newKey.set({
                Quests:current_quest
            });
            initializeTable();
            addAllContentsToTable();

        });



    });


}

function resetMyQuest(){
    var newKey = firebase.database().ref('/Quests');
    newKey.set({
        Quests:[]
    });
}


initializeTable();
readFromDatabase_profile();
readFromDatabase();

