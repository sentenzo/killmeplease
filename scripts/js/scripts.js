(function() {
  var tabContents, tabs, tabsInit, trigged, triggersInit, trigs;

  tabs = document.querySelectorAll('.tab');

  tabContents = document.querySelectorAll('.tabContent');

  tabsInit = function() {
    var clickTab, tab, _i, _len, _results;
    tabs = document.querySelectorAll('.tab');
    tabContents = document.querySelectorAll('.tabContent');
    clickTab = function(tab) {
      var cName, t, tabName, tc, tci, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _results;
      for (_i = 0, _len = tabs.length; _i < _len; _i++) {
        t = tabs[_i];
        t.classList.remove("active");
      }
      tab.classList.add("active");
      tabName = "";
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

  trigs = document.querySelectorAll(".trigger");

  trigged = document.querySelectorAll(".trigged");

  triggersInit = function() {
    var clickTrig, t, _i, _len, _results;
    trigs = document.querySelectorAll(".trigger");
    trigged = document.querySelectorAll(".trigged");
    clickTrig = function(trig) {
      var cName, td, trigName, trigState, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
      trigName = "";
      trigState = "off";
      _ref = trig.classList;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cName = _ref[_i];
        if (cName.match(/trigger\d/) !== null) {
          trigName = cName;
        }
        if (cName === "off" || cName === "on") {
          trigState = cName;
        }
      }
      for (_j = 0, _len1 = trigged.length; _j < _len1; _j++) {
        td = trigged[_j];
        td.classList.remove("active");
      }
      if (trigState === "on") {
        trig.classList.remove("on");
        trig.classList.add("off");
        trigState = "off";
      } else {
        trig.classList.remove("off");
        trig.classList.add("on");
        trigState = "on";
      }
      _ref1 = document.querySelectorAll(".trigged");
      _results = [];
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        td = _ref1[_k];
        if (td.classList.contains(trigName)) {
          if (trigState === "on") {
            _results.push(td.classList.add("active"));
          } else {
            _results.push(td.classList.remove("active"));
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    _results = [];
    for (_i = 0, _len = trigs.length; _i < _len; _i++) {
      t = trigs[_i];
      _results.push(t.onclick = function() {
        return clickTrig(this);
      });
    }
    return _results;
  };

  window.onload = function() {
    tabsInit();
    return triggersInit();
  };

}).call(this);
