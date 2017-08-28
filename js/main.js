$(function() {
  if (screen.width >= 768) {
    followScroll();
    animatedHeader();
  }
  let triangles = $('.triangleCanvas');
  triangleCanvas(triangles);
  $(window).on('resize', function() {
    triangleCanvas(triangles);
  });
  $('[data-dismiss="modal"]').click(function() {
    if ($(document.body).hasClass('modal-open')) {
      $('#regForm').find("input").val("");
      $('#regForm').find("input.valid").removeClass('valid');
      $('#regForm').find('label.error').remove();
      $('#regForm').find('label.active').removeClass('active');
    }
  });
  $('[data-close="message"]').click(function() {
    $('body').attr('class', '');
    $('.form-message-box.success').css('top', '-100vh');
  });
  if ($('body').hasClass('success-box')) {
    setTimeout(function() {
      $('.form-message-box.success').css('top', 0);
    }, 300);
    $('html,body').animate({
      scrollTop: 0
    }, 0)
  } else if ($('body').hasClass('error-box')) {
    setTimeout(function() {
      $('.form-message-box.error').css('top', 0);
    }, 100);
    $('html,body').animate({
      scrollTop: 0
    }, 0)
  }
});

$(function() {
  $.validator.addMethod("regex", function(value, element, regexpr) {
    return regexpr.test(value);
  }, "Wrong mail format");

  $("form[name='registration']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      first_last_name: {
        required: true,
        minlength: 5
      },
      email: {
        required: true,
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        email: true
      },
      position: {
        required: true,
        minlength: 2
      },
      company_name: {
        required: true,
        minlength: 2
      },
      count: {
        required: true,
        number: true,
        minlength: 1
      },
      comments: {
        required: false
      }
    },
    // Specify validation error messages
    messages: {
      firstname: "Please enter your first and last name",
      email: "Wrong mail format",
      company_name: "Please fill the input field",
      people_name: "Please fill the input field",
      people_second_name: "Please fill the input field",
      question_field: "Please fill the input field"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});

let triangleCanvas = function(canvasElement) {
  let canvasArray = canvasElement.toArray();
  let sectionWidth = document.body.clientWidth;
  createCanvas(canvasArray, sectionWidth);
}

let createCanvas = function(canvasArray, sectionWidth) {
  canvasArray.forEach(function(element) {
    let context = $(element)[0].getContext("2d");
    let current = $(element).attr('class');
    context.canvas.width = window.innerWidth;
    context.beginPath();
    context.moveTo(0, 0);
    switch (current) {
      case 'triangleCanvas reversed':
        context.lineTo(sectionWidth, 0);
        context.lineTo(0, 700);
        break;
      case 'triangleCanvas':
        context.lineTo(sectionWidth, 0);
        context.lineTo(sectionWidth, 700);
        break;
    }
    context.closePath();

    context.fillStyle = "#fff";
    context.fill();
  });

}

var animatedHeader = function() {

  var docElem = document.documentElement,
    header = document.querySelector('.header-section'),
    didScroll = false,
    changeHeaderOn = 50;

  function init() {
    scrollPage();
    window.addEventListener('scroll', function(event) {
      if (!didScroll) {
        didScroll = true;
        setTimeout(scrollPage, 10);
      }
    }, false);
  }

  function scrollPage() {
    var sy = scrollY();
    if (sy >= changeHeaderOn) {
      classie.add(header, 'shrink');
    } else {
      classie.remove(header, 'shrink');
    }
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  init();

};

let followScroll = function() {
  const imageFronts = Array.from(document.querySelectorAll('.scrolling-box')).map(wrapElement);

  document.addEventListener('scroll', function() {
    requestAnimationFrame(animate);
  });

  animate();

  function wrapElement(elt) {
    var clientRect = elt.getBoundingClientRect();
    return {
      element: elt,
      yCenter: clientRect.top + (clientRect.top - clientRect.bottom) / 2 + window.pageYOffset / 4
    }
  }

  function animate() {
    imageFronts.forEach(function(frontImage) {
      var dist = -(frontImage.yCenter - (window.pageYOffset - window.screen.height / 2));
      var set = Math.atan(dist / 100);
      var tup = parseInt(set);
      frontImage.element.style.transform = `translateY(${ 40 * tup + 100}px)`;
    });
  }
};
