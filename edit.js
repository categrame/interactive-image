$(document).ready(function(){
    let edit_button = $('<button/>').addClass('edit-btn').text('Edit Mode');
    edit_button.on('click', edit_mode)
    $('body').append(edit_button);

    var createDot = function(options){
        var vars = {
            positionX  : 0,
            positionY : 0,
            pageX: 0,
            pageY: 0,
            divPosition : [],
        };
    
        // var root = this;

        this.construct = function(options){
            $.extend(vars , options);
        };
    
        var computePercentage = function(){
            let x_percentage = (vars.positionX*100)/vars.divPosition[0]
            let y_percentage = (vars.positionY*100)/vars.divPosition[1]

            return {'x_perc': x_percentage.toFixed(1), 'y_perc': y_percentage.toFixed(1)}
        }

        this.returnPosition = function(){
            return {'x': vars.positionX, 'y': vars.positionY}
        }

        this.returnPagePosition = function(){
            return {'x': vars.pageX, 'y': vars.pageY}
        }

        this.returnPercentage = function(){
            var percentage = computePercentage();
            return percentage;
        }
    
        this.construct(options);
    }

    function edit_mode(){
        $('.div-interactive').addClass('delimit-div-zone');
        let interactive_height = $('.div-interactive').find('.interactive-img').height();
        let interactive_width = $('.div-interactive').find('.interactive-img').width();
        let resume_elm = displayResumeElm();
        $('body').append(resume_elm);
        $('.div-interactive').find('.interactive-img').on('click', function(e){
            let pointer_x = e.pageX - $(this).offset().left;
            let pointer_y = e.pageY - $(this).offset().top;
            var dot = new createDot({
                positionX: pointer_x,
                positionY: pointer_y,
                pageX: e.pageX,
                pageY: e.pageY,
                divPosition: [interactive_width, interactive_height]
            });
            addResumeElm(resume_elm, dot);
            appendDot(dot);
            console.log(dot.returnPercentage());
        })
    }

    function displayResumeElm(){
        let main_elm = $('<div>').addClass('display-resume');
        main_elm.append($('<h2>').html('Resume of the dots placed.'));

        return main_elm;
    }

    function addResumeElm(initial_elm, dot){
        initial_elm.append($('<p>').html("x: " + dot.returnPosition().x + " y: " + dot.returnPosition().y))
    }

    function appendDot(dot){
        let new_dot = $('<div>').addClass('dot-elm');
        debugger;
        new_dot.css({
            'left': dot.returnPagePosition().x - new_dot.width() + "px",
            'top': dot.returnPagePosition().y - new_dot.height() + "px",
        })
        console.log(new_dot);
        $('body').append(new_dot);
    }
})