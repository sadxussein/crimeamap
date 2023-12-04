var regions = document.getElementsByClassName("region");
var map = document.getElementById("map");
var popup = document.getElementById("popup"),
	popupheader = document.getElementById("popupheader"),
	popupbody = document.getElementById("popupbody"),
	popupclose = document.getElementById("popupclose");
var marks = document.getElementById("marks"),
	marksheader = document.getElementById("marksheader"),
	marksbody = document.getElementById("marksbody"),
	marksclose = document.getElementById("marksclose"),
	mark = document.getElementsByClassName("mark"),
	mark_teacher = document.getElementsByClassName("mark_teacher");
var infotable = document.getElementById("info");
var infomodal = document.getElementById("infomodal");
var infoclose = document.getElementById("infoclose");
var infoheader = document.getElementById("infoheader");
var markheader = document.getElementById("markheader");
var infobody = document.getElementById("infobody"); // сюда вставляем таблицу
//var infobodyname; // id таблицы, которую берем
var subjects = document.getElementsByClassName("subject");
var recommend = document.getElementById("recommend");
var functable = document.getElementsByClassName("functable");
var wHeight = window.innerHeight;

var imagelink = document.getElementById("imagelink");
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");
var six = document.getElementById("six");
var seven = document.getElementById("seven");
var eight = document.getElementById("eight");
var zero = document.getElementById("zero");
	
var regionID,
	subjectID,
	subjectFieldsID;
	
var previousRegion;

var pt = map.createSVGPoint();

var popupvisible = 0,
	popupbodyvisible = 0,
	marksvisible = 0,
	infovisible = 0;
	
var division_counter = 0;

for (var i=0; i<regions.length; i++) {
	regions[i].addEventListener("mouseover", showPopup);
	regions[i].addEventListener("mouseover", getRegionName);
	regions[i].addEventListener("mouseout", hidePopup);
	regions[i].addEventListener("click", togglePopup);
}

for (var i=0; i<subjects.length; i++) {
	subjects[i].addEventListener("click", getSubjectName);
	subjects[i].addEventListener("click", showMarks);
}

for (var i=0; i<mark.length; i++) {
	mark[i].addEventListener("click", function(evt) {
		getMark(evt);
	});
}

for (var i=0; i<mark_teacher.length; i++) {
	mark_teacher[i].addEventListener("click", function(evt) {
		getMark(evt, "_teacher");
	});
}

map.addEventListener("mousemove", function(evt) {
	var loc = cursorPoint(evt);
	var maprect = map.getBoundingClientRect();
	var bodyrect = document.body.getBoundingClientRect();
	if(popupvisible == 0) {
		popup.style.left = (loc.x) + 15 + maprect.left - bodyrect.left + "px";
		popup.style.top = (loc.y) - 30 + maprect.top - bodyrect.top + "px";
		popuprect = popup.getBoundingClientRect();	
		marksrect = marks.getBoundingClientRect();
		marks.style.left = popuprect.left - bodyrect.left + popuprect.width + "px";
		marks.style.top = popuprect.top - bodyrect.top + 15 + "px";
	}
},false);

popupclose.addEventListener("click", togglePopup);
popupclose.addEventListener("click", hideMarks);
marksclose.addEventListener("click", hideMarks);
infoclose.addEventListener("click", hideInfo);

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        hideInfo();
		// console.log("esc pressed");
    }
};

// window.onclick = function(evt) {
	// console.log(evt.target.id);
	// console.log(popupbodyvisible);
	// if (popupbodyvisible == 1)
		// if (evt.target.id != 'popup' && evt.target.id != 'popupbody' && evt.target.id != 'popupheader' && evt.target.id != regionID)
			// //togglePopup();
			// console.log(popupbodyvisible);
// }

function cursorPoint(evt){
	pt.x = evt.clientX; pt.y = evt.clientY;
	return pt.matrixTransform(map.getScreenCTM().inverse());
}

function showPopup() {
	popup.style.display = "block";	
}

function hidePopup() {
	if (popupvisible == 0) {
		popup.style.display = "none";
	}
}

function togglePopup() {
	if(popupvisible == 0) {
		previousRegion = regionID;
		popupvisible = 1;
		popupbodyvisible = 1;
		popupbody.style.display = "block";	
	} else if(popupvisible == 1) {
		popupvisible = 0;
		popupbodyvisible = 0;
		popupbody.style.display = "none";
		popup.style.display = "none";
		hideMarks();
	}
}

