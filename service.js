function trocaImagem() {
    const img = document.querySelector(".a4-page");
    const evento = document.querySelector('input[name="evento"]:checked').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const typeSmall = document.getElementById('small');
    const txtPequeno = document.getElementById('prismaPequeno');
    const txtGrande = document.getElementById('prismaGrande');

    const fundos = {
        sudeco: {
            small: "./assets/papel/small.png",
            big: "./assets/papel/big.png"
        },
        condel: {
            small: "./assets/papel/small-condel.png",
            big: "./assets/papel/condel.png"
        },
        coaride: {
            small: "./assets/papel/coaride.png"
        }
    };

    // limpa riscos dos textos
    txtPequeno.style.textDecoration = 'none';
    txtGrande.style.textDecoration = 'none';

    if (evento === 'coaride') {
        typeSmall.checked = true;
        txtGrande.style.textDecoration = 'line-through';
    }

    // define imagem de fundo e tamanho da página
    const fundo = fundos[evento][type] || fundos[evento].small;
    img.style.backgroundImage = `url('${fundo}')`;
    img.style.width = type === "big" ? "297mm" : "210mm";
    img.style.height = type === "big" ? "210mm" : "297mm";

    montaPrisma();
}

function montaPrisma() {
    // pega valores do formulário
    const name = document.getElementById('name').value;
    const organ = document.getElementById('organ').value;
    const position = document.getElementById('position').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const evento = document.querySelector('input[name="evento"]:checked').value;
    const distanciaNome = Number(document.getElementById('distancia').value);

    // elementos
    const page = document.getElementById('a4Content');
    const spaceCenter = document.getElementById('space-center');
    const [name1, name2] = [document.getElementById('name1'), document.getElementById('name2')];
    const [position1, position2] = [document.getElementById('position1'), document.getElementById('position2')];
    const [organ1, organ2] = [document.getElementById('organ1'), document.getElementById('organ2')];

    // tamanhos de fonte
    const fontPosition = document.querySelector('#fontPosition').value;
    const fontOrgan = document.querySelector('#fontOrgan').value;
    const fontName = document.querySelector('#fontName').value;

    function aplicarFontSize(valor, elementos, fallback) {
        const tamanho = parseInt(valor) || fallback;
        elementos.forEach(el => el.style.fontSize = `${tamanho}px`);
    }

    // define tamanho inicial do nome conforme o type
    const fontNameSelect = document.querySelector('#fontName');
    let tamanhoInicialNome;

    if (type === "big") {
        tamanhoInicialNome = 70;
        fontNameSelect.value = "70"; // seleciona automaticamente o valor 70
    } else {
        tamanhoInicialNome = 50;
        fontNameSelect.value = "50"; // seleciona automaticamente o valor 50
    }

    aplicarFontSize(fontPosition, [position1, position2], 40);
    aplicarFontSize(fontName, [name1, name2], tamanhoInicialNome);
    aplicarFontSize(fontOrgan, [organ1, organ2], 30);

    document.getElementById('distancia').disabled = false;

    // limpa campos
    [name1, position1, organ1, name2, position2, organ2].forEach(el => el.innerText = '');

    // monta textos (espelhados)
    [name1, position1, organ1].forEach(el => el.style.transform = 'rotate(180deg)');
    name1.innerText = name;
    position1.innerText = position;
    organ1.innerText = organ;
    name2.innerText = name;
    position2.innerText = position;
    organ2.innerText = organ;

    // ajusta altura do espaço central
    const alturas = {
        big: { sudeco: 340, condel: 230 },
        small: { sudeco: 300, coaride: 190, condel: 200 }
    };
    const alturaBase = alturas[type]?.[evento] || 300;
    spaceCenter.style.height = (alturaBase + distanciaNome) + 'px';

    if (type === 'small') page.style.paddingInline = '70px';
}

function generatePrisma() {
    montaPrisma();
    const type = document.querySelector('input[name="type"]:checked').value;
    const name = document.getElementById('name').value;
    const evento = document.querySelector('input[name="evento"]:checked').value;

    const orientation = type === 'big' ? 'landscape' : 'portrait';
    const nomes = {
        big: {
            condel: `prisma grande condel - ${name}.pdf`,
            sudeco: `prisma grande sudeco - ${name}.pdf`
        },
        small: {
            sudeco: `prisma pequeno sudeco - ${name}.pdf`,
            coaride: `prisma pequeno coaride - ${name}.pdf`,
            condel: `prisma pequeno condel - ${name}.pdf`
        }
    };

    const nameFile = nomes[type][evento] || `prisma - ${name}.pdf`;

    html2pdf().set({
        margin: 0,
        filename: nameFile,
        image: { type: 'png', quality: 1.0 },
        html2canvas: { scale: 2, scrollX: 0, scrollY: 0, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation }
    }).from(document.getElementById('a4Content')).save();
}

function printPrisma() {
    const type = document.querySelector('input[name="type"]:checked').value;
    const orientation = type === 'big' ? 'landscape' : 'portrait';

    html2pdf().set({
        margin: 0,
        filename: 'document.pdf',
        image: { type: 'png', quality: 1.0 },
        html2canvas: { scale: 2, scrollX: 0, scrollY: 0, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation }
    })
        .from(document.getElementById('a4Content'))
        .outputPdf('bloburl')
        .then(pdfUrl => window.open(pdfUrl).print());
}
