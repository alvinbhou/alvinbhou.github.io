
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

    function tagTemplate(tag_class){
        let tags = ["ML", "Chatbot", "Web", "Cloud", "Blockchain", "10k+ users", "1k+ users"];
        var template = `
        <div class="proj-list-tag-container">
            <span class="proj-list-tag tag${tag_class}">${tags[tag_class]}</span>
        </div>`;
        return template;
                                    
    }
    $.ajax({
        url: 'assets/js/exp.json',
        dataType: 'json',
        success: function (data) {
            var work = data['work'];
            var $work = $('#work-table tbody');
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
            /* Web list view */
            let $proj_section = $('.proj-section');
            for(let i = 0; i < data.length; ++i){
                let $list_target = $('.proj-container-list.template:first').clone().removeClass('template');
                $list_target.find('.proj-category').text(data[i]['category']);
                for(let j = 0; j < data[i]['lists'].length; ++j){
                    let $target;
                    if(j == 0){
                        $target = $list_target.find('.proj-component-list:first');
                    }
                    else{
                        $target = $list_target.find('.proj-component-list:first').clone();
                    }
                    let proj_data = data[i]['lists'][j]
                    $target.find('.img-box-small-container').attr('href',proj_data["url"]);
                    $target.find('.img-box-small').css('background', 'url(' + proj_data["background-img"] + ')');
                    $target.find('.proj-list-name a').text(proj_data["title"]);
                    $target.find('.proj-list-name a').attr('href', proj_data["url"]);
                    if(proj_data["description-long"]){
                        $target.find('.proj-list-description-info').html(proj_data["description-long"]);
                    }
                    else{
                        $target.find('.proj-list-description-info').html(proj_data["description"]);
                    }
                    var linkContainer = $target.find('.proj-list-links');
                    linkContainer.empty();
                    for(var k = 0; k < proj_data['links'].length; ++k){
                        var link = proj_data['links'][k];
                        if(link["dark-icon-url"]){
                            linkContainer.append('<a href="'+ link["url"] +'"> <img src ="' + link["dark-icon-url"] +'"/>')
                        }
                        else{
                            linkContainer.append('<a href="'+ link["url"] +'"> <img src ="' + link["icon-url"] +'"/>')
                        }
                    }
                    $target.find(".proj-list-tag-container").remove();
                    if(proj_data["tags"]){
                        for(var k = 0; k< proj_data["tags"].length; ++k){
                            $target.find(".proj-description-container").append(tagTemplate(proj_data["tags"][k]));
                        }
                    }  
                    if(j != 0){
                        $list_target.append($target);
                    }
                }
                $proj_section.append($list_target);

                
            }

            /* Phone view */
            for(let i = 0; i < data.length; ++i){
                for(let j = 0; j < data[i]['lists'].length; ++j){
                    let $target;
                    if((j || i ) == 0 ){
                        $target= $('.proj-container .proj-component:first');
                    }
                    else{
                        $target = $('.proj-container .proj-component:first').clone();
                    }
                    let proj_data = data[i]['lists'][j];
                    $target.find('.img-box').css('background', 'url(' + proj_data["background-img"] + ')');
                    $target.find('.proj-title a').text(proj_data["title"]);
                    $target.find('.proj-title a').attr('href', proj_data["url"]);
                    $target.find('.proj-description').html(proj_data["description"]);
                    var linkContainer = $target.find('.proj-links');
                    linkContainer.empty();
                    for(var k = 0; k < proj_data['links'].length; ++k){
                        var link = proj_data['links'][k];
                        linkContainer.append('<a href="'+ link["url"] +'"> <img src ="' + link["icon-url"] +'"/>')
                    }
                    if((j || i ) != 0){
                        $('.proj-container').append($target);
                    }
                }
            }
            // resize #project panel
			if($('#nav a.active').attr('href') == '#projects'){
				var $main = $('#main');
				$main.height($('#projects.panel').outerHeight());
			}

            return;

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
                
                var $list_target;
                if(i == 0){
					$list_target= $('.proj-container-list .proj-component-list:first');
				}
				else{
					$list_target = $('.proj-container-list .proj-component-list:first').clone();
                }
                $list_target.find('.img-box-small-container').attr('href', data[i]["url"]);
                $list_target.find('.img-box-small').css('background', 'url(' + data[i]["background-img"] + ')');
				$list_target.find('.proj-list-name a').text(data[i]["title"]);
                $list_target.find('.proj-list-name a').attr('href', data[i]["url"]);
                if(data[i]["description-long"]){
    				$list_target.find('.proj-list-description-info').html(data[i]["description-long"]);
                }
                else{
    				$list_target.find('.proj-list-description-info').html(data[i]["description"]);
                }
				var linkContainer = $list_target.find('.proj-list-links');
				linkContainer.empty();
				for(var j = 0; j < data[i]['links'].length; ++j){
                    var link = data[i]['links'][j];
                    if(link["dark-icon-url"]){
					    linkContainer.append('<a href="'+ link["url"] +'"> <img src ="' + link["dark-icon-url"] +'"/>')
                    }
                    else{
    					linkContainer.append('<a href="'+ link["url"] +'"> <img src ="' + link["icon-url"] +'"/>')
                    }
                }
                $list_target.find(".proj-list-tag-container").remove();
                if(data[i]["tags"]){
                    for(var j = 0; j < data[i]["tags"].length; ++j){
                        $list_target.find(".proj-description-container").append(tagTemplate(data[i]["tags"][j]));
                    }
                }
				if(i != 0){
					$('.proj-container-list').append($list_target);
                }
                
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