function getRegionName(evt) {
	if (popupvisible == 0) {		
		if (evt.currentTarget.id == 'armyansk') { popupheader.innerHTML = "Армянск";}
		if (evt.currentTarget.id == 'krasnoperekopsk') { popupheader.innerHTML = "Красноперекопск";}
		if (evt.currentTarget.id == 'krasnoperekopskiy') { popupheader.innerHTML = "Красноперекопский район";}
		if (evt.currentTarget.id == 'djankoy') { popupheader.innerHTML = "Джанкой";}
		if (evt.currentTarget.id == 'djankoyskiy') { popupheader.innerHTML = "Джанкойский район";}
		if (evt.currentTarget.id == 'razdolnenskiy') { popupheader.innerHTML = "Раздольненский район";}
		if (evt.currentTarget.id == 'kerch') { popupheader.innerHTML = "Керчь";}
		if (evt.currentTarget.id == 'pervomayskiy') { popupheader.innerHTML = "Первомайский район";}
		if (evt.currentTarget.id == 'chernomorskiy') { popupheader.innerHTML = "Черноморский район";}
		if (evt.currentTarget.id == 'nijnegorskiy') { popupheader.innerHTML = "Нижнегорский район";}
		if (evt.currentTarget.id == 'krasnogvardeyskiy') { popupheader.innerHTML = "Красногвардейский район";}
		if (evt.currentTarget.id == 'evpatoria') { popupheader.innerHTML = "Евпатория";}
		if (evt.currentTarget.id == 'sovetskiy') { popupheader.innerHTML = "Советский район"; }
		if (evt.currentTarget.id == 'saki') { popupheader.innerHTML = "Саки";}
		if (evt.currentTarget.id == 'leninskiy') { popupheader.innerHTML = "Ленинский район";}
		if (evt.currentTarget.id == 'sakskiy') { popupheader.innerHTML = "Сакский район";}
		if (evt.currentTarget.id == 'kirovskiy') { popupheader.innerHTML = "Кировский район";}
		if (evt.currentTarget.id == 'feodosiya') { popupheader.innerHTML = "Феодосия";}
		if (evt.currentTarget.id == 'belogorskiy') { popupheader.innerHTML = "Белогорский район";}
		if (evt.currentTarget.id == 'sudak') { popupheader.innerHTML = "Судак";}
		if (evt.currentTarget.id == 'simferopolskiy') { popupheader.innerHTML = "Симферопольский район";}
		if (evt.currentTarget.id == 'alushta') { popupheader.innerHTML = "Алушта";}
		if (evt.currentTarget.id == 'bahchisarayskiy') { popupheader.innerHTML = "Бахчисарайский район";}
		if (evt.currentTarget.id == 'sevastopol') { popupheader.innerHTML = "Севастополь";}
		if (evt.currentTarget.id == 'yalta') { popupheader.innerHTML = "Ялта";}
		if (evt.currentTarget.id == 'simferopol') { popupheader.innerHTML = "Симферополь";}
	}	
}

