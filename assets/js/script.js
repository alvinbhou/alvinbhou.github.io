
$(document).ready(function(){
	$.ajax({
        url: 'assets/js/projects.json',
        dataType: 'json',
        success: function (data) {
			console.log(data);
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

    $('.contact-container .contact-icon-wrapper')
        .mouseenter(function () {
            console.log($(this));
            $(this).next().find('a').addClass('hovered');
        })
        .mouseleave(function () {
            $(this).next().find('a').removeClass('hovered');
        });
   
});

