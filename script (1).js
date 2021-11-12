class Validator {
  constructor() {
    this.validations = [
      'data-required',
      'data-min-length', //vou ter que trasformar isso em nome de metodo, mais a frente (minlength)
      'data-max-length',
      'data-email-validade',
      'data-only-letters',
      'data-equal',
    ]
  }

  //iniciar as validacoes em todos os campos
  validate(form) {

    let currentValidations = document.querySelectorAll('form .error-validation');

    if (currentValidations.length) {
      this.cleanValidations(currentValidations);
    }
    // metodo para limpar as validações 

    // pegar todos os inputs
    let inputs = form.getElementsByTagName('input')

    // para dar o loop, deve transformar o HTML Collections em Array
    let inputsArray = [...inputs]

    // loop para os inputs e validações de acordo com o que for encontrado
    inputsArray.forEach(function (input) {

      // loop em todas as validações existentes
      // this.validations faz com que verifiquemos a qtd de validações existentes no Array this.validations=['data-min-length']

      for (let i = 0; this.validations.length > i; i++) {
        // pego os atributos do input e ve se é igual as minhas validações atual
        if (input.getAttribute(this.validations[i]) != null) {


          // TRASFORMACAO DO data-min-length em minlength
          //limpando as strings para virar um metodo
          let method = this.validations[i].replace('data-', '').replace('-', '');

          // valor do input
          let value = input.getAttribute(this.validations[i]) //saber o valor da validação, no caso dessa 3 caracter


          // chamar o metodo e passo o atributo 
          this[method](input, value);

        }
      }

    }, this)//quando eu acessar o this, esta se tratando do this.validator 

  }
  // VERIFICA SE O INPUT TEM UM NUMERO MINIMO DE CARACTERES
  minlength(input, minValue) {

    let inputLength = input.value.length;
    let errorMessage = `*O campo precisa ter pelo menos ${minValue} caracteres`;

    if (inputLength < minValue) {
      this.printMessage(input, errorMessage);

    }
  }
  // VERIFICA SE O INPUT SE O INPUT PASSOU DA QTD DE CARACTERE
  maxlength(input, maxValue) {

    let inputLength = input.value.length;
    let errorMessage = `*O campo precisa ter menos que ${maxValue} caracteres`;

    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage);

    }
  }

  // metodo que valida o email

  emailvalidade(input) {

    // utilizar rejex para validar email

    // ex: email@email.com
    let re = /\S+@\S+\.\S/;
    let email = input.value;
    let errorMessage = `Insira um email no padrão mateus@email.com`;
    // "!"= se nao for ()
    if (!re.test(email)) {
      this.printMessage(input, errorMessage);

    }

  }

  // valida se o campo contem apenas letras
  onlyletters(input) {

    let re = /^[A-Za-z]+$/;

    let inputValue = input.value;

    let errorMessage = `Este campo não aceita números nem caracteres especiais`;

    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage);
    }

  }

  // metodo para imprimir a msg de erro na tela 
  printMessage(input, msg) {

    // verificar a qtd de erros que possui

    let errosQty = input.parentNode.querySelector('.error-validation');
    // seguir apenas se nao tiver erro cadastrado


    if (errosQty == null) {
      // template criado no HTML
      // cloneNode: arruma um recipiente para colocar a msg

      let template = document.querySelector('.error-validation').cloneNode(true);

      template.textContent = msg;
      // achar local para colocar a msg de error 
      // achar o pai do input(input.parentNode), nao da para colocar diretamete no input pq input nao aceita HTML
      let inputParent = input.parentNode;
      // remove a classe template para poder aparecer na tela 
      template.classList.remove('template');
      // colocar o inputParent como filho do pai do input (fullbox, halfbox)
      inputParent.appendChild(template);

    }

  }
  // verifica se input é obrigatorio 
  required(input) {

    let inputValue = input.value;

    if (inputValue === '') {
      let errorMessage = `*Campo obrigatório`
      this.printMessage(input, errorMessage);


    }

  }

  // verifica se os campos de senha estao iguais..
  equal(input, inputName) {

    let inputToCompare = document.getElementsByName(inputName)[0];

    let errorMessage = `O ${inputName} deve ser idêntico`;

    if (input.value != inputToCompare.value) {
      this.printMessage(input, errorMessage);
    }
  }
  // metodo para limpar as validações da tela 
  cleanValidations(validations) {

    // el=> el.remove é do proprio js para remover 

    validations.forEach(el => el.remove());
  }
}


let form = document.getElementById('register-form')
let submit = document.getElementById('btn-submit')

let validator = new Validator()
//validacoes 
submit.addEventListener('click', function (e) {
  e.preventDefault();

  validator.validate(form)
})