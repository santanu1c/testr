(function($) {



  /* ----------------------- Placeholder fallback -------------------*/
  placeholderSupport = ("placeholder" in document.createElement("input"));
  if (!placeholderSupport) {
    $("#form-reg-block").addClass("no-placeholder");
  }
  /* ----------------------- Placeholder fallback -------------------*/



  /*---- Form Validation Starts Here ------*/

  var validationMap = {
    'name': {
      validate: true,
      req: {
        message: 'Name cannot be blank'
      },
      patt: {
        regExp: /^[A-Za-z]+( [A-za-z]+)?$/,
        message: "Please enter a proper name"
      }
    },
    'pass': {
      validate: true,
      req: {
        message: "Pasword cannot be blank"
      },
      patt: {
        regExp: /^[~_&*%@$A-Za-z0-9]{6,}$/,
        message: "Please enter a proper password"
      }
    },
    'cPass': {
      validate: true,
      req: {
        message: "Confirm password cannot be blank"
      },
      check: {
        func: function() {
          return this.value === this.form.pass.value;
        },
        message: "Confirm password and password are not the same"
      }
    },
    'email': {
      validate: true,
      req: {
        message: "Email cannot be blank"
      },
      patt: {
        regExp: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        message: "Please enter a proper email."
      },
      check: {
        func: function() {
          var dom = this.value.split('@');
          return $.trim(dom[1]) !== 'sapient.com';
        },
        message: "Domain cannot be sapient"
      }
    },
    'website': {
      validate: true,
      req: {
        message: "Website cannot be vlank."
      }
    }
    // 'business-unit': {
    //   validate: true,
    //   check: {
    //     func: function() {
    //       return !!$(this).find(':checked').length;
    //     },
    //     message: "Please select a checkbox"
    //   }

    // }
  }


    function validateValFld() {
      var id = this.id,
        ev = $.Event('validationError'),
        val = this.value,
        validRule = validationMap[id];
      if (!validRule || !validRule.validate) {
        return true;
      }

      if (validRule.req) {
        if ($.trim(val) === '') {
          ev.el = this;
          ev.message = validRule.req.message;
          $(this).trigger(ev);
          return false;
        }
      }
      if (validRule.patt) {
        if (!validRule.patt.regExp.test(val)) {
          ev.message = validRule.patt.message;
          $(this).trigger(ev);
          return false;
        }
      }
      if (validRule.check) {
        if (!validRule.check.func.call(this)) {
          ev.message = validRule.check.message;
          $(this).trigger(ev);
          return false;

        }
      }
      $(this).trigger('validationSuccess');
      return true;
    }

  $('#my-from').on('submit', function(e) {
    var valid = true;
    e.preventDefault();
    $(this).find('.val-txt, .val-chk-bx').each(function() {
      if (!validateValFld.call(this)) {
        valid = false;
        return false;
      }
    });
    if (valid) {
      $('#success-msg').show();
    }
  });
  $('#my-from').on('validationError', '.val-txt, .val-chk-bx', function(e) {
    $(this).addClass('error').closest('form').find('#error-msg').html(e.message).show();
  });
  $('#my-from').on('validationSuccess', '.val-txt, .val-chk-bx', function(e) {
    $(this).removeClass('error').closest('form').find('#error-msg').hide();

  });

  /*---- Form Validation Ends Here ------*/
  $('.ckk-bx-gp-wr').on('click', '.ckk-bx-sel-all', function() {
    if (this.checked) {
      $(this).closest('.ckk-bx-gp-wr').find('.chk-bx-gp input').prop('checked', true);
      return;
    }
    $(this).closest('.ckk-bx-gp-wr').find('.chk-bx-gp input').prop('checked', false);
  });

  $('.ckk-bx-gp-wr').on('click', '.chk-bx-gp input', function() {
    if ($(this).closest('.chk-bx-gp').find('input:not(:checked)').length) {
      $(this).closest('.ckk-bx-gp-wr').find('.ckk-bx-sel-all').prop('checked', false);
      return;
    }
    $(this).closest('.ckk-bx-gp-wr').find('.ckk-bx-sel-all').prop('checked', true);

  });

  function createMobileNav(el) {
    var $links = $(el).find('a');
    var tmp = '<select class="selectnav" id="selectnav1">';
    $links.each(function() {
      var $this = $(this);
      tmp += '<option value="' + $this.attr('href') + '">' + $this.html() + '</option>';
    });
    tmp += '<select>';
    $(el).parent().append(tmp);

  }
  createMobileNav('#nav');



})(jQuery);


