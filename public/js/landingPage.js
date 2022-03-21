

const landingPageModule = {
    init: function(){
        console.log('landingPage.js');
        var pageContent = document.getElementById("pageContent");
        pageContent.textContent = 'logingPage';
        document.getElementById("pageContent").textContent = 'landingPage';

    }
}

// module.exports = helloPageModule;