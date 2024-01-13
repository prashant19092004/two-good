// const scroll = new LocomotiveScroll({
//     el: document.querySelector('.main'),
//     smooth: true
// });

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


function videoAnimation(){
    const videoDiv = document.querySelector(".video-div");
    const imaginary = document.querySelector(".imaginary");
    const body = document.querySelector("body");
    const play = document.querySelector(".play");

    body.addEventListener("mousemove", (idx) =>{
        // console.log(idx.y);
        gsap.to(play, {
            x:idx.x-50,
            y:idx.y-50
        })
    })

    imaginary.addEventListener("mouseover", () =>{
        gsap.to(play, {
            scale:1,
            opacity:1,
        })
    });

    imaginary.addEventListener("mouseout", () =>{
        gsap.to(play, {
            scale:0,
            opacity:0,
        })
    });
}
videoAnimation();

function page1Animation(){
    const tl = gsap.timeline();

    tl.from(".page1 h1", {
        y:100,
        opacity:0,
        stagger:0.2,
        delay:0.5,
        duration:0.5
    })
    tl.from(".page1 video", {
        scale:0.9,
        opacity:0,
        duration:0.5
    })
}
page1Animation();

// function productAnimation(){
//     // const videoDiv = document.querySelector(".video-div");
//     const imaginary = document.querySelector(".products");
//     const body = document.querySelector("body");
//     const play1 = document.querySelector(".play1");

//     body.addEventListener("mousemove", (idx) =>{
//         console.log(idx.x);
//         // gsap.to(play1, {
//         //     x:idx.x-75,
//         //     y:idx.y-75
//         // })
//         top:idx.x;
//         left:idx.y
//     })

//     // imaginary.addEventListener("mouseenter", () =>{
//     //     gsap.to(play1, {
//     //         scale:1,
//     //         opacity:1,
//     //     })
//     // });

//     // imaginary.addEventListener("mouseleave", () =>{
//     //     gsap.to(play1, {
//     //         scale:0,
//     //         opacity:0,
//     //     })
//     // });
// }
// productAnimation();

function productAnimation() {
    const body = document.querySelector("body");
    const play1 = document.querySelector(".play1");
    const products = document.querySelectorAll(".products");

    body.addEventListener("mousemove", (idx) => {
        gsap.to(play1, {
            x:idx.x-75,
            y:idx.y-75,
        })
    })

    products.forEach((product) => {
        product.addEventListener("mouseenter", () =>{
            gsap.to(play1, {
                scale:1,
                opacity:1,
            })
        });
    })

    products.forEach((product) => {
        product.addEventListener("mouseleave", () =>{
            gsap.to(play1, {
                scale:0,
                opacity:0,
            })
        });
    })
}
productAnimation();