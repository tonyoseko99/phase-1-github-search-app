document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#github-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let formInput = event.target.search.value;
        fetch (`https://api.github.com/search/users?q=${formInput}`)
        .then(res => res.json())
        .then(data => (renderUsers(data)))
    })
    
    function renderUsers (data) {
        for (i = 0; i < data.items.length; i++) {
        let user = document.createElement('h2');
        user.textContent = `User ${i + 1} info`
        let userInfo = document.createElement('p')
        let userName = document.createElement('li')
        userName.textContent = data.items[i].login;
        userName.setAttribute('id', 'userName')
        let userPic = document.createElement('img');
        userPic.setAttribute('src', data.items[i].avatar_url)
        let userLink = document.createElement('li');
        userLink.textContent = data.items[i].url;
        userLink.style.fontSize = 'medium'
        document.querySelector('#user-list').appendChild(user);
        user.appendChild(userInfo)
        userInfo.appendChild(userName)
        userInfo.appendChild(userPic);
        userInfo.appendChild(userLink);
        }
    
    let userList = (document.querySelectorAll('#userName'))
    for(i=0; i< userList.length; i++) {
        userList[i].addEventListener('click', function(event) {
            fetch(`https://api.github.com/users/${event.target.textContent}/repos`)
            .then(res => res.json())
            .then(data => postRepos(data))
        })
    
        function postRepos(data) {
            for(i=0; i < data.length; i++) {
                let repoName = document.createElement('li');
                repoName.textContent = data[i].name;
                let repoUrl = document.createElement('li');
                repoUrl.textContent = data[i].url;
                let reposList = document.querySelector('#repos-list');
                reposList.appendChild(repoName);
                reposList.appendChild(repoUrl);
                
            }
        }
    }
    }
    
    
    })