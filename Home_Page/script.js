function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco();


const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
  ./scene00001.png
./scene00003.png
./scene00005.png
./scene00007.png
./scene00009.png
./scene00011.png
./scene00013.png
./scene00015.png
./scene00017.png
./scene00019.png
./scene00021.png
./scene00023.png
./scene00025.png
./scene00027.png
./scene00029.png
./scene00031.png
./scene00033.png
./scene00035.png
./scene00037.png
./scene00039.png
./scene00041.png
./scene00043.png
./scene00045.png
./scene00047.png
./scene00049.png
./scene00051.png
./scene00053.png
./scene00055.png
./scene00057.png
./scene00059.png
./scene00061.png
./scene00063.png
./scene00065.png
./scene00067.png
./scene00069.png
./scene00071.png
./scene00073.png
./scene00075.png
./scene00077.png
./scene00079.png
./scene00081.png
./scene00083.png
./scene00085.png
./scene00087.png
./scene00089.png
./scene00091.png
./scene00093.png
./scene00095.png
./scene00097.png
./scene00099.png
./scene00101.png
./scene00103.png
./scene00105.png
./scene00107.png
./scene00109.png
./scene00111.png
./scene00113.png
./scene00115.png
./scene00117.png
./scene00119.png
./scene00121.png
./scene00123.png
./scene00125.png
./scene00127.png
./scene00129.png
./scene00131.png
./scene00133.png
./scene00135.png
./scene00137.png
./scene00139.png
./scene00141.png
./scene00143.png
./scene00145.png
./scene00147.png
./scene00149.png
./scene00151.png
./scene00153.png
./scene00155.png
./scene00157.png
./scene00159.png
./scene00161.png
./scene00163.png
./scene00165.png
./scene00167.png
./scene00169.png
./scene00171.png
./scene00173.png
./scene00175.png
./scene00177.png
./scene00179.png
./scene00181.png
./scene00183.png
./scene00185.png
./scene00187.png
./scene00189.png
./scene00191.png
./scene00193.png
./scene00195.png
./scene00197.png
./scene00199.png
./scene00201.png
./scene00203.png
./scene00205.png
./scene00207.png
./scene00209.png
./scene00211.png
./scene00213.png
./scene00215.png
./scene00217.png
./scene00219.png
./scene00221.png
./scene00223.png
./scene00225.png
./scene00227.png
./scene00229.png
./scene00231.png
./scene00233.png
./scene00235.png
./scene00237.png
./scene00239.png
./scene00241.png
./scene00243.png
./scene00245.png
./scene00247.png
./scene00249.png
./scene00251.png
./scene00253.png
./scene00255.png
./scene00257.png
./scene00259.png
./scene00261.png
./scene00263.png
./scene00265.png
./scene00267.png
./scene00269.png
./scene00271.png
./scene00273.png
./scene00275.png
./scene00277.png
./scene00279.png
./scene00281.png
./scene00283.png
./scene00285.png
./scene00287.png
./scene00289.png
./scene00291.png
./scene00293.png
./scene00295.png
./scene00297.png
./scene00299.png
./scene00301.png
./scene00303.png
./scene00305.png
./scene00307.png
./scene00309.png
./scene00311.png
./scene00313.png
./scene00315.png
./scene00317.png
./scene00319.png
./scene00321.png
./scene00323.png
./scene00325.png
./scene00327.png
./scene00329.png
./scene00331.png
./scene00333.png
./scene00335.png
./scene00337.png
./scene00339.png
./scene00341.png
./scene00343.png
./scene00345.png
./scene00347.png
./scene00349.png
 `;
  return data.split("\n")[index];
}

const frameCount = 175;


const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page>canvas`,
    start: `top top`,
    end: `300% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({
  trigger: "#page>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `top top`,
  end: `300% top`,
});