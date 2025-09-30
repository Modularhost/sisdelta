import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFwBdwIY-mbZ3j1DAHwtfGY4olBVZLNgU",
  authDomain: "sisdelta.firebaseapp.com",
  projectId: "sisdelta",
  storageBucket: "sisdelta.firebasestorage.app",
  messagingSenderId: "919290668637",
  appId: "1:919290668637:web:8524a2f0ea0517112acfb4",
  measurementId: "G-F608E1EX28"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, "usuarios", user.uid));

    if (!userDoc.exists()) {
      mensaje.style.color = "red";
      mensaje.textContent = "Usuario no encontrado en la base de datos.";
      return;
    }

    const data = userDoc.data();
    const modulo = data.modulo.toLowerCase();
    const categoria = data.categoria.toLowerCase();
    const ruta = `${modulo}/${categoria}/menu.html`;
    mensaje.style.color = "green";
    mensaje.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";

    setTimeout(() => {
      window.location.href = ruta;
    }, 1000);

  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    mensaje.style.color = "red";
    mensaje.textContent = "Error: " + error.message;
  }
});