var microPicker = (function() {


    var htmlCollection;
    var canvas;
    var context;
    var iData;
    var topPickedColor = {r:255,g:0,b:0};
    var pickedColor = {r:255,g:0,b:0};
    var canvasWidth;
    var canvasHeight;
    var layout;
    var topHeight;
    var colorPickedRectWidth;
    var userElement;


    //Get the attributes on the script tag that loads this file.
    htmlCollection = document.getElementsByTagName('script');
    for(var i = 0; i < htmlCollection.length; i++) {
        if(htmlCollection[i].getAttribute('src') === 'microPicker.js' || htmlCollection[i].getAttribute('src') === 'minified_microPicker.js' ) {
            canvasWidth = parseInt(htmlCollection[i].getAttribute("data-width"));
            canvasHeight = parseInt(htmlCollection[i].getAttribute("data-height"));
            layout = parseInt(htmlCollection[i].getAttribute("data-layout"));
            userElement = document.getElementById(htmlCollection[i].getAttribute("data-appendto"));
        }
    }

    

    topHeight = canvasHeight/layout;
    colorPickedRectWidth = canvasWidth/layout;
    
    colorPickedEvent = new CustomEvent('pickedColor',{'detail':pickedColor,bubbles:false});

    canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.id = 'microPicker';
    context = canvas.getContext('2d', {alpha:false});
    if(!context) {
        console.log('Unable to create the canvas 2d context. Update your browser.');
        return;
    }

    iData = context.getImageData(0,0,canvas.width,canvas.height);


    // draw the top portion of the picker----------------
    var sixth = canvasWidth/6;
    var sixth2 = sixth*2;
    var sixth3 = sixth*3;
    var sixth4 = sixth*4;
    var sixth5 = sixth*5;
    var vr = 255,vg = 0,vb = 0;
    for(var y = 0; y < topHeight; y++) {
        for(var x = 0; x < canvas.width; x++) {
            var i = 4*(x + y*canvas.width);
            iData.data[i] = vr;
            iData.data[i+1] = vg;
            iData.data[i+2] = vb;

            if(x < sixth) {
                vg = li(x,0,0,sixth,255);
            } else if(x < sixth2) {
                vr = li(x,sixth,255,sixth2,0)
            } else if(x < sixth3) {
                vb = li(x,sixth2,0,sixth3,255);
            } else if(x < sixth4) {
                vg = li(x,sixth3,255,sixth4,0);
            } else if(x < sixth5) {
                vr = li(x,sixth4,0,sixth5,255);
            } else {
                vb = li(x,sixth5,255,canvas.width,0);
            } 
        }
    }
    //---------------------------------------------------

    drawBot();
    userElement.appendChild(canvas);



    //get the color that was clicked when the click event happens
    canvas.addEventListener('click',function(e) {

        var style = window.getComputedStyle(canvas);
        var width = parseInt(style.getPropertyValue('width').replace(/px/,""));
        var height = parseInt(style.getPropertyValue('height').replace(/px/,""));
        var br = canvas.getBoundingClientRect();
        var left = e.clientX - br.left;
        var top = e.clientY - br.top;

        var x = li(left,0,0,width,canvasWidth);
        
        if(top < height/layout) {
            var y = 0;
            var d = context.getImageData(x,y,1,1);
            topPickedColor.r = d.data[0];
            topPickedColor.g = d.data[1];
            topPickedColor.b = d.data[2];
            pickedColor.r = topPickedColor.r;
            pickedColor.g = topPickedColor.g;
            pickedColor.b = topPickedColor.b;
            drawBot();
            userElement.dispatchEvent(colorPickedEvent);
        } else if(left > width/layout) {
            var y = li(top,0,0,height,canvasHeight);
            var d = context.getImageData(x,y,1,1);
            pickedColor.r = d.data[0];
            pickedColor.g = d.data[1];
            pickedColor.b = d.data[2];
            drawBot();
            userElement.dispatchEvent(colorPickedEvent);
        }
        

    },false);


    //** This function draws the bottom portion of the color picker. */
    function drawBot() {
        var x1 = colorPickedRectWidth, y1 = 0, x2 = canvas.width, y2 = 0;
        var y4 = 0;
        var y6 = 0;

        for(var y = topHeight; y < canvas.height; y++) {


            for(var x = 0; x < canvas.width; x++) {
                var i = 4*(x+y*canvas.width);

                if(x < colorPickedRectWidth) {
                    iData.data[i] = pickedColor.r;
                    iData.data[i+1] = pickedColor.g;
                    iData.data[i+2] = pickedColor.b;
                } else {
                    iData.data[i] = li(x,x1,y1,x2,y2);
                    iData.data[i+1] = li(x,x1,y1,x2,y4);
                    iData.data[i+2] = li(x,x1,y1,x2,y6);
                }
                
            }
            y1 = li(y,topHeight,0,canvasHeight,255);
            y2 = li(y,topHeight,0,canvas.height,topPickedColor.r);
            y4 = li(y,topHeight,0,canvas.height,topPickedColor.g);
            y6 = li(y,topHeight,0,canvas.height,topPickedColor.b);

        }
        context.putImageData(iData,0,0);
    }

    //** Helper function that linearly interpolates. */
    function li(x,x1,y1,x2,y2) {
        return y1 + (x-x1)*((y2-y1)/(x2-x1));
    }


})();

