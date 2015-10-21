var tabs = document.querySelectorAll('.tab');
var tabContents = document.querySelectorAll('.tabContent');
function clickTab(tab) {
    for(var i = 0; i<tabs.length; i++){
        tabs[i].classList.remove("active");
    }
    tab.classList.add("active");
    var tabName = "";
    var tabCL = tab.classList;
    for(var i=0; i<tabCL.length; i++) {
        if(tabCL[i].match(/tab\d/) != null) {
            tabName = tabCL[i];
            break;
        }
    }
    for(var i=0; i<tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    var tc = document.querySelectorAll(".tabContent."+tabName);
    for(var i=0; i<tc.length; i++) {
        tc[i].classList.add("active");
    }
}
(function () {
    "use strict";
    var tabs = document.querySelectorAll('.tab');
    for (var i = 0; i<tabs.length; i++){
        tabs[i].onclick = function () {clickTab(this);};
    }
})();