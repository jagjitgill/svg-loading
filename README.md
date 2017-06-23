# SVG Loading Animation
SVG based customizable loading animation.
[View demo](http://jagjitgill.ca/code/svg-loading/)

## Install
Download zip from the [GitHub repo][svg-loading] or install via bower, a [client-side code package manager][bower].
```bash
bower install https://github.com/jagjitgill/svg-loading.git#master
```

Include the required css and the js files:
```html
<link href="bower_components/svg-loading/lib/loading.css" rel="stylesheet"></link>

<script src="bower_components/svg-loading/lib/segment.min.js"></script>
<script src="bower_components/svg-loading/lib/loading-button.min.js"></script>
```

### JS
By default the `<button>` and `<a>` will start the animation on click. All the other containers (`<p>`, `<div>` etc.) will start the animation upon initialization.
```html
<!-- Add the svg code to your page -->
<!-- Circular Loading -->
<script type="text/template" id="circular-loading">
  <svg width="120px" height="120px">
    <path class="outer-path color" d="M 60 60 m 0 -50 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"></path>
    <path class="inner-path color2" d="M 60 60 m 0 -30 a 30 30 0 1 1 0 60 a 30 30 0 1 1 0 -60"></path>
    <path class="success-path color" d="M 60 10 A 50 50 0 0 1 91 21 L 75 45 L 55 75 L 45 65"></path>
    <path class="error-path color" d="M 60 10 A 50 50 0 0 1 95 25 L 45 75"></path>
    <path class="error-path2 color" d="M 60 30 A 30 30 0 0 1 81 81 L 45 45"></path>
  </svg>
</script>
<!-- Circle Loading -->
<script type="text/template" id="circle-loading">
  <svg width="120px" height="120px">
    <circle r="50" cx="60" cy="60" fill="none" class="color2"></circle>
    <circle r="30" cx="60" cy="60" fill="none" class="color2"></circle>
    <path class="outer-path color" d="M 60 60 m 0 -50 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"></path>
    <path class="inner-path color" d="M 60 60 m 0 -30 a 30 30 0 1 1 0 60 a 30 30 0 1 1 0 -60"></path>
    <path class="success-path color" d="M 60 10 A 50 50 0 0 0 16 36  L 45 65 L 55 75 L 75 45"></path>
    <path class="error-path color" d="M 60 10 A 50 50 0 0 0 25 95 L 75 45"></path>
    <path class="error-path2 color" d="M 60 30 A 30 30 0 0 1 81 81 L 45 45"></path>
  </svg>
</script>
<!-- Infinity Loading -->
<script type="text/template" id="infinity-loading">
  <svg width="120px" height="60px">
    <path class="infinity-path color" d="M 30 10 a 20 20 0 1 0 0 40 c 20 0 40 -40 60 -40 a 20 20 0 0 1 0 40 c -20 0 -40 -40 -60 -40"></path>
    <path class="success-path color" d="M 30 10 C 15 10 35 25 45 35 L 55 45 L 75 15"></path>
    <path class="error-path color" d="M 30 10 a 20 20 0 1 0 0 40 Q 40 50 45 45 L 75 15"></path>
    <path class="error-path2 color" d="M 30 10 Q 40 10 45 15 L 75 45"></path>
  </svg>
</script>
```
Initialize the animation:
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

![Loading gif](/demo-svg-loading.gif?raw=true)

[svg-loading]: https://github.com/jagjitgill/svg-loading
[bower]: http://bower.io/