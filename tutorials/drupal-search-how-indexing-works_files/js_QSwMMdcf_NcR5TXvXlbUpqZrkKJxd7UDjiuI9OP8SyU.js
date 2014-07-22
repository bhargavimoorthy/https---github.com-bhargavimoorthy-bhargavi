
/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;
/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( event.wheelDelta ) { delta = event.wheelDelta/120; }
    if ( event.detail     ) { delta = -event.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return $.event.handle.apply(this, args);
}

})(jQuery);;
/*
 * jScrollPane - v2.0.0beta6 - 2010-12-06
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b,a,c){b.fn.jScrollPane=function(f){function d(C,L){var au,N=this,V,ah,v,aj,Q,W,y,q,av,aB,ap,i,H,h,j,X,R,al,U,t,A,am,ac,ak,F,l,ao,at,x,aq,aE,g,aA,ag=true,M=true,aD=false,k=false,Z=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";aE=C.css("paddingTop")+" "+C.css("paddingRight")+" "+C.css("paddingBottom")+" "+C.css("paddingLeft");g=(parseInt(C.css("paddingLeft"))||0)+(parseInt(C.css("paddingRight"))||0);an(L);function an(aH){var aL,aK,aJ,aG,aF,aI;au=aH;if(V==c){C.css({overflow:"hidden",padding:0});ah=C.innerWidth()+g;v=C.innerHeight();C.width(ah);V=b('<div class="jspPane" />').wrap(b('<div class="jspContainer" />').css({width:ah+"px",height:v+"px"}));C.wrapInner(V.parent());aj=C.find(">.jspContainer");V=aj.find(">.jspPane");V.css("padding",aE)}else{C.css("width","");aI=C.outerWidth()+g!=ah||C.outerHeight()!=v;if(aI){ah=C.innerWidth()+g;v=C.innerHeight();aj.css({width:ah+"px",height:v+"px"})}aA=V.innerWidth();if(!aI&&V.outerWidth()==Q&&V.outerHeight()==W){if(aB||av){V.css("width",aA+"px");C.css("width",(aA+g)+"px")}return}V.css("width","");C.css("width",(ah)+"px");aj.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}aL=V.clone().css("position","absolute");aK=b('<div style="width:1px; position: relative;" />').append(aL);b("body").append(aK);Q=Math.max(V.outerWidth(),aL.outerWidth());aK.remove();W=V.outerHeight();y=Q/ah;q=W/v;av=q>1;aB=y>1;if(!(aB||av)){C.removeClass("jspScrollable");V.css({top:0,width:aj.width()-g});n();D();O();w();af()}else{C.addClass("jspScrollable");aJ=au.maintainPosition&&(H||X);if(aJ){aG=ay();aF=aw()}aC();z();E();if(aJ){K(aG);J(aF)}I();ad();if(au.enableKeyboardNavigation){P()}if(au.clickOnTrack){p()}B();if(au.hijackInternalLinks){m()}}if(au.autoReinitialise&&!aq){aq=setInterval(function(){an(au)},au.autoReinitialiseDelay)}else{if(!au.autoReinitialise&&aq){clearInterval(aq)}}C.trigger("jsp-initialised",[aB||av])}function aC(){if(av){aj.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));R=aj.find(">.jspVerticalBar");al=R.find(">.jspTrack");ap=al.find(">.jspDrag");if(au.showArrows){am=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",az(0,-1)).bind("click.jsp",ax);ac=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",az(0,1)).bind("click.jsp",ax);if(au.arrowScrollOnHover){am.bind("mouseover.jsp",az(0,-1,am));ac.bind("mouseover.jsp",az(0,1,ac))}ai(al,au.verticalArrowPositions,am,ac)}t=v;aj.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});ap.hover(function(){ap.addClass("jspHover")},function(){ap.removeClass("jspHover")}).bind("mousedown.jsp",function(aF){b("html").bind("dragstart.jsp selectstart.jsp",function(){return false});ap.addClass("jspActive");var s=aF.pageY-ap.position().top;b("html").bind("mousemove.jsp",function(aG){S(aG.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",ar);return false});o()}}function o(){al.height(t+"px");H=0;U=au.verticalGutter+al.outerWidth();V.width(ah-U-g);if(R.position().left==0){V.css("margin-left",U+"px")}}function z(){if(aB){aj.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));ak=aj.find(">.jspHorizontalBar");F=ak.find(">.jspTrack");h=F.find(">.jspDrag");if(au.showArrows){at=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",az(-1,0)).bind("click.jsp",ax);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",az(1,0)).bind("click.jsp",ax);if(au.arrowScrollOnHover){at.bind("mouseover.jsp",az(-1,0,at));
x.bind("mouseover.jsp",az(1,0,x))}ai(F,au.horizontalArrowPositions,at,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aF){b("html").bind("dragstart.jsp selectstart.jsp",function(){return false});h.addClass("jspActive");var s=aF.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aG){T(aG.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",ar);return false});l=aj.innerWidth();ae()}else{}}function ae(){aj.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});F.width(l+"px");X=0}function E(){if(aB&&av){var aF=F.outerHeight(),s=al.outerWidth();t-=aF;b(ak).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;ah-=aF;F.parent().append(b('<div class="jspCorner" />').css("width",aF+"px"));o();ae()}if(aB){V.width((aj.outerWidth()-g)+"px")}W=V.outerHeight();q=W/v;if(aB){ao=1/y*l;if(ao>au.horizontalDragMaxWidth){ao=au.horizontalDragMaxWidth}else{if(ao<au.horizontalDragMinWidth){ao=au.horizontalDragMinWidth}}h.width(ao+"px");j=l-ao;ab(X)}if(av){A=1/q*t;if(A>au.verticalDragMaxHeight){A=au.verticalDragMaxHeight}else{if(A<au.verticalDragMinHeight){A=au.verticalDragMinHeight}}ap.height(A+"px");i=t-A;aa(H)}}function ai(aG,aI,aF,s){var aK="before",aH="after",aJ;if(aI=="os"){aI=/Mac/.test(navigator.platform)?"after":"split"}if(aI==aK){aH=aI}else{if(aI==aH){aK=aI;aJ=aF;aF=s;s=aJ}}aG[aK](aF)[aH](s)}function az(aF,s,aG){return function(){G(aF,s,this,aG);this.blur();return false}}function G(aH,aF,aK,aJ){aK=b(aK).addClass("jspActive");var aI,s=function(){if(aH!=0){T(X+aH*au.arrowButtonSpeed,false)}if(aF!=0){S(H+aF*au.arrowButtonSpeed,false)}},aG=setInterval(s,au.arrowRepeatFreq);s();aI=aJ==c?"mouseup.jsp":"mouseout.jsp";aJ=aJ||b("html");aJ.bind(aI,function(){aK.removeClass("jspActive");clearInterval(aG);aJ.unbind(aI)})}function p(){w();if(av){al.bind("mousedown.jsp",function(aH){if(aH.originalTarget==c||aH.originalTarget==aH.currentTarget){var aG=b(this),s=setInterval(function(){var aI=aG.offset(),aJ=aH.pageY-aI.top;if(H+A<aJ){S(H+au.trackClickSpeed)}else{if(aJ<H){S(H-au.trackClickSpeed)}else{aF()}}},au.trackClickRepeatFreq),aF=function(){s&&clearInterval(s);s=null;b(document).unbind("mouseup.jsp",aF)};b(document).bind("mouseup.jsp",aF);return false}})}if(aB){F.bind("mousedown.jsp",function(aH){if(aH.originalTarget==c||aH.originalTarget==aH.currentTarget){var aG=b(this),s=setInterval(function(){var aI=aG.offset(),aJ=aH.pageX-aI.left;if(X+ao<aJ){T(X+au.trackClickSpeed)}else{if(aJ<X){T(X-au.trackClickSpeed)}else{aF()}}},au.trackClickRepeatFreq),aF=function(){s&&clearInterval(s);s=null;b(document).unbind("mouseup.jsp",aF)};b(document).bind("mouseup.jsp",aF);return false}})}}function w(){F&&F.unbind("mousedown.jsp");al&&al.unbind("mousedown.jsp")}function ar(){b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");ap&&ap.removeClass("jspActive");h&&h.removeClass("jspActive")}function S(s,aF){if(!av){return}if(s<0){s=0}else{if(s>i){s=i}}if(aF==c){aF=au.animateScroll}if(aF){N.animate(ap,"top",s,aa)}else{ap.css("top",s);aa(s)}}function aa(aF){if(aF==c){aF=ap.position().top}aj.scrollTop(0);H=aF;var aI=H==0,aG=H==i,aH=aF/i,s=-aH*(W-v);if(ag!=aI||aD!=aG){ag=aI;aD=aG;C.trigger("jsp-arrow-change",[ag,aD,M,k])}u(aI,aG);V.css("top",s);C.trigger("jsp-scroll-y",[-s,aI,aG])}function T(aF,s){if(!aB){return}if(aF<0){aF=0}else{if(aF>j){aF=j}}if(s==c){s=au.animateScroll}if(s){N.animate(h,"left",aF,ab)}else{h.css("left",aF);ab(aF)}}function ab(aF){if(aF==c){aF=h.position().left}aj.scrollTop(0);X=aF;var aI=X==0,aH=X==j,aG=aF/j,s=-aG*(Q-ah);if(M!=aI||k!=aH){M=aI;k=aH;C.trigger("jsp-arrow-change",[ag,aD,M,k])}r(aI,aH);V.css("left",s);C.trigger("jsp-scroll-x",[-s,aI,aH])}function u(aF,s){if(au.showArrows){am[aF?"addClass":"removeClass"]("jspDisabled");ac[s?"addClass":"removeClass"]("jspDisabled")}}function r(aF,s){if(au.showArrows){at[aF?"addClass":"removeClass"]("jspDisabled");
x[s?"addClass":"removeClass"]("jspDisabled")}}function J(s,aF){var aG=s/(W-v);S(aG*i,aF)}function K(aF,s){var aG=aF/(Q-ah);T(aG*j,s)}function Y(aR,aM,aG){var aK,aH,aI,s=0,aQ=0,aF,aL,aO,aN,aP;try{aK=b(aR)}catch(aJ){return}aH=aK.outerHeight();aI=aK.outerWidth();aj.scrollTop(0);aj.scrollLeft(0);while(!aK.is(".jspPane")){s+=aK.position().top;aQ+=aK.position().left;aK=aK.offsetParent();if(/^body|html$/i.test(aK[0].nodeName)){return}}aF=aw();aL=aF+v;if(s<aF||aM){aN=s-au.verticalGutter}else{if(s+aH>aL){aN=s-v+aH+au.verticalGutter}}if(aN){J(aN,aG)}viewportLeft=ay();aO=viewportLeft+ah;if(aQ<viewportLeft||aM){aP=aQ-au.horizontalGutter}else{if(aQ+aI>aO){aP=aQ-ah+aI+au.horizontalGutter}}if(aP){K(aP,aG)}}function ay(){return -V.position().left}function aw(){return -V.position().top}function ad(){aj.unbind(Z).bind(Z,function(aI,aJ,aH,aF){var aG=X,s=H;T(X+aH*au.mouseWheelSpeed*ah/(Q-ah),false);S(H-aF*au.mouseWheelSpeed*v/(W-v),false);return aG==X&&s==H})}function n(){aj.unbind(Z)}function ax(){return false}function I(){V.unbind("focusin.jsp").bind("focusin.jsp",function(s){if(s.target===V[0]){return}Y(s.target,false)})}function D(){V.unbind("focusin.jsp")}function P(){var aF,s;C.attr("tabindex",0).unbind("keydown.jsp").bind("keydown.jsp",function(aJ){if(aJ.target!==C[0]){return}var aH=X,aG=H,aI=aF?2:16;switch(aJ.keyCode){case 40:S(H+aI,false);break;case 38:S(H-aI,false);break;case 34:case 32:J(aw()+Math.max(32,v)-16);break;case 33:J(aw()-v+16);break;case 35:J(W-v);break;case 36:J(0);break;case 39:T(X+aI,false);break;case 37:T(X-aI,false);break}if(!(aH==X&&aG==H)){aF=true;clearTimeout(s);s=setTimeout(function(){aF=false},260);return false}});if(au.hideFocus){C.css("outline","none");if("hideFocus" in aj[0]){C.attr("hideFocus",true)}}else{C.css("outline","");if("hideFocus" in aj[0]){C.attr("hideFocus",false)}}}function O(){C.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp")}function B(){if(location.hash&&location.hash.length>1){var aG,aF;try{aG=b(location.hash)}catch(s){return}if(aG.length&&V.find(aG)){if(aj.scrollTop()==0){aF=setInterval(function(){if(aj.scrollTop()>0){Y(location.hash,true);b(document).scrollTop(aj.position().top);clearInterval(aF)}},50)}else{Y(location.hash,true);b(document).scrollTop(aj.position().top)}}}}function af(){b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")}function m(){af();b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack",function(){var s=this.href.split("#"),aF;if(s.length>1){aF=s[1];if(aF.length>0&&V.find("#"+aF).length>0){Y("#"+aF,true);return false}}})}b.extend(N,{reinitialise:function(aF){aF=b.extend({},aF,au);an(aF)},scrollToElement:function(aG,aF,s){Y(aG,aF,s)},scrollTo:function(aG,s,aF){K(aG,aF);J(s,aF)},scrollToX:function(aF,s){K(aF,s)},scrollToY:function(s,aF){J(s,aF)},scrollBy:function(aF,s,aG){N.scrollByX(aF,aG);N.scrollByY(s,aG)},scrollByX:function(s,aG){var aF=ay()+s,aH=aF/(Q-ah);T(aH*j,aG)},scrollByY:function(s,aG){var aF=aw()+s,aH=aF/(W-v);S(aH*i,aG)},animate:function(aF,aI,s,aH){var aG={};aG[aI]=s;aF.animate(aG,{duration:au.animateDuration,ease:au.animateEase,queue:false,step:aH})},getContentPositionX:function(){return ay()},getContentPositionY:function(){return aw()},getIsScrollableH:function(){return aB},getIsScrollableV:function(){return av},getContentPane:function(){return V},scrollToBottom:function(s){S(i,s)},hijackInternalLinks:function(){m()}})}f=b.extend({},b.fn.jScrollPane.defaults,f);var e;this.each(function(){var g=b(this),h=g.data("jsp");if(h){h.reinitialise(f)}else{h=new d(g,f);g.data("jsp",h)}e=e?e.add(g):g});return e};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:30,arrowButtonSpeed:30,arrowRepeatFreq:100,arrowScrollOnHover:false,trackClickSpeed:30,trackClickRepeatFreq:100,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false}
})(jQuery,this);;
(function ($) {

/**
 * Provides Ajax page updating via jQuery $.ajax (Asynchronous JavaScript and XML).
 *
 * Ajax is a method of making a request via JavaScript while viewing an HTML
 * page. The request returns an array of commands encoded in JSON, which is
 * then executed to make any changes that are necessary to the page.
 *
 * Drupal uses this file to enhance form elements with #ajax['path'] and
 * #ajax['wrapper'] properties. If set, this file will automatically be included
 * to provide Ajax capabilities.
 */

