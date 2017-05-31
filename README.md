# SVG Loading Animation
SVG based customizable loading animation.
[View Demo](http://jagjitgill.ca/code/svg-loading/)

## Usage
### HTML
No special markup is required to add the animation. 
```html
<button class="my-class">Submit</button>
<a class="my-class">Submit</a>
```
### JS
By default the `<button>` and `<a>` will start the animation on click. All the other containers (`<p>`, `<div>` etc.) will start the animation upon initialization.
```js
// Initialize
var circularLoading = initializeLoading('.my-class');

// Stop animation
circularLoading.triggerSuccess();           // Stop with tick mark
circularLoading.triggerFail();              // Stop with "x"
circularLoading.triggerSilentSuccess();     // Fade away
```
### Options
**Status text**
1) Via `data` attributes.

```html
<button class="demo-button"
        data-progress="Sending"
        data-success="Done!"
        data-fail="Error!"
        data-reset="Send">
        Send
</button>
```
2) Via js _(Only success and fail)_
```javascript
circularLoading.triggerSuccess('Action successful');
circularLoading.triggerFail('Action failed');
```

**Position**
The animation can be added on `left`, `right`, `top` or `bottom` of the element. The default value is 'right'. Specific position settings can be passed during initialization.
(Use `inline` for paragraphs and divs)

```javascript
var loading = initializeLoading('.my-class', { position: 'bottom' });
```

**Type**
Choose one from 3 available types: `circular`, `circle` and `infinity`. The default value is 'circular'.

```javascript
var loading = initializeLoading('.my-class', { type: 'circle' });
```

**Scale (Inline only)**
Available options: `x1-5`, `x2`, `x2-5` ... `x4`.

```javascript
var loading = initializeLoading('.my-class', { scale: 'x2' });
```

## About
This library is made using [segment](https://lmgonzalves.github.io/segment/) and [classie](https://github.com/desandro/classie). Feel free to use the source code as an example or in any project of your own. 
Found a bug? or an enhancement idea?  Let's _git_ on it.
Inspired by [lmgonzalves](https://x-team.com/blog/creating-loading-buttons-svg-segment/).

![Loading gif](/demo-loading.gif?raw=true)
![Loading sample](/demo-sample.png?raw=true)