document.addEventListener("DOMContentLoaded", () => {

    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const closeBtn = document.querySelector(".close-sidebar-btn");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    function abrirMenu() {
        sidebar.classList.add("open");
        overlay.classList.add("show");
        hamburgerBtn.classList.add("hidden");
    }

    function cerrarMenu() {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
        hamburgerBtn.classList.remove("hidden");
    }

    hamburgerBtn.addEventListener("click", abrirMenu);

    closeBtn.addEventListener("click", cerrarMenu);

    overlay.addEventListener("click", cerrarMenu);
});