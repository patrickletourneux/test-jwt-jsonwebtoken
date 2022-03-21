console.log("app.js")
// const helloPAgeModule = require('./helloPage')

const app = {
    init: function () {
        app.addListenerToActions();
    },
    addListenerToActions: function () {
        document.getElementById('helloPage')
            .addEventListener('click', (event) => {
                console.log('click helloPage')
                helloPageModule.init()
            });
        document.getElementById('loginPage')
            .addEventListener('click', (event) => {
                console.log('click loginPage')
                loginPageModule.init()
            });
        document.getElementById('signupPage')
            .addEventListener('click', (event) => {
                console.log('click signupPage')
                signupPageModule.init()
            });
        document.getElementById('disconnect')
            .addEventListener('click', (event) => {
                console.log('click disconnect')
                disconnectModule.init()
            });
    },

}

app.init()