function getSubjectName(evt) {
	for (var i=0;i<functable.length;i++) {
		var funcmarks = functable[i].getElementsByClassName(regionID);
		for (var j=0;j<funcmarks.length;j++) {
			funcmarks[j].style.display = "none";
		}
	}
	
	// zero.style.display = "none";
	// one.style.display = "none";
	// two.style.display = "none";
	// three.style.display = "none";
	// four.style.display = "none";
	// five.style.display = "none";
	// six.style.display = "none";
	// seven.style.display = "none";

	if (evt.currentTarget.id === "mathpro") {	// математика	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "block";
		five.style.display = "none";
		six.style.display = "none";
		seven.style.display = "none";
	}
	else if (evt.currentTarget.id === "biology") { // биология	2023 revised	
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "none";
		five.style.display = "none";
		six.style.display = "none";
		seven.style.display = "none";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "russian") { // русский	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "block";
		five.style.display = "block";
		six.style.display = "none";
		seven.style.display = "none";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "physics") {	// физика	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "block";
		five.style.display = "none";
		six.style.display = "none";
		seven.style.display = "none";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "chemistry") { // химия	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "block";
		five.style.display = "block";
		six.style.display = "none";
		seven.style.display = "none";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "it") { // информатика	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "none";
		four.style.display = "none";
		five.style.display = "none";
		six.style.display = "none";
		seven.style.display = "none";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "geography") { // география	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "none";
		five.style.display = "none";
		six.style.display = "none";
		seven.style.display = "none";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "english") { // английский	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "block";
		five.style.display = "block";
		six.style.display = "none";
		seven.style.display = "none";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "german") { // немецкий	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "block";
		five.style.display = "block";
		six.style.display = "block";
		seven.style.display = "block";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "french") { // французский	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "block";
		five.style.display = "block";
		six.style.display = "block";
		seven.style.display = "block";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "socstud") { // общество	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "block";
		five.style.display = "none";
		six.style.display = "none";
		seven.style.display = "none";	
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "history") { // история	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "none";
		five.style.display = "none";
		six.style.display = "none";
		seven.style.display = "none";
		eight.style.display = "none";
	}
	else if (evt.currentTarget.id === "literature") { // литература	2023 revised
		zero.style.display = "block";
		one.style.display = "block";
		two.style.display = "block";
		three.style.display = "block";
		four.style.display = "block";
		five.style.display = "none";
		six.style.display = "none";
		seven.style.display = "none";
		eight.style.display = "none";
	}
	
	// clearinfobody = infobody.getElementsByTagName('td');			//	
	// for (var i=0; i<clearinfobody.length; i++) {					// очистка предыдущей таблицы
		// clearinfobody[i].style.display = "none";					// 
	// }															//
	
	marksheader.innerHTML = evt.currentTarget.innerHTML;								// замена названия предмета в окне оценок
	markheader.innerHTML = '';
	infoheader.innerHTML = evt.currentTarget.innerHTML + ", " + popupheader.innerHTML;  // замена названия района и предмета над таблицей
//	infobody = document.getElementById(evt.currentTarget.id);							// получение нужной таблицы	по ученикам
//	infoname = evt.currentTarget.id;

	subjectID = evt.currentTarget.id;
	subjectFieldsID = "fields_" + evt.currentTarget.id;		
}

