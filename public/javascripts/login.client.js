let sellerlogin;
let sellerpassword;

const setup = () => {
  sellerlogin = document.getElementById('sellerlogin');
  sellerpassword = document.getElementById('sellerpassword');
  document.getElementById('login').addEventListener('click', login);
}
window.addEventListener('DOMContentLoaded', setup);

const login = async () => {
  const sellerData = { login : sellerlogin.value, password : sellerpassword.value};
  const body = JSON.stringify(sellerData);
  const requestOptions = {
                         method :'POST',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch(`/access/login`, requestOptions);
  if (response.ok) {
    const loggedSeller = await response.json();
    window.location.href = '/account';
  }
  else {
    const error = await response.json();
    document.getElementById('problem').textContent = `erreur : ${error.message}`;
  }
}
