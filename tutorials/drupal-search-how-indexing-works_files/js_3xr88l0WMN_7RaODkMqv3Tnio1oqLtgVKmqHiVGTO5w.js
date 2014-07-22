/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
 browser: true */

/*global jQuery: true Drupal: true window: true */

(function ($) {
  /**
   * Acquia object is created if it doesn't exist.
   */
  Drupal.behaviors.acquia = Drupal.behaviors.acquia || {};

  /**
  * Attach handler.
  */

  Drupal.behaviors.acquia.delay = NaN;

  Drupal.behaviors.acquia = {
    attach: function (context, settings) {
      // Remove the .no-js class if js is enabled. Otherwise it sticks around as an indicator
      // to the CSS that JS is not enabled.
      $('html').removeClass('no-js');
      // Run these functions all the time
      // Set up the tabbed banner view on the front page
      Drupal.behaviors.acquia.tabbedBanner();

      // The main menu sub menu items are arranged in columns. This function adds classes
      // to the items that allow them to be styled into columns
      Drupal.behaviors.acquia.megaMenuSubMenuColumns();

      // The main menu sub menu items are arranged in columns. This function adds classes
      // to the items that allow them to be styled into columns
      Drupal.behaviors.acquia.megaMenuSetup();

      // This is needed to fix some weird alignment bugs sometimes.
      for (var i = 250; i <= 3000; i += 250) {
        setTimeout(Drupal.behaviors.acquia.megaMenuSubMenuColumns, i);
      }

      // Move comment form title inside comment form
      Drupal.behaviors.acquia.commentForm();

      // Add span numbers to OLs
      Drupal.behaviors.acquia.numberingOls();

      // Fix upload fields buttons to match theme
      Drupal.behaviors.acquia.uploadBtn();
      // Run functions that require a slight delay so that the screen can finish painting
      Drupal.behaviors.acquia.delay = setInterval(Drupal.behaviors.acquia.delayFunctions, 1500);
      // Run functions on screen resize
      $(window).resize(Drupal.behaviors.acquia.resizeFunctions);
      // Only run these functions if the screen is wider than 740px
      if ($('html').width() >= 740) {
        // add functions if mobile design is available
      }
    }
  };

  /**
   * Run functions that require a slight delay so that the screen can finish painting
   */
  Drupal.behaviors.acquia.delayFunctions = function () {
    // Clear the timeout
    clearTimeout(Drupal.behaviors.acquia.delay);
    // Force the last sidebar to extend horiztonally to the bottom of the content area
    Drupal.behaviors.acquia.balanceSidebars();
  };

  /**
   * Run functions on screen resize
   *
   * @param {event} e
   *   The resize event.
   */
  Drupal.behaviors.acquia.resizeFunctions = function (e) {
    Drupal.behaviors.acquia.megaMenuSubMenuColumns();
  };

  /**
   * Make the border radius on the Superfish menu hover correctly with animation.
   */
  Drupal.behaviors.acquia.megaMenuSetup = function () {
    // Only perform changes if Superfish is available.
    if ($().superfish) {
      // Extend the Superfish object.
      $('.zone-header-2 ul.sf-menu').superfish({
        dropShadows:false,
        animation: {opacity: 'show'},
        autoArrows: false,
        speed: -1,
        onBeforeShow: function() {
          var block = $('.zone-header-2 div.block-superfish');
          block.css('border-bottom-left-radius', '0px');
          block.css('-webkit-border-bottom-left-radius', '0px');
          block.css('-moz-border-radius-bottomleft', '0px');
        },
        onHide: function() {
          var block = $('.zone-header-2 div.block-superfish');
          if (!$('ul ul:visible', block).length) {
            block.css('border-bottom-left-radius', '15px');
            block.css('-webkit-border-bottom-left-radius', '15px');
            block.css('-moz-border-radius-bottomleft', '15px');
          }
        }
      });
    }
  };

  /**
   * Align the top navigation sub menus to the top nav.
   */
  Drupal.behaviors.acquia.megaMenuSubMenuColumns = function () {
    var padding = 15;
    $("div.zone-header-2 ul.sf-menu ul").each(function() {
      var parentLi = $(this).parent().get(0);
      var offsetLeft = parentLi.offsetLeft;
      var offsetTop = parentLi.offsetHeight;
      $(this).css({
        'min-width': 780 - offsetLeft - padding,
        'padding-left': offsetLeft + padding,
        position: 'absolute',
        left: -offsetLeft,
        top: offsetTop
      });
      var counter = 1;
      $(this).children("li.sf-depth-2").each(function(){
         $(this).css({
           'z-index': counter
         });
         counter++;
      });
      
    });
  };

  /**
   * Set up the tabbed banner view on the front page
   */
  Drupal.behaviors.acquia.tabbedBanner = function () {
    // Pull out any tabs that have content <none>
    $('.views-slideshow-controls-top .widget_pager > div', '.tabbed-banner').each(function () {
      var $this = $(this);
      var content = $.trim($this.find('[class *= "banner-tab"] [class *= "banner-tab"]').text());
      if (content === "<none>") {
        $this.remove();
      }
    });
  };

   /**
   * Fix the OLs to get nice color in the numbering
   */
  Drupal.behaviors.acquia.numberingOls = function () {

    $("ol").each(function() {
    $("li", this).prepend(function(i) {
        return $("<span />", {text: i+1}).addClass('numbering');
     });
    });

  };

   /**
   * File upload fields magic button styling
   */
  Drupal.behaviors.acquia.uploadBtn = function () {

    var $uploadDiv = '<div class="upload-div"></div>';
    var $uploadDivElements = '<div class="upload-div-field"></div><div class="upload-div-button button secondary">Browse</div><div class="clear"></div>';

    $('input:file').each(function() {
       $(this).wrap($uploadDiv);
       $(this).parent().prepend($uploadDivElements);
       $(this).addClass('js-enabled');
    });

    // Making sure user sees a file upload path when selecting a file
    $('input:file.js-enabled').change(function(){
       $(this).siblings('.upload-div-field').empty();
       var $filename = $(this).val().split('\\');

       $(this).siblings('.upload-div-field').append('File:&nbsp;' + $filename[$filename.length -1]);
    });

  };

  /**
   * Force the last sidebar to extend horiztonally to the bottom of the content area
   */
  Drupal.behaviors.acquia.balanceSidebars = function () {
    var $sidebars = $('.sidebar').not(':last');
    var $last_sidebar = $('.sidebar:last');
    var $zone = $last_sidebar.closest('.zone');
    var top = Drupal.behaviors.acquia._stripPX($last_sidebar.css('top'));
    var height = 0;
    $.each($sidebars, function () {
      height += $(this).outerHeight(true);
    });
    height = $zone.innerHeight() - height;
    if (top < 0) {
      height += (top * -1);
    }
    // Extend the height of the last sidebar to the bottom of the zone.
    $last_sidebar.css('min-height', height);
  };

  /**
   * Move comment form title into form box
   */
  Drupal.behaviors.acquia.commentForm = function () {

    // Reference the comment form and its title
    var $commentForm = $('form.comment-form');
    var $commentFormTitle = $('.title.comment-form');


    // Move title inside form
    $($commentForm).prepend($commentFormTitle);

  };

  /**
   * Utility function to remove 'px' from calculated values.  The function assumes that
   * that unit 'value' is pixels.
   *
   * @param {String} value
   *   The String containing the CSS value that includes px.
   * @return {Number}
   *   Value stripped of 'px' and casted as a number or NaN if 'px' is not found in the string.
   */
  Drupal.behaviors.acquia._stripPX = function (value) {
    if (value) {
      var index = value.indexOf('px');
      if (index === -1) {
        return NaN;
      }
      else {
        return Number(value.substring(0, index));
      }
    }
    else {
      return NaN;
    }
  };

})(jQuery);
;
/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
 browser: true */

