(function() {
  var tabContents, tabs;

  tabs = document.querySelectorAll('.tab');

  tabContents = document.querySelectorAll('.tabContent');

  window.onload = function() {
    var clickTab, tab, _i, _len, _results;
    tabs = document.querySelectorAll('.tab');
    tabContents = document.querySelectorAll('.tabContent');
    clickTab = function(tab) {
      var cName, t, tabCL, tabName, tc, tci, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _results;
      for (_i = 0, _len = tabs.length; _i < _len; _i++) {
        t = tabs[_i];
        t.classList.remove("active");
      }
      tab.classList.add("active");
      tabName = "";
      tabCL = tab.classList;
      _ref = tab.classList;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        cName = _ref[_j];
        if (cName.match(/tab\d/) !== null) {
          tabName = cName;
          break;
        }
      }
      for (_k = 0, _len2 = tabContents.length; _k < _len2; _k++) {
        tc = tabContents[_k];
        tc.classList.remove("active");
      }
      tc = document.querySelectorAll(".tabContent." + tabName);
      _results = [];
      for (_l = 0, _len3 = tc.length; _l < _len3; _l++) {
        tci = tc[_l];
        _results.push(tci.classList.add("active"));
      }
      return _results;
    };
    _results = [];
    for (_i = 0, _len = tabs.length; _i < _len; _i++) {
      tab = tabs[_i];
      _results.push(tab.onclick = function() {
        return clickTab(this);
      });
    }
    return _results;
  };

}).call(this);
