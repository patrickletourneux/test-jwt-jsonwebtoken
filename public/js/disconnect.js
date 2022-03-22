const disconnectModule = {
    disconnect: async function () {
        const url = 'http://localhost:5000/api/disconnect';
        console.log('disconnect')
        const response = await fetch(
            url,{                
                method:'POST',
                headers : {
                    "Authorization": "bearer " + localStorage.getItem('token')
                }
            } 
        );
        console.log('response.status:', response.status)
        const responsejson = await response.json();
        console.log('responsejson:', responsejson)
        window.localStorage.setItem('token', '')
        if (response.status === 200) {
            loginPageModule.init()
        } else {
            document.getElementById("pageContent").textContent = 'token non valide ou non present';
        }

    }
}