let sellerlogin;
let sellerpassword;
let sellername;

const setup = () => {
  sellername = document.getElementById('sellername');
  sellerlogin = document.getElementById('sellerlogin');
  sellerpassword = document.getElementById('sellerpassword');
  document.getElementById('register').addEventListener('click',register);
}
window.addEventListener('DOMContentLoaded', setup);
const register =  async () => {
  const sellerData = {
                     name : sellername.value,
                     login : sellerlogin.value,
                     password : sellerpassword.value,
                   };
  const body = JSON.stringify(sellerData);
  const requestOptions = {
                         method :'POST',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch(`/access/register`, requestOptions);
  if (response.ok) {
    const createdseller = await response.json();
    console.log(`seller registered : ${JSON.stringify(createdseller)}`);
    window.location.href = '/access/login';
    //ici
  }
  else {
    const error = await response.json();
    console.log(`erreur : ${error.message}`);
    document.getElementById('problem').textContent = `erreur: account not created`;
  }
}
