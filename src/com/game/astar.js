/* Copyright (c) 2013 the authors listed at the following URL, and/or
the authors of referenced articles or incorporated external code:
http://en.literateprograms.org/A*_search_(JavaScript)?action=history&offset=20071208162054

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Retrieved from: http://en.literateprograms.org/A*_search_(JavaScript)?oldid=11799
*/

var sizex=16;
var sizey=16;

var start=null;
var target=null;

var grid=[];
var opened=[];

var expl_text=null;

var paint_open=false;

var start_moving=false;
var target_moving=false;

var nothing_color="#ffffff";
var blocked_color="#000000";
var start_color="#00ff00";
var target_color="#0000ff";
var route_color="#00ffff";

var warn="";

function pos(x, y) {
	this.x=x; this.y=y;
	this.cost=0;
	this.totalcost=0;
	this.blocked=false;
	this.closed=false;
	this.prev=null;

	this.str=function() {
		return this.x+","+this.y;
	}
	this.equal=function(p) {return this.x==p.x && this.y==p.y;}
}


function mkgrid()
{
	var table=document.getElementById("grid");
	table.onmouseout=astar_mouseout;

	var tbody=document.createElement("tbody");
	table.appendChild(tbody);

	var tr=document.createElement("tr");
	tr.appendChild(document.createElement("th"));
	tbody.appendChild(tr);

	var x, y;
	for(x=0; x<sizex; ++x) {
		var th=document.createElement("th");
		th.appendChild(document.createTextNode(x));
		tr.appendChild(th);
	}

	for(y=0; y<sizey; ++y) {
		grid[y]=[];
		var tr=document.createElement("tr");
		tbody.appendChild(tr);

		var th=document.createElement("th");
		th.appendChild(document.createTextNode(y));
		tr.appendChild(th);

		for(x=0; x<sizex; ++x) {
			grid[y][x]=new pos(x, y);
			var td=document.createElement("td");
			td.appendChild(document.createTextNode(""));
			td.id=x+","+y;
			td.width=20;
			td.onclick=astar_click;
			td.onmouseover=astar_mouseover;
			td.setAttribute("x", x);
			td.setAttribute("y", y);
			tr.appendChild(td);
		}
	}
}

function wipe()
{
	var y, x;

	warn="";
	opened=[];

	for(y=0; y<sizey; ++y) {
		for(x=0; x<sizex; ++x) {
			grid[y][x].cost=0;
			grid[y][x].totalcost=0;
			grid[y][x].prev=null;
			grid[y][x].closed=false;

			if(grid[y][x].blocked) setcolor(grid[y][x], blocked_color);
			else setcolor(grid[y][x], nothing_color);
		}
	}
	setcolor(start, start_color);
	setcolor(target, target_color);
}

function settext(p, text)
{
	var td=document.getElementById(p.str());
	td.firstChild.data=text;
}

function setcolor(p, color)
{
	var td=document.getElementById(p.str());
	td.setAttribute("bgColor", color);
}

function setstart(p)
{
	if(start) {
		settext(start, "");
		setcolor(start, nothing_color);
	}
	start=p;
	settext(start, "S");
	setcolor(start, start_color);
}

function settarget(p)
{
	if(target) {
		settext(target, "");
		setcolor(target, nothing_color);
	}
	target=p;
	settext(target, "T");
	setcolor(target, target_color);
}

function setblock(p1, p2, block)
{
	for(var y=p1.y; y<=p2.y; ++y) {
		for(var x=p1.x; x<=p2.x; ++x) {
			if(block) {
				setcolor(grid[y][x], blocked_color);
				grid[y][x].blocked=true;
			} else {
				setcolor(grid[y][x], nothing_color);
				grid[y][x].blocked=false;
			}
		}
	}
}

function opencell(p, cost, prev)
{
	if(p.blocked) return null;

	if(prev && prev.prev && !prev.equal(start)) {
		if(p.x-prev.x != prev.x-prev.prev.x ||
			p.y-prev.y != prev.y-prev.prev.y) cost+=4;
	}

	var totalcost=parseFloat(cost)+14*(Math.abs(p.x-target.x)+Math.abs(p.y-target.y));

	/* If position is already considered: check for better cost */
	if(p.totalcost!=0) {
		if(totalcost<p.totalcost) {
			var nn;
			for(nn=0; nn<opened.length; ++nn) {
				if(p.equal(opened[nn])) {
					opened.splice(nn, 1);
					break;
				}
			}
		} else return null;
	}

	p.cost=cost;
	p.prev=prev;
	p.totalcost=totalcost;

	var n=0;
	for(n=0; n<opened.length; ++n) {
		if(p.totalcost<opened[n].totalcost) {
			opened.splice(n, 0, p);
			break;
		}
	}
	if(n>=opened.length) opened[n]=p;

	grid[p.y][p.x]=p;

	if(paint_open && !p.equal(start)) {
		var intensity=Math.floor(totalcost*4/5);
		
		if(intensity>255) intensity=255;
		setcolor(p, "#"+intensity.toString(16)+"ff"+intensity.toString(16));
	}

	return p;
}

