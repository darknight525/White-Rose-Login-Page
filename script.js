let storedUsername = "user123";
let storedPassword = "admin123";

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.textContent = "");
}

function showForm(formId) {
  ['loginForm', 'signUpForm', 'forgotPasswordForm'].forEach(id => {
    document.getElementById(id).style.display = id === formId ? "flex" : "none";
  });
  clearErrors();
  hideUsernameHint(true);
}

function validateUsername(username) {
  const minLen = 12;
  const hasUpper = /[A-Z]/.test(username);
  const hasLower = /[a-z]/.test(username);
  const hasDigit = /[0-9]/.test(username);
  const hasSymbol = /[\W_]/.test(username);
  return username.length >= minLen && hasUpper && hasLower && hasDigit && hasSymbol;
}

function hideUsernameHint(show) {
  const hint = document.getElementById('registerUsernameHint');
  hint.style.display = show ? 'none' : 'block';
}

document.getElementById('showSignUp').addEventListener('click', e => {
  e.preventDefault();
  showForm('signUpForm');
});
document.getElementById('backToLogin').addEventListener('click', e => {
  e.preventDefault();
  showForm('loginForm');
});
document.getElementById('showForgotPassword').addEventListener('click', e => {
  e.preventDefault();
  showForm('forgotPasswordForm');
});
document.getElementById('backToLoginFromForgot').addEventListener('click', e => {
  e.preventDefault();
  showForm('loginForm');
});

// Login submit
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  let userValid = username === storedUsername;
  let passValid = password === storedPassword;

  const usernameError = document.getElementById('loginUsernameErrorMsg');
  const passwordError = document.getElementById('loginPasswordErrorMsg');

  if (!userValid && !passValid) {
    usernameError.textContent = "*username is not correct";
    passwordError.textContent = "*password is not correct";
    return;
  }
  if (!userValid) {
    usernameError.textContent = "*username is not correct";
    return;
  }
  if (!passValid) {
    passwordError.textContent = "*password is not correct";
    return;
  }

  alert("Login successful!");
  e.target.reset();
});

// Sign up username validation and hint color
const regUsernameInput = document.getElementById('registerUsername');
const regUsernameHint = document.getElementById('registerUsernameHint');
const regUsernameError = document.getElementById('registerUsernameError');

regUsernameInput.addEventListener('focus', () => hideUsernameHint(false));
regUsernameInput.addEventListener('blur', () => hideUsernameHint(true));
regUsernameInput.addEventListener('input', () => {
  const val = regUsernameInput.value.trim();
  if(val === '' || !validateUsername(val)){
    regUsernameError.textContent = '';
    regUsernameHint.style.color = '#e53935';
  } else {
    regUsernameError.textContent = '';
    regUsernameHint.style.color = '#4caf50';
  }
});

// Sign up submit
document.getElementById('signUpForm').addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  const username = regUsernameInput.value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!validateUsername(username)) {
    regUsernameHint.style.color = '#e53935';
    regUsernameError.textContent = 'Username is not acceptable';
    return;
  }
  if (password !== confirmPassword) {
    document.getElementById('signUpErrorMsg').textContent = "Passwords do not match";
    return;
  }

  storedUsername = username;
  storedPassword = password;

  alert('Registration successful! Please login.');
  showForm('loginForm');
  e.target.reset();
});

// Forgot password
document.getElementById('forgotPasswordForm').addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  const newPass = document.getElementById('newPassword').value;
  const confirmNewPass = document.getElementById('confirmNewPassword').value;

  if(newPass !== confirmNewPass){
    document.getElementById('resetErrorMsg').textContent = "Passwords do not match";
    return;
  }

  storedPassword = newPass;
  alert('Password reset successful! Please login.');
  showForm('loginForm');
  e.target.reset();
});

// Dimming background on input focus
const allInputs = Array.from(document.querySelectorAll('input'));
const background = document.querySelector('.background');
let timeout;
allInputs.forEach(input => {
  input.addEventListener('focus', () => {
    background.classList.add('dimmed');
    if(timeout) clearTimeout(timeout);
  });
  input.addEventListener('blur', () => {
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(!allInputs.some(input => input === document.activeElement)){
        background.classList.remove('dimmed');
      }
    }, 100);
  });
});

// Hide initial username hint
document.addEventListener('DOMContentLoaded', () => {
  hideUsernameHint(true);
});
