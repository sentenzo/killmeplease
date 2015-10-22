#   cfcoptions : { "out": "../js/"   }  

tabs = document.querySelectorAll('.tab')
tabContents = document.querySelectorAll('.tabContent')

tabsInit = () ->
   tabs = document.querySelectorAll('.tab')
   tabContents = document.querySelectorAll('.tabContent')
   clickTab = (tab) ->
      t.classList.remove("active") for t in tabs
      tab.classList.add("active")
      tabName = ""
      for cName in tab.classList
         if cName.match(/tab\d/) != null
            tabName = cName
            break
      for tc in tabContents
         tc.classList.remove("active")
      tc = document.querySelectorAll(".tabContent."+tabName)
      tci.classList.add("active") for tci in tc
   for tab in tabs
      tab.onclick = () -> clickTab(this)

trigs = document.querySelectorAll(".trigger")
trigged = document.querySelectorAll(".trigged")

triggersInit = () ->
    trigs = document.querySelectorAll(".trigger")
    trigged = document.querySelectorAll(".trigged")
        
    clickTrig = (trig) ->
        trigName = ""
        trigState = "off"
        for cName in trig.classList
            if cName.match(/trigger\d/) != null
                trigName = cName
            if cName == "off" || cName == "on"
                trigState = cName
        for td in trigged
            td.classList.remove("active")
        if(trigState == "on")
            trig.classList.remove("on")
            trig.classList.add("off")
            trigState = "off"
        else
            trig.classList.remove("off")
            trig.classList.add("on")
            trigState = "on"
        for td in document.querySelectorAll(".trigged")
            if td.classList.contains(trigName)
                if trigState == "on"
                    td.classList.add("active")
                else
                    td.classList.remove("active")
    for t in trigs
        t.onclick = () -> clickTrig(this)

window.onload = () ->
    tabsInit()
    triggersInit()

