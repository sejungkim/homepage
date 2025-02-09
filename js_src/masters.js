//등록 URL 변경
//개별등록시 아래 주석 해제
/*
(function() {
	var urls = {
		masters_fe : "",
		masters_be : "",
		masters_ios: "/page/reg"
	}
	var el  = document.querySelector(".program_page");	
	if(el === null) return;
	var pageId = el.id.replace(/masters_/, '');
	var elRegURL = document.querySelector(".pay-desc .btn-common");
	if(!elRegURL) return;
	elRegURL.href = "/page/reg/" + pageId + ".html";
})();
*/


//gantt chart
(function() {
	if(typeof bb === "undefined") return;
	var chart = bb.generate({
		data: {
			x: "x",
			columns: [
				["x", "상반기모집", "상반기과정", "2020년모집" ],
				["duration", 10, 60, 10]
			],
			type: "bar"
		},
		axis: {
			rotated: true,
			x: {
				type: "category",
				tick: {
					multiline: false
				}
			},
			y: {
				tick: {
					format: function (x) {
						var fun = function (d) {
							var month = ((d + 30) / 10);
							// if(month === 13) month = 1;
							// if(month === 14) month = 2;
							// if(month === 15) month = 3;
							// if(month === 16) month = 4;
							return month + "월";
						}
						return fun(x);
					}
				}
			},
		},
		grid: {
			x: {
				show: true
			},
			y: {
				show: true
			}
		},
		tooltip : {
			show:false
		},
		bindto: "#RotatedAxis",
		onbeforeinit: function() {
		},
		onrendered: function() {
			document.querySelector(".RotatedAxis_preview").style.display = "none";
		}
	});

	chart.legend.hide();
	chart.axis.max({
		y: 90,
	 });

	 chart.data.colors({
		duration: "#833939"
	});

	//data parsing
	function setClonedPath(target, step, unitWidth) {
		var base = target.getAttribute("d");
		var xBase = +(base.replace(/\n/g, '').replace(/^M\s*(\d+\.?\d*).*$/, "$1"));
		var xWidth = +(base.replace(/\n/g, '').replace(/^[^L]*L\s+(\d+\.?\d*).*$/, "$1"));

		//var xStart = (xWidth) * step;
		var xStart = step * unitWidth;

		var yStart = +(base.replace(/\n/g, '').replace(/^M\s+[\d.]+,?\s*(\d+\.*\d*).*$/, "$1"));

		var xTwo = xStart + (xWidth-xBase);
		var yThree = +(base.replace(/\n/g, '').replace(/^.+\L\s[\d.]+,?\s*(\d+\.?\d*).*$/, "$1"));

		target.setAttribute("d", "M " + xStart + "," + yStart + " L " + xTwo + "," + yStart + " L " + xTwo + "," + yThree + " L " + xStart + "," + yThree + " z");
	}

	var resizerunner = false;
	function resizeHanlder() {
		if (resizerunner) return;
		resizerunner = true;

		setTimeout(function () {
			var parent = document.querySelector(".bb-shapes");

			// node clone example!
			// var clonedTarget44 = document.querySelector("#RotatedAxis path:nth-child(2)").cloneNode(true);
			// parent.appendChild(clonedTarget44);
			// setClonedPath(clonedTarget44, 3);


			var unitWidth = +(document.querySelector("path")
							.getAttribute("d")
							.replace(/\n/g, '')
							.replace(/^[^L]*L\s+(\d+\.?\d*).*$/, "$1"));
			console.log(unitWidth);

			var clonedTarget2 = document.querySelector("#RotatedAxis path:nth-child(2)");
			parent.appendChild(clonedTarget2);
			setClonedPath(clonedTarget2, 1, unitWidth);

			var clonedTarget3 = document.querySelector("#RotatedAxis path:nth-child(2)");
			parent.appendChild(clonedTarget3);
			setClonedPath(clonedTarget3, 9, unitWidth);

			// var clonedTarget4 = document.querySelector("#RotatedAxis path:nth-child(2)");
			// parent.appendChild(clonedTarget4);
			// setClonedPath(clonedTarget4, 7, unitWidth);

			resizerunner = false;
		}, 800);
	}

	window.addEventListener("resize", resizeHanlder);

	setTimeout(function () {
		var mySVG = document.querySelector("svg");
		//mySVG.setAttribute("height", 450);
		//window.dispatchEvent(new Event('resize'));
	}, 100);

  resizeHanlder();
})();

//curriculum templating
!(function() {
	function getTpl(content, count) {
		const gubunStart = `<div class="recomm-word-row">`;
		const gubunEnd =  `</div>`;
		var baseSize = 5;

		return `
		${ (((count-1) % baseSize) === 0) ? `${gubunStart}` : ``}
		<div>
			<div class="step"> 
			<div class="stepNumber">${count}</div>
			</div>
			<p>${content}</p>
	  	</div>
		${ ((count) % baseSize === 0) ? `${gubunEnd}` : ``}
		`
	}

	function paddingDIV() {
		return `<div class="invisible"></div><div class="invisible"></div>`;
	}

	var classKind = window.location.pathname.replace(/\/page\/masters\/(\w+)\.html/, "$1");
	var list = curriculum.masters[classKind].list;
	var htmls = list.reduce( function(html, obj, idx) {
		return html + getTpl(obj.name, ++idx);
	}, ``);

	var parent = document.querySelector("#masters-curriculum .recomm-word-wrap");
	parent.innerHTML = htmls + paddingDIV();

})();