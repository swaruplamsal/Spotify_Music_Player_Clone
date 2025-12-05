function setActive(clickedButton) {
  // Remove the 'active' class from all buttons
  const buttons = document.querySelectorAll(".homepageOptions");
  buttons.forEach((button) => button.classList.remove("active"));

  // Add the 'active' class to the clicked button
  clickedButton.classList.add("active");
}
