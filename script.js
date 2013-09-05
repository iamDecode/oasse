/*
 * jQuery doTimeout: Like setTimeout, but better! - v1.0 - 3/3/2010
 * http://benalman.com/projects/jquery-dotimeout-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){var a={},c="doTimeout",d=Array.prototype.slice;$[c]=function(){return b.apply(window,[0].concat(d.call(arguments)))};$.fn[c]=function(){var f=d.call(arguments),e=b.apply(this,[c+f[0]].concat(f));return typeof f[0]==="number"||typeof f[1]==="number"?this:e};function b(l){var m=this,h,k={},g=l?$.fn:$,n=arguments,i=4,f=n[1],j=n[2],p=n[3];if(typeof f!=="string"){i--;f=l=0;j=n[1];p=n[2]}if(l){h=m.eq(0);h.data(l,k=h.data(l)||{})}else{if(f){k=a[f]||(a[f]={})}}k.id&&clearTimeout(k.id);delete k.id;function e(){if(l){h.removeData(l)}else{if(f){delete a[f]}}}function o(){k.id=setTimeout(function(){k.fn()},j)}if(p){k.fn=function(q){if(typeof p==="string"){p=g[p]}p.apply(m,d.call(n,i))===true&&!q?o():e()};o()}else{if(k.fn){j===undefined?e():k.fn(j===false);return true}else{e()}}}})(jQuery);



$(document).ready(function(){
	function fullHeightContent(){
		$('#content').css('cssText', 'min-height: '+ ($(document).height()-110) +'px !important');
	}

	function rearrangeContentBlocks() {
		var news = $('.content-compartment-left .container-normal').eq(2);
		news.insertBefore($('.content-compartment-right .container-normal').eq(1));
		//$('.content-compartment-left .container-normal').eq(2).remove();
	}

	function makeBadGradesRed(){
		if (parseInt($('#ctl00_m_g_5b0ad7ad_0f7b_487e_9ae4_d7db29e48921_ctl00_repResultaten_ctl00_lblVakResultaat').html())<6){
			$('#ctl00_m_g_5b0ad7ad_0f7b_487e_9ae4_d7db29e48921_ctl00_repResultaten_ctl00_lblVakResultaat').css('cssText', 'color: #e75151 !important');
		}
	}

	function activiteitenSearchBar(){
		var searchElement = $('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-child(4)');
		searchElement.insertBefore($('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-child(1)'));

		var searchButton = $('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_btnSearch');
		searchButton.insertAfter($('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-child(1)'));

		$('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-child(1) input').attr('placeholder','Vul een vakcode of vaknaam in...');
		$('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-child(1) input').focus(function(){
			$(this).css('font-style: normal !important');
		});
	}

	function showLoadersOnPageLoad(){
		$('#base-menu .menu-list > div a, #ctl00_tue_profileMenu_div_menuContainer > div a, #ctl00_tue_loginHeader_lnkLogOut').click(function(event){
			event.preventDefault();
			var elem = $(event.target);

			$('*').removeClass('active_loading').removeClass('loading');

			if (elem.parent().parent().attr('class').indexOf("active")!=-1){
				elem.addClass('active_loading');
			} else {
				elem.addClass('loading');
			}

			$(this).unbind('click');
			var realthis = this;
			setTimeout(function(){
				realthis.click();
			},50);
		});
	}

	function activiteitenLoadingIndicator(){
		$('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_btnSearch').click(function(event){
			event.preventDefault();

			$('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-child(1) input').addClass('loading');

			$(this).unbind('click');
			var realthis = this;
			setTimeout(function(){
				realthis.click();
			},10);
		});

		$('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-child(1) input').keypress(function(event) {
	        if(event.which == 13) {
	        	$(this).addClass('loading');
	        }
	    });
	}

	function replaceLongQuartileWithQ(){
		$('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_upDivContent').bind('DOMNodeInserted', function(e) {
			e.preventDefault();
		});

		$.each($('div[id*="ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_treeMijnActiviteiten_uitv_"] .MA-colOmschrijving span'), function(){
			var text = $(this).html();
			text = text.substring( (text.lastIndexOf(">")-3) );
			var replacetext = text;

			var index = 0;
			if(text.lastIndexOf('A')!=-1 || text.lastIndexOf('B')){
				index = Math.max(parseInt(text.lastIndexOf('A')), parseInt(text.lastIndexOf('B')));
			}

			if (index != 0){
				text = text.substring(index+2);
				text = text.replace("Kwartiel ", "Q");

				$(this).html($(this).html().replace(replacetext,text));
			}
		});
	}

	var advSearchLink;
	function buildAdvancedSearch(){
		if ($('#ctl00_tue_pageTitle_lb_title').html()=="Activiteiten"){
			advSearchLink  = $('<a id="advancedSearchLink" href="#" >Geavanceerd zoeken</a>');
			$('#content .content-content').append(advSearchLink);

			advSearchLink.click(function(){
				if ($('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-of-type(3)').css('display') == 'none') {
				    $('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row').css('cssText', 'display: block !important');
				} else {
				    $('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row').css('cssText', 'display: none !important');
				    $('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-child(1)').css('cssText', 'display: block !important');
				    $('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_pnlSearchArea > div.list-row:nth-child(9)').css('cssText', 'display: block !important');
				}

				rearrangeContentBlockActiviteiten();
			});
		}
	}

	function removeWeirdOverlay(){
		/* later for more pages?? */
		if ($('#ctl00_tue_pageTitle_lb_title').html()=="Activiteiten"){
			$('.content-content > div:nth-child(2)').css('cssText', 'display: none !important');
		}
	}

	function fullWidthContent(){
		$('.content-content > .content-compartment-single > div:nth-of-type(5)').css('cssText', 'width: ' + ($(window).width() - (242 + 40)) + 'px !important');
	}

	function rearrangeContentBlockActiviteiten(){
		var studiepakket = $('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_UpdatePanel1');
		var aangemeldevakken = $('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_treeMijnActiviteiten_update');
		studiepakket.css('cssText','position: absolute !important; top: ' + (aangemeldevakken.offset().top - 225 - $(document).scrollTop()) + 'px !important; left: ' + (aangemeldevakken.position().left + aangemeldevakken.width()) + 'px !important; margin-left: 20px !important;');
	}

	function fixLinksStudiepakket(){
		//Not optimal, not to the right page?
		$.each($('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_clCoursePackage_box_normal a'), function(){
			$(this).attr("href", "https://onderwijssso.tue.nl/Activiteiten/Pages/Overzicht.aspx?coursecode=" + $(this).html() + "&educationyear=2013&educationActivityInstanceId=")
		});
	}

	function resizeFunctions(){
		fullHeightContent();
		fullWidthContent();
	}

	function startFunctions(){
		//rearrangeContentBlocks();
		makeBadGradesRed();
		showLoadersOnPageLoad();

		//voor activiteiten, maar hoeven maar eenmalig
		buildAdvancedSearch();
	}

	//if search on activiteiten is done, reapply javascript
	$('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_upDivContent').bind('DOMNodeInserted', function(e) {
	   	$.doTimeout( 'DOMNodeInserted', 250, function(){
	    	console.log('page refresh');
	   		activiteitenFunctions();
	  	});
	});

	function activiteitenFunctions(){
		removeWeirdOverlay();
		rearrangeContentBlockActiviteiten();
		activiteitenLoadingIndicator();
		activiteitenSearchBar();
		fixLinksStudiepakket();
	}

	//execute functions
	startFunctions();
	resizeFunctions();

	$(window).resize(function() { 
		resizeFunctions();
	});
});