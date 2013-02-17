var Engine = function() {
	this.prop = {
		width : 0,
		height : 0,
		grid : false,
		cellSize : 10,
		gridCellIndex : 0,
		gridCellId : "cell-",
		occupiedXY : []
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

	};
	this.createGrid = function() {
		if (!this.prop.grid)
			return;
		var holder = new UIElement();
		holder.build();
		holder.width(this.width());
		holder.height(this.height());
		holder.setStyle();

		var cols = parseInt(this.width() / this.cellSize());
		var rows = parseInt(this.height() / this.cellSize());
		var currentRow = 0;
		var currentCol = 0;
		var end = false;
		var sp;
		while (!end) {
			sp = new Sprite();
			sp.build();
			sp.lineStyle();
			sp.drawRect(currentCol * this.cellSize(), currentRow * this.cellSize(), this.cellSize(), this.cellSize(), null);
			sp.setStyle();
			holder.addChild(sp);
			sp.arrange();
			sp.display.id = this.prop.gridCellId + currentCol+"_"+currentRow;
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
		holder.arrange();
		document.body.appendChild(holder.display);
	};
	this.setCell=function(x,y)
	{
		if (!this.prop.grid)
			return;
		var id= this.prop.gridCellId + x+"_"+y;
		var cell = document.getElementById(id);
		cell.style.backgroundColor="#f00";
	};
	this.addObstacle=function(obj,y) {
		var startX = this.getXCell(y==undefined?obj.x():obj);
		var startY = this.getYCell(y==undefined?obj.y():y);
		var endX = this.getXCell(y==undefined?(Int(obj.x())+Int(obj.width())):obj);
		var endY = this.getYCell(y==undefined?(Int(obj.y())+Int(obj.height())):y);
		var end=false;
		var cX=startX;
		while(!end)
		{
			this.setOccupiedXY(cX,startY);
			this.setCell(cX,startY);
			cX++;
			if(cX>=endX)
			{
				cX=startX;
				startY++;
			}
			if(startY>=endY)end=true;
		}
		delete startX;
		delete startY;
		delete endX;
		delete endY;
		delete cX;
		delete end;
		console.log(this.prop.occupiedXY);
	};
	this.setOccupiedXY=function(x,y)
	{
		if(!this.prop.occupiedXY[x])this.prop.occupiedXY[x]=[];
		this.prop.occupiedXY[x][y]=x+","+y;
	};
	this.getOccupiedXY=function(x,y)
	{
		var startX ;
		var startY ;
		if(x.x)
		{
			startX = this.getXCell(x.x());
			startY = this.getYCell(x.y());
			var endX = this.getXCell(Int(x.x())+Int(x.width()));
			var endY = this.getYCell(Int(x.y())+Int(x.height()));
			var cX=startX;
			var occupied=false;
			var end=false;
			while(!end)
			{
			if(this.prop.occupiedXY[cX] && this.prop.occupiedXY[cX][startY])occupied= true;
			cX++;
			if(cX>=endX)
			{
				cX=startX;
				startY++;
			}
			if(startY>endY)end=true;
			}
			if(occupied)return true;
		}else{
			startX = this.getXCell(x);
			startY = this.getYCell(y);
			if(this.prop.occupiedXY[startX] && this.prop.occupiedXY[startX][startY])return true;
		}
		
		return false;
	};
	this.findPathTo=function(obj,x,y)
	{
		var startX = this.getXCell(obj.x());
		var startY = this.getYCell(obj.y());
		
		var endX = this.getXCell(x);
		var endY = this.getYCell(y);
		
		var v = startY>endY?"up":"down";
		var h = startX>endX?"left":"right";
		var md = endX>endY?"h":"v";
		
		
		
	}
	this.getXCell=function(x)
	{
		return Math.floor(x/this.cellSize());
	};
	this.getYCell=function(y)
	{
		return Math.floor(y/this.cellSize());
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
};
