document.addEventListener("DOMContentLoaded", function(event){
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
    ];

    if(window.matchMedia("(max-width: 767px)").matches){
        clickOnElement("click", "mobile");
    }
    else {
        clickOnElement("mouseover", "desktop");
        document.addEventListener('click', function(){
            let popup = document.getElementsByClassName('popup');
            if(popup[0]){
                popup[0].remove();
            }
        })
    }

    function clickOnElement(eventType, device){
        let all_elements = document.getElementsByClassName('elm');
        for (var i = 0; i < all_elements.length; i++) {
            all_elements[i].addEventListener(eventType, function(){
                let popups = document.getElementsByClassName('popup');
                if(popups[0]){
                    popups[0].remove();
                }
                let id = String(this.id);
                items.forEach(function(key, value){
                    if(key['id'] === id){
                        let element = document.getElementById(key['id']);
                        let element_pos;

                        if(device === "mobile"){
                            element_pos = document.getElementsByClassName('interactive-img')[0];
                        }
                        else if(device === "desktop"){
                            element_pos = element;
                        }
                        let new_popup = createPopup(element_pos, element=element, key['title'], key['text'], device);
                        new_popup.animate([{
                            opacity: '1'
                        }], {
                            duration: 30
                        })
                    }
                })
            })
        }
    }

    function createPopup(element_pos, element, title, text, device){
        let position_left;
        let position_top;

        if(device === "mobile"){
            position_left = element_pos.offsetLeft + (element_pos.offsetWidth / 2) -100;
            position_top = element_pos.offsetTop + (element_pos.offsetHeight / 2) -100;
        }
        else if(device === "desktop"){
            position_left = element.offsetLeft;
            position_top = element.offsetTop;
        }

        let p = document.createElement('div');
        p.classList.add('popup');
        let style_value = "left:" + position_left +"px; top:"+ position_top + "px; opacity: 1;";
        p.setAttribute('style', style_value);

        let close_tabs = document.createElement('span');
        close_tabs.classList.add('close-tab');
        close_tabs.innerHTML = "X";

        let title_append = document.createElement('h2');
        title_append.innerHTML = title;
        title_append.append(close_tabs);

        let text_append = document.createElement('p');
        text_append.innerHTML = text;

        close_tabs.addEventListener("click", function(){
            // this.parentElement.parentElement.animate({
            //     opacity: '1'
            // }, {duration: 30})
            this.parentElement.parentElement.remove();
        })

        p.append(title_append, text_append);

        document.getElementsByClassName('div-interactive')[0].append(p);

        return p
    }
})