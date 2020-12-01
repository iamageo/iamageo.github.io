let Validador = {

    handlerSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        Validador.cleanErros();

        for(let i = 0; i<inputs.length; i++) {
            let input = inputs[i];
            let check = Validador.checkInput(input);

            if(check !== true) {
                send = false;
                Validador.showError(input, check);
            }

        }

        send = false;
        if (send) {
            form.submit();
        }

    }, 
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        
        if(rules !== null) {
            rules = rules.split('|');
            
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'O campo não podeser vazio';
                        }
                    break;

                    case 'min':
                        if(input.value.length < rDetails[1])  {
                            return 'Campo tem que ter pelo menos ' + rDetails[1]+' caracteres.';
                        }  
                    break;

                    case 'email':
                        if(input.value != '') {
                            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                            if (!regex.test(input.value.toLowerCase())){
                                return 'Campo de e-mail digitado inválido';
                            }
                        }    
                    break;


                }

            }

        }

        return true;
    },
    showError:(input, error)=>{
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    }, 
    cleanErros:()=>{

        let inputs = form.querySelectorAll('input');
        for (let i =0; i< inputs.length; i++){
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        
        for (let i=0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }

};

let form = document.querySelector('.validador');

form.addEventListener('submit', Validador.handlerSubmit);