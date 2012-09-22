var ScrollLayout = function() {
	this.verticalClassName=function(value)
	{
		fleXenv.className.verticalPrefix=value;
	}
	this.horizontalClassName=function(value)
	{
		fleXenv.className.horizontalPrefix=value;
	}
	this.arrange = function(e) {
		
		var obj = e.childContainer;
		obj.style.overflow="auto";
		obj.style.width = e.width()+"px";
		obj.style.height= e.height()+"px";
		
		var maxHeight = obj.clientHeight;
		for(var count = 0; count < obj.childNodes.length; count++) {
			var child = obj.childNodes[count];
			var y = child.style.top?child.style.top.replace("px",""):0;
			var h = child.clientHeight;
			console.log(child);
			var max = parseInt(y)+parseInt(h);
			if(max>maxHeight)
			{
				maxHeight = max;
			}
		}
		obj.setAttribute("maxHeight",maxHeight);
		if(!obj.fleXcroll)fleXenv.fleXcrollMain(obj);
		obj.fleXcroll.updateScrollBars();
	}
};
Class.extend(ScrollLayout, Layout);

/*
 * http://www.hesido.com/web.php?page=customscrollbar
 */
var fleXenv = {
	fleXlist : [],
	className:
	{
		verticalPrefix:"vscroller",
		track:"base",
		thumb:"bar",
		horizontalPrefix:"hscroller"
	},
	fleXcrollInit : function() {
		if (document.getElementById) {
			document.write('<style type="text/css">.flexcroll-hide-default {overflow: hidden !important;}</style>')
		};
		this.addTrggr(window, 'load', this.globalInit)
	},
	fleXcrollMain : function(g) {
		var h = document, wD = window, nV = navigator;
		if (g == null || nV.userAgent.indexOf('OmniWeb') != -1 || ((nV.userAgent.indexOf('AppleWebKit') != -1 || nV.userAgent.indexOf('Safari') != -1) && !( typeof (HTMLElement) != "undefined" && HTMLElement.prototype)) || nV.vendor == 'KDE' || (nV.platform.indexOf('Mac') != -1 && nV.userAgent.indexOf('MSIE') != -1)) {
			if (g != null)
				classChange(g, 'flexcroll-failed', 'flexcroll-hide-default');
			if (window.onfleXcrollFail)
				window.onfleXcrollFail(g);
			return
		};
		if (g.fleXcroll) {
			g.fleXcroll.updateScrollBars();
			return
		};
		if (fleXenv.checkHidden(g))
			return;
		if (!g.id || g.id == '') {
			var k = "flex__", c = 1;
			while (document.getElementById(k + c) != null) {
				c++
			};
			g.id = k + c
		}
		g.fleXdata = new Object();
		g.fleXcroll = new Object();
		var l = g.id, sC = g.fleXdata, sfU = g.fleXcroll;
		sC.keyAct = {
			_37 : ['-1s', 0],
			_38 : [0, '-1s'],
			_39 : ['1s', 0],
			_40 : [0, '1s'],
			_33 : [0, '-1p'],
			_34 : [0, '1p'],
			_36 : [0, '-100p'],
			_35 : [0, '+100p']
		};
		sC.wheelAct = ["-2s", "2s"];
		sC.baseAct = ["-2s", "2s"];
		sC.scrollPosition = [[false, false], [false, false]];
		var m = createDiv('contentwrapper', true), mDv = createDiv('mcontentwrapper', true), tDv = createDiv('scrollwrapper', true), pDv = createDiv('copyholder', true);
		var o = createDiv('domfixdiv', true), fDv = createDiv('zoomdetectdiv', true), stdMode = false;
		pDv.sY.border = '1px solid blue';
		pDv.fHide();
		g.style.overflow = 'hidden';
		fDv.sY.fontSize = "12px";
		fDv.sY.height = "1em";
		fDv.sY.width = "1em";
		fDv.sY.position = "absolute";
		fDv.sY.zIndex = "-999";
		fDv.fHide();
		var p = g.offsetHeight, brdWidth = g.offsetWidth;
		copyStyles(g, pDv, '0px', ['border-left-width', 'border-right-width', 'border-top-width', 'border-bottom-width']);
		var q = g.offsetHeight, intlWidth = g.offsetWidth, brdWidthLoss = brdWidth - intlWidth, brdHeightLoss = p - q;
		var s = (g.scrollTop) ? g.scrollTop : 0, oScrollX = (g.scrollLeft) ? g.scrollLeft : 0;
		var t = document.location.href, uReg = /#([^#.]*)$/;
		var u = ['textarea', 'input', 'select'];
		sC.scroller = [];
		sC.forcedBar = [];
		sC.containerSize = sC.cntRSize = [];
		sC.contentSize = sC.cntSize = [];
		sC.edge = [false, false];
		sC.touchPrevent = false;
		sC.touchFlick = false;
		sC.reqS = [];
		sC.barSpace = [0, 0];
		sC.forcedHide = [];
		sC.forcedPos = [];
		sC.paddings = [];
		sC.externaL = [false, false];
		sC.touchPos = [0, 0];
		while (g.firstChild) {
			m.appendChild(g.firstChild)
		};
		m.appendChild(o);
		g.appendChild(mDv);
		g.appendChild(pDv);
		var w = getStyle(g, 'position');
		if (w != 'absolute' && w != 'fixed') {
			g.style.position = w = "relative"
		};
		if (w == 'fixed')
			g.style.position = "absolute";
		var x = getStyle(g, 'text-align');
		g.style.textAlign = 'left';
		mDv.sY.width = "100px";
		mDv.sY.height = "100px";
		mDv.sY.top = "0px";
		mDv.sY.left = "0px";
		copyStyles(g, pDv, "0px", ['padding-left', 'padding-top', 'padding-right', 'padding-bottom']);
		var y = g.offsetWidth, postHeight = g.offsetHeight, mHeight;
		mHeight = mDv.offsetHeight;
		mDv.sY.borderBottom = "2px solid black";
		if (mDv.offsetHeight > mHeight)
			stdMode = true;
		mDv.sY.borderBottomWidth = "0px";
		copyStyles(pDv, g, false, ['padding-left', 'padding-top', 'padding-right', 'padding-bottom']);
		findPos(mDv);
		findPos(g);
		sC.paddings[0] = mDv.yPos - g.yPos;
		sC.paddings[2] = mDv.xPos - g.xPos;
		g.style.paddingTop = getStyle(g, "padding-bottom");
		g.style.paddingLeft = getStyle(g, "padding-right");
		findPos(mDv);
		findPos(g);
		sC.paddings[1] = mDv.yPos - g.yPos;
		sC.paddings[3] = mDv.xPos - g.xPos;
		g.style.paddingTop = getStyle(pDv, "padding-top");
		g.style.paddingLeft = getStyle(pDv, "padding-left");
		var z = sC.paddings[2] + sC.paddings[3], padHeightComp = sC.paddings[0] + sC.paddings[1];
		g.style.position = w;
		mDv.style.textAlign = x;
		copyStyles(g, mDv, false, ['padding-left', 'padding-right', 'padding-top', 'padding-bottom']);
		tDv.sY.width = g.offsetWidth + 'px';
		tDv.sY.height = g.offsetHeight + 'px';
		mDv.sY.width = y + 'px';
		mDv.sY.height = postHeight + 'px';
		tDv.sY.position = 'absolute';
		tDv.sY.top = '0px';
		tDv.sY.left = '0px';
		sC.tDivZ = tDv.sY.zIndex;
		mDv.appendChild(m);
		g.appendChild(tDv);
		tDv.appendChild(fDv);
		m.sY.position = 'relative';
		mDv.sY.position = 'relative';
		m.sY.top = "0";
		m.sY.width = "100%";
		mDv.sY.overflow = 'hidden';
		mDv.sY.left = "-" + sC.paddings[2] + "px";
		mDv.sY.top = "-" + sC.paddings[0] + "px";
		sC.zTHeight = fDv.offsetHeight;
		sC.getContentWidth = function() {
			var a = m.childNodes, maxCWidth = compPad = 0;
			for (var i = 0; i < a.length; i++) {
				if (a[i].offsetWidth) {
					maxCWidth = Math.max(a[i].offsetWidth, maxCWidth)
				}
			};
			sC.cntRSize[0] = ((sC.reqS[1] && !sC.forcedHide[1]) || sC.forcedBar[1]) ? g.offsetWidth - sC.barSpace[0] : g.offsetWidth;
			sC.cntSize[0] = maxCWidth + z;
			return sC.cntSize[0]
		};
		sC.getContentHeight = function() {
			sC.cntRSize[1] = ((sC.reqS[0] && !sC.forcedHide[0]) || sC.forcedBar[0]) ? g.offsetHeight - sC.barSpace[1] : g.offsetHeight;
			sC.cntSize[1] = (g.getAttribute("maxHeight")) - 2;
			console.log(sC.cntSize[1],g.clientHeight,g.getAttribute("maxHeight"));
			return sC.cntSize[1]
		};
		sC.fixIEDispBug = function() {
			m.sY.display = 'none';
			m.sY.display = 'block'
		};
		sC.setWidth = function() {
			mDv.sY.width = (stdMode) ? (sC.cntRSize[0] - z - brdWidthLoss) + 'px' : sC.cntRSize[0] + 'px'
		};
		sC.setHeight = function() {
			mDv.sY.height = (stdMode) ? (sC.cntRSize[1] - padHeightComp - brdHeightLoss) + 'px' : sC.cntRSize[1] + 'px'
		};
		sC.createScrollBars = function() {
			sC.getContentWidth();
			sC.getContentHeight();
			tDv.vrt = new Array();
			var a = tDv.vrt;
			createScrollBars(a, fleXenv.className.verticalPrefix, 1);
			a.barPadding = [parseInt(getStyle(a.sBr, 'padding-top')), parseInt(getStyle(a.sBr, 'padding-bottom'))];
			a.sBr.sY.padding = '0px';
			a.sBr.curPos = 0;
			a.sBr.vertical = true;
			a.sBr.indx = 1;
			m.vBar = a.sBr;
			prepareScroll(a, 0);
			sC.barSpace[0] = (sC.externaL[1]) ? 0 : a.sDv.offsetWidth;
			sC.setWidth();
			tDv.hrz = new Array();
			var b = tDv.hrz;
			createScrollBars(b, fleXenv.className.horizontalPrefix, 0);
			b.barPadding = [parseInt(getStyle(b.sBr, 'padding-left')), parseInt(getStyle(b.sBr, 'padding-right'))];
			b.sBr.sY.padding = '0px';
			b.sBr.curPos = 0;
			b.sBr.vertical = false;
			b.sBr.indx = 0;
			m.hBar = b.sBr;
			if (wD.opera)
				b.sBr.sY.position = 'relative';
			prepareScroll(b, 0);
			sC.barSpace[1] = (sC.externaL[0]) ? 0 : b.sDv.offsetHeight;
			sC.setHeight();
			tDv.sY.height = g.offsetHeight + 'px';
			b.jBox = createDiv('scrollerjogbox');
			tDv.appendChild(b.jBox);
			b.jBox.onmousedown = function() {
				b.sBr.scrollBoth = true;
				sC.goScroll = b.sBr;
				b.sBr.clicked = true;
				b.sBr.moved = false;
				tDv.vrt.sBr.moved = false;
				fleXenv.addTrggr(h, 'selectstart', retFalse);
				fleXenv.addTrggr(h, 'mousemove', mMoveBar);
				fleXenv.addTrggr(h, 'mouseup', mMouseUp);
				return false
			}
		};
		sC.goScroll = null;
		sC.createScrollBars();
		this.putAway(o, tDv);
		if (!this.addChckTrggr(g, 'mousewheel', mWheelProc) || !this.addChckTrggr(g, 'DOMMouseScroll', mWheelProc)) {
			g.onmousewheel = mWheelProc
		};
		this.addChckTrggr(g, 'mousewheel', mWheelProc);
		this.addChckTrggr(g, 'DOMMouseScroll', mWheelProc);
		this.addChckTrggr(m, 'touchstart', handleTouch);
		this.addChckTrggr(tDv, 'touchstart', handleTouch);
		g.setAttribute('tabIndex', '0');
		this.addTrggr(g, 'keydown', function(e) {
			if (g.focusProtect)
				return;
			if (!e) {
				var e = wD.event
			};
			var a = e.keyCode;
			sC.pkeY = a;
			sfU.mDPosFix();
			if (sC.keyAct['_' + a] && !window.opera) {
				sfU.setScrollPos(sC.keyAct['_'+a][0], sC.keyAct['_'+a][1], true);
				if (e.preventDefault)
					e.preventDefault();
				return false
			}
		});
		this.addTrggr(g, 'keypress', function(e) {
			if (g.focusProtect)
				return;
			if (!e) {
				var e = wD.event
			};
			var a = e.keyCode;
			if (sC.keyAct['_' + a]) {
				sfU.setScrollPos(sC.keyAct['_'+a][0], sC.keyAct['_'+a][1], true);
				if (e.preventDefault)
					e.preventDefault();
				return false
			}
		});
		this.addTrggr(g, 'keyup', function() {
			sC.pkeY = false
		});
		this.addTrggr(h, 'mouseup', intClear);
		this.addTrggr(g, 'mousedown', handleTextSelect);
		function handleTextSelect(e) {
			if (!e)
				e = wD.event;
			var a = (e.target) ? e.target : (e.srcElement) ? e.srcElement : false;
			if (!a || (a.className && a.className.match(RegExp("\\bscrollgeneric\\b"))))
				return;
			sC.inMposX = e.clientX;
			sC.inMposY = e.clientY;
			pageScrolled();
			findPos(g);
			intClear();
			fleXenv.addTrggr(h, 'mousemove', tSelectMouse);
			sC.mTBox = [g.xPos + 10, g.xPos + sC.cntRSize[0] - 10, g.yPos + 10, g.yPos + sC.cntRSize[1] - 10]
		};
		function tSelectMouse(e) {
			if (!e)
				e = wD.event;
			var a = e.clientX, mY = e.clientY, mdX = a + sC.xScrld, mdY = mY + sC.yScrld;
			sC.mOnXEdge = (mdX < sC.mTBox[0] || mdX > sC.mTBox[1]) ? 1 : 0;
			sC.mOnYEdge = (mdY < sC.mTBox[2] || mdY > sC.mTBox[3]) ? 1 : 0;
			sC.xAw = a - sC.inMposX;
			sC.yAw = mY - sC.inMposY;
			sC.sXdir = (sC.xAw > 40) ? 1 : (sC.xAw < -40) ? -1 : 0;
			sC.sYdir = (sC.yAw > 40) ? 1 : (sC.yAw < -40) ? -1 : 0;
			if ((sC.sXdir != 0 || sC.sYdir != 0) && !sC.tSelectFunc)
				sC.tSelectFunc = wD.setInterval(function() {
					if (sC.sXdir == 0 && sC.sYdir == 0) {
						wD.clearInterval(sC.tSelectFunc);
						sC.tSelectFunc = false;
						return
					};
					pageScrolled();
					if (sC.mOnXEdge == 1 || sC.mOnYEdge == 1)
						sfU.setScrollPos((sC.sXdir * sC.mOnXEdge) + "s", (sC.sYdir * sC.mOnYEdge) + "s", true)
				}, 45)
		};
		function intClear() {
			fleXenv.remTrggr(h, 'mousemove', tSelectMouse);
			if (sC.tSelectFunc)
				wD.clearInterval(sC.tSelectFunc);
			sC.tSelectFunc = false;
			if (sC.barClickRetard)
				wD.clearTimeout(sC.barClickRetard);
			if (sC.barClickScroll)
				wD.clearInterval(sC.barClickScroll)
		};
		function flickClear(a) {
			if (sC.touchFlick) {
				window.clearInterval(sC.touchFlick);
				sC.touchFlick = false
			}
			if (!a)
				tDv.sY.zIndex = sC.tDivZ
		};
		function pageScrolled() {
			sC.xScrld = (wD.pageXOffset) ? wD.pageXOffset : (h.documentElement && h.documentElement.scrollLeft) ? h.documentElement.scrollLeft : 0;
			sC.yScrld = (wD.pageYOffset) ? wD.pageYOffset : (h.documentElement && h.documentElement.scrollTop) ? h.documentElement.scrollTop : 0
		};
		sfU.formUpdate = function() {
			for (var j = 0, inputName; inputName = u[j]; j++) {
				var a = g.getElementsByTagName(inputName);
				for (var i = 0, formItem; formItem = a[i]; i++) {
					if (!formItem.fleXprocess) {
						fleXenv.addTrggr(formItem, 'focus', function() {
							g.focusProtect = true
						});
						fleXenv.addTrggr(formItem, 'blur', onblur = function() {
							g.focusProtect = false
						});
						formItem.fleXprocess = true
					}
				}
			}
		};
		g.scrollUpdate = sfU.updateScrollBars = function(a) {
			if (tDv.getSize[1]() === 0 || tDv.getSize[0]() === 0)
				return;
			m.sY.padding = '1px';
			var b = sC.reqS[0], reqV = sC.reqS[1], vBr = tDv.vrt, hBr = tDv.hrz, vUpReq, hUpReq, cPSize = [];
			tDv.sY.width = g.offsetWidth - brdWidthLoss + 'px';
			tDv.sY.height = g.offsetHeight - brdHeightLoss + 'px';
			cPSize[0] = sC.cntRSize[0];
			cPSize[1] = sC.cntRSize[1];
			sC.reqS[0] = sC.getContentWidth() > sC.cntRSize[0];
			sC.reqS[1] = sC.getContentHeight() > sC.cntRSize[1];
			var c = (b != sC.reqS[0] || reqV != sC.reqS[1] || cPSize[0] != sC.cntRSize[0] || cPSize[1] != sC.cntRSize[1]) ? true : false;
			vBr.sDv.setVisibility(sC.reqS[1]);
			hBr.sDv.setVisibility(sC.reqS[0]);
			vUpReq = (sC.reqS[1] || sC.forcedBar[1]);
			hUpReq = (sC.reqS[0] || sC.forcedBar[0]);
			sC.getContentWidth();
			sC.getContentHeight();
			sC.setHeight();
			sC.setWidth();
			if (!sC.reqS[0] || !sC.reqS[1] || sC.forcedHide[0] || sC.forcedHide[1])
				hBr.jBox.fHide();
			else
				hBr.jBox.fShow();
			if (vUpReq)
				updateScroll(vBr, (hUpReq && !sC.forcedHide[0]) ? sC.barSpace[1] : 0);
			else
				m.sY.top = "0";
			if (hUpReq)
				updateScroll(hBr, (vUpReq && !sC.forcedHide[1]) ? sC.barSpace[0] : 0);
			else
				m.sY.left = "0";
			if (c && !a)
				sfU.updateScrollBars(true);
			m.sY.padding = '0px';
			sC.edge[0] = sC.edge[1] = false
		};
		g.contentScroll = sfU.setScrollPos = function(a, b, c, d) {
			var e;
			if ((a || a === 0) && sC.scroller[0]) {
				a = calcCScrollVal(a, 0);
				e = tDv.hrz.sBr;
				e.trgtScrll = (c) ? Math.min(Math.max(e.mxScroll, e.trgtScrll - a), 0) : -a;
				e.realScrollPos()
			}
			if ((b || b === 0) && sC.scroller[1]) {
				b = calcCScrollVal(b, 1);
				e = tDv.vrt.sBr;
				e.trgtScrll = (c) ? Math.min(Math.max(e.mxScroll, e.trgtScrll - b), 0) : -b;
				e.realScrollPos()
			}
			if (!c)
				sC.edge[0] = sC.edge[1] = false;
			if (g.onfleXcroll && !d)
				g.onfleXcroll();
			return sC.scrollPosition
		};
		sfU.scrollContent = function(a, b) {
			return sfU.setScrollPos(a, b, true)
		};
		sfU.scrollToElement = function(a) {
			if (a == null || !isddvChild(a))
				return;
			var b = findRCpos(a);
			sfU.setScrollPos(b[0] + sC.paddings[2], b[1] + sC.paddings[0], false);
			sfU.setScrollPos(0, 0, true)
		};
		copyStyles(pDv, g, '0px', ['border-left-width', 'border-right-width', 'border-top-width', 'border-bottom-width']);
		this.putAway(pDv, tDv);
		g.scrollTop = 0;
		g.scrollLeft = 0;
		sfU.formUpdate();
		this.fleXlist[this.fleXlist.length] = g;
		classChange(g, 'flexcrollactive', false);
		sfU.updateScrollBars();
		sfU.setScrollPos(oScrollX, s, true);
		if (t.match(uReg)) {
			sfU.scrollToElement(h.getElementById(t.match(uReg)[1]))
		};
		sC.sizeChangeDetect = wD.setInterval(function() {
			var n = fDv.offsetHeight;
			if (n != sC.zTHeight) {
				sfU.updateScrollBars();
				sC.zTHeight = n
			}
		}, 2500);
		function calcCScrollVal(v, i) {
			var a = v.toString();
			v = parseFloat(a);
			return parseInt((a.match(/p$/)) ? v * sC.cntRSize[i] * 0.9 : (a.match(/s$/)) ? v * sC.cntRSize[i] * 0.1 : v)
		};
		function getStyle(a, b) {
			return fleXenv.getStyle(a, b)
		};
		function copyStyles(a, b, c, d) {
			var e = new Array();
			for (var i = 0; i < d.length; i++) {
				e[i] = fleXenv.camelConv(d[i]);
				b.style[e[i]] = getStyle(a, d[i], e[i]);
				if (c)
					a.style[e[i]] = c
			}
		};
		function createDiv(b, c, d, e) {
			var f = (d) ? d : h.createElement('div');
			if (!d) {
				f.id = l + '_' + b;
				f.className = (c) ? b : b + ' scrollgeneric'
			};
			f.getSize = [
			function() {
				return f.offsetWidth
			},
			function() {
				return f.offsetHeight
			}];
			f.setSize = (e) ? [retFalse, retFalse] : [
			function(a) {
				f.sY.width = a
			},
			function(a) {
				f.sY.height = a
			}];
			f.getPos = [
			function() {
				return getStyle(f, "left")
			},
			function() {
				return getStyle(f, "top")
			}];
			f.setPos = (e) ? [retFalse, retFalse] : [
			function(a) {
				f.sY.left = a
			},
			function(a) {
				f.sY.top = a
			}];
			f.fHide = function() {
				f.sY.visibility = "hidden"
			};
			f.fShow = function(a) {
				f.sY.visibility = (a) ? getStyle(a, 'visibility') : "visible"
			};
			f.sY = f.style;
			return f
		};
		function createScrollBars(a, b, c) {
			var d = document.getElementById(l + '-flexcroll-' + b);
			var e = (d != null) ? true : false;
			if (e) {
				a.sDv = createDiv(false, false, d, true);
				sC.externaL[c] = true;
				a.sFDv = createDiv(b + 'basebeg');
				a.sSDv = createDiv(b + 'baseend');
				a.sBr = createDiv(false, false, fleXenv.getByClassName(d,'div','flexcroll-scrollbar')[0]);
				a.sFBr = createDiv(b + 'barbeg');
				a.sSBr = createDiv(b + 'barend')
			} else {
				a.sDv = createDiv(b + fleXenv.className.track);
				a.sFDv = createDiv(b + 'basebeg');
				a.sSDv = createDiv(b + 'baseend');
				a.sBr = createDiv(b + fleXenv.className.thumb);
				a.sFBr = createDiv(b + 'barbeg');
				a.sSBr = createDiv(b + 'barend');
				tDv.appendChild(a.sDv);
				a.sDv.appendChild(a.sBr);
				a.sDv.appendChild(a.sFDv);
				a.sDv.appendChild(a.sSDv);
				a.sBr.appendChild(a.sFBr);
				a.sBr.appendChild(a.sSBr)
			}
		};
		function prepareScroll(b, c) {
			var d = b.sDv, sBr = b.sBr, i = sBr.indx;
			sBr.trgtScrll = 0;
			sBr.minPos = b.barPadding[0];
			sBr.ofstParent = d;
			sBr.mDv = mDv;
			sBr.scrlTrgt = m;
			sBr.targetSkew = 0;
			updateScroll(b, c, true);
			sBr.doBarPos = function(a) {
				if (!a)
					sBr.curPos = parseInt((sBr.trgtScrll * sBr.maxPos) / sBr.mxScroll);
				sBr.curPos = (Math.min(Math.max(sBr.curPos, 0), sBr.maxPos));
				sBr.setPos[i](sBr.curPos + sBr.minPos + "px");
				if (!sBr.targetSkew)
					sBr.targetSkew = sBr.trgtScrll - parseInt((sBr.curPos / sBr.sRange) * sBr.mxScroll);
				sBr.targetSkew = (sBr.curPos == 0) ? 0 : (sBr.curPos == sBr.maxPos) ? 0 : (!sBr.targetSkew) ? 0 : sBr.targetSkew;
				if (a) {
					sBr.trgtScrll = parseInt((sBr.curPos / sBr.sRange) * sBr.mxScroll);
					m.setPos[i](sBr.trgtScrll + sBr.targetSkew + "px");
					sC.scrollPosition[i] = [-sBr.trgtScrll - sBr.targetSkew, -sBr.mxScroll]
				}
			};
			sBr.realScrollPos = function() {
				sBr.curPos = parseInt((sBr.trgtScrll * sBr.sRange) / sBr.mxScroll);
				sBr.curPos = (Math.min(Math.max(sBr.curPos, 0), sBr.maxPos));
				m.setPos[i](sBr.trgtScrll + "px");
				sC.scrollPosition[i] = [-sBr.trgtScrll, -sBr.mxScroll];
				sBr.targetSkew = false;
				sBr.doBarPos(false)
			};
			sC.barZ = getStyle(sBr, 'z-index');
			sBr.sY.zIndex = (sC.barZ == "auto" || sC.barZ == "0" || sC.barZ == 'normal') ? 2 : sC.barZ;
			mDv.sY.zIndex = getStyle(sBr, 'z-index');
			sBr.onmousedown = function() {
				sBr.clicked = true;
				sC.goScroll = sBr;
				sBr.scrollBoth = false;
				sBr.moved = false;
				fleXenv.addTrggr(h, 'selectstart', retFalse);
				fleXenv.addTrggr(h, 'mousemove', mMoveBar);
				fleXenv.addTrggr(h, 'mouseup', mMouseUp);
				return false
			};
			sBr.onmouseover = intClear;
			d.onmousedown = d.ondblclick = function(e) {
				if (!e) {
					var e = wD.event
				};
				if (e.target && (e.target == b.sFBr || e.target == b.sSBr || e.target == b.sBr))
					return;
				if (e.srcElement && (e.srcElement == b.sFBr || e.srcElement == b.sSBr || e.srcElement == b.sBr))
					return;
				var a, mV = [];
				pageScrolled();
				sfU.mDPosFix();
				findPos(sBr);
				a = (sBr.vertical) ? e.clientY + sC.yScrld - sBr.yPos : e.clientX + sC.xScrld - sBr.xPos;
				mV[sBr.indx] = (a < 0) ? sC.baseAct[0] : sC.baseAct[1];
				mV[1 - sBr.indx] = 0;
				sfU.setScrollPos(mV[0], mV[1], true);
				if (e.type != "dblclick") {
					intClear();
					sC.barClickRetard = wD.setTimeout(function() {
						sC.barClickScroll = wD.setInterval(function() {
							sfU.setScrollPos(mV[0], mV[1], true)
						}, 80)
					}, 425)
				};
				return false
			};
			d.setVisibility = function(r) {
				if (r) {
					d.fShow(g);
					sC.forcedHide[i] = (getStyle(d, "visibility") == "hidden" || sC.externaL[i]) ? true : false;
					if (!sC.forcedHide[i])
						sBr.fShow(g);
					else if (!sC.externaL[i])
						sBr.fHide();
					sC.scroller[i] = true;
					classChange(d, "", "flexinactive")
				} else {
					d.fHide();
					sBr.fHide();
					sC.forcedBar[i] = (getStyle(d, "visibility") != "hidden") ? true : false;
					sC.scroller[i] = false;
					sBr.curPos = 0;
					m.setPos[i]('0px');
					sC.scrollPosition[i] = [false, false];
					classChange(d, "flexinactive", "")
				};
				mDv.setPos[1-i]((sC.forcedPos[i] && (r || sC.forcedBar[i]) && !sC.forcedHide[i]) ? sC.barSpace[1 - i] - sC.paddings[i * 2] + "px" : "-" + sC.paddings[i * 2] + "px")
			};
			d.onmouseclick = retFalse
		};
		function updateScroll(a, b, c) {
			var d = a.sDv, sBr = a.sBr, sFDv = a.sFDv, sFBr = a.sFBr, sSDv = a.sSDv, sSBr = a.sSBr, i = sBr.indx;
			d.setSize[i](tDv.getSize[i]() - b + 'px');
			d.setPos[1-i](tDv.getSize[1-i]() - d.getSize[1-i]() + 'px');
			sC.forcedPos[i] = (parseInt(d.getPos[1-i]()) === 0) ? true : false;
			a.padLoss = a.barPadding[0] + a.barPadding[1];
			a.baseProp = parseInt((d.getSize[i]() - a.padLoss) * 0.75);
			sBr.aSize = Math.min(Math.max(Math.min(parseInt(sC.cntRSize[i] / sC.cntSize[i] * d.getSize[i]()), a.baseProp), 45), a.baseProp);
			sBr.setSize[i](sBr.aSize + 'px');
			sBr.maxPos = d.getSize[i]() - sBr.getSize[i]() - a.padLoss;
			sBr.curPos = Math.min(Math.max(0, sBr.curPos), sBr.maxPos);
			sBr.setPos[i](sBr.curPos + sBr.minPos + 'px');
			sBr.mxScroll = mDv.getSize[i]() - sC.cntSize[i];
			sBr.sRange = sBr.maxPos;
			sFDv.setSize[i](d.getSize[i]() - sSDv.getSize[i]() + 'px');
			sFBr.setSize[i](sBr.getSize[i]() - sSBr.getSize[i]() + 'px');
			sSBr.setPos[i](sBr.getSize[i]() - sSBr.getSize[i]() + 'px');
			sSDv.setPos[i](d.getSize[i]() - sSDv.getSize[i]() + 'px');
			if (!c)
				sBr.realScrollPos();
			sC.fixIEDispBug()
		};
		sfU.mDPosFix = function() {
			mDv.scrollTop = 0;
			mDv.scrollLeft = 0;
			g.scrollTop = 0;
			g.scrollLeft = 0
		};
		this.addTrggr(wD, 'load', function() {
			if (g.fleXcroll)
				sfU.updateScrollBars()
		});
		this.addTrggr(wD, 'resize', function() {
			if (g.refreshTimeout)
				wD.clearTimeout(g.refreshTimeout);
			g.refreshTimeout = wD.setTimeout(function() {
				if (g.fleXcroll)
					sfU.updateScrollBars()
			}, 80)
		});
		function retFalse() {
			return false
		};
		function mMoveBar(e) {
			if (!e) {
				var e = wD.event
			};
			var a = sC.goScroll, movBr, maxx, xScroll, yScroll;
			if (a == null)
				return;
			if (!fleXenv.w3events && !e.button)
				mMouseUp();
			maxx = (a.scrollBoth) ? 2 : 1;
			for (var i = 0; i < maxx; i++) {
				movBr = (i == 1) ? a.scrlTrgt.vBar : a;
				if (a.clicked) {
					if (!movBr.moved) {
						sfU.mDPosFix();
						findPos(movBr);
						findPos(movBr.ofstParent);
						movBr.pointerOffsetY = e.clientY - movBr.yPos;
						movBr.pointerOffsetX = e.clientX - movBr.xPos;
						movBr.inCurPos = movBr.curPos;
						movBr.moved = true
					};
					movBr.curPos = (movBr.vertical) ? e.clientY - movBr.pointerOffsetY - movBr.ofstParent.yPos - movBr.minPos : e.clientX - movBr.pointerOffsetX - movBr.ofstParent.xPos - movBr.minPos;
					if (a.scrollBoth)
						movBr.curPos = movBr.curPos + (movBr.curPos - movBr.inCurPos);
					movBr.doBarPos(true);
					if (g.onfleXcroll)
						g.onfleXcroll()
				} else
					movBr.moved = false
			}
		};
		function mMouseUp() {
			if (sC.goScroll != null) {
				sC.goScroll.clicked = false;
				sC.goScroll.trgtScrll += sC.goScroll.targetSkew
			}
			sC.goScroll = null;
			fleXenv.remTrggr(h, 'selectstart', retFalse);
			fleXenv.remTrggr(h, 'mousemove', mMoveBar);
			fleXenv.remTrggr(h, 'mouseup', mMouseUp)
		};
		function handleTouch(e) {
			if (!e)
				e = wD.event;
			if (this == tDv)
				tDv.sY.zIndex = sC.tDivZ;
			if (e.targetTouches.length != 1 || (!sC.scroller[0] && !sC.scroller[1]))
				return false;
			var a = '', touchLink = (e.target && (e.target.href || (e.target.nodeType == 3 && e.target.parentNode.href))) ? true : false;
			sC.touchPos = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
			flickClear();
			fleXenv.addChckTrggr(g, 'touchmove', handleTouchMove);
			fleXenv.addChckTrggr(g, 'touchend', handleTouchEnd);
			sC.touchBar = (e.target && e.target.id && e.target.id.match(/_[vh]scrollerba[rs]e?/)) ? true : false;
			return false
		};
		function handleTouchMove(e) {
			if (!e)
				e = wD.event;
			if (e.targetTouches.length != 1)
				return false;
			fleXenv.remTrggr(g, 'mousedown', handleTextSelect);
			var a = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
			sC.touchPrevent = true;
			sC.moveDelta = [sC.touchPos[0] - a[0], sC.touchPos[1] - a[1]];
			if (sC.touchBar) {
				sC.moveDelta[0] *= -(sC.cntSize[0] / sC.cntRSize[0]);
				sC.moveDelta[1] *= -(sC.cntSize[1] / sC.cntRSize[1])
			};
			sfU.scrollContent(sC.moveDelta[0], sC.moveDelta[1]);
			sC.touchPos[0] = a[0];
			sC.touchPos[1] = a[1];
			for (var i = 0; i < 2; i++) {
				if (sC.moveDelta[i] !== 0 && sC.scroller[i] && (sC.moveDelta[1 - i] == 0 || !sC.scroller[1 - i])) {
					if ((sC.moveDelta[i] > 0 && sC.scrollPosition[i][1] == sC.scrollPosition[i][0]) || (sC.moveDelta[i] < 0 && sC.scrollPosition[i][0] == 0))
						sC.touchPrevent = false
				};
				if (!sC.scroller[i] && sC.moveDelta[1 - i] !== 0 && Math.abs(sC.moveDelta[i] / sC.moveDelta[1 - i]) > 1.1)
					sC.touchPrevent = false
			};
			if (sC.touchPrevent) {
				e.preventDefault();
				tDv.sY.zIndex = '9999'
			} else {
				tDv.sY.zIndex = sC.tDivZ
			}
		};
		function handleTouchEnd(e) {
			if (!e)
				e = wD.event;
			e.preventDefault();
			if (e.targetTouches.length > 0)
				return false;
			fleXenv.remTrggr(g, 'touchmove', handleTouchMove);
			fleXenv.remTrggr(g, 'touchend', handleTouchEnd);
			if ((sC.scroller[0] && Math.abs(sC.moveDelta[0]) > 6) || (sC.scroller[1] && Math.abs(sC.moveDelta[1]) > 6)) {
				var a = 0;
				flickClear(true);
				sC.touchFlick = window.setInterval(function() {
					sfU.scrollContent(easeInOut(sC.moveDelta[0], 0, 10, a, 0.3), easeInOut(sC.moveDelta[1], 0, 10, a, 0.3));
					a++;
					if (a > 10)
						flickClear()
				}, 100)
			}
		};
		function mWheelProc(e) {
			if (!e)
				e = wD.event;
			if (!this.fleXcroll)
				return;
			var a = this, vEdge, hEdge, hoverH = false, delta = 0, iNDx;
			sfU.mDPosFix();
			hElem = (e.target) ? e.target : (e.srcElement) ? e.srcElement : this;
			if (hElem.id && hElem.id.match(/_hscroller/))
				hoverH = true;
			if (e.wheelDelta)
				delta = -e.wheelDelta;
			if (e.detail)
				delta = e.detail;
			delta = (delta < 0) ? -1 : +1;
			iNDx = (delta < 0) ? 0 : 1;
			sC.edge[1 - iNDx] = false;
			if ((sC.edge[iNDx] && !hoverH) || (!sC.scroller[0] && !sC.scroller[1]))
				return;
			if (sC.scroller[1] && !hoverH)
				scrollState = sfU.setScrollPos(false, sC.wheelAct[iNDx], true);
			vEdge = !sC.scroller[1] || hoverH || (sC.scroller[1] && ((scrollState[1][0] == scrollState[1][1] && delta > 0) || (scrollState[1][0] == 0 && delta < 0)));
			if (sC.scroller[0] && (!sC.scroller[1] || hoverH))
				scrollState = sfU.setScrollPos(sC.wheelAct[iNDx], false, true);
			hEdge = !sC.scroller[0] || (sC.scroller[0] && sC.scroller[1] && vEdge && !hoverH) || (sC.scroller[0] && ((scrollState[0][0] == scrollState[0][1] && delta > 0) || (scrollState[0][0] == 0 && delta < 0)));
			if (vEdge && hEdge && !hoverH)
				sC.edge[iNDx] = true;
			else
				sC.edge[iNDx] = false;
			if (e.preventDefault)
				e.preventDefault();
			return false
		};
		function isddvChild(a) {
			while (a.parentNode) {
				a = a.parentNode;
				if (a == g)
					return true
			}
			return false
		};
		function findPos(a) {
			var b = a, curleft = curtop = 0;
			if (b.offsetParent) {
				while (b) {
					curleft += b.offsetLeft;
					curtop += b.offsetTop;
					b = b.offsetParent
				}
			} else if (b.x) {
				curleft += b.x;
				curtop += b.y
			}
			;
			a.xPos = curleft;
			a.yPos = curtop
		};
		function findRCpos(a) {
			var b = a;
			curleft = curtop = 0;
			while (!b.offsetHeight && b.parentNode && b != m && getStyle(b, 'display') == "inline") {
				b = b.parentNode
			};
			if (b.offsetParent) {
				while (b != m) {
					curleft += b.offsetLeft;
					curtop += b.offsetTop;
					b = b.offsetParent
				}
			};
			return [curleft, curtop]
		};
		function classChange(a, b, c) {
			fleXenv.classChange(a, b, c)
		};
		function easeInOut(a, b, c, d, e) {
			c = Math.max(c, 1);
			var f = b - a, stepp = a + (Math.pow(((1 / c) * d), e) * f);
			return (stepp > 0) ? Math.floor(stepp) : Math.ceil(stepp)
		}

	},
	globalInit : function() {
		if (fleXenv.catchFastInit)
			window.clearInterval(fleXenv.catchFastInit);
		fleXenv.prepAnchors();
		fleXenv.initByClass();
		if (window.onfleXcrollRun)
			window.onfleXcrollRun()
	},
	classChange : function(a, b, c) {
		if (!a.className)
			a.className = '';
		var d = a.className;
		if (b && !d.match(RegExp("(^|\\s)" + b + "($|\\s)")))
			d = d.replace(/(\S$)/, '$1 ') + b;
		if (c)
			d = d.replace(RegExp("((^|\\s)+" + c + ")+($|\\s)", "g"), '$2').replace(/\s$/, '');
		a.className = d
	},
	prepAnchors : function() {
		var d = /#([^#.]*)$/, urlExt = /(.*)#.*$/, regExer = /(^|\s)flexcroll-in-page-link($|\s)/, matcH, claSS, i, anchoR, anchorList = document.getElementsByTagName("a"), urlBase = document.location.href;
		if (urlBase.match(urlExt))
			urlBase = urlBase.match(urlExt)[1];
		for ( i = 0; anchoR = anchorList[i]; i++) {
			claSS = (anchoR.className) ? anchoR.className : '';
			if (anchoR.href && !anchoR.fleXanchor && anchoR.href.match(d) && ((anchoR.href.match(urlExt) && urlBase === anchoR.href.match(urlExt)[1]) || claSS.match(regExer))) {
				anchoR.fleXanchor = true;
				fleXenv.addTrggr(anchoR, 'click', function(e) {
					if (!e)
						e = window.event;
					var a = (e.srcElement) ? e.srcElement : this;
					while (!a.fleXanchor && a.parentNode) {
						a = a.parentNode
					};
					if (!a.fleXanchor)
						return;
					var b = document.getElementById(a.href.match(d)[1]), eScroll = false;
					if (b == null)
						b = ( b = document.getElementsByName(a.href.match(d)[1])[0]) ? b : null;
					if (b != null) {
						var c = b;
						while (c.parentNode) {
							c = c.parentNode;
							if (c.fleXcroll) {
								c.fleXcroll.scrollToElement(b);
								eScroll = c
							}
						};
						if (eScroll) {
							if (e.preventDefault)
								e.preventDefault();
							document.location.href = urlBase + "#" + a.href.match(d)[1];
							eScroll.fleXcroll.mDPosFix();
							return false
						}
					}
				})
			}
		}
	},
	initByClass : function(a) {
		fleXenv.initialized = true;
		var b = fleXenv.getByClassName(document.getElementsByTagName("body")[0], "div", (a) ? a : 'flexcroll');
		for (var i = 0, tgDiv; tgDiv = b[i]; i++)
			if (!tgDiv.fleXcroll)
				fleXenv.fleXcrollMain(tgDiv)
	},
	scrollTo : function(a, b) {
		if ( typeof (a) == 'string')
			a = document.getElementById(a);
		if (a == null)
			return false;
		var c = a;
		while (c.parentNode) {
			c = c.parentNode;
			if (c.fleXcroll) {
				if (b) {
					document.location.href = "#" + b
				};
				c.fleXcroll.scrollToElement(a);
				c.fleXcroll.mDPosFix();
				return true
			}
		};
		return false
	},
	updateScrollBars : function(a, b) {
		for (var i = 0, fleXdiv; fleXdiv = fleXenv.fleXlist[i]; i++) {
			fleXdiv.fleXcroll.updateScrollBars();
			if (b)
				fleXdiv.fleXcroll.formUpdate()
		};
		if (a)
			fleXenv.prepAnchors()
	},
	camelConv : function(a) {
		var a = a.split('-'), reT = a[0], i;
		for ( i = 1; parT = a[i]; i++) {
			reT += parT.charAt(0).toUpperCase() + parT.substr(1)
		};
		return reT
	},
	getByClassName : function(a, b, c) {
		if ( typeof (a) == 'string')
			a = document.getElementById(a);
		if (a == null)
			return false;
		var d = new RegExp("(^|\\s)" + c + "($|\\s)"), clsnm, retArray = [], key = 0;
		var e = a.getElementsByTagName(b);
		for (var i = 0, pusher; pusher = e[i]; i++) {
			if (pusher.className && pusher.className.match(d)) {
				retArray[key] = pusher;
				key++
			}
		}
		return retArray
	},
	checkHidden : function(a) {
		if (a == null)
			return true;
		var b;
		while (a.parentNode) {
			b = fleXenv.getStyle(a, 'display');
			if (b == 'none')
				return true;
			a = a.parentNode
		};
		return false
	},
	getStyle : function(a, b) {
		if (window.getComputedStyle)
			return window.getComputedStyle(a, null).getPropertyValue(b);
		if (a.currentStyle)
			return a.currentStyle[fleXenv.camelConv(b)];
		return false
	},
	catchFastInit : window.setInterval(function() {
		var a = document.getElementById('flexcroll-init');
		if (a != null) {
			fleXenv.initByClass();
			window.clearInterval(fleXenv.catchFastInit)
		}
	}, 100),
	putAway : function(a, b) {
		a.parentNode.removeChild(a);
		a.style.display = "none";
		b.appendChild(a)
	},
	addTrggr : function(a, b, c) {
		if (!fleXenv.addChckTrggr(a, b, c) && a.attachEvent) {
			a.attachEvent('on' + b, c)
		}
	},
	addChckTrggr : function(a, b, c) {
		if (a.addEventListener) {
			a.addEventListener(b, c, false);
			fleXenv.w3events = true;
			window.addEventListener("unload", function() {
				fleXenv.remTrggr(a, b, c)
			}, false);
			return true
		} else
			return false
	},
	remTrggr : function(a, b, c) {
		if (!fleXenv.remChckTrggr(a, b, c) && a.detachEvent)
			a.detachEvent('on' + b, c)
	},
	remChckTrggr : function(a, b, c) {
		if (a.removeEventListener) {
			a.removeEventListener(b, c, false);
			return true
		} else
			return false
	}
};
function CSBfleXcroll(a) {
	fleXenv.fleXcrollMain(a)
};
fleXenv.fleXcrollInit();

