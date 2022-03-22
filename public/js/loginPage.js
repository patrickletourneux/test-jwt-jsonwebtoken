

const loginPageModule = {
    init: function(){
        console.log('loginPage.js');
        var pageContent = document.getElementById("pageContent");
        pageContent.textContent = 'logingPage';
        document.getElementById("pageContent").textContent = 'loginPage';
       
        const form = document.createElement('form');
        form.id = "formulaire"

        const inputemail = document.createElement('input');
        inputemail.type = "email";
        inputemail.name = "email";
        inputemail.id ="email";
        inputemail.placeholder="email"
        form.appendChild(inputemail);

        const inputPassword = document.createElement('input');
        inputPassword.type = "password";
        inputPassword.name = "password";
        inputPassword.id ="password";
        inputPassword.placeholder="password"
        form.appendChild(inputPassword);

        const submitButton = document.createElement('input');
        submitButton.type = "submit";
        submitButton.value = "submit";
        form.appendChild(submitButton);

        pageContent.appendChild(form);

        loginPageModule.addListenerToActions();
    },
    addListenerToActions:function(){
        console.log('evenement')
        document.getElementById("formulaire").addEventListener('submit', async (event) => {
            event.preventDefault();
            const url = 'http://localhost:5000/api/login';
            console.log('submit')
            const formData = new FormData(event.target);
            console.log('formData:', formData)
            const response = await fetch(url, {
              method: 'POST',
              body: formData // on oublie pas de lui envoyer les infos
            });
            const responsejson = await response.json();
            console.log('response.status', response.status)
            // console.log('responsejson.token:', responsejson.token)
            window.localStorage.setItem('token', responsejson.token)
            console.log('window.localStorage:', window.localStorage)

            if (response.status === 200){
                landingPageModule.init()
            } else {
                document.getElementById("pageContent").textContent = 'token non valide ou non present';
            }
          })

    }
}

// module.exports = helloPageModule;