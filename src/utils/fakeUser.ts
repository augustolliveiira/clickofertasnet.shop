const nomesProprios = [
  'João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Julia', 'Carlos', 'Beatriz',
  'Miguel', 'Sofia', 'Gabriel', 'Laura', 'Arthur', 'Isabella', 'Davi', 'Manuela'
];

const sobrenomes = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira',
  'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins'
];

function gerarCPF(): string {
  const gerarDigito = (arr: number[]): number => {
    const soma = arr.reduce((acc, val, idx) => acc + val * (arr.length + 1 - idx), 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const numeros = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  const d1 = gerarDigito(numeros);
  numeros.push(d1);
  const d2 = gerarDigito(numeros);
  numeros.push(d2);

  // Return only numbers without formatting
  return numeros.join('');
}

function gerarTelefone(): string {
  const dddsValidos = [
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    21, 22, 24, 27, 28,
    31, 32, 33, 34, 35, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48, 49,
    51, 53, 54, 55,
    61, 62, 63, 64, 65, 66, 67, 68, 69,
    71, 73, 74, 75, 77, 79,
    81, 82, 83, 84, 85, 86, 87, 88, 89,
    91, 92, 93, 94, 95, 96, 97, 98, 99
  ];

  const ddd = dddsValidos[Math.floor(Math.random() * dddsValidos.length)];
  const numero = Math.floor(Math.random() * 900000000) + 100000000;
  
  // Return only numbers without formatting
  return `${ddd}9${numero.toString().slice(1)}`;
}

export function gerarDadosFicticios() {
  const nomeProprio = nomesProprios[Math.floor(Math.random() * nomesProprios.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  const nomeCompleto = `${nomeProprio} ${sobrenome}`;
  
  const timestamp = Date.now();
  const email = `${nomeProprio.toLowerCase()}.${sobrenome.toLowerCase()}+${timestamp}@mail.com`;
  
  return {
    name: nomeCompleto.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''), // Remove any special characters except accented letters
    email: email.toLowerCase(),
    cpf: gerarCPF(),
    phone: gerarTelefone()
  };
}