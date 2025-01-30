let users = [{ username: "admin", password: "admin123", role: "financial" }];
let isSignup = false;

function authenticate() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!role) {
    alert("Please select a role (Financial Institution or Regulator).");
    return;
  }

  if (isSignup) {
    users.push({ username, password, role });
    alert("Signup successful! Please login.");
    toggleForm();
    return;
  }

  const user = users.find(
    (u) => u.username === username && u.password === password && u.role === role
  );
  if (user) {
    document.getElementById("welcome-user").innerText = username;
    document.getElementById("auth-container").classList.add("hidden");
    document.getElementById("welcome-container").classList.remove("hidden");
  } else {
    alert("Invalid username, password, or role!");
  }
}

function toggleForm() {
  isSignup = !isSignup;
  document.getElementById("form-title").innerText = isSignup
    ? "Sign Up"
    : "Login";
  document.getElementById("toggle-form").innerText = isSignup
    ? "Already have an account? Login"
    : "Don't have an account? Sign up";
}

function logout() {
  document.getElementById("auth-container").classList.remove("hidden");
  document.getElementById("welcome-container").classList.add("hidden");
}
