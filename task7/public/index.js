document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const profileContainer = document.getElementById('profile-container');
    const usernameSpan = document.getElementById('username');
    const reposContainer = document.getElementById('repos');
    
    loginButton.addEventListener('click', () => {
        window.location.href = '/auth/github';
    });
    fetch('/profile')
        .then(response => response.json())
        .then(user => {
            if (user) {
                loginButton.style.display = 'none';
                usernameSpan.textContent = user.username;
                profileContainer.style.display = 'block';
                fetchRepos(); 
            }
        })
        .catch(error => console.error('Error fetching profile:', error));
    const fetchRepos = () => {
        fetch('/repos')
            .then(response => response.json())
            .then(repos => {
                const reposList = repos.map(repo => `<li>${repo.name}</li>`).join('');
                reposContainer.innerHTML = `<ul>${reposList}</ul>`;
            })
            .catch(error => console.error('Error fetching repos:', error));
    };
});
