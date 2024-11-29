document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();  // Prevenir que el formulario se envíe de forma convencional

    // Obtener los datos del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Preparar la solicitud
    const data = {
        username: username,
        password: password
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // Si la respuesta no es OK, mostrar el mensaje de error
            const errorData = await response.json();
            document.getElementById("error-message").textContent = "Credenciales incorrectas.";
            document.getElementById("error-message").style.display = "block";
        } else {
            // Si la respuesta es exitosa, mostrar el token
            const responseData = await response.json();
            console.log("Login exitoso, token:", responseData.access);

            // Aquí podrías redirigir al usuario o guardar el token en el almacenamiento local
            localStorage.setItem('access_token', responseData.access);

            // Redirigir al usuario a una página protegida, por ejemplo
            window.location.href = "/dashboard.html";  // Cambiar la URL según tu lógica
        }
    } catch (error) {
        console.error("Error al hacer la solicitud", error);
    }
});