Drupal.ajax = Drupal.ajax || {};

/**
 * Attaches the Ajax behavior to each Ajax form element.
 */
Drupal.behaviors.AJAX = {
  attach: function (context, settings) {
    // Load all Ajax behaviors specified in the settings.
    for (var base in settings.ajax) {
      if (!$('#' + base + '.ajax-processed').length) {
        var element_settings = settings.ajax[base];

        if (typeof element_settings.selector == 'undefined') {
          element_settings.selector = '#' + base;
        }
        $(element_settings.selector).each(function () {
          element_settings.element = this;
          Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        });

        $('#' + base).addClass('ajax-processed');
      }
    }

    // Bind Ajax behaviors to all items showing the class.
    $('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};
      // Clicked links look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      // For anchor tags, these will go to the target of the anchor rather
      // than the usual location.
      if ($(this).attr('href')) {
        element_settings.url = $(this).attr('href');
        element_settings.event = 'click';
      }
      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });

    // This class means to submit the form to the action using Ajax.
    $('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};

      // Ajax submits specified in this manner automatically submit to the
      // normal form action.
      element_settings.url = $(this.form).attr('action');
      // Form submit button clicks need to tell the form what was clicked so
      // it gets passed in the POST request.
      element_settings.setClick = true;
      // Form buttons use the 'click' event rather than mousedown.
      element_settings.event = 'click';
      // Clicked form buttons look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });
  }
};

