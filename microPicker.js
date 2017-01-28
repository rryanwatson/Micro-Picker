let microPicker = (function() {

    let stag = document.getElementById("microPicker");
    

    let canvas;
    let context;
    let iData;
    let vr = 255,vg = 0,vb = 0;
    let sColor = {r:255,g:0,b:0};
    let pickedColor = {r:255,g:0,b:0};
    let event;

    const canvasWidth = parseInt(stag.getAttribute("data-width"));
    const canvasHeight = parseInt(stag.getAttribute("data-height"));
    const layout = parseInt(stag.getAttribute("data-layout"));
    const sixth = canvasWidth/6;
    const sixth2 = sixth*2;
    const sixth3 = sixth*3;
    const sixth4 = sixth*4;
    const sixth5 = sixth*5;
    const sliderHeight = canvasHeight/layout;
    const colorPickedRectWidth = canvasWidth/layout;


    colorPickedEvent = new CustomEvent('pickedColor',{'detail':pickedColor,bubbles:false});

    canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext('2d', {alpha:false});
    //document.body.appendChild(canvas);
    iData = context.getImageData(0,0,canvas.width,canvas.height);
    if(stag.getAttribute("data-tryantialias") == "true") {
        canvas.setAttribute("style", "image-rendering: pixelated;");
    }
    //canvas.style.width = "20%";
    //canvas.style.height = "5%";
    //canvas.style.cursor = "crosshair";
    canvas.addEventListener('click',(e) => {

        let style = window.getComputedStyle(canvas);
        let width = parseInt(style.getPropertyValue('width').replace(/px/,""));
        let height = parseInt(style.getPropertyValue('height').replace(/px/,""));
        let br = canvas.getBoundingClientRect();
        let left = e.clientX - br.left;
        let top = e.clientY - br.top;

        let x = li(left,0,0,width,canvasWidth);
        
        if(top < height/layout) {
            let y = 0;
            let d = context.getImageData(x,y,1,1);
            sColor.r = d.data[0];
            sColor.g = d.data[1];
            sColor.b = d.data[2];
            pickedColor.r = sColor.r;
            pickedColor.g = sColor.g;
            pickedColor.b = sColor.b;
            drawBot();
            canvas.dispatchEvent(colorPickedEvent);
        } else if(left > width/layout) {
            let y = li(top,0,0,height,canvasHeight);
            let d = context.getImageData(x,y,1,1);
            pickedColor.r = d.data[0];
            pickedColor.g = d.data[1];
            pickedColor.b = d.data[2];
            drawBot();
            canvas.dispatchEvent(colorPickedEvent);
        }
        

    },false);



    for(let y = 0; y < sliderHeight; y++) {
        for(let x = 0; x < canvas.width; x++) {
            let i = 4*(x + y*canvas.width);
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

    drawBot();



    function drawBot() {
        let x1 = colorPickedRectWidth, y1 = 0, x2 = canvas.width, y2 = 0;
        let y4 = 0;
        let y6 = 0;

        for(let y = sliderHeight; y < canvas.height; y++) {


            for(let x = 0; x < canvas.width; x++) {
                let i = 4*(x+y*canvas.width);

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
            y1 = li(y,sliderHeight,0,canvasHeight,255);
            y2 = li(y,sliderHeight,0,canvas.height,sColor.r);
            y4 = li(y,sliderHeight,0,canvas.height,sColor.g);
            y6 = li(y,sliderHeight,0,canvas.height,sColor.b);

        }
        context.putImageData(iData,0,0);
    }


    function li(x,x1,y1,x2,y2) {
        return y1 + (x-x1)*((y2-y1)/(x2-x1));
    }

    return canvas;


})();

document.body.appendChild(microPicker);

microPicker.addEventListener('pickedColor', (e) => {
    //console.log(e.detail);
});