/* ------- Carusal --------- */

(function($) {

  $.fn.ownCarausal = function(sett) {
    var setting = $.extend({
      duration: 500,
      interval: 3000,
      touch: true,
      auto: true
    }, sett);
    return this.each(function() {

    var $this = $(this),
        $ul = $this.find('ul#slider'),
        $lis = $ul.find('>li'),
        $pic = $lis.find('>img'),
        $picH = $pic.height(),
        $gb = $lis.find('.green-bar'),
        $smask = $this.find('#slider-mask'),
        liWidth = $this.innerWidth(),
        curr = 0,
        i = 0,
        tmp = '',
        timer;

      $ul.width(liWidth * $lis.length);
      $lis.width(liWidth);
      $smask.height($picH+150);
      $gb.css('top', $picH-15);

      $(window).resize(function(){

          $ul = $this.find('ul#slider'),
          $lis = $ul.find('>li'),
          $pic = $lis.find('>img'),
          $picH = $pic.height(),
          $smask = $lis.find('.green-bar'),
          $gb = $this.find('#slider-mask');
          liWidth = $this.innerWidth();
          
        $ul.width(liWidth * $lis.length);
        $lis.width(liWidth);
        $gb.height($picH+150);
        $smask.css('top', $picH-15);

      });

      for (i = 0; i < $lis.length; i+= 1) {
          if(i == 0){
            tmp = '<li class="bullet current"></li>';
          }else{
            tmp += '<li class="bullet"></li>';
          }
      }
      tmp = '<ul class="car-bull">' + tmp + '</ul>';

      $ul.parent().append(tmp);

      function moveTo(ind) {
        removeHandlers();

        var $bullItem = $('.bullet');
        $bullItem.removeClass('current');
        $bullItem.eq(curr).addClass('current');

        $ul.animate({
          left: -1 * ind * liWidth
        }, setting.duration, function() {
          addHandlers();
        });
      }

      
      function addHandlers() {
        $this.on('click.owncar','.bullet', bulletClickHandler);
        timer = setting.auto && setTimeout(move, setting.interval);
        if (!setting.touch) {
          return;
        }
        $ul.wipetouch({
            wipeLeft : function () { 
              if (curr < $lis.length - 1) {
                curr +=1;
                moveTo(curr);
              }
            },
            wipeRight : function () { 
              if (curr > 0) {
                curr -=1;
                moveTo(curr);
              }
            }
          });
      }
      function removeHandlers() {
        clearTimeout(timer);
        $this.off('click.owncar'); 
        if (!setting.touch) {
          return;
        }       
        $ul.wipetouch({remove:true});
      }
      function bulletClickHandler() {
        var ind = $(this).parent().find('.bullet').index(this);
        if (ind !== curr) {
          curr = ind;
          moveTo(ind);
        }
      }
      function move() {
        if (curr < $lis.length - 1) {
          curr += 1;
        } else {
          curr = 0;
        }
        
        moveTo(curr);

      }
      addHandlers();
   

    });
  }





  var raw_template = $('#simple-template').html(),
      template = Handlebars.compile(raw_template),
      placeHolder = $("#slider-mask").append('<ul id="slider"></ul>');


 $.ajax({
    'url': 'JSON/carousel-data.json',
    'dataType': 'JSON',
    'type': 'post',
    'success': function(data) {
      var i,
        len,
        html = '';
      len = data.length;
      for (i = 0; i < len; i+= 1) {
        html += template(data[i]);       
      }
      placeHolder.find('#slider').append(html);
      $('#main-left-col').ownCarausal();

    }
  });

 

}(jQuery));