/**
 * Ajax object.
 *
 * All Ajax objects on a page are accessible through the global Drupal.ajax
 * object and are keyed by the submit button's ID. You can access them from
 * your module's JavaScript file to override properties or functions.
 *
 * For example, if your Ajax enabled button has the ID 'edit-submit', you can
 * redefine the function that is called to insert the new content like this
 * (inside a Drupal.behaviors attach block):
 * @code
 *    Drupal.behaviors.myCustomAJAXStuff = {
 *      attach: function (context, settings) {
 *        Drupal.ajax['edit-submit'].commands.insert = function (ajax, response, status) {
 *          new_content = $(response.data);
 *          $('#my-wrapper').append(new_content);
 *          alert('New content was appended to #my-wrapper');
 *        }
 *      }
 *    };
 * @endcode
 */
Drupal.ajax = function (base, element, element_settings) {
  var defaults = {
    url: 'system/ajax',
    event: 'mousedown',
    keypress: true,
    selector: '#' + base,
    effect: 'none',
    speed: 'none',
    method: 'replaceWith',
    progress: {
      type: 'throbber',
      message: Drupal.t('Please wait...')
    },
    submit: {
      'js': true
    }
  };

  $.extend(this, defaults, element_settings);

  this.element = element;
  this.element_settings = element_settings;

  // Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
  // the server detect when it needs to degrade gracefully.
  // There are five scenarios to check for:
  // 1. /nojs/
  // 2. /nojs$ - The end of a URL string.
  // 3. /nojs? - Followed by a query (with clean URLs enabled).
  //      E.g.: path/nojs?destination=foobar
  // 4. /nojs& - Followed by a query (without clean URLs enabled).
  //      E.g.: ?q=path/nojs&destination=foobar
  // 5. /nojs# - Followed by a fragment.
  //      E.g.: path/nojs#myfragment
  this.url = element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g, '/ajax$1');
  this.wrapper = '#' + element_settings.wrapper;

  // If there isn't a form, jQuery.ajax() will be used instead, allowing us to
  // bind Ajax to links as well.
  if (this.element.form) {
    this.form = $(this.element.form);
  }

  // Set the options for the ajaxSubmit function.
  // The 'this' variable will not persist inside of the options object.
  var ajax = this;
  ajax.options = {
    url: ajax.url,
    data: ajax.submit,
    beforeSerialize: function (element_settings, options) {
      return ajax.beforeSerialize(element_settings, options);
    },
    beforeSubmit: function (form_values, element_settings, options) {
      ajax.ajaxing = true;
      return ajax.beforeSubmit(form_values, element_settings, options);
    },
    beforeSend: function (xmlhttprequest, options) {
      ajax.ajaxing = true;
      return ajax.beforeSend(xmlhttprequest, options);
    },
    success: function (response, status) {
      // Sanity check for browser support (object expected).
      // When using iFrame uploads, responses must be returned as a string.
      if (typeof response == 'string') {
        response = $.parseJSON(response);
      }
      return ajax.success(response, status);
    },
    complete: function (response, status) {
      ajax.ajaxing = false;
      if (status == 'error' || status == 'parsererror') {
        return ajax.error(response, ajax.url);
      }
    },
    dataType: 'json',
    type: 'POST'
  };

  // Bind the ajaxSubmit function to the element event.
  $(ajax.element).bind(element_settings.event, function (event) {
    return ajax.eventResponse(this, event);
  });

  // If necessary, enable keyboard submission so that Ajax behaviors
  // can be triggered through keyboard input as well as e.g. a mousedown
  // action.
  if (element_settings.keypress) {
    $(ajax.element).keypress(function (event) {
      return ajax.keypressResponse(this, event);
    });
  }

  // If necessary, prevent the browser default action of an additional event.
  // For example, prevent the browser default action of a click, even if the
  // AJAX behavior binds to mousedown.
  if (element_settings.prevent) {
    $(ajax.element).bind(element_settings.prevent, false);
  }
};

