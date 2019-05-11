/**
 * Searching 
 * . 등록된 모든 Guide에 대해 사용자가 검색한 City 또는 Country에 대해 검색
 * . Pr2에서 구현한 autocomplete(alphabetically sorted), capital letter, press enter 정도는 구현
 * . JS로 검색된 모든 Guide를 보여줄 수 있도록 하는 함수 작성. 

 * Add quests
 * . Guide profile 데이터 구성하기
 * . Quest의 li 대신 point를 네모 박스 등을 이용해 표시 

 * MyQuest Page
 * . Guide profile 클릭하면 Find Guide Quest의 패널과 같은 기능을 하도록 구성
 *  */

var guides = []; // guides represented as their ids

var searchButton = document.getElementById("search");
var guideAccordion = document.getElementById("guideAccordion");

/**
 * initialization function
 */
$( document ).ready(function() {
    function init() {
        initGuideList();
        viewGuideList();
    }
    
    /**
     * initialize top-rated guide list with their ids.
     *  */
    function initGuideList() {
        guides = ["doyou", "jiyoung"];
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
        
    }
    
    function onClickAddQuest() {
        
    }
    
    function onClickDeleteQuest() {
    
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
        firebase.database().ref(`/Guides/${id}/`).once('value').then(function(snapshot) {
            // data needed to view guide information
            // WARNING: how to download images properly?
            var title = snapshot.val().title;
            var carousel_images = ['1.png', '2.png', '3.png'];
            var name = snapshot.val().name;
            var country = snapshot.val().country;
            var city = snapshot.val().city;
            var profile_image = ['1.png'];
            var profile_text = snapshot.val().profile_text;
            // WARNING: get quest content based on quest_id
            var quests = snapshot.val().quests;

            // carousel indicators 
            var carousel_indicators = ``;
            for (var i=0; i<carousel_images.length; i++) {
                if (i == 0) {
                    carousel_indicators += `<li data-target='#${id}Carousel' data-slide-to='${i}' class='active'></li>`;
                } else {
                    carousel_indicators += `<li data-target='#${id}Carousel' data-slide-to='${i}'></li>`;
                }
            }
            // carousel inner
            var carousel_inner = ``;
            for (var i=0; i<carousel_images.length; i++) {
                if (i == 0) {
                    carousel_inner += `<div class='carousel-item active'><img src='./static/img/${id}${i}.png' id='${id}${i}Image' class='d-block w-100' style='height:25%; overflow:hidden;'></div>`    
                } else {
                    carousel_inner += `<div class='carousel-item'><img src='./static/img/${id}${i}.png' id='${id}${i}Image' class='d-block w-100' style='height:25%; overflow:hidden;'></div>`
                }
            }
            // quests
            var quests_inner = ``;
            for (var i=0; i<quests.length; i++) {
                // WARNING: need to handle add quest initially being green
                quests_inner += 
                `<div class='row mt-3'> 
                    <div class='col-8'> 
                        <li>${quests[i]}</li> 
                    </div> 
                    <div class='col-4'> 
                        <button class='btn btn-outline-secondary btn-sm float-right' type='button'>Add Quest</button> 
                    </div> 
                </div>`;
            }
            
            // append the card to guide accordion innerHTML
            guideAccordion.innerHTML += 
            `<div class='card' id='${id}Guide'> 
                <div class='card-title p-3 mb-0'> 
                <h4> ${title} </h4> 
                </div> 
                <div id='${id}Carousel' class='carousel slide' data-ride='carousel'> 
                <ol class='carousel-indicators'> 
                    ${carousel_indicators} 
                </ol> 
                <div class='carousel-inner'>
                    ${carousel_inner} 
                    <a class='carousel-control-prev' href='#${id}Carousel' role='button' data-slide='prev'> 
                        <span class='carousel-control-prev-icon' aria-hidden='true'></span> 
                        <span class='sr-only'>Previous</span> 
                    </a> 
                    <a class='carousel-control-next' href='#${id}Carousel' role='button' data-slide='next'> 
                        <span class='carousel-control-next-icon' aria-hidden='true'></span> 
                        <span class='sr-only'>Next</span> 
                    </a> 
                </div> 
                </div> 
                <button class='btn' type='button' data-toggle='collapse' data-target='#${id}Collapse' aria-expanded='true' aria-controls='${id}Collapse'> 
                    <i class='fas fa-angle-down'></i> 
                </button> 
                <!-- profile of the guide --> 
                <div id='${id}Collapse' class='collapse' aria-labelledby='${id}Guide' data-parent='#guideAccordion'> 
                <div class='card-body'> 
                    <div class='media'> 
                    <img src='./static/img/${id}_profile.png' class='mr-2' style='width:40%; overflow:hidden;'>
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
        });
    }
    
    /**
     * view guide list read from 'guides'. 
     */
    function viewGuideList() {
        for (var i=0; i<guides.length; i++) {
            viewGuide(guides[i]);
        }
    }

    init();
});