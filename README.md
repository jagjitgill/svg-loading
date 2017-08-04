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
<link href="bower_components/svg-loading/dist/svg-loading.css" rel="stylesheet"></link>

<script src="bower_components/svg-loading/dist/segment.min.js"></script>
<script src="bower_components/svg-loading/dist/svg-loading.min.js"></script>
```

### JS
By default the `<button>` and `<a>` will start the animation on click. All the other containers (`<p>`, `<div>` etc.) will start the animation upon initialization.
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
#### Status text
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
The animation can be added on `left`, `right`, `top` or `bottom` of the element. The default value is 'right'. Specific position settings can be passed during initialization. (Use `inline` for paragraphs and divs)

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