/**
 * Handle a key press.
 *
 * The Ajax object will, if instructed, bind to a key press response. This
 * will test to see if the key press is valid to trigger this event and
 * if it is, trigger it for us and prevent other keypresses from triggering.
 * In this case we're handling RETURN and SPACEBAR keypresses (event codes 13
 * and 32. RETURN is often used to submit a form when in a textfield, and 
 * SPACE is often used to activate an element without submitting. 
 */
Drupal.ajax.prototype.keypressResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Detect enter key and space bar and allow the standard response for them,
  // except for form elements of type 'text' and 'textarea', where the 
  // spacebar activation causes inappropriate activation if #ajax['keypress'] is 
  // TRUE. On a text-type widget a space should always be a space.
  if (event.which == 13 || (event.which == 32 && element.type != 'text' && element.type != 'textarea')) {
    $(ajax.element_settings.element).trigger(ajax.element_settings.event);
    return false;
  }
};

/**
 * Handle an event that triggers an Ajax response.
 *
 * When an event that triggers an Ajax response happens, this method will
 * perform the actual Ajax call. It is bound to the event using
 * bind() in the constructor, and it uses the options specified on the
 * ajax object.
 */
Drupal.ajax.prototype.eventResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Do not perform another ajax command if one is already in progress.
  if (ajax.ajaxing) {
    return false;
  }

  try {
    if (ajax.form) {
      // If setClick is set, we must set this to ensure that the button's
      // value is passed.
      if (ajax.setClick) {
        // Mark the clicked button. 'form.clk' is a special variable for
        // ajaxSubmit that tells the system which element got clicked to
        // trigger the submit. Without it there would be no 'op' or
        // equivalent.
        element.form.clk = element;
      }

      ajax.form.ajaxSubmit(ajax.options);
    }
    else {
      ajax.beforeSerialize(ajax.element, ajax.options);
      $.ajax(ajax.options);
    }
  }
  catch (e) {
    // Unset the ajax.ajaxing flag here because it won't be unset during
    // the complete response.
    ajax.ajaxing = false;
    alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
  }

  // For radio/checkbox, allow the default event. On IE, this means letting
  // it actually check the box.
  if (typeof element.type != 'undefined' && (element.type == 'checkbox' || element.type == 'radio')) {
    return true;
  }
  else {
    return false;
  }

};