/*global jQuery: true Drupal: true window: true */

(function ($) {
  /**
   * Acquia object is created if it doesn't exist.
   */
  Drupal.behaviors.acquiaCom = Drupal.behaviors.acquiaCom || {};
  
  /**
  * Attach handler.
  */
  
  Drupal.behaviors.acquiaCom.delay = NaN;
  
  Drupal.behaviors.acquiaComBehavior = {
    attach: function (context, settings) {
      // Run these functions all the time
      // Move the page title into the header
      Drupal.behaviors.acquiaCom.movePageTitle();
      // Add button class to submit elements
      Drupal.behaviors.acquiaCom.addButtonClass();
      // Run functions that require a slight delay so that the screen can finish painting
      // Drupal.behaviors.acquiaCom.delay = setInterval(Drupal.behaviors.acquiaCom.delayFunctions, 1500);
      // Run functions on screen resize
      // $(window).resize(Drupal.behaviors.acquiaCom.resizeFunctions);
      // Only run these functions if the screen is wider than 740px
      if ($('html').width() >= 740) {
        // add functions if mobile design is available
      }
    }
  };
  
  /**
   * Run functions that require a slight delay so that the screen can finish painting
   */
  Drupal.behaviors.acquiaCom.delayFunctions = function () {
    // Clear the timeout
    clearTimeout(Drupal.behaviors.acquiaCom.delay);
  };
  
  /**
   * Run functions on screen resize
   *
   * @param {event} e
   *   The resize event.
   */
  Drupal.behaviors.acquiaCom.resizeFunctions = function (e) {
  };

  /**
   * Override the slideshow, msie lte 8 needs hacks to work.
   */
  Drupal.viewsSlideshowFrontPage = {
    transitionBegin: function (options) {
      if ($.browser.msie) {
        var ieVersion = parseInt($.browser.version, 10);
        if (ieVersion <= 8) {
          $('#views_slideshow_cycle_teaser_section_front_page_banners-block_1 .views_slideshow_slide').hide();
          $('#views_slideshow_cycle_teaser_section_front_page_banners-block_1 .views_slideshow_slide.views-row-' + (options.slideNum + 1)).show();
        }
      }
    },
  };
  
  /**
   * Move the page title into the header
   */
  Drupal.behaviors.acquiaCom.movePageTitle = function (e) {
    // Create a reference to the page title DOM object
    var $page_title = $('.not-front h1#page-title');
  
    // Create a reference to the header's target div DOM object
    var $header_target = $('.not-front #zone-header-2-wrapper #zone-header-2');
  
    // Perform the relocation with JQuery's .append() function
    $($header_target).append($page_title);



    /*
     * This is extremely ugly, I know. Running out of time to deliver this, will
     * revisit after DEMO.
     *
     * Mariano.
     *
     *
     * Moving Blog images in the panels right inside the text wrapper.
     *
     *
     **/

    // Create a reference to the panel column

    var $panelColumn1image  = $('.page-blog #blog.panel-display .center-wrapper .panel-col-first .views-field-picture');
    var $panelColumn2image  = $('.page-blog #blog.panel-display .center-wrapper .panel-col       .views-field-picture');
    var $panelColumn3image  = $('.page-blog #blog.panel-display .center-wrapper .panel-col-last  .views-field-picture');

    var $panelColumn1target = $('.page-blog #blog.panel-display .center-wrapper .panel-col-first .views-field-entity-id .field-content');
    var $panelColumn2target = $('.page-blog #blog.panel-display .center-wrapper .panel-col       .views-field-entity-id .field-content');
    var $panelColumn3target = $('.page-blog #blog.panel-display .center-wrapper .panel-col-last  .views-field-entity-id .field-content');

    // Perform the relocation with JQuery's .prepend() function
    $($panelColumn1target).prepend($panelColumn1image);
    $($panelColumn2target).prepend($panelColumn2image);
    $($panelColumn3target).prepend($panelColumn3image);

    // Equalize panel column heights
    $(".page-blog #blog.panel-display .center-wrapper .panel-pane .view-content .views-row").equalHeights();

    // Equialize sidebar
    $(".page-blog .zone-content-3 .region").equalHeights();
  };

   /**
   * Add a button class to every form-submit element
   */
  Drupal.behaviors.acquiaCom.addButtonClass = function (e) {

    // Create a reference to the button
    var $submitButton = $('.section-content .form-submit');

    // Create a reference to the login action in comments
    var $commentLogin = $('.not-logged-in .comment_forbidden span.button.secondary');

    // Add a class to all submit buttons
    $($submitButton).addClass('button secondary');

    // Remove button classes from login action in comments
    $($commentLogin).removeClass('button secondary');

  };

})(jQuery);
;
(function ($) {
  $(document).ready(function() {
    // We need to mark all LI tags that contains link.
    $('li a').parent().addClass('contains-link');

    // Add class 'active' to view rows on hover.
    $('#block-views-resources-blog-block-4 .views-row').mouseover(function() {
      $(this).addClass('hover');
    }).mouseout(function() {
      $(this).removeClass('hover');
    })

    $(document).ready(function() {
      $('a.hover-text').cluetip({/*sticky: true,*/cluetipClass: 'rounded', dropShadow: false, positionBy: 'mouse', arrows: true, splitTitle: '|'});
    });

    // Show / hide buttons on Pricing page
    $('#product-matrix .more-button').click(function() {
      if ($(this).hasClass('expanded')) {
        $('#product-matrix .more-info').hide();
        $(this).removeClass('expanded');
        $(this).find('.inner').html('Show detailed comparison');
      } else {
        $('#product-matrix .more-info').show();
        $(this).addClass('expanded');
        $(this).find('.inner').html('Hide detailed comparison');
      }
    })

    // Benefits field functionality in product page content type
    $('.field-name-field-product-page-benefits .up, .plus-minus-collapse .up').parent().next().hide();
    $('.field-name-field-product-page-benefits dt a, .plus-minus-collapse dt a').click(function() {
      if ($(this).hasClass('up')) {
        $(this).addClass('down').removeClass('up').parent().next().slideDown();
      } else {
        $(this).addClass('up').removeClass('down').parent().next().slideUp();
      }
    });
  });
})(jQuery);;
/*
 * Doormat menu functionality.
 */
