
window.addEventListener("load", function() {
	var cover = document.querySelector("header");
	cover.style.opacity = 1.0;
});

// Scroll Member viewer
(function(){
	var memberWrap = document.querySelector("#team .member-wrap");
	var memberWrapOffsetTop = memberWrap.offsetTop;
	var members = memberWrap.querySelectorAll(".member-content");
	var memberHeight = members[0].offsetHeight;
	var memberCount = members.length;;
	var step = memberHeight * 1.2;
	var initDiffValue = -250;
	var lastDiffValue = (memberCount * step) + memberHeight;
  var activeClassName = "onMemberDesc";
  var mobileMaxWidth = 768;

	function toggleViewByScroll() {
		setTimeout( function () {
			var currentScrolly = window.scrollY;
			var diff = (currentScrolly - memberWrapOffsetTop); 

			var activeElement = document.querySelector("#team .onMemberDesc");
			if(activeElement) activeElement.classList.remove(activeClassName);

			var baseValue = (diff - initDiffValue);

			if(baseValue > 0 && baseValue < lastDiffValue) { 
				var nth = Math.ceil( baseValue / step);
				if(nth <= memberCount) {
					var target =  document.querySelector("#team .team-member:nth-child("+ nth +") > .member-content");
					target.classList.add(activeClassName);
				}
			}
     //recursive
     toggleViewByScroll();
   },16);
	}

	function removeHoverEffect() {
		document.querySelectorAll(".member-hover-viewer").forEach( function(v) { 
			v.classList.remove("member-hover-viewer")
		});
	}

	if(window.innerWidth > mobileMaxWidth) return;
	removeHoverEffect();
	toggleViewByScroll();

})();


//image scroller
!(function(){

  function hideNaviBtn() {
      var btnNavi = document.querySelector(".buttonNavi");
      btnNavi.style.display = "none";
  }

  function scrollMover() {
    const swipeScrollWidth = document.querySelector(".swipe").scrollWidth;
    const swipeViewWidth = document.querySelector(".fixwindow").offsetWidth;
  }


  function getScrollRange() {
    var swipeScrollWidth = document.querySelector(".swipe").scrollWidth;
    var swipeViewWidth = document.querySelector(".fixwindow").offsetWidth;
    var scrollRange = swipeScrollWidth - swipeViewWidth;
    return scrollRange;
  }

  if(_.chkMobile()) hideNaviBtn();

  var resizeTimer;
  window.addEventListener('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {

      var swipeNode = document.querySelector(".swipe");
      var currentScrollLeft = swipeNode.scrollLeft;
      var scrollRange = getScrollRange();

      console.log(scrollRange,  currentScrollLeft);
      //$0.style.transform = "translateX(300px)";

    }, 300);
  });

})();


