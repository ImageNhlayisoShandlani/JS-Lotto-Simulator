"use strict";

//Variables
let lottoNumbers = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
let macthedNumbers = [];
let selectedNumber = [];
let winingNumbers = [];
let pickedNumbersDiv = document.querySelector(".picked__nunbers");
let winingNumbersDiv = document.querySelector(".winning__numbers");
let matches = 0;

//Events
document.addEventListener("DOMContentLoaded", () => {
  lottoNumbers.forEach((number) => {
    let numberDiv = document.createElement("div");
    numberDiv.textContent = number;
    document.querySelector(".lotto__pick").appendChild(numberDiv);
  });

  document.querySelectorAll(".lotto__pick div").forEach((div) => {
    div.addEventListener("click", () => handleNumberSelection(div));
  });

  document.querySelector("button").addEventListener("click", () => {
    if (winingNumbers.length <= 0) {
      generateDrawNumbers();
    } else {
      alert(
        "You have already submitted the draw! Please refresh the page to play again.",
      );
    }
  });
});

//Functions

/**
 *
 * @param {HTMLDivElement} div
 * This function handles the selection of numbers by the user. It checks if the user has already selected 6 numbers
 * and if the number is not already selected. If both conditions are met, it adds the number to the selectedNumber array,
 * adds a "selected" class to the div, and appends it to the pickedNumbersDiv. If the user tries to select more than 6 numbers,
 * an alert is shown.
 */
function handleNumberSelection(div) {
  if (selectedNumber.length < 6 && !selectedNumber.includes(div.textContent)) {
    selectedNumber.push(div.textContent);
    console.log(selectedNumber);
    div.classList.add("selected");
    pickedNumbersDiv.appendChild(div);
  } else {
    alert("You can only select 6 numbers!");
  }
}

/**
 *
 * This function genrates a 6 random draw numbers between 1-20
 */

function generateDrawNumbers() {
  if (selectedNumber.length < 6) {
    alert("Please select 6 numbers before submitting the draw!");
    return;
  }

  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * lottoNumbers.length);
    let number = lottoNumbers[index];
    if (!winingNumbers.includes(number)) {
      winingNumbers.push(number);
    } else {
      i--;
    }
  }

  winingNumbers.forEach((number) => {
    let numberDiv = document.createElement("div");
    numberDiv.textContent = number;
    winingNumbersDiv.appendChild(numberDiv);
  });

  if (matches > 0) {
    alert(
      "Congratulations! You matched " +
        matches +
        " numbers!" + " which are " +
        findMatches().map((item) => item),
    );
  } else {
    alert("Sorry, you didn't match any numbers. Better luck next time!");
  }
  console.log(winingNumbers);
}

function findMatches() {
  selectedNumber.forEach((number) => {
    if (winingNumbers.includes(number)) {
      matches++;
      macthedNumbers.push(number);
    }
  });

  return macthedNumbers;
}
