# 01 — Clerk Nav

> Recreation of [clerk.com](https://clerk.com/) navigation bar (snapshot from Feb 2026).

## Demo

[Live demo](https://www.25600.design/01-clerk-nav)

<div align="center">

### Desktop

<video src="https://github.com/user-attachments/assets/ef87d493-3fec-413f-ba05-fb0e12700e07" controls width="700"></video>

### Mobile

<video src="https://github.com/user-attachments/assets/8fbf98af-c0a7-4e3a-8639-8e3d87a589f4" controls width="350"></video>

</div>

## What I found

The solution is implemented with BaseUI and CSS modules. The original is powered by RadixUI with TailwindCSS. My choice of stack was driven by two goals: try out a new UI library in the wild, and study styles up close without being tempted to just copy Tailwind classes from the original. Opting for vanilla (of a sort) CSS also brought up several interesting challenges, such as organizing design tokens and reusable styles, so it was definitely worth it.

However, my main goal was to explore the good taste and craft the Clerk team put into their work. Here is what caught my eye in what I'd call (and I don't hesitate using this word) a piece of art.

### 1. Buttons

As you'd expect from any exceptional UI, Clerk's buttons are treated with extra care.
The secret recipe is already laid out in this [tweet by Derek Briggs](https://x.com/PixelJanitor/status/1623358514440859649)
Here's what Clerk's buttons pull from the recipe:

- 0.5px dark box-shadow on outside of button to "cut" it into the surface
- Inner 1px top highlight for the primary _"light source"_ from above
- Subtle gradient background
- And in that case it has one smooth drop shadow

The following video shows off the button going from flat to final with all the ingredients kicking in.

<video src="https://github.com/user-attachments/assets/6723c00f-96dc-4c3a-9e4b-11f1f1ac9d17" controls width="700"></video>

### 2. Frosted glass effect (progressive blur)

When the user starts scrolling, the area under the navbar appears “frosted.” How is this done? The technique is called progressive blur.
The idea is to stack multiple layers, each with a gradient and a blur filter. The blur increases progressively, every next layer in the stack is more blurred, while the gradient fades out at a different height. Together, they create a smooth blur-to-clear transition that gives you that frosty feeling.
Clerk’s version has one more small detail — the frost is slightly opaque at first and fades in on scroll, adding extra depth to the effect.

<video src="https://github.com/user-attachments/assets/222b6df9-0221-4759-a1a0-9cd60fde59d3" controls width="700"></video>

### 3. Light/dark theme swap on scroll

As the user scrolls through the page, the navbar adapts its color theme to match the section beneath it. I didn't even pick up on it at first glance, that's how natural it feels!

<video src="https://github.com/user-attachments/assets/20e6e3a9-9ba3-48e9-84c9-05e03b38b26a" controls width="700"></video>

### 4. Custom css transitions

Not a single built-in CSS easing function is used. It relies on hand-crafted, close-to-physics easings that feel realistic and don't give off that uncomfortable mechanical feeling. I had to dig those out of the source code to reproduce them, of course. The most commonly used one is a custom "ease-out”. It starts fast and settles in slowly, snappier and more natural than the built-in ease-out. See how it stacks up against the CSS built-in one.

<video src="https://github.com/user-attachments/assets/9c7e592c-9593-4d34-b63a-aaa64c7d8b9f" controls width="700"></video>

### 5. Complex multi-level menu

This was the toughest part for me. It's hard to inspect a hover-triggered popup in the browser, and the complexity of this one goes far beyond what you'd think at first glance. The panel is a grid of two columns, yet the right column is hidden behind the left one and slides in on menu item hover. The column and its element animations are powered by Motion.js for better control over physics and sequencing. On top of that, the icons used in that specific navigation item are styled with gradients and shadows, making them stand out. Reproducing all of this gave me hard times, but it revealed just how much invisible work goes into making exceptional UIs!

<video src="https://github.com/user-attachments/assets/55486c77-eb22-429d-b30e-05bc094e258a" controls width="700"></video>