function getMark(evt, namesuffix) {
	var fields;
	if (namesuffix === undefined) {
		infobody = document.getElementById(subjectID);								// получение таблицы
		fields = infobody.getElementsByClassName(subjectFieldsID);					// получение списка полей таблицы
		// console.log (subjectFieldsID);
		// console.log (namesuffix);
		// console.log (fields);
		// console.log (infobody.id);
	} else {
		infobody = document.getElementById(subjectID + namesuffix);					// получение таблицы + суффикс
		fields = infobody.getElementsByClassName(subjectFieldsID + namesuffix);			// получение списка полей таблицы + любой суффикс
		// console.log (subjectFieldsID + namesuffix);
		// console.log (namesuffix);
		// console.log (fields);
		// console.log (infobody.id);
	}	
	
	var info = infobody.getElementsByClassName(regionID);					// вставка нужной таблицы в тело инфы	
	var maprect = map.getBoundingClientRect();
	var bodyrect = document.body.getBoundingClientRect();	

	clearinfobody = infobody.getElementsByTagName('td');			//	
	for (var i=0; i<clearinfobody.length; i++) {					// очистка предыдущей таблицы
		clearinfobody[i].style.display = "none";					// 
	}
	
	// перечисление предметов и количества разбивок по оценкам в них - ПЕРЕДЕЛАТЬ В ФУНКЦИЮ
	if (infobody.id === "mathpro") {	// математика	2023 revised
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 18) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 18 && i < 36) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 36 && i < 54) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 54 && i < 72) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'four') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 72 && i < 90) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "biology") { // биология	2023 revised	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 29) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		}
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;			
			for (var i=0; i<info.length; i++) {
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				if (i >= 29 && i < 58) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);				
				if (i >= 58 && i < 87) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);				
				if (i >= 87 && i < 116) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "russian") { // русский	2023 revised
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 38) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 38 && i < 76) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 76 && i < 114) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 114 && i < 152) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'four') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 152 && i < 190) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'five') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 190 && i < 228) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "physics") {	// физика	2023 revised
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 31) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 31 && i < 62) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 62 && i < 93) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 93 && i < 124) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'four') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 124 && i < 155) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "chemistry") { // химия	2023 revised
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 34) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 33 && i < 66) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 66 && i < 99) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 99 && i < 132) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'four') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 132 && i < 165) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'five') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 165 && i < 198) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "it") { // информатика	2023 revised
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 27) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 27 && i < 54) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 54 && i < 81) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "geography") { // география	2023 revised
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 32) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		}
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 32 && i < 64) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 64 && i < 96) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 96 && i < 128) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "english") { // английский	2023 revised
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 48) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 48 && i < 96) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 96 && i < 144) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 144 && i < 192) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'four') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 240 && i < 288) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "german") { // немецкий
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 54) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 54 && i < 108) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 108 && i < 162) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 162 && i < 216) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'four') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 216 && i < 270) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'five') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 270 && i < 324) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'six') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 324 && i < 378) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'seven') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 378 && i < 432) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "french") { // французский
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 54) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 54 && i < 108) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 108 && i < 162) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 162 && i < 216) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'four') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 216 && i < 270) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'five') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 270 && i < 324) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'six') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 324 && i < 378) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'seven') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 378 && i < 432) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
	}
	else if (infobody.id === "socstud") { // общество	2023 revised
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 28) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 28 && i < 56) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 56 && i < 84) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 84 && i < 112) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}	
		if (evt.currentTarget.id == 'four') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 112 && i < 140) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}		
	}
	else if (infobody.id === "history") { // история
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 21) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 21 && i < 42) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 42 && i < 63) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 63 && i < 84) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}		
	}
	else if (infobody.id === "literature") { // литература
	
		if (evt.currentTarget.id == 'zero') {
		markheader.innerHTML = evt.currentTarget.innerHTML;		
		for (var i=0; i<info.length; i++) {			
			var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
			if (i >= 0 && i < 27) {
				fields[i].style.display = "table-cell";						// табличный костыль	
				info[i].style.display = "table-cell";						// табличный костыль
				infotable.style.maxHeight = 0.7 * wHeight + "px";
				showInfo();				
				recommend.innerHTML = "<a href=\"http://krippo.ru/modules/mod_crimeamap/download/" + subjectID + ".pdf\" target=\"_blank\">Скачать методические рекомендации</a>";
				recommend.style.display = "block";
				}
			}
		} 
		if (evt.currentTarget.id == 'one') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			// console.log (info.length);
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);

				if (i >= 27 && i < 54) {
					fields[i].style.display = "table-cell";					// табличный костыль	
					info[i].style.display = "table-cell";					// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'two') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 54 && i < 81) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();	
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'three') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 81 && i < 108) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}
		if (evt.currentTarget.id == 'four') {
			markheader.innerHTML = evt.currentTarget.innerHTML;
			for (var i=0; i<info.length; i++) {			
				var temp_info = info[i].innerHTML.substr(0,info[i].innerHTML.length-1);
				
				if (i >= 108 && i < 135) {
					fields[i].style.display = "table-cell";						// табличный костыль	
					info[i].style.display = "table-cell";						// табличный костыль
					infotable.style.maxHeight = 0.7 * wHeight + "px";
					showInfo();				
					recommend.style.display = "none";
				}
			}
		}		
	}
}

function showMarks() {	
	marksvisible = 1;
	marks.style.display = "block";
	for (var i=0;i<functable.length;i++) {
		if (functable[i].id == subjectID) {									// если класс таблицы соответствует текущему выбранному предмету
			var funcmarks = functable[i].getElementsByClassName(regionID);	// то выбираем в этой таблице все строки с текущим регионом
			for (var j=0;j<funcmarks.length;j++) {
				funcmarks[j].style.display = "block";						// и циклически отрисовываем каждую строку
			}				
		}			
	}
}

function hideMarks() {
	if (marksvisible == 1) {
		marksvisible = 0;
		marks.style.display  = "none";
		for (var i=0;i<functable.length;i++) {
			var funcmarks = functable[i].getElementsByClassName(previousRegion);
			for (var j=0;j<funcmarks.length;j++) {
				funcmarks[j].style.display = "none";
			}			
		}
	}
}

function showInfo() {
	infovisible = 1;
	infomodal.style.display = "table";
}

function hideInfo() {
	infovisible = 0;
	infomodal.style.display  = "none";
	clearinfobody = infobody.getElementsByTagName('td');			//	
	for (var i=0; i<clearinfobody.length; i++) {					// очистка предыдущей таблицы
		clearinfobody[i].style.display = "none";					// 
	}																//
}