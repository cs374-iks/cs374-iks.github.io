/**
 * Searching 
 * . 등록된 모든 Guide에 대해 사용자가 검색한 City 또는 Country에 대해 검색
 * . Pr2에서 구현한 autocomplete(alphabetically sorted), capital letter 정도는 구현
 * . JS로 검색된 모든 Guide를 보여줄 수 있도록 하는 함수 작성. 

 * Add quests
 * . Guide profile 데이터 구성하기
 * . Quest의 li 대신 point를 네모 박스 등을 이용해 표시 

 * MyQuest Page
 * . Guide profile 클릭하면 Find Guide Quest의 패널과 같은 기능을 하도록 구성
 *  */

var guides = []; // guides represented as their ids
var quests = [];
var questNum = 10;
var carousel_images_count = [3, 3, 2, 2];

var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");
var guideAccordion = document.getElementById("guideAccordion");
var subtitle = document.getElementById("subtitle");

/**
 * initialization function
 */
$( document ).ready(function() {
    function init() {
        initGuideList();
        initQuestList();
        viewGuideList();
        bindEvents();
    }
    
    /**
     * initialize top-rated guide list with their ids.
     *  */
    function initGuideList() {
        guides = [0, 1, 2, 3];
    }

    function initQuestList() {
        for (var i=0; i<questNum; i++) {
            quests.push(null);
        }
    }
    
    /**
     * bind events with their handlers.
     * . search button
     * . autocomplete
     * . enter key
     * . add quest button
     * . delete quest button
     */
    function bindEvents() {
        searchButton.onclick = onClickSearch;
    }
    
    /**
     * search based on the current user typing inside input.
     */
    function onClickSearch() {
        // read entire database and match with country and city.
        firebase.database().ref('/Guides/').once('value').then(function(snapshot) {
            guides = [];
            function match(left, right) {
                var lowercase_right = right.charAt(0).toLowerCase() + right.slice(1);
                return left == right || left == lowercase_right;
            }
            for (var i=0; i<snapshot.val().length; i++) {
                if (match(searchInput.value, snapshot.val()[i].city) || match(searchInput.value, snapshot.val()[i].country)) {
                    guides.push(snapshot.val()[i].id);
                }
            }
            searchInput.value = '';
            if (guides.length == 0) {
                subtitle.innerHTML = 'Sorry, No Result Found...';
            } else {
                subtitle.innerHTML = 'Meet Recommended Local Guides!';
            }
            viewGuideList();
        });
    }
    
    function onClickAddQuest(button, quest_id) {
        button.className = 'btn btn-success btn-sm btn-block float-right';
        button.innerHTML = 'Added';
        button.onclick = function() {
            onClickDeleteQuest(this, quest_id);
        };
        firebase.database().ref(`/Quests/Quests/${quest_id}`).set({
            place_img : quests[quest_id].place_img,
            place_name : quests[quest_id].place_name,
            point: quests[quest_id].point,
            profile_id : quests[quest_id].profile_id,
            quest_content : quests[quest_id].quest_content,
            quest_id : quests[quest_id].quest_id,
            quest_status : quests[quest_id].quest_status
        });
    }
    
    function onClickDeleteQuest(button, quest_id) {
        button.className = 'btn btn-outline-secondary btn-sm btn-block float-right';
        button.innerHTML = 'Add Quest';
        button.onclick = function() {
            onClickAddQuest(this, quest_id);
        };

        firebase.database().ref(`/Quests/Quests/${quest_id}`).remove();
    }
    
    /**
     * view single guide information to the panel.
     * need to load the following from the database 
     * . title
     * . carousel images
     * . name
     * . country
     * . city
     * . profile image
     * . profile text
     * . quests
     * 
     *  fill innerHTML recursively starting from the object
     *  having id guideAccordion.  
     */
    function viewGuide(id) {
        // read guide information from database
        firebase.database().ref(`/Guides/${id}/`).once('value').then(function(guideSnapshot) {
        firebase.database().ref(`/Quests/Quests/`).once('value').then(function(questsSnapshot) {
            // data needed to view guide information
            // WARNING: how to download images properly?
            var title = guideSnapshot.val().title;
            var name = guideSnapshot.val().name;
            var city = guideSnapshot.val().city;
            var profile_text = guideSnapshot.val().profile_text;
            var guideQuests = guideSnapshot.val().quests;
            var userQuests = questsSnapshot.val();

            // carousel indicators 
            var carousel_indicators = ``;
            for (var i=0; i<carousel_images_count[id]; i++) {
                if (i == 0) {
                    carousel_indicators += `<li data-target='#Carousel${id}' data-slide-to='${i}' class='active'></li>`;
                } else {
                    carousel_indicators += `<li data-target='#Carousel${id}' data-slide-to='${i}'></li>`;
                }
            }
            // carousel inner
            var carousel_inner = ``;
            for (var i=0; i<carousel_images_count[id]; i++) {
                if (i == 0) {
                    carousel_inner += `<div class='carousel-item active'><img src='./static/img/${name}${i}.png' class='d-block w-100' style='height:25%; overflow:hidden;'></div>`    
                } else {
                    carousel_inner += `<div class='carousel-item'><img src='./static/img/${name}${i}.png' class='d-block w-100' style='height:25%; overflow:hidden;'></div>`
                }
            }
            // quests
            var quests_inner = ``;
            for (var i=0; i<guideQuests.length; i++) {
                quests[guideQuests[i].quest_id] = guideQuests[i];
                // WARNING: need to handle add quest initially being green
                quests_inner += 
                `<div class='row mt-3'> 
                    <div class='col-8'> 
                        <li>${guideQuests[i].quest_content}</li> 
                    </div> 
                    <div class='col-4' id='addQuestButton${guideQuests[i].quest_id}'> 
                    </div> 
                </div>`;
            }
            
            // append the card to guide accordion innerHTML
            guideAccordion.innerHTML += 
            `<div class='card' id='Guide${id}'> 
                <div class='card-title p-3 mb-0'> 
                <h4> ${title} </h4> 
                </div> 
                <div id='Carousel${id}' class='carousel slide' data-ride='carousel'> 
                <ol class='carousel-indicators'> 
                    ${carousel_indicators} 
                </ol> 
                <div class='carousel-inner'>
                    ${carousel_inner} 
                    <a class='carousel-control-prev' href='#Carousel${id}' role='button' data-slide='prev'> 
                        <span class='carousel-control-prev-icon' aria-hidden='true'></span> 
                        <span class='sr-only'>Previous</span> 
                    </a> 
                    <a class='carousel-control-next' href='#Carousel${id}' role='button' data-slide='next'> 
                        <span class='carousel-control-next-icon' aria-hidden='true'></span> 
                        <span class='sr-only'>Next</span> 
                    </a> 
                </div> 
                </div> 
                <button class='btn' type='button' data-toggle='collapse' data-target='#Collapse${id}' aria-expanded='true' aria-controls='Collapse${id}'> 
                    <i class='fas fa-angle-down angle-down'></i> 
                </button> 
                <!-- profile of the guide --> 
                <div id='Collapse${id}' class='collapse' aria-labelledby='Guide${id}' data-parent='#guideAccordion'> 
                <div class='card-body'> 
                    <div class='media'> 
                    <img src='./static/img/${name}_profile.png' class='mr-2' style='width:40%; overflow:hidden;'>
                    <div class='media-body'>
                        <h6 class='mt-0'>
                        ${name}, ${city}
                        </h6>
                        <div class='guide-text'>${profile_text}</div>
                    </div>
                    </div>
                    <div class='text-left'>
                    ${quests_inner}
                    </div>
                </div>
            </div>`;

            // addQuest button
            for (var i=0; i<questNum; i++) {
                let added = false;
                if (!quests[i]) {
                    continue;
                }
                let quest_id = quests[i].quest_id;
                let button;
                let div;
                for (var j=0; userQuests && j<userQuests.length; j++) {
                    if (userQuests[j] == null) {
                        continue;
                    }
                    if (quest_id == userQuests[j].quest_id) {
                        added = true;
                    }
                }
                if (added) {
                    button = document.createElement("button");
                    button.className = 'btn btn-success btn-sm btn-block float-right';
                    button.type = 'button';
                    button.innerHTML = 'Added';
                    
                    button.onclick = () => { onClickDeleteQuest(button, quest_id); };

                    div = document.getElementById(`addQuestButton${quest_id}`);
                    div.innerHTML = '';
                    div.appendChild(button);
                } else {                    
                    button = document.createElement("button");
                    button.className = 'btn btn-outline-secondary btn-sm btn-block float-right';
                    button.type = 'button';
                    button.innerHTML = 'Add Quest';

                    button.onclick = () => { onClickAddQuest(button, quest_id); };

                    div = document.getElementById(`addQuestButton${quest_id}`);
                    div.innerHTML = '';
                    div.appendChild(button);
                }
            }
        });
        });
    }
    
    /**
     * view guide list read from 'guides'. 
     */
    function viewGuideList() {
        guideAccordion.innerHTML = ``;
        for (var i=0; i<guides.length; i++) {
            viewGuide(guides[i]);
        }
    }

    init();
});