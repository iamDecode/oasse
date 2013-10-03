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
		var courses = $('.content-compartment-left .container-normal').eq(1);
		var links = $('.content-compartment-right .container-normal').eq(1);

		news.insertBefore($('.content-compartment-right .container-normal').eq(1));
		courses.insertBefore($('.content-compartment-right .container-normal').eq(0));
		links.insertAfter($('.content-compartment-left .container-normal').eq(0));
	}

	function makeBadGradesRed(){
		if (parseInt($('#ctl00_m_g_5b0ad7ad_0f7b_487e_9ae4_d7db29e48921_ctl00_repResultaten_ctl00_lblVakResultaat').html())<6){
			$('#ctl00_m_g_5b0ad7ad_0f7b_487e_9ae4_d7db29e48921_ctl00_repResultaten_ctl00_lblVakResultaat').css('cssText', 'color: #e75151 !important');
		}
		
		$.each($('div#ctl00_m_g_88e55087_7c5e_48ee_9376_906d69fe93a6_ctl00_ui_complexList_results_update_overlayer_complex span[id$="_column04_lb_value"]'), function(){
			if (Math.round(parseFloat($(this).html()))<6){
				$(this).css('cssText', 'color: #e75151 !important');
			}
		});
		
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
		//$('#ctl00_m_g_88e55087_7c5e_48ee_9376_906d69fe93a6_ctl00_upDivContents').css('cssText', 'width: ' + ($(window).width() - (242 + 40)) + 'px !important');
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

	function createBox(width, height, margintop, left, content){
		return '<div class="roosteritem" style="z-index: 99999 !important; position: absolute !important; display: block !important; overflow: hidden !important; min-width: 0 !important; width: '+(width)+'px !important; height: '+(height)+'px !important; margin-top: '+(margintop)+'px !important; margin-left: '+(left+40)+'px !important;">'+(content)+'</div>';
	}

	function improveTimetable(){
		var result = [];

		var title = $('#ctl00_m_g_4dd3adba_4e8a_4d1d_8ce4_9957e75ad235_ctl00_lblRoosterType').html();
		var date = title.match(/\(([^)]+)\)/)[1];
		date = date.substr(date.indexOf(" ") + 1);
		$('.content-compartment-left .container-normal:first-child div.title').html($('.content-compartment-left .container-normal div.title').html() + '<span style="color:#ccc!important;font-weight:normal!important;margin-left:10px!important;">('+date+')</span>');
        
        $.each($('#ctl00_m_g_4dd3adba_4e8a_4d1d_8ce4_9957e75ad235_ctl00_repRooster_ctl00_pnlRowItem'), function(){
            var box2 = {};
            
            /*if row[4]==0:
                left = 0
                width = 430
            else:
                left = 225
                width = 205
                prev2['width'] = 205*/
            var left = 0;
            var width = $('.container-normal').width() - 60;
                    
            // Get height from timestamps.
            var date = new Date();

            var startday = new Date(date.toDateString() + ",08:30:00");

            var times = $(this).find("span").first().html().split(" - ");
            var starttime = new Date(date.toDateString() + ","+times[0]+":00");
            //startdatetime = datetime.strptime(row[1][:-6], "%B %d, %Y %H:%M:%S") - timedelta(0,900)
            var endtime = new Date(date.toDateString() + ","+times[1]+":00");
            
            var height = (((((endtime - starttime)/1000)/60)/60)*40) - 1;
            var margintop = ((((starttime - startday)/1000)/60)/60)*40 - 10;

            //$(this).find("span").first().remove();
            var content = $(this).html();
            
            result.push(createBox(width, height, margintop, left, content));
        });
        
        $('#ctl00_m_g_4dd3adba_4e8a_4d1d_8ce4_9957e75ad235_ctl00_repRooster_ctl00_pnlRowItem').remove();

        $('<table cellpadding="0" cellspacing="0" class="rooster"><tr>  <td>1</td> <td colspan="5"></td> </tr> <tr> <td>2</td> <td colspan="5"></td> </tr> <tr> <td>3</td> <td colspan="5"></td> </tr> <tr> <td>4</td> <td colspan="5"></td> </tr> <tr> <td>Break</td> <td colspan="5"></td> </tr> <tr> <td>5</td> <td colspan="5"></td> </tr> <tr> <td>6</td> <td colspan="5"></td> </tr> <tr> <td>7</td> <td colspan="5"></td> </tr> <tr> <td>8</td> <td colspan="5"></td> </tr> </table>').insertAfter($('#ctl00_m_g_4dd3adba_4e8a_4d1d_8ce4_9957e75ad235_ctl00_pnlNavigationPartial'));
        for (var i = 0; i<result.length; i++){
        	$(result[i]).insertAfter($('#ctl00_m_g_4dd3adba_4e8a_4d1d_8ce4_9957e75ad235_ctl00_pnlNavigationPartial'));
        }

        //if next day on timetable, do this.
		$('#ctl00_m_g_4dd3adba_4e8a_4d1d_8ce4_9957e75ad235_ctl00_pnlNavigationPartial a').bind('click', function(e) {
			notchanged = true;
			restartTimetableFix();
		});
	}

	function improveResults(){
		//give header title
		var header = $('#ctl00_m_g_88e55087_7c5e_48ee_9376_906d69fe93a6_ctl00_ui_complexList_results_divHeaderDropdown');
		header.html("Resultaten "+header.html());

		//change items in results
		$.each($("div#ctl00_m_g_88e55087_7c5e_48ee_9376_906d69fe93a6_ctl00_ui_complexList_results_update_overlayer_complex span[id$='_column02_lb_value']"), function(){
			var textarray = $(this).html().split(" - ");
			var text = '<span class="resultitem">' + textarray[0] + "</span>" + textarray[1];
			$(this).html(text);
		});

		//ECTS badges
		$.each($("div#ctl00_m_g_88e55087_7c5e_48ee_9376_906d69fe93a6_ctl00_ui_complexList_results_update_overlayer_complex span[id$='_column05_lb_value']"), function(){

			if ($(this).html() == "0"){
				$(this).remove();
			} else if ($(this).html() == "3"){
				$(this).html("+ "+$(this).html()+"ECTS");
				$(this).parent().addClass('badge_blue');
			} else if ($(this).html() == "6" || $(this).html() == "5"){
				$(this).html("+ "+$(this).html()+"ECTS");
				$(this).parent().addClass('badge_pink');
			}
		});

	}

	var notchanged = true;
	function restartTimetableFix(){
		console.log('restartTimetableFix');
		if (notchanged) {
			console.log('no roosteritem yet');

			if($('#ctl00_m_g_4dd3adba_4e8a_4d1d_8ce4_9957e75ad235_ctl00_repRooster_ctl00_pnlRowItem')[0] || $('#ctl00_m_g_4dd3adba_4e8a_4d1d_8ce4_9957e75ad235_ctl00_lblNoResults')[0]){
				console.log('improve');
				improveTimetable();
			} else {
				console.log('retry1');
				setTimeout(function(){restartTimetableFix();},100);
			}
	   	} else {
	   		console.log('retry2');
			setTimeout(function(){restartTimetableFix();},100);	
	   	}
	}

	$('.container-normal').bind('DOMNodeInserted', function(e) {
	   	if (notchanged){
	   		notchanged = false;
	   	}
	});

	function resizeFunctions(){
		fullHeightContent();
		fullWidthContent();
	}

	function startFunctions(){
		rearrangeContentBlocks();
		makeBadGradesRed();
		showLoadersOnPageLoad();
		improveTimetable();

		//voor activiteiten, maar hoeven maar eenmalig
		buildAdvancedSearch();
	}

	function activiteitenFunctions(){
		removeWeirdOverlay();
		rearrangeContentBlockActiviteiten();
		activiteitenLoadingIndicator();
		activiteitenSearchBar();
		fixLinksStudiepakket();
	}

	function resultFunctions(){
		improveResults();
		makeBadGradesRed();
	}

	resultFunctions();

	var lasttime = Date.now();

	$('#ctl00_m_g_88e55087_7c5e_48ee_9376_906d69fe93a6_ctl00_upDivContent').bind('DOMNodeInserted', function(e) {
	   	/*$.doTimeout( 'DOMNodeInserted', 250, function(){
	    	console.log('page refresh');
	   		resultFunctions();
	  	});*/
		

		if((Date.now() - lasttime)<20000){
			console.log(Date.now() - lasttime);
			lasttime = Date.now() + 400000;
		}
	});

	//if search on activiteiten is done, reapply javascript
	$('#ctl00_m_g_dded696c_ebf5_4f42_82e8_4a83ed101731_ctl00_upDivContent').bind('DOMNodeInserted', function(e) {
	   	$.doTimeout( 'DOMNodeInserted', 250, function(){
	    	console.log('page refresh');
	   		activiteitenFunctions();
	  	});
	});

	//execute functions
	startFunctions();
	resizeFunctions();

	$(window).resize(function() { 
		resizeFunctions();
	});
});