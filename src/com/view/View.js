var View = function() {
	this.build = function() {
		Class._super(this, "build");
		
		this.layout(new VerticalLayout());
		this.layout().verticalGap=30;
		
		this.layout(new PaddedLayout());
		this.layout().top=30;
		this.layout().left=30;
		
		var label = new Label();
		label.build();
		label.className("label");
		label.width(230);
		label.text("This is a Label for a Vertical Layout");
		this.addChild(label);

		var button = new Button();
		button.build();
		button.className("button");
		button.asset(ResourceManager.getAssetByName("button"));
		button.width(150);
		button.height(30);
		button.labelClassName("buttonLabel");
		button.setStyle();
		this.addChild(button);
		button.activate();
	//	button.deactivate();
		button.text("Next");
		
	}
	this.arrange=function()
	{
		Class._super(this, "arrange");
		
	}
};
Class.extend(View, UIElement);

var View2 = function() {
	this.build = function() {
		Class._super(this, "build");
		
		this.layout(new HorizontalLayout());
		this.layout().horizontalGap=30;
		
		this.layout(new PaddedLayout());
		this.layout().top=30;
		this.layout().left=30;
		
		var label = new Label();
		label.build();
		label.width(100);
		label.className("label");
		label.text("This is a Label for a Horizontal Layout");
		
		this.addChild(label);
		
		var sprite2 = new UIElement();
		sprite2.build();
		sprite2.className("box2");
		sprite2.width(100);
		sprite2.height(100);
		sprite2.visible(true);
		sprite2.buttonMode(true);

		this.addChild(sprite2);

		var sprite3 = new UIElement();
		sprite3.build();
		sprite3.className("box3");
		sprite3.width(100);
		sprite3.height(100);
		sprite3.visible(true);
		sprite3.buttonMode(true);
	
		this.addChild(sprite3);
		
		
	}
	this.arrange=function()
	{
		Class._super(this, "arrange");
		
	}
};
Class.extend(View2, UIElement);
