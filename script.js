const shareButton = document.querySelector(".sharebutton");
const shareToast = document.querySelector(".articlecard__sharetoast");
let mouseOnButton = false;
let mouseOnToast = false;

// hides share toast when user clicks outside
function showToast() {
    shareToast.style.display = "flex";
    shareToast.classList.remove("hidden");
}
function hideToast() {
    shareToast.classList.add("hidden");
}

function outsideClick(e) {
    if ( // if user clicked outside of the share button and toast
        !shareButton.contains(e.target) &&
        !shareToast.contains(e.target) 
    ) {
        shareButton.setAttribute("aria-pressed", "false"); // unpress the button
        hideToast();
        document.removeEventListener("click", outsideClick); // remove this event listener
    }
}

// checks if we are hovering over button/toast and whether to hide it if not
function checkFlags() {
    if (!(mouseOnButton || mouseOnToast)) {
        shareButton.classList.remove("hovering");

        if (shareButton.getAttribute("aria-pressed") === "false") {
            hideToast();
        }
    }
}

// shareButton clicking logic
shareButton.addEventListener("click", () => {
    const isPressed = shareButton.getAttribute("aria-pressed") === "true"; // get state of the button
    shareButton.setAttribute("aria-pressed", !isPressed); // change its state to the opposite

    if (shareButton.getAttribute("aria-pressed") === "true") { // if button ends up as pressed
        showToast();
        document.addEventListener("click", outsideClick) // create listener to hide toast when user clicks outside of it
    } else { // if button ends up as unpressed
        hideToast();
        document.removeEventListener("click", outsideClick); // remove listener for outside clicks (not needed anymore)
    }
});

shareButton.addEventListener("mouseenter", () => {
    mouseOnButton = true;
    shareButton.classList.add("hovering"); // hovering class will keep the button dark when we are hovering over it or over the toast
    showToast(); // we want to show the toast on hover
});
shareButton.addEventListener("mouseleave", () => {
    mouseOnButton = false;
    setTimeout(checkFlags, 100);
});

shareToast.addEventListener("mouseenter", () => {
    mouseOnToast = true;
});
shareToast.addEventListener("mouseleave", () => {
    mouseOnToast = false;
    setTimeout(checkFlags, 100);
});

// we want to change the display type of the toast to none after it becomes invisible
shareToast.addEventListener("transitionend", () => {
    if (shareToast.classList.contains("hidden")) {
        shareToast.style.display = "none";
    }
});
