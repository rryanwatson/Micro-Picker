var microPicker=function(){function x(){for(var a=k,g=0,i=b.width,l=0,m=0,n=0,o=j;o<b.height;o++){for(var p=0;p<b.width;p++){var q=4*(p+o*b.width);p<k?(d.data[q]=f.r,d.data[q+1]=f.g,d.data[q+2]=f.b):(d.data[q]=y(p,a,g,i,l),d.data[q+1]=y(p,a,g,i,m),d.data[q+2]=y(p,a,g,i,n))}g=y(o,j,0,h,255),l=y(o,j,0,b.height,e.r),m=y(o,j,0,b.height,e.g),n=y(o,j,0,b.height,e.b)}c.putImageData(d,0,0)}function y(a,b,c,d,e){return c+(a-b)*((e-c)/(d-b))}var a,b,c,d,g,h,i,j,k,l,e={r:255,g:0,b:0},f={r:255,g:0,b:0};a=document.getElementsByTagName("script");for(var m=0;m<a.length;m++)"microPicker.js"!==a[m].getAttribute("src")&&"minified_microPicker.js"!==a[m].getAttribute("src")||(g=parseInt(a[m].getAttribute("data-width")),h=parseInt(a[m].getAttribute("data-height")),i=parseInt(a[m].getAttribute("data-layout")),l=document.getElementById(a[m].getAttribute("data-appendto")));if(j=h/i,k=g/i,colorPickedEvent=new CustomEvent("pickedColor",{detail:f,bubbles:!1}),b=document.createElement("canvas"),b.width=g,b.height=h,b.id="microPicker",c=b.getContext("2d",{alpha:!1}),!c)return void console.log("Unable to create the canvas 2d context. Update your browser.");d=c.getImageData(0,0,b.width,b.height);for(var n=g/6,o=2*n,p=3*n,q=4*n,r=5*n,s=255,t=0,u=0,v=0;v<j;v++)for(var w=0;w<b.width;w++){var m=4*(w+v*b.width);d.data[m]=s,d.data[m+1]=t,d.data[m+2]=u,w<n?t=y(w,0,0,n,255):w<o?s=y(w,n,255,o,0):w<p?u=y(w,o,0,p,255):w<q?t=y(w,p,255,q,0):w<r?s=y(w,q,0,r,255):u=y(w,r,255,b.width,0)}x(),l.appendChild(b),b.addEventListener("click",function(a){var d=window.getComputedStyle(b),j=parseInt(d.getPropertyValue("width").replace(/px/,"")),k=parseInt(d.getPropertyValue("height").replace(/px/,"")),m=b.getBoundingClientRect(),n=a.clientX-m.left,o=a.clientY-m.top,p=y(n,0,0,j,g);if(o<k/i){var q=0,r=c.getImageData(p,q,1,1);e.r=r.data[0],e.g=r.data[1],e.b=r.data[2],f.r=e.r,f.g=e.g,f.b=e.b,x(),l.dispatchEvent(colorPickedEvent)}else if(n>j/i){var q=y(o,0,0,k,h),r=c.getImageData(p,q,1,1);f.r=r.data[0],f.g=r.data[1],f.b=r.data[2],x(),l.dispatchEvent(colorPickedEvent)}},!1)}();