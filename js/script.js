// Get elements from DOM
const liquid = document.querySelector('.liquid');
const cubes = document.querySelectorAll('.ice-cube');
const straw = document.querySelector('.straw');
const blob = document.querySelector('.blob');
const circle = document.querySelector('.circle');
const accents = document.querySelector('.accents')
const leafLeft1 = document.querySelector('.leaf-left-1');
const leafLeft2 = document.querySelector('.leaf-left-2');
const leafRight1 = document.querySelector('.leaf-right-1');
const leafRight2 = document.querySelector('.leaf-right-2');

const scrollThreshold = 500; // Defines constant 'scrollThreshold' with a value of 500 - will later be used to determine how much the user needs to scroll before certain effects start taking place.

const startingPosition = parseFloat(getComputedStyle(liquid).top); // Gets the computed style of the 'liquid' element and extracts it's 'top' property. This value represents the initial vertical position of the liquid element on the page.

// Declare relativeScroll as a global variable
let relativeScroll;

// Function to animate the individual leaves. The function takes one parameter 'translateY'
const animateLeaves = (translateY) => {
    const leafHorizontalMovement = 60; // Defines how much the leaves move horizontally as the user scrolls.
    const leafUpwardMovement = 100; // Defines how much the leaves move upward as the user scrolls.

    // Calculate the rotation angle of the leaves based on the relativeScroll value. This angle changes as the user scrolls.
    const rotationAngle = (relativeScroll - 0.5) * 20; // Adjust the rotation angle range
  
    // Left Leaves - calculate the horizontal (leafLeftXMovement) and vertical (leafLeftYMovement) movement of the leaves on the left side of the liquid based on the relativeScroll value.
    const leafLeftXMovement = -leafHorizontalMovement * (1 + relativeScroll);
    const leafLeftYMovement = -leafUpwardMovement * (1 - relativeScroll);

    // apply transformations to the left leaves elements.
    leafLeft1.style.transform = `translateX(${leafLeftXMovement}px) translateY(${translateY + leafLeftYMovement}px) rotate(${rotationAngle - 14}deg) scaleX(-1)`;
    leafLeft2.style.transform = `translateX(${leafLeftXMovement}px) translateY(${translateY + leafLeftYMovement}px) rotate(${rotationAngle - 20}deg) scaleX(-1)`;
  
    // Right Leaves - calculate the horizontal (leafRightXMovement) and vertical (leafRightYMovement) movement of the leaves on the right side of the liquid based on the relativeScroll value.
    const leafRightXMovement = leafHorizontalMovement * (1 + relativeScroll);
    const leafRightYMovement = -leafUpwardMovement * (1 - relativeScroll);

    // apply transformations to the right leaves elements.
    leafRight1.style.transform = `translateX(${leafRightXMovement}px) translateY(${translateY + leafRightYMovement}px) rotate(${-rotationAngle + 20}deg)`;
    leafRight2.style.transform = `translateX(${leafRightXMovement}px) translateY(${translateY + leafRightYMovement}px) rotate(${-rotationAngle + 20}deg)`;
  };
  

