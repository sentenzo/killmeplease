#   cfcoptions : { "out": "../js/"   }  

tabs = document.querySelectorAll('.tab')
tabContents = document.querySelectorAll('.tabContent')

window.onload = () ->
   tabs = document.querySelectorAll('.tab')
   tabContents = document.querySelectorAll('.tabContent')
   clickTab = (tab) ->
      t.classList.remove("active") for t in tabs
      tab.classList.add("active")
      tabName = ""
      tabCL = tab.classList
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