/**
 * Handler for the form serialization.
 *
 * Runs before the beforeSend() handler (see below), and unlike that one, runs
 * before field data is collected.
 */
Drupal.ajax.prototype.beforeSerialize = function (element, options) {
  // Allow detaching behaviors to update field values before collecting them.
  // This is only needed when field values are added to the POST data, so only
  // when there is a form such that this.form.ajaxSubmit() is used instead of
  // $.ajax(). When there is no form and $.ajax() is used, beforeSerialize()
  // isn't called, but don't rely on that: explicitly check this.form.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.detachBehaviors(this.form, settings, 'serialize');
  }

  // Prevent duplicate HTML ids in the returned markup.
  // @see drupal_html_id()
  options.data['ajax_html_ids[]'] = [];
  $('[id]').each(function () {
    options.data['ajax_html_ids[]'].push(this.id);
  });

  // Allow Drupal to return new JavaScript and CSS files to load without
  // returning the ones already loaded.
  // @see ajax_base_page_theme()
  // @see drupal_get_css()
  // @see drupal_get_js()
  options.data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
  options.data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;
  for (var key in Drupal.settings.ajaxPageState.css) {
    options.data['ajax_page_state[css][' + key + ']'] = 1;
  }
  for (var key in Drupal.settings.ajaxPageState.js) {
    options.data['ajax_page_state[js][' + key + ']'] = 1;
  }
};

