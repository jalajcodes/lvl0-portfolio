const loader = document.querySelector(".loader");

gsap.set(loader, {
    scaleX: 0,
    rotation: 10,
    xPercent: -5,
    yPercent: -50,
    transformOrigin: "left center",
    autoAlpha: 1,
});
window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    AOS.init();
    barba.init({
        sync: true,
        views: [
            {
                namespace: "home",
                beforeEnter({ next }) {
                    let script = document.createElement("script"); //create a script element
                    script.src = "tilt.js"; //specify the directory of the script you want to load
                    next.container.appendChild(script);
                },
            },
        ],
        transitions: [
            {
                async leave() {
                    await loaderIn();
                },
                enter() {
                    loaderAway();
                },
            },
        ],
    });

    barba.hooks.before(() => {
        document.querySelector("html").classList.add("is-transitioning");
    });

    barba.hooks.after(() => {
        document.querySelector("html").classList.remove("is-transitioning");
    });

    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    VanillaTilt.init(document.querySelectorAll(".section"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 1,
    });
});

function loaderIn() {
    return gsap.fromTo(
        loader,
        {
            rotation: 10,
            scaleX: 0,
            xPercent: -5,
        },
        {
            duration: 0.8,
            xPercent: 0,
            scaleX: 1,
            rotation: 0,
            ease: "power4.inOut",
            transformOrigin: "left center",
        }
    );
}

function loaderAway() {
    return gsap.to(loader, {
        duration: 0.8,
        scaleX: 0,
        xPercent: 5,
        rotation: -10,
        transformOrigin: "right center",
        ease: "power4.inOut",
    });
}
