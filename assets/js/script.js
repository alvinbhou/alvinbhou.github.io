
$(document).ready(function(){
    /* ajax experiences */

    function expTemplate(at, title, time, link){
        var template = `
        <tr>
            <td>
                <div class='info-text'>
                    ${at}
                    <span style="display:${link ? "inline-block" : "none"}">
                        <a class='icon-link' href="${link}">
                            <i class="fas fa-link"></i>
                        </a>
                    </span>
                </div>
                <div>
                    <p class='small'>${title}</p>
                </div>
            </td>
            <td>${time}</td>
        </tr>
        `;
        return template;
    }
    $.ajax({
        url: 'assets/js/exp.json',
        dataType: 'json',
        success: function (data) {
            var work = data['work'];
            var $work = $('#work-table tbody');
            console.log(work);
            for(var i = 0; i < work.length; ++i){
                $work.append(expTemplate(work[i].at, work[i].title, work[i].time, work[i].link));
            }

            var event = data['event'];
            var $event = $('#event-table tbody');
            for(var i = 0; i < event.length; ++i){
                $event.append(expTemplate(event[i].at, event[i].title, event[i].time, event[i].link));
            }

            // resize #exp panel
			if($('#nav a.active').attr('href') == '#exp'){
				var $main = $('#main');
				$main.height($('#exp.panel').outerHeight());
			}
        }
    });

    /* ajax get project info */
	$.ajax({
        url: 'assets/js/projects.json',
        dataType: 'json',
        success: function (data) {
			// console.log(data);
			for(var i = 0; i < data.length; ++i){
				var $target;
				if(i == 0){
					$target= $('.proj-container .proj-component:first');
				}
				else{
					$target = $('.proj-container .proj-component:first').clone();
				}
				$target.find('.img-box').css('background', 'url(' + data[i]["background-img"] + ')');
				$target.find('.proj-title a').text(data[i]["title"]);
				$target.find('.proj-title a').attr('href', data[i]["url"]);
				$target.find('.proj-description').html(data[i]["description"]);
				var linkContainer = $target.find('.proj-links');
				linkContainer.empty();
				for(var j = 0; j < data[i]['links'].length; ++j){
					var link = data[i]['links'][j];
					linkContainer.append('<a href="'+ link["url"] +'"> <img src ="' + link["icon-url"] +'"/>')
				}
				if(i != 0){
					$('.proj-container').append($target);
				}
			}
			// resize #project panel
			if($('#nav a.active').attr('href') == '#projects'){
				var $main = $('#main');
				$main.height($('#projects.panel').outerHeight());
			}
			
        },
        error: function () {
            console.log("project timeout");
        },
        
    });
 
    /* contract info highlight */
    $('.contact-container .contact-icon-wrapper')
        .mouseenter(function () {
            $(this).next().find('a').addClass('hovered');
        })
        .mouseleave(function () {
            $(this).next().find('a').removeClass('hovered');
        });

    /* scroll to top support */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1440) {
            $('.scroll2top').fadeIn();
        } else {
            $('.scroll2top').fadeOut();
        }
    });

    $('.scroll2top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        $(this).blur();
        return false;
    });

    $('.main-desc-icon').click(function (params) {
        $('body').toggleClass('dark');
    });
   
});

