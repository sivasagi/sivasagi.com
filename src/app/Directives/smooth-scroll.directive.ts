// Code copied from https://github.com/kavil/ng2SmoothScroll
// We are using this code because it has a MIT license

// Currently we are not using this directive as we are using different plugin for smooth scrolling

import { Directive, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[nwScrollTo]'
})

export class SmoothScrollToDirective {
    private reference: SmoothScroll;
    targetElement: any;
    callbackBeforeEx: any;
    callbackAfterEx: any;
    @Input() nwScrollTo: any;
    @Input() duration: number;
    @Input() offset: number;
    @Input() easing: string;
    @Input() callbackBefore: Function;
    @Input() callbackAfter: Function;
    @Input() containerId: string;

    constructor() {
    }

    @HostListener('click')
    onClick() {

        this.targetElement = document.getElementById(this.nwScrollTo);
        if (!this.targetElement) {
            return;
        }
        const _callbackBefore = this.callbackBefore;
        const callbackBefore = function (element: any) {
            if (_callbackBefore) {
                const exprHandler = this.callbackBeforeEx({element: element});
                if (typeof exprHandler === 'function') {
                    exprHandler(element);
                }
            }
        };

        const _callbackAfter = this.callbackAfter;
        const callbackAfter = function (element: any) {
            if (_callbackAfter) {
                const exprHandler = this.callbackAfterEx({element: element});
                if (typeof exprHandler === 'function') {
                    exprHandler(element);
                }
            }
        };

        let reference: SmoothScroll = new SmoothScroll(this.targetElement, {
            duration      : this.duration,
            offset        : this.offset,
            easing        : this.easing,
            callbackBefore: callbackBefore,
            callbackAfter : callbackAfter,
            containerId   : this.containerId
        });
    };

}

class SmoothScroll {
    constructor(element: any, options: any) {
        this.smoothScroll(element, options);
    }

    private smoothScroll(element: any, options: any) {
        options = options || {};

        // Options
        const duration = options.duration || 800,
            offset = options.offset || 0,
            easing = options.easing || 'easeInOutQuart',
            callbackBefore = options.callbackBefore || function () {
                },
            callbackAfter = options.callbackAfter || function () {
                },
            container = document.getElementById(options.containerId) || null,
            containerPresent = (container !== undefined && container != null);
        const getScrollLocation = function () {
            if (containerPresent) {
                return container.scrollTop;
            } else {
                if (window.pageYOffset) {
                    return window.pageYOffset;
                } else {
                    return document.documentElement.scrollTop;
                }
            }
        };
        const getEasingPattern = function (type: string, time: number) {
            switch (type) {
                case 'easeInQuad':
                    return time * time; // accelerating from zero velocity
                case 'easeOutQuad':
                    return time * (2 - time); // decelerating to zero velocity
                case 'easeInOutQuad':
                    return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
                case 'easeInCubic':
                    return time * time * time;
                case 'easeOutCubic':
                    return (--time) * time * time + 1; // decelerating to zero velocity
                case 'easeInOutCubic':
                    return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
                case 'easeInQuart':
                    return time * time * time * time; // accelerating from zero velocity
                case 'easeOutQuart':
                    return 1 - (--time) * time * time * time; // decelerating to zero velocity
                case 'easeInOutQuart':
                    return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time;
                case 'easeInQuint':
                    return time * time * time * time * time; // accelerating from zero velocity
                case 'easeOutQuint':
                    return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
                case 'easeInOutQuint':
                    return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time;
                default:
                    return time;
            }
        };
        const getEndLocation = function (element: any) {
            let location = 0;
            if (element.offsetParent) {
                do {
                    location += element.offsetTop;
                    element = element.offsetParent;
                } while (element);
            }
            location = Math.max(location - offset, 0);
            return location;
        };

        // Initialize the whole thing
        setTimeout(function () {
            let currentLocation = null,
                startLocation = getScrollLocation(),
                endLocation = getEndLocation(element),
                timeLapsed = 0,
                distance: number = endLocation - startLocation,
                percentage: number,
                position: number,
                scrollHeight: number,
                internalHeight: number;

            const stopAnimation = function () {
                currentLocation = getScrollLocation();
                if (containerPresent) {
                    scrollHeight = container.scrollHeight;
                    internalHeight = container.clientHeight + currentLocation;
                } else {
                    scrollHeight = document.body.scrollHeight;
                    internalHeight = window.innerHeight + currentLocation;
                }

                if (
                    ( // condition 1
                        position === endLocation
                    ) ||
                    ( // condition 2
                        currentLocation === endLocation
                    ) ||
                    ( // condition 3
                        internalHeight >= scrollHeight
                    )
                ) { // stop
                    clearInterval(runAnimation);
                    callbackAfter(element);
                }
            };
            const animateScroll = function () {
                timeLapsed += 16;
                percentage = (timeLapsed / duration);
                percentage = (percentage > 1) ? 1 : percentage;
                position = startLocation + (distance * getEasingPattern(easing, percentage));
                if (containerPresent) {
                    container.scrollTop = position;
                } else {
                    window.scrollTo(0, position);
                }
                stopAnimation();
            };
            callbackBefore(element);
            const runAnimation = setInterval(animateScroll, 16);
        }, 0);

    }
}
