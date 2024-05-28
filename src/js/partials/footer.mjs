const footerTemplate = () => {
    return `
        <footer class="text-centered">
            <p>&copy;${new Date().getFullYear()} Brandon M Herrin | Utah</p>
        </footer>
    `;
}

export const loadFooter = () => {
  const body = document.body;
  body.insertAdjacentHTML("beforeend", footerTemplate());
};