// Function to update the liquid element's position (and more)
const updateLiquidPosition = () => {
  const scrollY = window.scrollY; // Assign the current vertical scroll position of the window using window.scrollY.
  relativeScroll = Math.min(scrollY / scrollThreshold, 2); // Assign relativeScroll and calculate it
  const translateY = startingPosition - relativeScroll * startingPosition * 0.85; // Calculate translateY. The multiplication by 0.85 adds a parallax effect, causing the liquid to move less than the scroll distance.
  const marginLeft = 100; // Negative margin-left value
  liquid.style.transform = `translate(calc(-50% + ${marginLeft}px), ${translateY}px)`; //This centers the element horizontally with a margin to the left.
  
  // Update ice cubes' positions to follow the liquid, but only after a certain distance
  if (translateY <= startingPosition - 20) {
    const cubeTranslateY = translateY - 120; // Adjust this value as needed
    cubes.forEach(cube => {
      cube.style.transform = `translateX(calc(-50% + ${marginLeft}px - 50px)) translateY(${cubeTranslateY}px) rotate(14deg)`;
    });
  }

  // Update straw's rotation based on liquid's position
  const rotationAngle = -1 + (1 - relativeScroll) * 2; // Reverse rotation direction
  straw.style.transform = `rotate(${rotationAngle}deg)`; // Apply the rotation effect

  // Update blob's scale based on liquid's position
  const blobMinScale = 0;
  const blobMaxScale = 0.6;
  const blobScale = blobMaxScale - (1 - relativeScroll) * (blobMaxScale - blobMinScale);
  blob.style.transform = `scale(${blobScale})`;

   // Update circle's scale based on liquid's position
   const circleMinScale = 0;
   const circleMaxScale = 0.4;
   const circleScale = circleMaxScale - (1 - relativeScroll) * (circleMaxScale - circleMinScale);
   circle.style.transform = `scale(${circleScale})`;

    // Update accent's scale based on liquid's position
    const accentMinScale = 0;
    const accentMaxScale = 0.4;
    const accentScale = circleMaxScale - (1 - relativeScroll) * (accentMaxScale - accentMinScale);
    accents.style.transform = `scale(${accentScale})`;
   

  // Call the animateLeaves function
  animateLeaves(translateY); 
};

// Call the update function initially to position the elements
updateLiquidPosition();

// Trigger the update function when the page loads
window.addEventListener('load', updateLiquidPosition);

// Update elements' positions on scroll
window.addEventListener('scroll', updateLiquidPosition);



const colorToggleButton = document.getElementById('colorChangeButton');
const liquidRect = document.getElementById('Liquid');
const bodyColor = document.querySelector('.bodyColor');
const orangePeel = document.querySelector('.cls-4-orange');
const orangePeelInner = document.querySelector('.cls-1-orange');
const orangeMeat = document.querySelector('.cls-2-orange');
const orangeMeatPieces = document.querySelectorAll('.cls-3-orange'); // Use querySelectorAll to select all elements with the class
const leafColors = document.querySelectorAll('.cls-2-leaf');
const progressBar = document.querySelector('.progress-bar');

let isColorChanged = false;

colorToggleButton.addEventListener('click', () => {
  isColorChanged = !isColorChanged;

  if (isColorChanged) {
    // Change to the specific color
    liquidRect.style.fill = '#8861D0';
    orangePeel.style.fill = '#8861D0';
    orangeMeat.style.fill = '#B8A1E3';
    orangePeelInner.style.fill = '#A081D9';
    bodyColor.style.backgroundColor = '#DB5461';
    progressBar.style.backgroundColor = '#8861D0'

    // Loop through all orange meat pieces and change their fill color
    orangeMeatPieces.forEach(piece => {
      piece.style.fill = '#A081D9';
    });

    leafColors.forEach(color => {
      color.style.fill = '#ff8a5b';
    });


  } else {
    // Revert to the initial color
    liquidRect.style.fill = '#ff8a5b';
    orangePeel.style.fill = '#d85903';
    orangeMeat.style.fill = '#ffc1b0';
    orangePeelInner.style.fill = '#f99348';
    bodyColor.style.backgroundColor = '#25CED1';
    progressBar.style.backgroundColor = '#ff8a5b'

    // Loop through all orange meat pieces and revert their fill color
    orangeMeatPieces.forEach(piece => {
      piece.style.fill = '#ff8a5b';
    });

    leafColors.forEach(color => {
      color.style.fill = '#ff5a5f';
    });
  }
});




const orangeSVG = document.querySelector('.orange');
const waveSVG = document.querySelector('.wave');

orangeSVG.addEventListener("click", () => {
  waveSVG.classList.toggle("active");
});


const goToAnimation = document.querySelector('.watch-vid');

goToAnimation.addEventListener("click", function () {
    // Redirect to the index.html page
    window.location.href = "video.html";
});



// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}