(function ($) {

/**
 * Drupal Doormat Menu behavior.
 */
Drupal.behaviors.acquiaDoormat = {
  attach: function (context, settings) {
    // Only apply the Doormat menu to the front page. Kill-switch it with once.
    $('body.front').once('acquia-doormat', function() {

      // Define all the required functions in the Drupal namespace so that we
      // can call them later on.
      Drupal.acquiaDoormatShowSubmenu = function() {
        $(this).siblings('.hover').removeClass('hover');
        $(this).addClass('hover');
        $(this).siblings().children('ul').hide();
        $(this).children('ul').slideDown();
        $('#primary-submenu-bg').slideDown();
      };

      Drupal.acquiaDoormatHideBg = function() {
        Drupal.acquiaDoormatHideAllSubmenus();
        $('#block-system-main-menu ul.menu:first > li.hover').removeClass('hover');
        $('#primary-submenu-bg').slideUp();
      };

      Drupal.acquiaDoormatHideAllSubmenus = function() {
        $('#block-system-main-menu ul.menu:first > li > ul').hide();
      };

      Drupal.acquiaDoormatGetMenuUlHeight = function(element) {
        $(element).css({'visibility':'hidden','display':'block'});
        var height = $(element).height();
        $(element).css({'visibility':'visible','display':'none'});

        return height;
      };

      Drupal.acquiaDoormatGetMenuUlWidth = function(element) {
        $(element).css({'visibility':'hidden','display':'block'});
        var width = $(element).width();
        $(element).css({'visibility':'visible','display':'none'});

        return width;
      };

      // Insert sliding div with background of submenus
      $('<div id="primary-submenu-bg"></div>').insertAfter('#navigation');

      var max_height = 0;
      $('#block-system-main-menu ul.menu:first > li > ul').each(function(){

        var ul = $(this);
        var lis = ul.children('li');

        // We want split UL that have more than 4 children
        var last_width = 0;
        while (lis.length > 4) {

          // Insert new UL
          $('<ul></ul>').insertAfter(ul);
          var new_ul = ul.next();

          // Move 4.,5.,.. LI into new UL
          lis.each(function(index) {
            if (index > 3) {
              $(this).appendTo(new_ul);
            }
          });

          // Set left margin of new UL in dependence of width of first UL
          // Update the max height of UL
          var width = Drupal.acquiaDoormatGetMenuUlWidth(ul) + last_width;
          var height = Drupal.acquiaDoormatGetMenuUlHeight(ul);
          if (height > max_height) max_height = height;
          last_width = width;
          new_ul.css('margin-left', width + 'px');
          ul = new_ul;
          lis = ul.children('li');
        }

        // Display submenu
        $(this).parent().hoverIntent({
          interval: 100,
          over: Drupal.acquiaDoormatShowSubmenu,
          out: function(){}
        });
      });

      // Set height of menu background.
      $('#primary-submenu-bg').css('height', max_height + 15);

      // When mouse leaves menu wrapper, we hide submenus and div with menu background.
      $('#navigation-wrapper').each(function(){
        $(this).hoverIntent({
          over: function(){},
          timeout: 200,
          out: Drupal.acquiaDoormatHideBg
        });
      });

      // Mouseover action on menu items whithout submenu - hides opened submenu.
      $('#block-system-main-menu ul.menu:first > li.leaf').each(function(){
        $(this).hoverIntent({
          interval: 200,
          over: Drupal.acquiaDoormatHideAllSubmenus,
          out: function(){}
        });
      });

    }); // End of once()

  } // End of attach
};

})(jQuery);
;
/**
 * Equal Heights Plugin
 * Equalize the heights of elements. Great for columns or any elements
 * that need to be the same size (floats, etc).
 * 
 * Version 1.0
 * Updated 12/10/2008
 *
 * Copyright (c) 2008 Rob Glazebrook (cssnewbie.com) 
 *
 * Usage: $(object).equalHeights([minHeight], [maxHeight]);
 * 
 * Example 1: $(".cols").equalHeights(); Sets all columns to the same height.
 * Example 2: $(".cols").equalHeights(400); Sets all cols to at least 400px tall.
 * Example 3: $(".cols").equalHeights(100,300); Cols are at least 100 but no more
 * than 300 pixels tall. Elements with too much content will gain a scrollbar.
 * 
 */

(function($) {
  $.fn.equalHeights = function(minHeight, maxHeight) {
    tallest = (minHeight) ? minHeight : 0;
    this.each(function() {
      if($(this).height() > tallest) {
        tallest = $(this).height();
      }
    });
    if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
    return this.each(function() {
      $(this).height(tallest);
    });
  }
})(jQuery);
;
/**
 * History/Remote - jQuery plugin for enabling history support and bookmarking
 * @requires jQuery v1.0.3
 *
 * http://stilbuero.de/jquery/history/
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.2.3
 */

