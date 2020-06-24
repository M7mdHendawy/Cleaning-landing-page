const buttons = document.querySelectorAll(".animated-button");
buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", function (e) {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement("span");
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    this.appendChild(ripples);

    setTimeout(() => {
      ripples.remove();
    }, 1000);
  });
});

//DOM elements
const DOMstrings = {
  stepsBtnClass: "multisteps-form__progress-btn",
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector(".multisteps-form__progress"),
  stepsForm: document.querySelector(".multisteps-form__form"),
  stepsFormTextareas: document.querySelectorAll(".multisteps-form__textarea"),
  stepFormPanelClass: "multisteps-form__panel",
  stepFormPanels: document.querySelectorAll(".multisteps-form__panel"),
  stepPrevBtnClass: "js-btn-prev",
  stepNextBtnClass: "js-btn-next",
};

//remove class from a set of items
const removeClasses = (elemSet, className) => {
  elemSet.forEach((elem) => {
    elem.classList.remove(className);
  });
};

//return exect parent node of the element
const findParent = (elem, parentClass) => {
  let currentNode = elem;

  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;
};

//get active button step number
const getActiveStep = (elem) => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = (activeStepNum) => {
  //remove active state from all the state
  removeClasses(DOMstrings.stepsBtns, "js-active");

  //set picked items to active
  DOMstrings.stepsBtns.forEach((elem, index) => {
    if (index <= activeStepNum) {
      elem.classList.add("js-active");
    }
  });
};

//get active panel
const getActivePanel = () => {
  let activePanel;

  DOMstrings.stepFormPanels.forEach((elem) => {
    if (elem.classList.contains("js-active")) {
      activePanel = elem;
    }
  });

  return activePanel;
};

//open active panel (and close unactive panels)
const setActivePanel = (activePanelNum) => {
  //remove active class from all the panels
  removeClasses(DOMstrings.stepFormPanels, "js-active");

  //show active panel
  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {
      elem.classList.add("js-active");

      setFormHeight(elem);
    }
  });
};

//set form height equal to current panel height
const formHeight = (activePanel) => {
  const activePanelHeight = activePanel.offsetHeight;

  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
};

const setFormHeight = () => {
  const activePanel = getActivePanel();

  formHeight(activePanel);
};

//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener("click", (e) => {
  //check if click target is a step button
  const eventTarget = e.target;

  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }

  //get active button step number
  const activeStep = getActiveStep(eventTarget);

  //set all steps before clicked (and clicked too) to active
  setActiveStep(activeStep);

  //open active panel
  setActivePanel(activeStep);
});

//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener("click", (e) => {
  const eventTarget = e.target;

  //check if we clicked on `PREV` or NEXT` buttons
  if (
    !(
      eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) ||
      eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)
    )
  ) {
    return;
  }

  //find active panel
  const activePanel = findParent(
    eventTarget,
    `${DOMstrings.stepFormPanelClass}`
  );

  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(
    activePanel
  );

  //set active step and active panel onclick
  if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
    activePanelNum--;
  } else {
    activePanelNum++;
  }

  setActiveStep(activePanelNum);
  setActivePanel(activePanelNum);
});

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener("load", setFormHeight, false);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener("resize", setFormHeight, false);

//changing animation via animation select !!!YOU DON'T NEED THIS CODE (if you want to change animation type, just change form panels data-attr)

const setAnimationType = (newType) => {
  DOMstrings.stepFormPanels.forEach((elem) => {
    elem.dataset.animation = newType;
  });
};

$(function () {
  $("#datepicker").datepicker();
});

var covdiv = document.createElement("div");
document.body.appendChild(covdiv).classList.add("nCov19");
document.body.appendChild(covdiv).innerHTML =
  "<div class='covid19-top'> <p> فيروس كورونا <span class='call'> خليك بالبيت <span id='dismiss'>x</span> </span></p>";
var sheet = document.createElement("style");
sheet.innerHTML =
  ".nCov19{position:fixed;z-index:999999;bottom:20px;right:0;font-family:tahoma;display:inline-block;color:#FFF;border-radius:30px 0 0 30px;padding:0;direction:rtl;overflow:hidden; background: #025bbc url('http://covid19-codes.com/4f.svg') top no-repeat}\n" +
  ".covid19-top p{font-size:14px;padding:0;margin:0;font-weight:bold;padding-right:15px;}\n" +
  ".covid19-top span.call{background-color:#f6a703;color:#333;display:inline-block;padding-top:10px;padding-bottom:10px;padding-right:15px;padding-left:15px;margin-right:15px;}\n" +
  "#dismiss{margin-right:5px;height:15px;width:15px;line-height:12px;display:inline-block;background-color:#333;color:#FFF;border-radius:10px;text-align:center; cursor:pointer;}\n";
document.head.appendChild(sheet);
var dismiss = document.getElementById("dismiss");
var log = document.querySelector(".nCov19");
dismiss.onclick = function () {
  document.querySelector(".nCov19").style.display = "none";
};
