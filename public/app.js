const API_URL = "https://dw4-gestor-de-posts-1.onrender.com/api/post";

const postsContainer = document.getElementById("posts-container");
const postForm = document.getElementById("post-form");

// Obtener todos los posts
async function getPosts() {
    try {
        const response = await fetch(`${API_URL}/`);
        const posts = await response.json();
        postsContainer.innerHTML = "";
        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p><strong>Autor:</strong> ${post.author}</p>
        <p>${post.body}</p>
        <p><em>Fecha:</em> ${new Date(post.date).toLocaleDateString()}</p>
        <button onclick="deletePost('${post._id}')">Eliminar</button>
        <button onclick="editPost('${post._id}', '${post.title}', '${post.author
                }', '${post.body}')">Editar</button>
        <hr>
      `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error al obtener los posts:", error);
    }
}

// Crear un nuevo post
postForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const body = document.getElementById("body").value;

    try {
        const response = await fetch(`${API_URL}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author, body }),
        });
        if (response.ok) {
            getPosts();
            postForm.reset();
        }
    } catch (error) {
        console.error("Error al crear el post:", error);
    }
});

// Editar un post
async function editPost(id, title, author, body) {
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    document.getElementById("body").value = body;

    postForm.onsubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: document.getElementById("title").value,
                    author: document.getElementById("author").value,
                    body: document.getElementById("body").value,
                }),
            });
            if (response.ok) {
                getPosts();
                postForm.reset();
                postForm.onsubmit = null; // Restablece el envío de formulario para nuevos posts
            }
        } catch (error) {
            console.error("Error al actualizar el post:", error);
        }
    };
}

// Eliminar un post
async function deletePost(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (response.ok) {
            getPosts();
        }
    } catch (error) {
        console.error("Error al eliminar el post:", error);
    }
}

// Cargar los posts al cargar la página
getPosts();
