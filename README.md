# Micro-Picker
A simple color picker that can be almost any size you want it to be.

### Usage:

Insert this script tag into your html:

```HTML
<script src="microPicker.js" data-width="400" data-height="80" data-layout="5" data-appendto="myElementID"></script>
```

**src="microPicker.<spand></span>js" OR src="minified_microPicker.<spand></span>js"**  - The javascript file that creates the micropicker.

**data-width** {number}   - Integer that defines the width of the created micropicker.

**data-height** {number}   - Integer that defines the height of the micropicker.

**data-layout** {number}   - Integer that changes the width and height of the individal components of the micropicker.

**data-appendto** {Element.<spand></span>id}   - The Element.<spand></span>id of the DOM Element you wish microPicker to be appended to.

You can get the picked color by listening for the 'pickedColor' event on the element you provided to the data-appendto attribute.

```javascript
document.getElementById('myElementID').addEventListener('pickedColor', (e) => {
    console.log(e.detail);
});

```

See example.html for working example.

![alt text](img.png "microPicker in action")