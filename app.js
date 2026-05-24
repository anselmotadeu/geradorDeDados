
// Versão consolidada e sem duplicações
// Gera e popula todos os campos, além de mostrar info de CEP, bandeira do cartão e DDD
function gerarDados() {
  // CPF / RG
  document.getElementById('cpf').value = gerarCPF();
  document.getElementById('rg').value = gerarRG();

  // Cartão: aceita retorno novo (obj) ou antigo (string)
  const cartao = gerarNumeroCartao();
  const cartaoInput = document.getElementById('cartao');
  try {
    if (typeof cartao === 'string') {
      cartaoInput.value = cartao;
    } else if (cartao && cartao.numero) {
      cartaoInput.value = cartao.numero;
    } else {
      cartaoInput.value = String(cartao);
    }
  } catch (e) {
    console.debug('Erro ao setar número do cartão', e);
  }

  // Bandeira (se disponível)
  const bandeiraEl = document.getElementById('cartao-bandeira');
  if (bandeiraEl) {
    if (cartao && typeof cartao === 'object' && cartao.icone) {
      bandeiraEl.className = 'card-brand-icon ' + cartao.icone;
      bandeiraEl.title = cartao.bandeira || '';
    } else {
      // limpa classe de ícone se não disponível
      bandeiraEl.className = 'card-brand-icon';
      bandeiraEl.title = '';
    }
  }

  // CEP
  const cepGerado = gerarCEP();
  const cepInput = document.getElementById('cep');
  const cepInfo = document.getElementById('cep-info');
  if (cepInput) {
    if (typeof cepGerado === 'string') {
      cepInput.value = cepGerado;
    } else if (cepGerado && cepGerado.cep) {
      cepInput.value = cepGerado.cep;
    } else {
      cepInput.value = String(cepGerado);
    }
  }
  if (cepInfo) {
    if (cepGerado && typeof cepGerado === 'object' && cepGerado.cidade) {
      cepInfo.innerHTML = `<i class="fa-solid fa-city"></i> ${cepGerado.cidade} &mdash; ${cepGerado.estado}`;
      cepInfo.style.display = 'flex';
    } else {
      cepInfo.style.display = 'none';
    }
  }

  // Telefone com info de DDD
  const telGerado = gerarTelefone();
  const telInput = document.getElementById('telefone');
  const telInfo = document.getElementById('telefone-info');
  if (telInput) {
    if (typeof telGerado === 'string') {
      telInput.value = telGerado;
    } else if (telGerado && telGerado.numero) {
      telInput.value = telGerado.numero;
    } else {
      telInput.value = String(telGerado);
    }
  }
  if (telInfo) {
    if (telGerado && typeof telGerado === 'object' && telGerado.cidade) {
      telInfo.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${telGerado.cidade} &mdash; ${telGerado.estado}`;
      telInfo.style.display = 'flex';
    } else {
      telInfo.style.display = 'none';
    }
  }

  // E-mail
  const email = gerarEmail();
  const emailInput = document.getElementById('email');
  if (emailInput) emailInput.value = email;

  // Mostrar botões de copiar
  var botoesCopiar = document.querySelectorAll('.copy-btn');
  botoesCopiar.forEach(function (botao) {
    botao.style.display = 'flex';
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

// Bandeiras com prefixos reais
const bandeiras = [
  {
    nome: 'Visa',
    icone: 'fa-brands fa-cc-visa',
    gerarPrefixo: () => '4',
    comprimento: 16
  },
  {
    nome: 'Mastercard',
    icone: 'fa-brands fa-cc-mastercard',
    gerarPrefixo: () => String(Math.floor(Math.random() * 5) + 51),
    comprimento: 16
  },
  {
    nome: 'Amex',
    icone: 'fa-brands fa-cc-amex',
    gerarPrefixo: () => Math.random() < 0.5 ? '34' : '37',
    comprimento: 15
  }
];

function gerarNumeroCartao() {
  const bandeira = bandeiras[Math.floor(Math.random() * bandeiras.length)];
  const prefixo = bandeira.gerarPrefixo();
  const restante = bandeira.comprimento - prefixo.length;
  const numeroBase = prefixo + Array.from({ length: restante }, () => Math.floor(Math.random() * 10)).join('');

  // Formata: Amex em 4-6-5, demais em 4-4-4-4
  let numeroFormatado;
  if (bandeira.nome === 'Amex') {
    numeroFormatado = `${numeroBase.substring(0, 4)} ${numeroBase.substring(4, 10)} ${numeroBase.substring(10, 15)}`;
  } else {
    numeroFormatado = `${numeroBase.substring(0, 4)} ${numeroBase.substring(4, 8)} ${numeroBase.substring(8, 12)} ${numeroBase.substring(12, 16)}`;
  }

  return { numero: numeroFormatado, bandeira: bandeira.nome, icone: bandeira.icone };
}

// Mapeamento de prefixos de CEP para cidades e estados brasileiros
const cepRegioes = [
  { faixa: [1, 19],  estado: 'SP', cidades: ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto', 'Sorocaba', 'São Bernardo do Campo'] },
  { faixa: [20, 28], estado: 'RJ', cidades: ['Rio de Janeiro', 'Niterói', 'Petrópolis', 'Nova Iguaçu', 'Volta Redonda'] },
  { faixa: [29, 29], estado: 'ES', cidades: ['Vitória', 'Vila Velha', 'Cachoeiro de Itapemirim', 'Cariacica'] },
  { faixa: [30, 39], estado: 'MG', cidades: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Montes Claros'] },
  { faixa: [40, 48], estado: 'BA', cidades: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Ilhéus'] },
  { faixa: [49, 49], estado: 'SE', cidades: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto'] },
  { faixa: [50, 56], estado: 'PE', cidades: ['Recife', 'Olinda', 'Caruaru', 'Petrolina', 'Jaboatão dos Guararapes'] },
  { faixa: [57, 57], estado: 'AL', cidades: ['Maceió', 'Arapiraca', 'Palmeira dos Índios'] },
  { faixa: [58, 58], estado: 'PB', cidades: ['João Pessoa', 'Campina Grande', 'Santa Rita'] },
  { faixa: [59, 59], estado: 'RN', cidades: ['Natal', 'Mossoró', 'Parnamirim', 'Caicó'] },
  { faixa: [60, 63], estado: 'CE', cidades: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú'] },
  { faixa: [64, 64], estado: 'PI', cidades: ['Teresina', 'Parnaíba', 'Picos', 'Floriano'] },
  { faixa: [65, 65], estado: 'MA', cidades: ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon'] },
  { faixa: [66, 68], estado: 'PA', cidades: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal'] },
  { faixa: [69, 69], estado: 'AM', cidades: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru'] },
  { faixa: [70, 73], estado: 'DF', cidades: ['Brasília', 'Ceilândia', 'Taguatinga', 'Samambaia', 'Planaltina'] },
  { faixa: [74, 76], estado: 'GO', cidades: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde'] },
  { faixa: [77, 77], estado: 'TO', cidades: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional'] },
  { faixa: [78, 78], estado: 'MT', cidades: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop'] },
  { faixa: [79, 79], estado: 'MS', cidades: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá'] },
  { faixa: [80, 87], estado: 'PR', cidades: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'] },
  { faixa: [88, 89], estado: 'SC', cidades: ['Florianópolis', 'Joinville', 'Blumenau', 'Chapecó', 'Itajaí'] },
  { faixa: [90, 99], estado: 'RS', cidades: ['Porto Alegre', 'Caxias do Sul', 'Canoas', 'Pelotas', 'Santa Maria'] }
];

function gerarCEP() {
  const regiao = cepRegioes[Math.floor(Math.random() * cepRegioes.length)];
  const prefixo = Math.floor(Math.random() * (regiao.faixa[1] - regiao.faixa[0] + 1)) + regiao.faixa[0];
  const sufixo = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
  const cepCompleto = String(prefixo).padStart(2, '0') + sufixo;
  const cepFormatado = `${cepCompleto.substring(0, 5)}-${cepCompleto.substring(5, 8)}`;
  const cidade = regiao.cidades[Math.floor(Math.random() * regiao.cidades.length)];
  return { cep: cepFormatado, cidade: cidade, estado: regiao.estado };
}

function gerarEmail() {
  const provedores = ['gmail.com', 'yahoo.com.br', 'outlook.com', 'hotmail.com', 'bol.com.br'];
  const nomes = ['teste', 'user', 'dev', 'qa', 'tester', 'dados', 'fake'];
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sufixo = Math.floor(Math.random() * 9000) + 1000;
  const provedor = provedores[Math.floor(Math.random() * provedores.length)];
  return `${nome}${sufixo}@${provedor}`;
}

// Mapeamento DDD -> estado / cidade (simplificado)
const dddMap = {
  '11': { estado: 'SP', cidade: 'São Paulo' },
  '21': { estado: 'RJ', cidade: 'Rio de Janeiro' },
  '31': { estado: 'MG', cidade: 'Belo Horizonte' },
  '41': { estado: 'PR', cidade: 'Curitiba' },
  '51': { estado: 'RS', cidade: 'Porto Alegre' },
  '61': { estado: 'DF', cidade: 'Brasília' },
  '71': { estado: 'BA', cidade: 'Salvador' },
  '81': { estado: 'PE', cidade: 'Recife' },
  '85': { estado: 'CE', cidade: 'Fortaleza' },
  '92': { estado: 'AM', cidade: 'Manaus' }
};

function gerarTelefone() {
  const ddds = Object.keys(dddMap);
  const ddd = ddds[Math.floor(Math.random() * ddds.length)];
  const telefone = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
  const numero = `(${ddd}) 9${telefone.substring(0, 4)}-${telefone.substring(4, 8)}`;
  const info = dddMap[ddd] || { estado: 'BR', cidade: 'Localidade' };
  return { numero: numero, ddd: ddd, estado: info.estado, cidade: info.cidade };
}

function copiarConteudo(idElemento) {
  var elemento = document.getElementById(idElemento);
  navigator.clipboard.writeText(elemento.value).then(function () {
    mostrarToast('Copiado para a área de transferência!');
  }).catch(function () {
    try {
      elemento.select();
      document.execCommand('copy');
      mostrarToast('Copiado!');
    } catch (e) {
      mostrarToast('Não foi possível copiar');
    }
  });
}

function mostrarToast(mensagem) {
  var toast = document.getElementById('toast');
  var toastMsg = document.getElementById('toast-msg');
  toastMsg.textContent = mensagem;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 2500);
}
// ...fim do arquivo - funções antigas removidas
