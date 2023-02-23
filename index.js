$(document).ready(function(){

  if(window.matchMedia("(max-width: 767px)").matches){
      // Mobile version, we click on the element
      clickOnElement("click", "mobile");
  } else{
      // Desktop version, mouseover here
      clickOnElement("mouseover", "desktop");
      // Close active popup clicking anywhere on document. Not working on mobile.
      $(document).on('click', function(){
        let popup = $('.popup');
        if(popup){
          popup.remove();
        }
      })
  }

  function clickOnElement(eventType, device){
    $('.elm').on(''+ eventType +'', function(){
      let id = $(this)[0].id.toString()
      let popups = $('.popup');
      popups.remove();
      items.forEach(function(key, value){
        if(key['id'] === id){
          let element = $('#'+ key['id']);
          let element_pos;
          if(device === "mobile"){
            element_pos = $('.interactive-img');
          }
          else if(device === "desktop"){
            element_pos = element;
          }
          let new_popup = createPopup(element_pos, element=element, key['title'], key['text'], device);
          new_popup.animate({
            opacity: '1'
          }, {duration: 30});
        }
      })
    })
  }

  function createPopup(element_pos, element, title, text, device){
    let position_left;
    let position_top;

    if(device == "mobile"){
      position_left = element_pos.position().left + (element_pos.width() / 2) - 100
      position_top = element_pos.position().top + (element_pos.height() / 2)
    }
    else if(device == "desktop"){
      console.log(element.position());
      position_left = element.position().left;
      position_top = element.position().top;
    }
    
    let p = $("<div class='popup' style='left:"+ position_left +"px; top:"+ position_top +"px; ''></div>");
    let close_tabs = $("<span class='close-tab'>X</span>");
    let title_append = $("<h2>" + title + "</h2>");
    title_append.append(close_tabs);
    let text_append = $("<p>" + text + "</p>");

    close_tabs.on('click', function(){
      $(this).parent().parent().animate({
        opacity: '1'
      }, {duration: 30})
      $(this).parent().parent().remove();
    })

    p.append(title_append);
    p.append(text_append);

    $('.div-interactive').append(p);
    console.log(p);

    return p
  }

  var items = [
    {
      id: 'test1',
      title: 'Communiquer',
      text: 'Microphone différenciel à annulation de bruit.',
    },
    {
      id: 'test2',
      title: 'Contrôler',
      text: "Contrôle du volume et de la prise d'appel.",
    },
    {
      id: 'test3',
      title: 'Coordonner',
      text: 'Connexion au réseau Intercom.',
    },
  ]

})