/**
 * Modify form values prior to form submission.
 */
Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
  // This function is left empty to make it simple to override for modules
  // that wish to add functionality here.
}

/**
 * Prepare the Ajax request before it is sent.
 */
Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = v;
    }
  }

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress. ajax.ajaxing prevents
  // the element from triggering a new request, but does not prevent the user
  // from changing its value.
  $(this.element).addClass('progress-disabled').attr('disabled', true);

  // Insert progressbar or throbber.
  if (this.progress.type == 'bar') {
    var progressBar = new Drupal.progressBar('ajax-progress-' + this.element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  }
  else if (this.progress.type == 'throbber') {
    this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
    if (this.progress.message) {
      $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
    }
    $(this.element).after(this.progress.element);
  }
};

/**
 * Handler for the form redirection completion.
 */
Drupal.ajax.prototype.success = function (response, status) {
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');

  Drupal.freezeHeight();

  for (var i in response) {
    if (response[i]['command'] && this.commands[response[i]['command']]) {
      this.commands[response[i]['command']](this, response[i], status);
    }
  }

  // Reattach behaviors, if they were detached in beforeSerialize(). The
  // attachBehaviors() called on the new content from processing the response
  // commands is not sufficient, because behaviors from the entire form need
  // to be reattached.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }

  Drupal.unfreezeHeight();

  // Remove any response-specific settings so they don't get used on the next
  // call by mistake.
  this.settings = null;
};

