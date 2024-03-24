function gerarDados() {
    document.getElementById('cpf').value = gerarCPF();
    document.getElementById('rg').value = gerarRG();
    document.getElementById('cartao').value = gerarNumeroCartao();
    document.getElementById('cep').value = gerarCEP();
    document.getElementById('email').value = gerarEmail();
    document.getElementById('telefone').value = gerarTelefone();

    var botoesCopiar = document.querySelectorAll('.copy-btn');
  botoesCopiar.forEach(function(botao) {
    botao.style.display = 'block';
  });
  }
  
  function gerarCPF() {
    const cpf = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
    const digitos = Array.from({ length: 2 }, () => Math.floor(Math.random() * 10)).join('');
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${digitos}`;
  }
  
  function gerarRG() {
    const rg = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
    const digito = Math.floor(Math.random() * 10);
    return `${rg.substring(0, 2)}.${rg.substring(2, 5)}.${rg.substring(5, 8)}-${digito}`;
  }
  
  function gerarNumeroCartao() {
    const bloco = () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
    return `${bloco()} ${bloco()} ${bloco()} ${bloco()}`;
  }
  
  function gerarCEP() {
    const cep = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
    return `${cep.substring(0, 5)}-${cep.substring(5, 8)}`;
  }
  
  function gerarEmail() {
    const provedores = ['gmail.com', 'yahoo.com.br', 'outlook.com', 'hotmail.com', 'bol.com.br'];
    const nome = Array.from({ length: 7 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
    const provedor = provedores[Math.floor(Math.random() * provedores.length)];
    return `${nome}@${provedor}`;
  }
  
  function gerarTelefone() {
    const ddd = Array.from({ length: 2 }, () => Math.floor(Math.random() * 10)).join('');
    const telefone = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
    return `(${ddd}) 9${telefone.substring(0, 4)}-${telefone.substring(4, 8)}`;
  }
  
  function copiarConteudo(idElemento) {
      var elemento = document.getElementById(idElemento);
      elemento.select();
      document.execCommand("copy");
  }