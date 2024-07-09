# TailwindCSS Style Guide

Since TailwindCSS applies styles by adding classes to elements, the order in which classes are added can make it so that styling becomes hard to mantain and keep conistent

This document outlines in which order, and what priority should be given when applying classes to an element

    <div class="(position) (display) (align & justify) (width) (height) (margin) (padding) (tailwind-spacing) (animate) (border & rounded) (shadow) (color) (text & font)">
    </div>

When styling elements the above order should be followed, if an element lacks any of the detailed styling it is ommitted and order is preserved.

Tailwind decorators for breakpoints, hover, focus, etc.. (such as `sm:width hover:bg-color focus:color`) should be placed directly after the default styles.

`animate` refers to the tailwind animate decorators <br>
`rounded` refers to the tailwind style for rounded corners <br>
`shadow` refers to the tailwind box-shadow implementation <br>