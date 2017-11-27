//навигация-попап
$(() => {
  var navigationPopup = $(".navigation-popup"),
      links = $(".navigation-popup__link", navigationPopup),
      buttons = $(".navigation-popup__button");

  var showPopup = () => {
    // var navigationPopup = $(".navigation-popup");
      navigationPopup.toggleClass("navigation-popup--active");
      setTimeout(() => {
        buttons.toggleClass("navigation-popup__button--cross");
      }, 500);
  }
  buttons.on("click", showPopup);
  links.on("click", showPopup);
});

//отзыв-попап 
$(()=> {
  var reviewPopup = $(".review-popup"),
        reviewName = $(".review-popup__name", reviewPopup),
        reviewText = $(".review-popup__text", reviewPopup),
        buttons = $(".reviews__button"),
        close = $(".review-popup__close");
  var name, text;

  buttons.on("click",e => {
    var target = $(e.currentTarget);
    name = target.siblings().first().text();
    text = target.siblings().eq(1).text();
  });
  
  var showPopup = function() {
    reviewName.text(name);
    reviewText.text(text);
    reviewPopup.toggleClass("review-popup--active");
  };

  buttons.on("click", showPopup);
  close.on("click", showPopup);
});

//состав
$(() => {
  var composition = $(".composition"),
    button = $(".composition__button", composition),
    close = $(".composition__close", composition);
  button.on("click",() => {
    composition.toggleClass("composition--active");
  });
  close.on("click",() => {
    composition.toggleClass("composition--active");
  });
});

// меню-аккордеон
var animateAcco = function(e) {
  var target = $(e.currentTarget),
      item = target.closest(".acco__item"),
      content = $(".acco__content", item),
      container = $(".acco__container", item),
      acco = target.closest(".acco"),
      items = $(".acco__item", acco),
      otherContent = $(".acco__content", acco),
      isHorizontal = acco.hasClass("acco_horizontal"),
      reqParameters = !isHorizontal 
        ? { height: container.outerHeight() }
        : { width: container.outerWidth() },
      zeroParameters = !isHorizontal 
        ? { height: 0 }
        : { width: 0 };

  if (!item.hasClass("active")) {
    items.removeClass("active");
    item.addClass("active");

    otherContent.css(zeroParameters);

    content.css(reqParameters);

  } else {
    item.removeClass("active");

    content.css(zeroParameters);
  };
};

$(() => {
  $(".acco__trigger").on("click", animateAcco);
  $(".acco__close").on("click", animateAcco);
})

$(() => {
  var moveSlide = (slideshow, slideNum) => {
    var list = $(".slideshow__list", slideshow),
    slides = $(".slideshow__item"),
    activeSlide = slides.filter(".active"),
    reqSlide = slides.eq(slideNum),
    duration = 600;

    if(reqSlide.length) {
      list.animate({
        left: -slideNum * 100 + "%"
      }, duration, () => {
        activeSlide.removeClass("active");
        reqSlide.addClass("active");
      });
    }
  };

  $(".slideshow__button").on("click", e => {
    var target = $(e.currentTarget),
      slideshow = target.closest(".slideshow"),
      slides = $(".slideshow__item", slideshow),
      activeSlide = slides.filter(".active");
    
    var existedSlide,
      edgeSlide,
      reqSlide;

    if (target.hasClass("slideshow__button--next")) {
      existedSlide = activeSlide.next();
      edgeSlide = slides.first();
    };

    if (target.hasClass("slideshow__button--prev")) {
      existedSlide = activeSlide.prev();
      edgeSlide = slides.last();
    };

    reqSlide = existedSlide.length 
      ? existedSlide.index()
      : edgeSlide.index();

    moveSlide(slideshow, reqSlide);
  });
});


var slideshow = $(".page-scroll"),
      sections = $(".section"),
      wrapper = $(".wrapper");

var inScroll = false;

var mobileDetect = new MobileDetect(window.navigator.userAgent);
      isMobile = mobileDetect.mobile();


var coloringDots = sectionNum => {
  $(".dots-nav__item").eq(sectionNum).addClass("active")
    .siblings().removeClass("active");
}

var pageScroll = sectionNum => {
  if (inScroll) return;

  inScroll = true;
  var position = (sectionNum * -100) + "%";
  
  slideshow.css({
  "transform": `translateY(${position})`,
  "-webkit-transform": `translateY(${position})`
  });

  sections.eq(sectionNum).addClass("active-section")
    .siblings().removeClass("active-section");

  setTimeout(() => {
    inScroll = false;
    coloringDots(sectionNum);
  }, 1300);
}

var defineSections = sections => {
  var activeSection = sections.filter(".active-section");
  return {
    activeSection: activeSection,
    nextSection: activeSection.next(),
    prevSection: activeSection.prev()
  };
};

var scrollToSection = direction => {
  var section = defineSections(sections);

  if (inScroll) return;

  if (direction === "up" && section.nextSection.length) {
    pageScroll(section.nextSection.index());
  };

  if (direction === "down" && section.prevSection.length) {
    pageScroll(section.prevSection.index());
  };
};

$(".wrapper").on({
  wheel : e => {
    var deltaY = e.originalEvent.deltaY;
    var direction = (deltaY > 0)
      ? "up"
      : "down";

  scrollToSection(direction);
  },

  touchmove: e => { 
    e.preventDefault()
  }
});



$(document).on("keydown", e => {
  var section = defineSections(sections);

  if (inScroll) return;

  switch (e.keyCode) {
    case 40:
      if (!section.nextSection.length) return;
      pageScroll(section.nextSection.index());
      break;
    
    case 38:
      if (!section.prevSection.length) return;
      pageScroll(section.prevSection.index());
      break;
  } 
});

if (isMobile) {
  $(window).swipe({
  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      scrollToSection(direction);
    }
  });
};

$("[data-scroll-to]").on("click touchstart", e => {
  e.preventDefault();
  var target = $(e.currentTarget);
  var sectionNum = parseInt(target.attr("data-scroll-to"));

  pageScroll(sectionNum);
});


//работа формы
$(() => {
  var submitForm = e => {
    e.preventDefault();

    var form = $(e.target),
        data = form.serialize(),
        url = form.attr("action");

    var request = $.ajax({
      type: 'POST',
      url: url,
      data: data,
      dataType : "JSON"
    });

    request.done(msg => {
      var popup = $(".form-popup"),
          text = $(".form-popup__message"),
          mes = msg.mes;

      text.text(mes);
      popup.addClass("form-popup--active");
    });

    request.fail((jqXHR, textStatus) => {
      var popup = $(".form-popup"),
      text = $(".form-popup__message");

      text.text("Ошибка соединения с сервером");
      popup.addClass("form-popup--active");
    });
  };
  
  $("#order-form").on("submit", submitForm);
  $(".form-popup__close").on("click",() => {
    $(".form-popup").removeClass("form-popup--active");
  })
});



