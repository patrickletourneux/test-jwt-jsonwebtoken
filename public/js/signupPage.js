

const signupPageModule = {
    init: function(){
        console.log('signupPage.js');
        var pageContent = document.getElementById("pageContent");
        pageContent.textContent = 'signupPage';
        document.getElementById("pageContent").textContent = 'signupPage';
       
        const form = document.createElement('form');
        form.id = "formulaire"

        const inputemail = document.createElement('input');
        inputemail.type = "email";
        inputemail.name = "email";
        inputemail.id ="email";
        inputemail.placeholder="email"
        form.appendChild(inputemail);

        const inputfirstname = document.createElement('input');
        inputfirstname.type = "firstname";
        inputfirstname.name = "firstname";
        inputfirstname.id ="firstname";
        inputfirstname.placeholder="firstname"
        form.appendChild(inputfirstname);

        const inputlastname = document.createElement('input');
        inputlastname.type = "lastname";
        inputlastname.name = "lastname";
        inputlastname.id ="lastname";
        inputlastname.placeholder="lastname"
        form.appendChild(inputlastname);

        const inputPassword = document.createElement('input');
        inputPassword.type = "password";
        inputPassword.name = "password";
        inputPassword.id ="password";
        inputPassword.placeholder="password"
        form.appendChild(inputPassword);

        const inputPasswordConfirm = document.createElement('input');
        inputPasswordConfirm.type = "password";
        inputPasswordConfirm.name = "passwordConfirm";
        inputPasswordConfirm.id ="passwordConfirm";
        inputPasswordConfirm.placeholder="passwordConfirm"
        form.appendChild(inputPasswordConfirm);

        const submitButton = document.createElement('input');
        submitButton.type = "submit";
        submitButton.value = "submit";
        form.appendChild(submitButton);

        pageContent.appendChild(form);

        signupPageModule.addListenerToActions();
    },
    addListenerToActions:function(){
        console.log('evenement signup')
        document.getElementById("formulaire").addEventListener('submit', async (event) => {
            event.preventDefault();
            const url = 'http://localhost:5000/api/signup';
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
            // window.localStorage.setItem('token', responsejson.token)
            // console.log('window.localStorage:', window.localStorage)

            if (response.status === 200){
                loginPageModule.init()
            } else {
                document.getElementById("pageContent").textContent = 'erreur de creation de compte';
            }
          })

    }
}

// module.exports = helloPageModule;