(function($) { // block scope

/**
 * Initialize the history manager. Subsequent calls will not result in additional history state change 
 * listeners. Should be called soonest when the DOM is ready, because in IE an iframe needs to be added
 * to the body to enable history support.
 *
 * @example $.ajaxHistory.initialize();
 *
 * @param Function callback A single function that will be executed in case there is no fragment
 *                          identifier in the URL, for example after navigating back to the initial
 *                          state. Use to restore such an initial application state.
 *                          Optional. If specified it will overwrite the default action of 
 *                          emptying all containers that are used to load content into.
 * @type undefined
 *
 * @name $.ajaxHistory.initialize()
 * @cat Plugins/History
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
$.ajaxHistory = new function() {

  var _updateCallback = function() { };
  
    var RESET_EVENT = 'historyReset';

    var _currentHash = location.hash;
    var _intervalId = null;
    var _observeHistory; // define outside if/else required by Opera

    this.update = function() { }; // empty function body for graceful degradation

    // create custom event for state reset
    var _defaultReset = function() {  };
    
    $(document).bind(RESET_EVENT, _defaultReset);
    
    // TODO fix for Safari 3
    // if ($.browser.msie)
    // else if hash != _currentHash
    // else check history length
    
    this.hash = function() {
      return _currentHash;
    }
    
    if ($.browser.msie && parseInt($.browser.version, 10) < 8) {

        var _historyIframe, initialized = false; // for IE

        // add hidden iframe
        $(function() {
            _historyIframe = $('<iframe style="display: none;"></iframe>').appendTo(document.body).get(0);
            var iframe = _historyIframe.contentWindow.document;
            // create initial history entry
            iframe.open();
            iframe.close();
            if (_currentHash && _currentHash != '#') {
                iframe.location.hash = _currentHash.replace('#', '');
            }
        });

        this.update = function(hash) {
            _currentHash = hash;
            var iframe = _historyIframe.contentWindow.document;
            iframe.open();
            iframe.close();
            iframe.location.hash = hash.replace('#', '');
            _updateCallback(hash);
        };

        _observeHistory = function() {
            if (location.hash != _currentHash) {
                $.ajaxHistory.update(location.hash);
            } else {
              var iframe = _historyIframe.contentWindow.document;
              var iframeHash = iframe.location.hash;
              if (iframeHash != _currentHash) {
                  _currentHash = iframeHash;
                  if (iframeHash && iframeHash != '#') {
                      // order does matter, set location.hash after triggering the click...
                       _updateCallback(iframeHash);
                      location.hash = iframeHash;
                  } else if (initialized) {
                      location.hash = '';
                      $(document).trigger(RESET_EVENT);
                  }
               }
            }
            initialized = true;
        };

    } 
    else if ($.browser.safari) {

        var _backStack, _forwardStack, _addHistory; // for Safari

        // etablish back/forward stacks
        $(function() {
            _backStack = [];
            _backStack.length = history.length;
            _forwardStack = [];

        });
        var isFirst = false, initialized = false;
        _addHistory = function(hash) {
            _backStack.push(hash);
            _forwardStack.length = 0; // clear forwardStack (true click occured)
            isFirst = false;
        };

        this.update = function(hash) {
            location.hash = _currentHash = hash;
            _updateCallback(hash);
            _addHistory(_currentHash);
        };

        _observeHistory = function() {
            var historyDelta = history.length - _backStack.length;
            if (historyDelta) { // back or forward button has been pushed
                isFirst = false;
                if (historyDelta < 0) { // back button has been pushed
                    // move items to forward stack
                    for (var i = 0; i < Math.abs(historyDelta); i++) _forwardStack.unshift(_backStack.pop());
                } else { // forward button has been pushed
                    // move items to back stack
                    for (var i = 0; i < historyDelta; i++) _backStack.push(_forwardStack.shift());
                }
                var cachedHash = _backStack[_backStack.length - 1];
                _updateCallback(cachedHash);
                _currentHash = location.hash;
            } else if (_backStack[_backStack.length - 1] == undefined && !isFirst) {
                // back button has been pushed to beginning and URL already pointed to hash (e.g. a bookmark)
                // document.URL doesn't change in Safari
                if (document.URL.indexOf('#') >= 0) {
                    var _hash = '#' + document.URL.split('#')[1];
                    _updateCallback(_hash);
                } else if (initialized) {
                    $(document).trigger(RESET_EVENT);
                }
                isFirst = true;
            }
            initialized = true;
        };

    }
    else {

        this.update = function(hash) {
            location.hash = _currentHash = hash;
            _updateCallback(hash);
        };

        _observeHistory = function() {
            if (location.hash) {
                if (_currentHash != location.hash) {
                    _currentHash = location.hash;
                    _updateCallback(_currentHash);
                }
            } else if (_currentHash) {
                _currentHash = '';
                $(document).trigger(RESET_EVENT);
            }
        };

    } 


    this.initialize = function(updateCallback, resetCallback) {
        if (typeof updateCallback == 'function') {
            _updateCallback = updateCallback;
        }
      
        // custom callback to reset app state (no hash in url)
        if (resetCallback && typeof resetCallback == 'function') {
            $(document).unbind(RESET_EVENT, _defaultReset).bind(RESET_EVENT, resetCallback);
        }
        // look for hash in current URL (not Safari)
        if (location.hash && typeof _addHistory == 'undefined') {
            _updateCallback(location.hash);
        }
        // start observer
        if (_observeHistory && _intervalId == null) {
            _intervalId = setInterval(_observeHistory, 300); // Safari needs at least 200 ms
        }
    };

};

/**
 * Provides the ability to use the back/forward navigation buttons in a DHTML application.
 * A change of the application state is reflected by a change of the URL fragment identifier.
 *
 * The link's href attribute needs to point to a fragment identifier within the same resource,
 * although that fragment id does not need to exist. On click the link changes the URL fragment
 * identifier, informs the history manager of the state change and adds an entry to the browser's
 * history.
 *
 * @param Function callback A single function that will be executed as the click handler of the 
 *                          matched element. It will be executed on click (adding an entry to 
 *                          the history) as well as in case the history manager needs to trigger 
 *                          it depending on the value of the URL fragment identifier, e.g. if its 
 *                          current value matches the href attribute of the matched element.
 *                           
 * @type jQuery
 *
 * @name history
 * @cat Plugins/History
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
$.fn.history = function(callback) {
    return this.click(function (e) {        
        if (this.hash == location.hash) {
          return false;
        }
        $.ajaxHistory.update(this.hash);
        
        if (typeof callback == 'function') {
          callback.call(this);
        }
    });
};

})(jQuery);
;
// $Id$

(function ($) {

$(window).load(function () {
  $('body.front .view-customers-block').once('equal-heights-processed', function() {
    $('.views-row', this).equalHeights();
  });
  // Equalize heights of Acquia TV titles.
  $('body .view-resources-acquiatv.view-display-id-page_1').once('equal-heights-processed', function() {
    $('.views-field-title', this).equalHeights();
  });
  // Equalize heights of Downloads page blocks.
  $('#downloads').once('equal-heights-processed', function() {
    $('p.description', this).equalHeights();
  });

  /* Initialize jQuery history plugin for Quicktabs */
//  $('.quicktabs_wrapper a').each(function() {
//    $(this).history();
//    // Are we on active tab?
//    var anchor = window.location.hash.substring(1);
//    if (anchor) {
//      $('.quicktabs_wrapper a[href=#' + anchor + ']').trigger('click');
//    }
//  });
  // Fix Views pager links in Quicktabs.
  /*$('.quicktabs_wrapper .view .pager a').each(function(i) {
    var activeTab = $(this).parents('.ui-tabs-panel').attr('id');
    var newHref = $(this).attr('href') + '#' + activeTab;
    $(this).attr('href', newHref);
  });*/
  

})

Drupal.behaviors.noLink = {
  attach : function (context) {
    $('a.no-link', context).once('not-clickable', function () {
      $(this).click(function () {
        return false;
      })
    });
  }
}

}) (jQuery)
;
/*
 * Clicable map in partner finder
 */
