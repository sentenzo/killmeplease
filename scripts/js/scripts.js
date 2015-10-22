var tabs = document.querySelectorAll('.tab');
var tabContents = document.querySelectorAll('.tabContent');

window.onload = function () {
    "use strict";
    tabs = document.querySelectorAll('.tab');
    tabContents = document.querySelectorAll('.tabContent');
    function clickTab(tab) {
        var i;
        for (i = 0; i < tabs.length; i += 1){
            tabs[i].classList.remove("active");
        }
        tab.classList.add("active");
        var tabName = "";
        var tabCL = tab.classList;
        for (i=0; i<tabCL.length; i += 1) {
            if(tabCL[i].match(/tab\d/) != null) {
                tabName = tabCL[i];
                break;
            }
        }
        for (i=0; i<tabContents.length; i += 1) {
            tabContents[i].classList.remove("active");
        }
        var tc = document.querySelectorAll(".tabContent."+tabName);
        for(i=0; i<tc.length; i++) {
            tc[i].classList.add("active");
        }
    }

    for (var i = 0; i<tabs.length; i += 1){
        tabs[i].onclick = function () {clickTab(this);};
    }
};