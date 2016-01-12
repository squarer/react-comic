$( document ).ready(function() {
    $(window).scroll(function() {
    	var loadmore = $("button#loadMore");
        if (loadmore.length <= 0)   return;
	    if(loadmore.position().top < $(window).scrollTop() + $(window).height()) {
	    	loadmore.click();
	    }
	});
});