(function ($) {
  $(document).ready(function() {
    if ($('#views-exposed-form-partner-finder-page-1').length > 0) {

      var image_dir_path = '/sites/all/themes/acquia/images/partner-finder/';
      var curent_image = 'partner-finder-blank.png';
      var curent_text = '';
      var form_element = $('#views-exposed-form-partner-finder-page-1 .views-widget-filter-tid_5');
      var all_selected = false;

      // array( tid => {label, image_name, coords)} )
      var regions = new Array();
      regions['83'] = new Array('Europe', 'partner-finder-europe.png', '43,15,52,10,56,11,55,23,43,21');
      regions['84'] = new Array('North America', 'partner-finder-northamerica.png', '27,29,15,22,13,15,6,17,5,10,17,7,25,4,44,4,43,10,27,24');
      regions['85'] = new Array('South America', 'partner-finder-southamerica.png', '27,29,33,29,39,33,30,47,26,31');
      regions['86'] = new Array('Oceania', 'partner-finder-australia.png', '79,31,84,32,91,41,88,45,74,40,74,36');
      regions['87'] = new Array('Africa', 'partner-finder-africa.png',  '42,23,53,23,60,30,59,40,48,40,41,30');
      regions['88'] = new Array('Asia', 'partner-finder-asia.png', '55,23,56,11,74,5,94,13,78,33,58,29');
      regions['All'] = new Array('All regions', 'partner-finder-all.png', '0,0,0,0,0,0,0,0,0,0,0,0');
      regions['0'] = new Array('', 'partner-finder-blank.png', '0,0,0,0,0,0,0,0,0,0,0,0');

      // Add image with map and span with region name into page
      form_element.find('label').html('Click map to select region');
      form_element.append('<img id="partner-finder-map" src="' + image_dir_path + curent_image + '" usemap="#finder-map-areas" />');
      form_element.append('<span id="partner-finder-region-name"></span>');
      form_element.append('<div class="select-all-wrapper"><input type="checkbox" name="select-all" id="select-all" /><label>Select all</label></div>')
      var map = $('#partner-finder-map');
      var name = $('#partner-finder-region-name');

      // Setup default image and label if there is selected option
      form_element.find('option[selected="selected"]').each(function() {
        var tid = $(this).attr('value');
        if (tid!=0) {
          if (tid == 'All') {
            form_element.find('#select-all').attr("checked", "checked");
            all_selected = true;
          }
          curent_image = regions[tid][1];
          curent_text = regions[tid][0];
          map.attr('src', image_dir_path + curent_image);
          name.html(curent_text);
        }
      });

      // Create string with all html area elements
      var map_string = '';
      for (var tid in regions){
        map_string += '<area shape="poly" id="partner-finder-map-reg-' + tid + '" coords="' + regions[tid][2] + '" href="#" alt="' + regions[tid][0] + '" />';
      }

      // Insert map into page
      form_element.append('<map name="finder-map-areas">' + map_string + '</map>');

      // Areas functionality
      for (tid in regions) {
        areaFunctionality(tid);
      }

      // select all button
      form_element.find('#select-all').click(function() {
        if (all_selected) {
          all_selected = false;
          curent_image =  regions[0][1];
          curent_text = regions[0][0];
          map.attr('src', image_dir_path + curent_image);
          name.html(curent_text);
          // Change selected option
          form_element.find('option[selected="selected"]').removeAttr('selected');
          form_element.find('option[value="All"]').attr('selected', 'selected');

        } else {
          all_selected = true;
          curent_image =  regions['All'][1];
          curent_text = regions['All'][0];
          map.attr('src', image_dir_path + curent_image);
          name.html(curent_text);
          // Change selected option
          form_element.find('option[selected="selected"]').removeAttr('selected');
          form_element.find('option[value="All"]').attr('selected', 'selected');
        }
      });
    }

    // Helper function that defines mouse actions for clickable map areas.
    function areaFunctionality(tid2) {
     $('#partner-finder-map-reg-' + tid2).click(function() {
        // Change map image
        map.attr('src', image_dir_path + regions[tid2][1]);
        // Change region name
        name.html(regions[tid2][0]);
        // Change curent image + text
        curent_image =  regions[tid2][1];
        curent_text = regions[tid2][0];
        // Uncheck selected all button
        all_selected = false;
        form_element.find('#select-all').removeAttr("checked")
        // Change selected option
        form_element.find('option[selected="selected"]').removeAttr('selected');
        form_element.find('option[value="' + tid2 + '"]').attr('selected', 'selected');

        return false;
      }).mouseover(function() {
        map.attr('src', image_dir_path + regions[tid2][1]);
        name.html(regions[tid2][0]);
      }).mouseout(function() {
        map.attr('src', image_dir_path + curent_image);
        name.html(curent_text);
      });
    }
  });
})(jQuery);;
/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
*
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* hoverIntent is currently available for use in all personal or commercial
* projects under both MIT and GPL licenses. This means that you can choose
* the license that best suits your project, and use it accordingly.
*
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
*
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*	sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
*	interval: 100,   // number = milliseconds of polling interval
*	over: showNav,  // function = onMouseOver callback (required)
*	timeout: 0,   // number = milliseconds delay before onMouseOut function call
*	out: hideNav    // function = onMouseOut callback (required)
* });
*
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($) {
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			if ( p == this ) { return false; }

			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// else e.type == "onmouseover"
			if (e.type == "mouseover") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "onmouseout"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	};
})(jQuery);;
/*
 * jQuery clueTip plugin
 * Version 1.0.7  (January 28, 2010)
 * @requires jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
/*
 *
 * Full list of options/settings can be found at the bottom of this file and at http://plugins.learningjquery.com/cluetip/
 *
 * Examples can be found at http://plugins.learningjquery.com/cluetip/demo/
 *
*/

