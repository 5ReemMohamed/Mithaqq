document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const userEmail = document.getElementById("userEmail"); 
  const password = document.getElementById("password");
  const roleSelect = document.getElementById("role");

  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-Z\s]{3,}$/
  };

  function showError(input, message) {
    const errorMsg = input.closest(".col-12, .co-12").querySelector(".error-msg");
    if (errorMsg) errorMsg.textContent = message;
  }

  function clearError(input) {
    const errorMsg = input.closest(".col-12, .co-12").querySelector(".error-msg");
    if (errorMsg) errorMsg.textContent = "";
  }

  function validateField(input) {
    const value = input.value.trim();

    if (input.id === "userEmail") {
      if (!value) {
        showError(input, "Email or Name is required");
        return false;
      } else if (!patterns.email.test(value) && !patterns.name.test(value)) {
        showError(input, "Enter a valid email or name");
        return false;
      }
    }

    if (input.id === "password") {
      if (!value) {
        showError(input, "Password is required");
        return false;
      }
    }

    if (input.id === "role") {
      if (!value) {
        showError(input, "Please select a role");
        return false;
      }
    }

    clearError(input);
    return true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    [userEmail, password, roleSelect].forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const enteredValue = userEmail.value.trim();
      const enteredPassword = password.value.trim();
      const enteredRole = roleSelect.value;

      const foundUser = users.find(u =>
        (u.email === enteredValue || u.name === enteredValue) &&
        u.password === enteredPassword &&
        u.role === enteredRole
      );

      if (foundUser) {
        alert("Login successful!");

        if (foundUser.role === "admin") {
          window.location.href = "admin-dashboard.html";
        } else if (foundUser.role === "marketer") {
          window.location.href = "marketer-dashboard.html";
        } else {
          window.location.href = "index.html";
        }
      } else {
        alert("Invalid login details. Please try again.");
      }
    }
  });

  [userEmail, password, roleSelect].forEach(input => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("change", () => validateField(input));
  });

  document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", function () {
      const inputId = icon.getAttribute("data-input");
      const input = document.getElementById(inputId);
      if (input) {
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
      }
    });
  });
});
