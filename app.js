 var play = false;

 var click = document.getElementById("play_button_background_addon");
 if (click){
     click.addEventListener("click", makeNoise);
 };

 var next = document.getElementById("forward_background_addon");
 if (next){
     next.addEventListener("click", nextSound);
 };

 var back = document.getElementById("back_background_addon");
 if (back){
     back.addEventListener("click", backSound);
 };

var soundsList = ["Rain", "Birds", "Coffee"];
var i = 0;

function nextSound(){
    i = i + 1;
    i = i % soundsList.length;
    return soundsList[i];
};

function backSound(){
 if (i === 0) {
     i = soundsList.length;
 }
 i = i - 1;
 return soundsList[i];
};

var titleSound = document.getElementById("soundName_background_addon");
if (titleSound){
    titleSound.textContent = soundsList[0];
};

window.addEventListener("load", function() {
    loadSavedState();
    var backButton = document.getElementById("back_background_addon");
    if (backButton) {
        backButton.addEventListener("click", function (e) {
        stopByChange();
        document.getElementById("soundName_background_addon").textContent = backSound();
        saveChanges();
            });
    };

    var forwardButton = document.getElementById("forward_background_addon");
    if (forwardButton) {
        forwardButton.addEventListener("click", function (e) {
        stopByChange();
        document.getElementById("soundName_background_addon").textContent = nextSound();
        saveChanges();
          });
    }; 
});

function makeNoise() {
    if (play === false){
    chrome.extension.sendMessage({action: document.getElementById("soundName_background_addon").textContent});
    play = true;
    document.getElementById("play_button_background_addon").innerText = "❚❚";
    saveChanges();
    } else {
        chrome.extension.sendMessage({action: "pause"});
        play = false;
        document.getElementById("play_button_background_addon").innerText = "▶";
        saveChanges();
    };
};

function stopByChange() {
    chrome.extension.sendMessage({action: "pause"});
    document.getElementById("play_button_background_addon").innerText = "▶";
};

function saveChanges(){
    var state = document.getElementById("play_button_background_addon").textContent;
    var title = document.getElementById("soundName_background_addon").textContent;
    chrome.storage.local.set({"state": state}, function() {
        console.log("State - saved");
    });
    chrome.storage.local.set({"title": title}, function() {
        console.log("Title - saved");
    });
};

function loadSavedState() {
    chrome.storage.local.get(["title"], function (title) {
        document.getElementById("soundName_background_addon").textContent = title.title;
    });
    chrome.storage.local.get(["state"], function (state) {
        document.getElementById("play_button_background_addon").textContent = state.state;
    })
};