;(function($) { 
  $.cluetip = {version: '1.0.6'};
  var $cluetip, $cluetipInner, $cluetipOuter, $cluetipTitle, $cluetipArrows, $cluetipWait, $dropShadow, imgCount;
  
  $.fn.cluetip = function(js, options) {
    if (typeof js == 'object') {
      options = js;
      js = null;
    }
    if (js == 'destroy') {
      return this.removeData('thisInfo').unbind('.cluetip');
    }
    return this.each(function(index) {
      var link = this, $this = $(this);
      
      // support metadata plugin (v1.0 and 2.0)
      var opts = $.extend(true, {}, $.fn.cluetip.defaults, options || {}, $.metadata ? $this.metadata() : $.meta ? $this.data() : {});

      // start out with no contents (for ajax activation)
      var cluetipContents = false;
      var cluezIndex = +opts.cluezIndex;
      $this.data('thisInfo', {title: link.title, zIndex: cluezIndex});
      var isActive = false, closeOnDelay = 0;

      // create the cluetip divs
      if (!$('#cluetip').length) {
        $(['<div id="cluetip">',
          '<div id="cluetip-outer">',
            '<h3 id="cluetip-title"></h3>',
            '<div id="cluetip-inner"></div>',
          '</div>',
          '<div id="cluetip-extra"></div>',
          '<div id="cluetip-arrows" class="cluetip-arrows"></div>',
        '</div>'].join(''))
        [insertionType](insertionElement).hide();
        
        $cluetip = $('#cluetip').css({position: 'absolute'});
        $cluetipOuter = $('#cluetip-outer').css({position: 'relative', zIndex: cluezIndex});
        $cluetipInner = $('#cluetip-inner');
        $cluetipTitle = $('#cluetip-title');        
        $cluetipArrows = $('#cluetip-arrows');
        $cluetipWait = $('<div id="cluetip-waitimage"></div>')
          .css({position: 'absolute'}).insertBefore($cluetip).hide();
      }
      var dropShadowSteps = (opts.dropShadow) ? +opts.dropShadowSteps : 0;
      if (!$dropShadow) {
        $dropShadow = $([]);
        for (var i=0; i < dropShadowSteps; i++) {
          $dropShadow = $dropShadow.add($('<div></div>').css({zIndex: cluezIndex-1, opacity:.1, top: 1+i, left: 1+i}));
        }
        $dropShadow.css({position: 'absolute', backgroundColor: '#000'})
        .prependTo($cluetip);
      }
      var tipAttribute = $this.attr(opts.attribute), ctClass = opts.cluetipClass;
      if (!tipAttribute && !opts.splitTitle && !js) {
        return true;
      }
      // if hideLocal is set to true, on DOM ready hide the local content that will be displayed in the clueTip
      if (opts.local && opts.localPrefix) {tipAttribute = opts.localPrefix + tipAttribute;}
      if (opts.local && opts.hideLocal) { $(tipAttribute + ':first').hide(); }
      var tOffset = parseInt(opts.topOffset, 10), lOffset = parseInt(opts.leftOffset, 10);
      // vertical measurement variables
      var tipHeight, wHeight,
          defHeight = isNaN(parseInt(opts.height, 10)) ? 'auto' : (/\D/g).test(opts.height) ? opts.height : opts.height + 'px';
      var sTop, linkTop, posY, tipY, mouseY, baseline;
      // horizontal measurement variables
      var tipInnerWidth = parseInt(opts.width, 10) || 275,
          tipWidth = tipInnerWidth + (parseInt($cluetip.css('paddingLeft'),10)||0) + (parseInt($cluetip.css('paddingRight'),10)||0) + dropShadowSteps,
          linkWidth = this.offsetWidth,
          linkLeft, posX, tipX, mouseX, winWidth;
            
      // parse the title
      var tipParts;
      var tipTitle = (opts.attribute != 'title') ? $this.attr(opts.titleAttribute) : '';
      if (opts.splitTitle) {
        if (tipTitle == undefined) {tipTitle = '';}
        tipParts = tipTitle.split(opts.splitTitle);
        tipTitle = tipParts.shift();
      }
      if (opts.escapeTitle) {
        tipTitle = tipTitle.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;');
      }
      
      var localContent;
      function returnFalse() { return false; }

/***************************************      
* ACTIVATION
****************************************/
    
//activate clueTip
    var activate = function(event) {
      if (!opts.onActivate($this)) {
        return false;
      }
      isActive = true;
      $cluetip.removeClass().css({width: tipInnerWidth});
      if (tipAttribute == $this.attr('href')) {
        $this.css('cursor', opts.cursor);
      }
      if (opts.hoverClass) {
        $this.addClass(opts.hoverClass);
      }
      linkTop = posY = $this.offset().top;
      linkLeft = $this.offset().left;
      mouseX = event.pageX;
      mouseY = event.pageY;
      if (link.tagName.toLowerCase() != 'area') {
        sTop = $(document).scrollTop();
        winWidth = $(window).width();
      }
// position clueTip horizontally
      if (opts.positionBy == 'fixed') {
        posX = linkWidth + linkLeft + lOffset;
        $cluetip.css({left: posX});
      } else {
        posX = (linkWidth > linkLeft && linkLeft > tipWidth)
          || linkLeft + linkWidth + tipWidth + lOffset > winWidth 
          ? linkLeft - tipWidth - lOffset 
          : linkWidth + linkLeft + lOffset;
        if (link.tagName.toLowerCase() == 'area' || opts.positionBy == 'mouse' || linkWidth + tipWidth > winWidth) { // position by mouse
          if (mouseX + 20 + tipWidth > winWidth) {  
            $cluetip.addClass(' cluetip-' + ctClass);
            posX = (mouseX - tipWidth - lOffset) >= 0 ? mouseX - tipWidth - lOffset - parseInt($cluetip.css('marginLeft'),10) + parseInt($cluetipInner.css('marginRight'),10) :  mouseX - (tipWidth/2);
          } else {
            posX = mouseX + lOffset;
          }
        }
        var pY = posX < 0 ? event.pageY + tOffset : event.pageY;
        $cluetip.css({
          left: (posX > 0 && opts.positionBy != 'bottomTop') ? posX : (mouseX + (tipWidth/2) > winWidth) ? winWidth/2 - tipWidth/2 : Math.max(mouseX - (tipWidth/2),0),
          zIndex: $this.data('thisInfo').zIndex
        });
        $cluetipArrows.css({zIndex: $this.data('thisInfo').zIndex+1});
      }
        wHeight = $(window).height();

/***************************************
* load a string from cluetip method's first argument
***************************************/
      if (js) {
        if (typeof js == 'function') {
          js = js.call(link);
        }
        $cluetipInner.html(js);
        cluetipShow(pY);
      }
/***************************************
* load the title attribute only (or user-selected attribute). 
* clueTip title is the string before the first delimiter
* subsequent delimiters place clueTip body text on separate lines
***************************************/

      else if (tipParts) {
        var tpl = tipParts.length;
        $cluetipInner.html(tpl ? tipParts[0] : '');
        if (tpl > 1) {
          for (var i=1; i < tpl; i++){
            $cluetipInner.append('<div class="split-body">' + tipParts[i] + '</div>');
          }          
        }
        cluetipShow(pY);
      }
/***************************************
* load external file via ajax          
***************************************/

      else if (!opts.local && tipAttribute.indexOf('#') !== 0) {
        if (/\.(jpe?g|tiff?|gif|png)$/i.test(tipAttribute)) {
          $cluetipInner.html('<img src="' + tipAttribute + '" alt="' + tipTitle + '" />');
          cluetipShow(pY);
        } else if (cluetipContents && opts.ajaxCache) {
          $cluetipInner.html(cluetipContents);
          cluetipShow(pY);
        } else {
          var optionBeforeSend = opts.ajaxSettings.beforeSend,
              optionError = opts.ajaxSettings.error,
              optionSuccess = opts.ajaxSettings.success,
              optionComplete = opts.ajaxSettings.complete;
          var ajaxSettings = {
            cache: false, // force requested page not to be cached by browser
            url: tipAttribute,
            beforeSend: function(xhr) {
              if (optionBeforeSend) {optionBeforeSend.call(link, xhr, $cluetip, $cluetipInner);}
              $cluetipOuter.children().empty();
              if (opts.waitImage) {
                $cluetipWait
                .css({top: mouseY+20, left: mouseX+20, zIndex: $this.data('thisInfo').zIndex-1})
                .show();
              }
            },
            error: function(xhr, textStatus) {
              if (isActive) {
                if (optionError) {
                  optionError.call(link, xhr, textStatus, $cluetip, $cluetipInner);
                } else {
                  $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');  
                }
              }
            },
            success: function(data, textStatus) {       
              cluetipContents = opts.ajaxProcess.call(link, data);
              if (isActive) {
                if (optionSuccess) {optionSuccess.call(link, data, textStatus, $cluetip, $cluetipInner);}
                $cluetipInner.html(cluetipContents);
              }
            },
            complete: function(xhr, textStatus) {
              if (optionComplete) {optionComplete.call(link, xhr, textStatus, $cluetip, $cluetipInner);}
              var imgs = $cluetipInner[0].getElementsByTagName('img');
              imgCount = imgs.length;
              for (var i=0, l = imgs.length; i < l; i++) {
                if (imgs[i].complete) {
                  imgCount--;
                }
              }
              if (imgCount && !$.browser.opera) {
                $(imgs).bind('load error', function() {
                  imgCount--;
                  if (imgCount<1) {
                    $cluetipWait.hide();
                    if (isActive) { cluetipShow(pY); }
                  }
                }); 
              } else {
                $cluetipWait.hide();
                if (isActive) { cluetipShow(pY); }
              } 
            }
          };
          var ajaxMergedSettings = $.extend(true, {}, opts.ajaxSettings, ajaxSettings);
          
          $.ajax(ajaxMergedSettings);
        }

/***************************************
* load an element from the same page
***************************************/
      } else if (opts.local) {
        
        var $localContent = $(tipAttribute + (/#\S+$/.test(tipAttribute) ? '' : ':eq(' + index + ')')).clone(true).show();
        $cluetipInner.html($localContent);
        cluetipShow(pY);
      }
    };

// get dimensions and options for cluetip and prepare it to be shown
    var cluetipShow = function(bpY) {
      $cluetip.addClass('cluetip-' + ctClass);
      if (opts.truncate) { 
        var $truncloaded = $cluetipInner.text().slice(0,opts.truncate) + '...';
        $cluetipInner.html($truncloaded);
      }
      function doNothing() {}; //empty function
      tipTitle ? $cluetipTitle.show().html(tipTitle) : (opts.showTitle) ? $cluetipTitle.show().html('&nbsp;') : $cluetipTitle.hide();
      if (opts.sticky) {
        var $closeLink = $('<div id="cluetip-close"><a href="#">' + opts.closeText + '</a></div>');
        (opts.closePosition == 'bottom') ? $closeLink.appendTo($cluetipInner) : (opts.closePosition == 'title') ? $closeLink.prependTo($cluetipTitle) : $closeLink.prependTo($cluetipInner);
        $closeLink.bind('click.cluetip', function() {
          cluetipClose();
          return false;
        });
        if (opts.mouseOutClose) {
          $cluetip.bind('mouseleave.cluetip', function() {
            cluetipClose();
          });
        } else {
          $cluetip.unbind('mouseleave.cluetip');
        }
      }
// now that content is loaded, finish the positioning 
      var direction = '';
      $cluetipOuter.css({zIndex: $this.data('thisInfo').zIndex, overflow: defHeight == 'auto' ? 'visible' : 'auto', height: defHeight});
      tipHeight = defHeight == 'auto' ? Math.max($cluetip.outerHeight(),$cluetip.height()) : parseInt(defHeight,10);   
      tipY = posY;
      baseline = sTop + wHeight;
      if (opts.positionBy == 'fixed') {
        tipY = posY - opts.dropShadowSteps + tOffset;
      } else if ( (posX < mouseX && Math.max(posX, 0) + tipWidth > mouseX) || opts.positionBy == 'bottomTop') {
        if (posY + tipHeight + tOffset > baseline && mouseY - sTop > tipHeight + tOffset) { 
          tipY = mouseY - tipHeight - tOffset;
          direction = 'top';
        } else { 
          tipY = mouseY + tOffset;
          direction = 'bottom';
        }
      } else if ( posY + tipHeight + tOffset > baseline ) {
        tipY = (tipHeight >= wHeight) ? sTop : baseline - tipHeight - tOffset;
      } else if ($this.css('display') == 'block' || link.tagName.toLowerCase() == 'area' || opts.positionBy == "mouse") {
        tipY = bpY - tOffset;
      } else {
        tipY = posY - opts.dropShadowSteps;
      }
      if (direction == '') {
        posX < linkLeft ? direction = 'left' : direction = 'right';
      }
      $cluetip.css({top: tipY + 'px'}).removeClass().addClass('clue-' + direction + '-' + ctClass).addClass(' cluetip-' + ctClass);
      if (opts.arrows) { // set up arrow positioning to align with element
        var bgY = (posY - tipY - opts.dropShadowSteps);
        $cluetipArrows.css({top: (/(left|right)/.test(direction) && posX >=0 && bgY > 0) ? bgY + 'px' : /(left|right)/.test(direction) ? 0 : ''}).show();
      } else {
        $cluetipArrows.hide();
      }

// (first hide, then) ***SHOW THE CLUETIP***
      $dropShadow.hide();
      $cluetip.hide()[opts.fx.open](opts.fx.openSpeed || 0);
      if (opts.dropShadow) { $dropShadow.css({height: tipHeight, width: tipInnerWidth, zIndex: $this.data('thisInfo').zIndex-1}).show(); }
      if ($.fn.bgiframe) { $cluetip.bgiframe(); }
      // delayed close (not fully tested)
      if (opts.delayedClose > 0) {
        closeOnDelay = setTimeout(cluetipClose, opts.delayedClose);
      }
      // trigger the optional onShow function
      opts.onShow.call(link, $cluetip, $cluetipInner);
    };

/***************************************
   =INACTIVATION
-------------------------------------- */
    var inactivate = function(event) {
      isActive = false;
      $cluetipWait.hide();
      if (!opts.sticky || (/click|toggle/).test(opts.activation) ) {
        cluetipClose();
        clearTimeout(closeOnDelay);        
      }
      if (opts.hoverClass) {
        $this.removeClass(opts.hoverClass);
      }
    };
// close cluetip and reset some things
    var cluetipClose = function() {
      $cluetipOuter 
      .parent().hide().removeClass();
      opts.onHide.call(link, $cluetip, $cluetipInner);
      $this.removeClass('cluetip-clicked');
      if (tipTitle) {
        $this.attr(opts.titleAttribute, tipTitle);
      }
      $this.css('cursor','');
      if (opts.arrows) {
        $cluetipArrows.css({top: ''});
      }
    };

    $(document).bind('hideCluetip', function(e) {
      cluetipClose();
    });
/***************************************
   =BIND EVENTS
-------------------------------------- */
  // activate by click
      if ( (/click|toggle/).test(opts.activation) ) {
        $this.bind('click.cluetip', function(event) {
          if ($cluetip.is(':hidden') || !$this.is('.cluetip-clicked')) {
            activate(event);
            $('.cluetip-clicked').removeClass('cluetip-clicked');
            $this.addClass('cluetip-clicked');
          } else {
            inactivate(event);
          }
          this.blur();
          return false;
        });
  // activate by focus; inactivate by blur    
      } else if (opts.activation == 'focus') {
        $this.bind('focus.cluetip', function(event) {
          activate(event);
        });
        $this.bind('blur.cluetip', function(event) {
          inactivate(event);
        });
  // activate by hover
      } else {
        // clicking is returned false if clickThrough option is set to false
        $this[opts.clickThrough ? 'unbind' : 'bind']('click', returnFalse);
        //set up mouse tracking
        var mouseTracks = function(evt) {
          if (opts.tracking == true) {
            var trackX = posX - evt.pageX;
            var trackY = tipY ? tipY - evt.pageY : posY - evt.pageY;
            $this.bind('mousemove.cluetip', function(evt) {
              $cluetip.css({left: evt.pageX + trackX, top: evt.pageY + trackY });
            });
          }
        };
        if ($.fn.hoverIntent && opts.hoverIntent) {
          $this.hoverIntent({
            sensitivity: opts.hoverIntent.sensitivity,
            interval: opts.hoverIntent.interval,  
            over: function(event) {
              activate(event);
              mouseTracks(event);
            }, 
            timeout: opts.hoverIntent.timeout,  
            out: function(event) {inactivate(event); $this.unbind('mousemove.cluetip');}
          });           
        } else {
          $this.bind('mouseenter.cluetip', function(event) {
            activate(event);
            mouseTracks(event);
          })
          .bind('mouseleave.cluetip', function(event) {
            inactivate(event);
            $this.unbind('mousemove.cluetip');
          });
        }
        $this.bind('mouseover.cluetip', function(event) {
          $this.attr('title','');
        }).bind('mouseleave.cluetip', function(event) {
          $this.attr('title', $this.data('thisInfo').title);
        });
      }
    });
  };
  
/*
 * options for clueTip
 *
 * each one can be explicitly overridden by changing its value. 
 * for example: $.fn.cluetip.defaults.width = 200; 
 * would change the default width for all clueTips to 200. 
 *
 * each one can also be overridden by passing an options map to the cluetip method.
 * for example: $('a.example').cluetip({width: 200}); 
 * would change the default width to 200 for clueTips invoked by a link with class of "example"
 *
 */
  
  $.fn.cluetip.defaults = {  // set up default options
    width:            275,      // The width of the clueTip
    height:           'auto',   // The height of the clueTip
    cluezIndex:       97,       // Sets the z-index style property of the clueTip
    positionBy:       'auto',   // Sets the type of positioning: 'auto', 'mouse','bottomTop', 'fixed'
    topOffset:        15,       // Number of px to offset clueTip from top of invoking element
    leftOffset:       15,       // Number of px to offset clueTip from left of invoking element
    local:            false,    // Whether to use content from the same page for the clueTip's body
    localPrefix:      null,       // string to be prepended to the tip attribute if local is true
    hideLocal:        true,     // If local option is set to true, this determines whether local content
                                // to be shown in clueTip should be hidden at its original location
    attribute:        'rel',    // the attribute to be used for fetching the clueTip's body content
    titleAttribute:   'title',  // the attribute to be used for fetching the clueTip's title
    splitTitle:       '',       // A character used to split the title attribute into the clueTip title and divs
                                // within the clueTip body. more info below [6]
    escapeTitle:      false,    // whether to html escape the title attribute
    showTitle:        true,     // show title bar of the clueTip, even if title attribute not set
    cluetipClass:     'default',// class added to outermost clueTip div in the form of 'cluetip-' + clueTipClass.
    hoverClass:       '',       // class applied to the invoking element onmouseover and removed onmouseout
    waitImage:        true,     // whether to show a "loading" img, which is set in jquery.cluetip.css
    cursor:           'help',
    arrows:           false,    // if true, displays arrow on appropriate side of clueTip
    dropShadow:       true,     // set to false if you don't want the drop-shadow effect on the clueTip
    dropShadowSteps:  6,        // adjusts the size of the drop shadow
    sticky:           false,    // keep visible until manually closed
    mouseOutClose:    false,    // close when clueTip is moused out
    activation:       'hover',  // set to 'click' to force user to click to show clueTip
                                // set to 'focus' to show on focus of a form element and hide on blur
    clickThrough:     false,    // if true, and activation is not 'click', then clicking on link will take user to the link's href,
                                // even if href and tipAttribute are equal
    tracking:         false,    // if true, clueTip will track mouse movement (experimental)
    delayedClose:     0,        // close clueTip on a timed delay (experimental)
    closePosition:    'top',    // location of close text for sticky cluetips; can be 'top' or 'bottom' or 'title'
    closeText:        'Close',  // text (or HTML) to to be clicked to close sticky clueTips
    truncate:         0,        // number of characters to truncate clueTip's contents. if 0, no truncation occurs
    
    // effect and speed for opening clueTips
    fx: {             
                      open:       'show', // can be 'show' or 'slideDown' or 'fadeIn'
                      openSpeed:  ''
    },     

    // settings for when hoverIntent plugin is used             
    hoverIntent: {    
                      sensitivity:  3,
              			  interval:     50,
              			  timeout:      0
    },

    // short-circuit function to run just before clueTip is shown. 
    onActivate:       function(e) {return true;},
    // function to run just after clueTip is shown. 
    onShow:           function(ct, ci){},
    // function to run just after clueTip is hidden.
    onHide:           function(ct, ci){},
    // whether to cache results of ajax request to avoid unnecessary hits to server    
    ajaxCache:        true,  

    // process data retrieved via xhr before it's displayed
    ajaxProcess:      function(data) {
                        data = data.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm, '').replace(/<(link|meta)[^>]+>/g,'');
                        return data;
    },                

    // can pass in standard $.ajax() parameters. Callback functions, such as beforeSend, 
    // will be queued first within the default callbacks. 
    // The only exception is error, which overrides the default
    ajaxSettings: {
                      // error: function(ct, ci) { /* override default error callback */ }
                      // beforeSend: function(ct, ci) { /* called first within default beforeSend callback }
                      dataType: 'html'
    },
    debug: false
  };


/*
 * Global defaults for clueTips. Apply to all calls to the clueTip plugin.
 *
 * @example $.cluetip.setup({
 *   insertionType: 'prependTo',
 *   insertionElement: '#container'
 * });
 * 
 * @property
 * @name $.cluetip.setup
 * @type Map
 * @cat Plugins/tooltip
 * @option String insertionType: Default is 'appendTo'. Determines the method to be used for inserting the clueTip into the DOM. Permitted values are 'appendTo', 'prependTo', 'insertBefore', and 'insertAfter'
 * @option String insertionElement: Default is 'body'. Determines which element in the DOM the plugin will reference when inserting the clueTip.
 *
 */
   
  var insertionType = 'appendTo', insertionElement = 'body';

  $.cluetip.setup = function(options) {
    if (options && options.insertionType && (options.insertionType).match(/appendTo|prependTo|insertBefore|insertAfter/)) {
      insertionType = options.insertionType;
    }
    if (options && options.insertionElement) {
      insertionElement = options.insertionElement;
    }
  };
  
})(jQuery);
;