/**
 * Build an effect object which tells us how to apply the effect when adding new HTML.
 */
Drupal.ajax.prototype.getEffect = function (response) {
  var type = response.effect || this.effect;
  var speed = response.speed || this.speed;

  var effect = {};
  if (type == 'none') {
    effect.showEffect = 'show';
    effect.hideEffect = 'hide';
    effect.showSpeed = '';
  }
  else if (type == 'fade') {
    effect.showEffect = 'fadeIn';
    effect.hideEffect = 'fadeOut';
    effect.showSpeed = speed;
  }
  else {
    effect.showEffect = type + 'Toggle';
    effect.hideEffect = type + 'Toggle';
    effect.showSpeed = speed;
  }

  return effect;
};

/**
 * Handler for the form redirection error.
 */
Drupal.ajax.prototype.error = function (response, uri) {
  alert(Drupal.ajaxError(response, uri));
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  // Undo hide.
  $(this.wrapper).show();
  // Re-enable the element.
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');
  // Reattach behaviors, if they were detached in beforeSerialize().
  if (this.form) {
    var settings = response.settings || this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }
};

/**
 * Provide a series of commands that the server can request the client perform.
 */
Drupal.ajax.prototype.commands = {
  /**
   * Command to insert new content into the DOM.
   */
  insert: function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly iterpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data);
    var new_content = new_content_wrapped.contents();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }

    // If removing content from the wrapper, detach behaviors first.
    switch (method) {
      case 'html':
      case 'replaceWith':
      case 'replaceAll':
      case 'empty':
      case 'remove':
        var settings = response.settings || ajax.settings || Drupal.settings;
        Drupal.detachBehaviors(wrapper, settings);
    }

    // Add the new content to the page.
    wrapper[method](new_content);

    // Immediately hide the new content if we're using any effects.
    if (effect.showEffect != 'show') {
      new_content.hide();
    }

    // Determine which effect to use and what content will receive the
    // effect, then show the new content.
    if ($('.ajax-new-content', new_content).length > 0) {
      $('.ajax-new-content', new_content).hide();
      new_content.show();
      $('.ajax-new-content', new_content)[effect.showEffect](effect.showSpeed);
    }
    else if (effect.showEffect != 'show') {
      new_content[effect.showEffect](effect.showSpeed);
    }

    // Attach all JavaScript behaviors to the new content, if it was successfully
    // added to the page, this if statement allows #ajax['wrapper'] to be
    // optional.
    if (new_content.parents('html').length > 0) {
      // Apply any settings from the returned JSON if available.
      var settings = response.settings || ajax.settings || Drupal.settings;
      Drupal.attachBehaviors(new_content, settings);
    }
  },

  /**
   * Command to remove a chunk from the page.
   */
  remove: function (ajax, response, status) {
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors($(response.selector), settings);
    $(response.selector).remove();
  },

  /**
   * Command to mark a chunk changed.
   */
  changed: function (ajax, response, status) {
    if (!$(response.selector).hasClass('ajax-changed')) {
      $(response.selector).addClass('ajax-changed');
      if (response.asterisk) {
        $(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ');
      }
    }
  },

  /**
   * Command to provide an alert.
   */
  alert: function (ajax, response, status) {
    alert(response.text, response.title);
  },

  /**
   * Command to provide the jQuery css() function.
   */
  css: function (ajax, response, status) {
    $(response.selector).css(response.argument);
  },

  /**
   * Command to set the settings that will be used for other commands in this response.
   */
  settings: function (ajax, response, status) {
    if (response.merge) {
      $.extend(true, Drupal.settings, response.settings);
    }
    else {
      ajax.settings = response.settings;
    }
  },

  /**
   * Command to attach data using jQuery's data API.
   */
  data: function (ajax, response, status) {
    $(response.selector).data(response.name, response.value);
  },

  /**
   * Command to apply a jQuery method.
   */
  invoke: function (ajax, response, status) {
    var $element = $(response.selector);
    $element[response.method].apply($element, response.arguments);
  },

  /**
   * Command to restripe a table.
   */
  restripe: function (ajax, response, status) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr:visible, > tr:visible', $(response.selector))
      .removeClass('odd even')
      .filter(':even').addClass('odd').end()
      .filter(':odd').addClass('even');
  }
};

})(jQuery);
;
