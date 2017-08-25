/**
 * Global license:
 * The MIT License (MIT)
 */

/** Helper functions **/
function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}
if ('classList' in document.documentElement) {
    hasClass = function(elem, c) {
        return elem.classList.contains(c);
    };
    addClass = function(elem, c) {
        elem.classList.add(c);
    };
    removeClass = function(elem, c) {
        elem.classList.remove(c);
    };
} else {
    hasClass = function(elem, c) {
        return classReg(c).test(elem.className);
    };
    addClass = function(elem, c) {
        if (!hasClass(elem, c)) {
            elem.className = elem.className + ' ' + c;
        }
    };
    removeClass = function(elem, c) {
        elem.className = elem.className.replace(classReg(c), ' ');
    };
}

function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
}


/** LoadingButton **/
function LoadingButton(el, options) {
    this.el = el;
    this.options = options;
    this.init();
}

LoadingButton.prototype = {
    // Initialize everything
    init: function() {
        this.infinite = true;
        this.succeed = false;
        this.lstate = 'default';
        this.destroyed = false;
        this.initDOM();
        this.initSegments();
        this.initEvents();
    },

    // Create an span element with inner text of the button and insert the corresponding SVG beside it
    initDOM: function() {
        this.el.innerHTML = '<span>' + this.el.innerHTML + '</span>';
        this.span = this.el.querySelector('span');
        var div = document.createElement('div');
        div.innerHTML = getAnimationMarkup(this.options.svg);
        this.svg = div.querySelector('svg');
        this.el.appendChild(this.svg);
    },
    destroy: function() {
        this.span = this.el.querySelector('span');
        this.el.innerHTML = this.span.innerHTML;
        removeClass(this.el, 'open-loading');
        removeClass(this.el, 'loading-element');
        this.destroyed = true;
        this.el.removeAttribute('disabled');
    },

    // Initialize the segments for all the paths of the loader itself, and for the success and error animations
    initSegments: function() {
        for (var i = 0, paths = this.options.paths, len = paths.length; i < len; i++) {
            paths[i].el = this.svg.querySelector(paths[i].selector);
            paths[i].begin = paths[i].begin ? paths[i].begin : 0;
            paths[i].end = paths[i].end ? paths[i].end : 0.1;
            paths[i].segment = new Segment(paths[i].el, paths[i].begin, paths[i].end);
        }
        this.success = this.el.querySelector('.success-path');
        this.error = this.el.querySelector('.error-path');
        this.error2 = this.el.querySelector('.error-path2');
        this.successSegment = new Segment(this.success, 0, 0.1);
        this.errorSegment = new Segment(this.error, 0, 0.1);
        this.errorSegment2 = new Segment(this.error2, 0, 0.1);
    },

    // Initialize the click event in loading buttons, that trigger the animation
    initEvents: function() {
        if(this.destroyed){
            return;
        }
        console.log("Executing events");
        var self = this;
        addClass(self.el, 'loading-element');
        if (self.el.tagName == "A" || self.el.tagName == "BUTTON") {
            // Starting load on click for buttons and links
            self.el.addEventListener('click', function() {
                if(self.destroyed){
                    return;
                }
                console.log("Executing click");
                self.el.disabled = 'disabled';
                self.startAnimation();
            }, false);
        } else {
            // Starting load on init for <p>, <span>, <div> etc.
            this.startAnimation();
        }
    },

    startAnimation: function() {
        if(this.destroyed){
            return;
        }
        console.log("Executing startAnimation");
        var self = this;
        this.lstate = 'loading';
        this.defaultText = self.span.innerHTML;
        if (self.el.getAttribute("data-progress")) {
            self.buttonText = self.el.getAttribute("data-progress");
            self.span.innerHTML = self.buttonText;
        }
        addClass(self.el, 'open-loading');
        for (var i = 0, paths = self.options.paths, len = paths.length; i < len; i++) {
            paths[i].animation.call(self, paths[i].segment);
        }
    },

    // Make it fail
    triggerFail: function(actionText) {
        this.infinite = false;
        this.succeed = false;
        if (actionText) {
            this.text = actionText;
        }
    },

    triggerSilentFail: function(actionText) {
        this.infinite = false;
        this.succeed = false;
        this.silent = true;
        if (actionText) {
            this.text = actionText;
        }
    },

    // Make it succeed
    triggerSuccess: function(actionText) {
        this.infinite = false;
        this.succeed = true;
        if (actionText) {
            this.text = actionText;
        }
    },

    // Make it succeed silently
    triggerSilentSuccess: function(actionText) {
        this.infinite = false;
        this.succeed = true;
        this.silent = true;
        if (actionText) {
            this.text = actionText;
        }
    },

    // When each animation cycle is completed, check whether any feedback has triggered and call the feedback
    // handler, otherwise it restarts again
    completed: function(reset) {
        if (this.infinite) {
            for (var i = 0, paths = this.options.paths, len = paths.length; i < len; i++) {
                if (reset) {
                    paths[i].segment.draw(0, 0.1);
                }
                paths[i].animation.call(this, paths[i].segment);
            }
        } else {
            this.handleResponse();
        }
    },

    // Handle the feedback request, and perform the success or error animation
    handleResponse: function() {
        for (var i = 0, paths = this.options.paths, len = paths.length; i < len; i++) {
            paths[i].el.style.visibility = 'hidden';
        }
        if (!this.silent) {
            if (this.succeed) {
                this.success.style.visibility = 'visible';
                this.successAnimation();
            } else {
                this.error.style.visibility = 'visible';
                this.error2.style.visibility = 'visible';
                this.errorAnimation();
            }
        } else {
            this.reset();
        }
    },

    // Success animation
    successAnimation: function() {
        var self = this;
        // Override success text if passed via function call
        if (this.text) {
            self.successText = this.text;
        } else if (self.el.getAttribute("data-success")) {
            self.successText = self.el.getAttribute("data-success");
        }

        self.successSegment.draw('100% - 50', '100%', 0.4, {
            callback: function() {
                self.lstate = 'success';
                if (typeof(self.successText) !== 'undefined') {
                    self.span.innerHTML = self.successText;
                }
                addClass(self.el, 'succeed');
                setTimeout(function() {
                    self.reset();
                }, 2000);
            }
        });
    },

    // Error animation
    errorAnimation: function() {
        var self = this;
        // Override error text if passed via function call
        if (this.text) {
            self.errorText = this.text;
        } else if (self.el.getAttribute("data-fail")) {
            self.errorText = self.el.getAttribute("data-fail");
        }

        self.errorSegment.draw('100% - 42.5', '100%', 0.4);
        self.errorSegment2.draw('100% - 42.5', '100%', 0.4, {
            callback: function() {
                self.lstate = 'failed';
                if (typeof(self.errorText) !== 'undefined') {
                    self.span.innerHTML = self.errorText;
                }
                addClass(self.el, 'failed');
                setTimeout(function() {
                    self.reset();
                }, 2000);
            }
        });
    },

    // Reset the entire loading button to the initial state
    reset: function() {
        this.el.removeAttribute('disabled');
        removeClass(this.el, 'open-loading');
        this.lstate = 'default';
        if (this.defaultText) {
            this.resetText = this.defaultText;
        }
        if (this.el.getAttribute("data-reset")) {
            this.resetText = this.el.getAttribute("data-reset");
        }
        if (typeof(this.resetText) !== 'undefined') {
            this.span.innerHTML = this.resetText;
        }
        removeClass(this.el, 'succeed');
        removeClass(this.el, 'failed');
        this.resetSegments();
        this.infinite = true;
        for (var i = 0, paths = this.options.paths, len = paths.length; i < len; i++) {
            paths[i].el.style.visibility = 'visible';
        }
        this.success.style.visibility = 'hidden';
        this.error.style.visibility = 'hidden';
        this.error2.style.visibility = 'hidden';
    },

    // Reset the segments to the initial state
    resetSegments: function() {
        for (var i = 0, paths = this.options.paths, len = paths.length; i < len; i++) {
            paths[i].segment.draw(paths[i].begin, paths[i].end);
        }
        this.successSegment.draw(0, 0.1);
        this.errorSegment.draw(0, 0.1);
        this.errorSegment2.draw(0, 0.1);
    }
};

