![toolkit js logo](http://i1057.photobucket.com/albums/t386/Fahim_Chowdhury/ToolkitJS/c8d41c23.jpg)  
##Welcome to the Toolkit-JS
This is a cross browser JS OOP Architecture. This was based on [wezside toolkit in AS3](https://github.com/wezside/Toolkit).  

Contain These Libraries:  
[Utensil](https://github.com/fahimc/Utensil/)

#Latest Version  
[toolkitMax](https://github.com/fahimc/Toolkit-JS/downloads)

#About  
With this toolkit you can build extendable objects which are fully inheritable. 

The UIElement is the main object which is the minimal that you should extend because all the other classes extend it. The UIElement does all the cross browser code for each method it contains. It creates a DIV as its base which will be positioned absolute to allow you to move it via the x() and y() functions. The styles will be set by CSS with a classname that you provide in the className() method. The children that you add gets added to another DIV within the UIElement which is called the childContainer to allow you to set overflow hidden and hide the children. There are many other reasons for the childContainer.  

Have a look at the different layout managers such as VerticalLayout or HorizontalLayout as these will automatically lay out the child for you. The good thing about layouts is that you can use multiple ones at the same time.

#Example of the UIElement  

    var View = function() {
    }  
    Class.extend(View, UIElement);      

    var view = new View();
    view.build();
    view.setStyle();
    document.body.appendChild(view.display);
    view.arrange();

#Content 
[0. Project Structure](https://github.com/fahimc/Toolkit-JS/wiki/0.-Project-Structure)  
[1. Setting up the Main JS File](https://github.com/fahimc/Toolkit-JS/wiki/1.-Setting-up-the-Main-JS-File)  
[2. Resource Manager](https://github.com/fahimc/Toolkit-JS/wiki/2.-Resource-Manager)  
[3. UIElement](https://github.com/fahimc/Toolkit-JS/wiki/3.-UIElement)  
[4. Creating And Extending a Class](https://github.com/fahimc/Toolkit-JS/wiki/4.-Creating-And-Extending-a-Class)  
[5. Creating a Label](https://github.com/fahimc/Toolkit-JS/wiki/5.-Creating-a-Label)   
[6. Creating a Button](https://github.com/fahimc/Toolkit-JS/wiki/6.-Create-A-Button)  
[7. Using Layouts](https://github.com/fahimc/Toolkit-JS/wiki/7.-Using-Layouts)  
[8. Styling UIElements](https://github.com/fahimc/Toolkit-JS/wiki/8.-Styling-UIElements)  
[9. Using ScrollLayout](https://github.com/fahimc/Toolkit-JS/wiki/9.-Using-ScrollLayout)  
[10. Applying A Grid Layout](https://github.com/fahimc/Toolkit-JS/wiki/a_10.-Applying-A-Grid-Layout)  

---
#API

[DisplayObject](https://github.com/fahimc/Toolkit-JS/wiki/DisplayObject)  
[UIElement](https://github.com/fahimc/Toolkit-JS/wiki/API---UIElement-Method-List)  
[Label](https://github.com/fahimc/Toolkit-JS/wiki/API-Label-Method-List)   
[Button](https://github.com/fahimc/Toolkit-JS/wiki/API-Button-Method-List)  
[Layout](https://github.com/fahimc/Toolkit-JS/wiki/API-Layout-Method-List) 