function openadjacent(p)
{
	var cost=grid[p.y][p.x].cost+10;
	if(p.x>0) opencell(grid[p.y][p.x-1], cost, p);
	if(p.y>0) opencell(grid[p.y-1][p.x], cost, p);
	if(p.y<(sizey-1)) opencell(grid[p.y-(-1)][p.x], cost, p);
	if(p.x<(sizex-1)) opencell(grid[p.y][p.x-(-1)], cost, p);
}

function astar()
{
	var best;
	var n=0;

	var chb=document.getElementById("chb_paintopen");
	paint_open=chb.checked;

	best=opencell(start, 0, start);
	while(best && !best.equal(target)) {
		best.closed=true;
		opened.shift();
		openadjacent(best);

		if(opened.length>0) best=opened[0];
		else best=null;

		if(++n>10000) {best=null; break;}	/* Catch non-stop loops (should never happen) */
	}
	if(!best) {
		warn="No route found";
		return;
	}

	/* Find way back */
	while(!best.equal(start)) {
		setcolor(best, route_color);
		best=best.prev;
		if(!best) {
			alert("Something strange happend");	/* Should never happen */
			break;
		}
	}
}

function astar_click(e)
{
	if(!e) var e=window.event;

	var x=this.getAttribute("x");
	var y=this.getAttribute("y");

	var p=grid[y][x];

	if(start_moving && !p.equal(target)) {
		setstart(p); 
		start_moving=false;
		setblock(p, p, null);
	} else if(target_moving && !p.equal(start)) {
		settarget(p);
		target_moving=false;
		setblock(p, p, null);
	} else if(p.equal(start)) start_moving=true;
	else if(p.equal(target)) target_moving=true;
	else {
		if(grid[y][x].blocked) setblock(p, p, null);
		else setblock(p, p, 1);
	}

	if(!start_moving && !target_moving) {
		wipe();
		astar();
	}

	astar_explain(x, y);
}

function chb_click()
{
	wipe();
	astar();
}

function astar_explain(x, y)
{
	var expl=document.getElementById("expl");
	var p=grid[y][x];
	var heuristic=p.totalcost-p.cost;

	if(start_moving) expl.innerHTML="Click to set new start position at "+p.str();
	else if(target_moving) expl.innerHTML="Click to set new target position at "+p.str();
	else if(p.blocked) expl.innerHTML=p.str()+
		"<br>Currently blocked. Click to unblock";
	else if(p.equal(start)) expl.innerHTML="Start position - Click to move";
	else if(p.equal(target)) expl.innerHTML="Target position - Click to move";
	else if(p.cost==0) expl.innerHTML=p.str()+"<br>Click to block this position";
	else expl.innerHTML=p.str()+
		"<br>Cost from start: "+p.cost+
		"<br>Heuristic estimate to target: "+heuristic+
		"<br>Total cost: "+p.totalcost+
		"<br>Click to block this position";

	if(warn.length>0) expl.innerHTML+="<br><div style=\"color:red\">"+warn+"<div>";
}

function astar_mouseover(e)
{
	if(!e) var e=window.event;

	var x=this.getAttribute("x");
	var y=this.getAttribute("y");

	astar_explain(x, y);
}

function astar_mouseout()
{
	var expl=document.getElementById("expl");
	expl.innerHTML="";
}

function doastar()
{
	mkgrid();

	setstart(new pos(6, 2));
	settarget(new pos(9, 14));
	setblock(new pos(1, 3), new pos(10, 4), true);
	setblock(new pos(12, 4), new pos(15, 4), true);
	setblock(new pos(2, 6), new pos(14, 12), true);
	setblock(new pos(0, 6), new pos(0, 9), true);
	setblock(new pos(9, 6), new pos(10, 11), false);
	setblock(new pos(11, 11), new pos(14, 11), false);

	astar();
}
