var Engine = function() {
	this.event = {
		READY : "ENGINE_READY"
	};
	 this.prop = {
		width : 0,
		height : 0,
		grid : false,
		cellSize : 10,
		gridCellIndex : 0,
		gridCellId : "cell-",
		occupiedXY : [],
		ignoreCells : [],
		layer : {
			bgId : "engineBGLayer",
			character : "engineCharacterLayer",
			front : "engineFrontLayer"
		},
		container : null
	};
	this.holder = null;
	this.container = function(id) {
		if (id == undefined) {
			var c;
			if (!this.prop.container) {
				c = document.body;
			} else {
				c = document.getElementById(this.prop.container);
			}
			return c;
		}
		this.prop.container = id;
	}
	this.showGrid = function(value) {
		if (value == undefined) {
			return this.prop.grid;
		} else {
			this.prop.grid = value;
		}
	};
	this.init = function() {
		this.createGrid();
		this.astar.parent = this;
	};
	this.createGrid = function() {
		
		this.holder = new UIElement();
		this.holder.build();
		this.holder.width(this.width());
		this.holder.height(this.height());
		this.holder.setStyle();

		var cols = parseInt(this.width() / this.cellSize());
		var rows = parseInt(this.height() / this.cellSize());
		this.astar.rows = rows;
		this.astar.cols = cols;
		var currentRow = 0;
		var currentCol = 0;
		var end = false;
		var sp;
		
			
		while (!end) {
			if (!this.astar.grid[currentRow])
				this.astar.grid[currentRow] = [];
			this.astar.setCell(currentRow, currentCol, false);
			
			if (this.prop.grid)
			{
				sp = new Sprite();
				sp.build();
				sp.lineStyle();
				sp.drawRect(currentCol * this.cellSize(), currentRow * this.cellSize(), this.cellSize(), this.cellSize(), null);
				sp.setStyle();
				this.holder.addChild(sp);
				sp.arrange();
				sp.display.id = this.prop.gridCellId + currentCol + "_" + currentRow;
			}
			
			this.prop.gridCellIndex++;
			currentCol++;
			if (currentCol >= cols) {
				currentRow++;
				currentCol = 0;
			}
			if (currentRow >= rows) {
				end = true;

			}
		}
		this.holder.arrange();

		this.createLayers();

		this.container().appendChild(this.holder.display);
		//Event.dispatch(this, this.event.READY);
	};

	this.createLayers = function() {
		var layer = new UIElement();
		layer.build();
		layer.width(this.width());
		layer.height(this.height());
		layer.setStyle();
		layer.arrange();
		layer.display.id = this.prop.layer.bgId;
		this.holder.addChild(layer);

		layer = new UIElement();
		layer.build();
		layer.width(this.width());
		layer.height(this.height());
		layer.setStyle();
		layer.arrange();
		layer.display.id = this.prop.layer.character;
		this.holder.addChild(layer);

		layer = new UIElement();
		layer.build();
		layer.width(this.width());
		layer.height(this.height());
		layer.setStyle();
		layer.arrange();
		layer.display.id = this.prop.layer.front;
		this.holder.addChild(layer);

	};
	this.addToBackgroundLayer = function(obj) {
		var l = document.getElementById(this.prop.layer.bgId);
		if (obj.display) {
			l.appendChild(obj.display);
		} else {
			l.appendChild(obj);
		}
	};
	this.addToCharacterLayer = function(obj) {
		var l = document.getElementById(this.prop.layer.character);
		if (obj.display) {
			l.appendChild(obj.display);
		} else {
			l.appendChild(obj);
		}
	};
	this.addToFrontLayer = function(obj) {
		var l = document.getElementById(this.prop.layer.front);
		if (obj.display) {
			l.appendChild(obj.display);
		} else {
			l.appendChild(obj);
		}
	};
	this.setCell = function(x, y, color) {

		var id = this.prop.gridCellId + x + "_" + y;
		var cell = document.getElementById(id);
		if (!cell)
			return;
		cell.style.backgroundColor = color ? color : "#f00";
	};
	this.ignoreBlocks = function(obj, y) {
		var startX = this.getXCell(y == undefined ? obj.x() : obj);
		var startY = this.getYCell(y == undefined ? obj.y() : y);
		var endX = this.getXCell(y == undefined ? (Int(obj.x()) + Int(obj.width())) : obj);
		var endY = this.getYCell(y == undefined ? (Int(obj.y()) + Int(obj.height())) : y);
		var end = false;
		var cX = startX;
		while (!end) {
			this.setIgnoreXY(cX, startY);

			cX++;
			if (cX >= endX) {
				cX = startX;
				startY++;
			}
			if (startY >= endY)
				end = true;
		}
	};
	this.addObstacle = function(obj, y) {
		var startX = this.getXCell(y == undefined ? obj.x() : obj);
		var startY = this.getYCell(y == undefined ? obj.y() : y);
		var endX = this.getXCell(y == undefined ? (Int(obj.x()) + Int(obj.width())) : obj);
		var endY = this.getYCell(y == undefined ? (Int(obj.y()) + Int(obj.height())) : y);
		// this.astar.setblock({
		// x : startX,
		// y : startY
		// }, {
		// x : endX,
		// y : endY
		// }, true, this.astar);
		
		var a = startX;
		var b = startY;
		while (a < endX) {
			while (b < endY) {
				
				this.setOccupiedXY(a, b);
				this.astar.setCell(b, a, true);
				b++;
			}
			b=startY;
			a++;
		

	}
	delete a;
	delete b;
	delete startX;
	delete startY;
	delete endX;
	delete endY;
};
this.setOccupiedXY = function(x, y) {
	if (!this.prop.occupiedXY[x])
		this.prop.occupiedXY[x] = [];
	this.prop.occupiedXY[x][y] = x + "," + y;
};
this.setIgnoreXY = function(x, y) {
	if (!this.prop.ignoreCells[x])
		this.prop.ignoreCells[x] = [];
	this.prop.ignoreCells[x][y] = x + "," + y;
};
this.getOccupiedXY = function(x, y) {
	var startX;
	var startY;
	if (x.x) {
		startX = this.getXCell(x.x());
		startY = this.getYCell(x.y());
		var endX = this.getXCell(Int(x.x()) + Int(x.width()));
		var endY = this.getYCell(Int(x.y()) + Int(x.height()));
		var cX = startX;
		var occupied = false;
		var end = false;
		while (!end) {
			if (this.prop.occupiedXY[cX] && this.prop.occupiedXY[cX][startY])
				occupied = true;
			cX++;
			if (cX >= endX) {
				cX = startX;
				startY++;
			}
			if (startY > endY)
				end = true;
		}
		if (occupied)
			return true;
	} else {
		startX = this.getXCell(x);
		startY = this.getYCell(y);
		if (this.prop.occupiedXY[startX] && this.prop.occupiedXY[startX][startY])
			return true;
	}

	return false;
};
this.findPathTo = function(obj, x, y) {
	var startX = this.getXCell(obj.x());
	var startY = this.getYCell(obj.y());
	var endX = this.getXCell(x);
	var endY = this.getYCell(y);
	this.setCell(startX, startY, "purple");
	this.setCell(endX, endY, "yellow");
	return this.astar.search(startX, startY, endX, endY);

	// this.drawPath(paths);
};
this.drawPath = function(paths) {
	if (!this.prop.grid)
		return;
	for (var a = 0; a < paths.length; a++) {
		this.setCell(paths[a][0], paths[a][0], "#00f");
	}
}
this.getXCell = function(x) {
	return Math.floor(x / this.cellSize());
};
this.getYCell = function(y) {
	return Math.floor(y / this.cellSize());
};
this.cellSize = function(value) {
	if (value == undefined) {
		return this.prop.cellSize;
	} else {
		this.prop.cellSize = value;
	}
};
this.width = function(value) {
	if (value == undefined) {
		return this.prop.width;
	} else {
		this.prop.width = value;
	}
};
this.height = function(value) {
	if (value == undefined) {
		return this.prop.height;
	} else {
		this.prop.height = value;
	}
};
this.astar = {
	//http://en.literateprograms.org/A*_search_(JavaScript)
	grid : [],
	opened : [],
	start : null,
	target : null,
	parent : null,
	last : null,
	rows : 0,
	cols : 0,
	pos : function(x, y) {
		this.x = x;
		this.y = y;
		this.cost = 0;
		this.totalcost = 0;
		this.blocked = false;
		this.closed = false;
		this.prev = null;

		this.str = function() {
			return this.x + "," + this.y;
		}
		this.equal = function(p) {
			return this.x == p.x && this.y == p.y;
		}
	},
	opencell : function(p, cost, prev) {

		if (!p || p.blocked)
			return null;

		if (prev && prev.prev && !prev.equal(this.start)) {
			if (p.x - prev.x != prev.x - prev.prev.x || p.y - prev.y != prev.y - prev.prev.y)
				cost += 4;
		}

		var totalcost = parseFloat(cost) + 14 * (Math.abs(p.x - this.target.x) + Math.abs(p.y - this.target.y));
		/* If position is already considered: check for better cost */
		if (p.totalcost != 0) {
			if (totalcost < p.totalcost) {
				var nn;
				for ( nn = 0; nn < this.opened.length; ++nn) {
					if (p.equal(this.opened[nn])) {
						this.opened.splice(nn, 1);
						break;
					}
				}
			} else
				return null;
		}

		p.cost = cost;
		p.prev = prev;
		p.totalcost = totalcost;

		var n = 0;
		for ( n = 0; n < this.opened.length; ++n) {
			if (p.totalcost < this.opened[n].totalcost) {
				this.opened.splice(n, 0, p);
				break;
			}
		}
		if (n >= this.opened.length)
			this.opened[n] = p;
		if (!this.grid[p.y])
			return null;
		this.grid[p.y][p.x] = p;
		this.last = p;
		//if(!p.equal(this.start)) this.parent.setCell(p.x,p.y);

		return p;
	},
	openadjacent : function(p) {
		var cost = this.grid[p.y][p.x].cost + 10;
		if (p.x > 0)
			this.opencell(this.grid[p.y][p.x - 1], cost, p);
		if (p.y > 0)
			this.opencell(this.grid[p.y-1][p.x], cost, p);
		if (p.y < (this.rows - 1))
			this.opencell(this.grid[p.y-(-1)][p.x], cost, p);
		if (p.x < (this.cols - 1))
			this.opencell(this.grid[p.y][p.x - (-1)], cost, p);
	},
	search : function(sx, sy, tx, ty) {

		var best;
		var n = 0;
		this.setstart(new this.pos(sx, sy));
		this.settarget(new this.pos(tx, ty));

		//var chb = document.getElementById("chb_paintopen");
		//paint_open = chb.checked;

		best = this.opencell(this.start, 0, this.start);
		while (best && !best.equal(this.target)) {
			best.closed = true;
			this.opened.shift();
			this.openadjacent(best);

			if (this.opened.length > 0)
				best = this.opened[0];
			else
				best = null;

			if (++n > 10000) {
				best = null;
				break;
			}	/* Catch non-stop loops (should never happen) */
		}

		if (!best) {
			//console.log("No route found");
			return;
		}
		var posArray = [];
		/* Find way back */
		while (!best.equal(this.start)) {
			posArray.push({
				x : best.x * this.parent.cellSize(),
				y : best.y * this.parent.cellSize()
			});
			this.parent.setCell(best.x, best.y, "#00f");

			best = best.prev;
			if (!best) {
				//console.log("Something strange happend");
				/* Should never happen */
				break;
			}
		}
		if (posArray)
			posArray.reverse();
		return posArray;
	},
	setCell : function(y, x, blocked) {
		if (!this.grid[y])
			return;
		this.grid[y][x] = {};
		this.grid[y][x].cost = 0;
		this.grid[y][x].totalcost = 0;
		this.grid[y][x].prev = null;
		this.grid[y][x].closed = false;
		this.grid[y][x].blocked = blocked ? true : false;
		this.grid[y][x].x = x;
		this.grid[y][x].y = y;
		this.grid[y][x].str = function() {
			return this.x + "," + this.y;
		}
		this.grid[y][x].equal = function(p) {
			return this.x == p.x && this.y == p.y;
		}
		if (blocked)
			this.parent.setCell(x, y, "#f00");
	},
	setblock : function(p1, p2, block, parent) {

		for (var y = p1.y; y <= p2.y; ++y) {
			for (var x = p1.x; x <= p2.x; ++x) {
				if (!parent.grid[y] || !parent.grid[y][x])
					return;
				if (block) {

					//setcolor(this.grid[y][x], blocked_color);
					parent.parent.setCell(x, y, "#f00");
					parent.grid[y][x].blocked = true;
				} else {
					//setcolor(this.grid[y][x], nothing_color);
					parent.parent.setCell(x, y);
					parent.grid[y][x].blocked = false;
				}
			}
		}
	},
	wipe : function() {
		var y, x;
		if (!this.parent || !this.start)
			return;
		this.opened = [];

		for ( y = 0; y < this.rows; ++y) {
			for ( x = 0; x < this.cols; ++x) {
				this.grid[y][x].cost = 0;
				this.grid[y][x].totalcost = 0;
				this.grid[y][x].prev = null;
				this.grid[y][x].closed = false;

				if (this.grid[y][x].blocked)
					this.parent.setCell(x, y, "#f00");
				
else
					this.parent.setCell(x, y, "#fff");
			}
		}

		this.parent.setCell(this.start.x, this.start.y, "none");
		this.parent.setCell(this.target.x, this.target.y, "none");
	},
	setstart : function(p) {
		if (this.start) {
			//settext(start, "");
			this.parent.setCell(p.x, p.y, "yellow");
		}
		this.start = p;
		// settext(start, "S");
		// setcolor(start, start_color);
		this.parent.setCell(p.x, p.y, "purple");
	},
	settarget : function(p) {
		if (this.target) {
			// settext(target, "");
			this.parent.setCell(p.x, p.y, "yellow");
		}
		this.target = p;
		// settext(target, "T");
		// setcolor(target, target_color);
		this.parent.setCell(p.x, p.y, "yellow");
	}
}

};