/** loading animation functions **/
function circularLoading(cssSelector) {
    var button = document.querySelector(cssSelector),
        options = {
            svg: 'circular',
            paths: [{
                selector: '.outer-path',
                animation: outerAnimation
            }, {
                selector: '.inner-path',
                animation: innerAnimation
            }]
        },
        loading = new LoadingButton(button, options);
        addClass(button, 'circular-loading');

    function outerAnimation(segment) {
        var self = this;
        segment.draw('15%', '25%', 0.2, {
            callback: function() {
                segment.draw('75%', '150%', 0.3, {
                    circular: true,
                    callback: function() {
                        segment.draw('70%', '75%', 0.3, {
                            circular: true,
                            callback: function() {
                                segment.draw('100%', '100% + 0.1', 0.4, {
                                    circular: true,
                                    callback: function() {
                                        self.completed(true);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    function innerAnimation(segment) {
        segment.draw('20%', '80%', 0.6, {
            callback: function() {
                segment.draw('100%', '100% + 0.1', 0.6, {
                    circular: true
                });
            }
        });
    }

    return loading;
}

function circleLoading(cssSelector) {
    var button = document.querySelector(cssSelector),
        options = {
            svg: 'circle',
            paths: [{
                selector: '.outer-path',
                animation: outerAnimation
            }, {
                selector: '.inner-path',
                animation: innerAnimation
            }]
        },
        loading = new LoadingButton(button, options),
        circles = button.querySelectorAll('circle');
        addClass(button, 'circle-loading');

    function outerAnimation(segment) {
        var self = this;
        segment.draw('-20%', '0%');
        segment.draw('-120%', '-100%', 1, {
            circular: true,
            callback: function() {
                if (self.infinite) {
                    outerAnimation.call(self, segment);
                    innerAnimation.call(self, self.options.paths[1].segment);
                } else {
                    segment.draw('-100%', '-100% + 0.1', 0.7, {
                        circular: true,
                        callback: function() {
                            removeClass(button, 'show-circles');
                            self.handleResponse();
                        }
                    });
                    self.options.paths[1].segment.draw('100%', '100% + 0.1', 0.7, {
                        circular: true
                    });
                }
            }
        });
    }

    function innerAnimation(segment) {
        segment.draw('30%', '50%');
        segment.draw('130%', '150%', 1, {
            circular: true,
            callback: function() {}
        });
    }

    return loading;
}

function infinityLoading(cssSelector) {
    var button = document.querySelector(cssSelector),
        options = {
            svg: 'infinity',
            paths: [{
                selector: '.infinity-path',
                animation: infinityAnimation
            }]
        },
        loading = new LoadingButton(button, options);
        addClass(button, 'infinity-loading');

    function infinityAnimation(segment) {
        var self = this;
        segment.draw('100%', '150%', 1, {
            circular: true,
            callback: function() {
                if (self.infinite) {
                    infinityAnimation.call(self, segment);
                } else {
                    segment.draw('100%', '100% + 0.1', 0.5, {
                        circular: true,
                        callback: function() {
                            self.handleResponse();
                        }
                    });
                }
            }
        });
    }

    return loading;
}
/** loading animation calls **/
function initializeLoading(cssSelector, options) {
    if (!cssSelector || document.querySelector(cssSelector) == null) {
        console.log('Invalid! No cssSelector passed.');
        return 'Invalid! No cssSelector passed.';
    } else {
        // Check/process options and clal the loading function.
        var loading = null;
        var defaultPosition = 'right';
        var ele = document.querySelector(cssSelector);
        if (ele.tagName !== "BUTTON" && ele.tagName !== "A") {
            defaultPosition = "inline";
        }

        if (typeof options == 'undefined') {
            options = {};
        }
        options = {
            position: options.position || defaultPosition,
            type: options.type || 'circular',
            scale: options.scale || null
        };

        addClass(ele, options.position);
        // Only scale for inline display, animation in buttons can't be scale.
        if (options.scale && options.position == 'inline') {
            addClass(ele, options.scale);
        }

        switch (options.type.toLowerCase()) {
            case 'circular':
                loading = circularLoading(cssSelector);
                break;
            case 'circle':
                loading = circleLoading(cssSelector);
                break;
            case 'infinity':
                loading = infinityLoading(cssSelector);
                break;

        }
        return loading;
    }
}
/** Loading Animations SVG Markup **/
function getAnimationMarkup(type) {
    var loadingType = type || 'circular';
    var svgMarkup = [];
    svgMarkup['circular'] = '<svg width="120px" height="120px"> <path class="outer-path color" d="M 60 60 m 0 -50 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"></path> <path class="inner-path color2" d="M 60 60 m 0 -30 a 30 30 0 1 1 0 60 a 30 30 0 1 1 0 -60"></path> <path class="success-path color" d="M 60 10 A 50 50 0 0 1 91 21 L 75 45 L 55 75 L 45 65"></path> <path class="error-path color" d="M 60 10 A 50 50 0 0 1 95 25 L 45 75"></path> <path class="error-path2 color" d="M 60 30 A 30 30 0 0 1 81 81 L 45 45"></path> </svg>';
    svgMarkup['circle'] = '<svg width="120px" height="120px"> <circle r="50" cx="60" cy="60" fill="none" class="color2"></circle> <circle r="30" cx="60" cy="60" fill="none" class="color2"></circle> <path class="outer-path color" d="M 60 60 m 0 -50 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"></path> <path class="inner-path color" d="M 60 60 m 0 -30 a 30 30 0 1 1 0 60 a 30 30 0 1 1 0 -60"></path> <path class="success-path color" d="M 60 10 A 50 50 0 0 0 16 36  L 45 65 L 55 75 L 75 45"></path> <path class="error-path color" d="M 60 10 A 50 50 0 0 0 25 95 L 75 45"></path> <path class="error-path2 color" d="M 60 30 A 30 30 0 0 1 81 81 L 45 45"></path> </svg>';
    svgMarkup['infinity'] = '<svg width="120px" height="60px"><path class="infinity-path color" d="M 30 10 a 20 20 0 1 0 0 40 c 20 0 40 -40 60 -40 a 20 20 0 0 1 0 40 c -20 0 -40 -40 -60 -40"></path><path class="success-path color" d="M 30 10 C 15 10 35 25 45 35 L 55 45 L 75 15"></path><path class="error-path color" d="M 30 10 a 20 20 0 1 0 0 40 Q 40 50 45 45 L 75 15"></path><path class="error-path2 color" d="M 30 10 Q 40 10 45 15 L 75 45"></path></svg>';

    if (svgMarkup[loadingType]) {
        return svgMarkup[loadingType];
    } else {
        return svgMarkup['circular'];
    }

}