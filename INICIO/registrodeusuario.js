const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");


btnSignIn.addEventListener("click", () => container.classList.remove("toggle"));
btnSignUp.addEventListener("click", () => container.classList.add("toggle"));


const forms = [
  {
    selector: ".sign-in",
    handler: (form) => {
      const email = form.querySelector('input[placeholder="Email"]').value.trim();
      const password = form.querySelector('input[placeholder="Password"]').value.trim();

      const storedData = JSON.parse(localStorage.getItem(email));

      if (storedData && storedData.password === password) {
        alert(`✅ Bienvenido ${email}\nFecha de nacimiento: ${storedData.fechaNacimiento}`);
      } else {
        alert("❌ Email o contraseña incorrectos");
      }
    }
  },
  {
    selector: ".sign-up",
    handler: (form) => {
      const nombre = form.querySelector('input[placeholder="Nombre"]').value.trim();
      const email = form.querySelector('input[placeholder="Email"]').value.trim();
      const password = form.querySelector('input[placeholder="Password"]').value.trim();

      const diaTexto = form.querySelector('input[placeholder="Día"]').value.trim();
      const mesTexto = form.querySelector('input[placeholder="Mes"]').value.trim();
      const anoTexto = form.querySelector('input[placeholder="Año"]').value.trim();

      
      const campos = [
        { label: "Nombre", valor: nombre },
        { label: "Email", valor: email },
        { label: "Password", valor: password },
        { label: "Día", valor: diaTexto },
        { label: "Mes", valor: mesTexto },
        { label: "Año", valor: anoTexto },
      ];

      for (const campo of campos) {
        if (campo.valor.length === 0) {
          alert(`⚠️ El campo "${campo.label}" no puede estar vacío`);
          return;
        }
      }

      
      const dia = Number.parseInt(diaTexto);
      const mes = Number.parseInt(mesTexto);
      const ano = Number.parseInt(anoTexto);

      
      if (
        isNaN(dia) || dia < 1 || dia > 31 ||
        isNaN(mes) || mes < 1 || mes > 12 ||
        isNaN(ano) || ano < 1900 || ano > new Date().getFullYear()
      ) {
        alert("⚠️ Por favor ingresa una fecha válida");
        return;
      }

      
      const fechaNacimiento = new Date(ano, mes - 1, dia);
      if (
        fechaNacimiento.getFullYear() !== ano ||
        fechaNacimiento.getMonth() !== mes - 1 ||
        fechaNacimiento.getDate() !== dia
      ) {
        alert("⚠️ Fecha de cumpleaños inválida");
        return;
      }

      if (localStorage.getItem(email)) {
        alert("⚠️ El usuario ya existe con este email");
        return;
      }

      const fechaISO = fechaNacimiento.toISOString().split("T")[0]; 

      const userData = {
        nombre,
        password,
        fechaNacimiento: fechaISO,
      };

      localStorage.setItem(email, JSON.stringify(userData));
      alert("✅ Usuario registrado con éxito: " + nombre);
      container.classList.remove("toggle"); 
    }
  }
];


forms.forEach(({ selector, handler }) => {
  const form = document.querySelector(selector);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handler(form);
  });
});