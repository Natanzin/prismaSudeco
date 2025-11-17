function trocaImagem() {
    const img = document.querySelector(".a4-page");
    const evento = document.querySelector('input[name="evento"]:checked').value;

    const typeSmall = document.getElementById('small');
    const typeBig = document.getElementById('big');
    const txtPequeno = document.getElementById('prismaPequeno');
    const txtGrande = document.getElementById('prismaGrande');

    // limpa riscos
    txtPequeno.style.textDecoration = 'none';
    txtGrande.style.textDecoration = 'none';

    // regras de tipos permitidos por evento
    const restricoes = {
        coaride: "small",
        criff: "big"
    };

    // aplica automaticamente as restrições
    if (restricoes[evento] === "small") {
        typeSmall.checked = true;
        txtGrande.style.textDecoration = "line-through";
    } else if (restricoes[evento] === "big") {
        typeBig.checked = true;
        txtPequeno.style.textDecoration = "line-through";
    }

    // agora SIM podemos ler o type correto
    const type = document.querySelector('input[name="type"]:checked').value;

    // banco de fundos
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
        },
        criff: {
            big: "./assets/papel/criff.png"
        }
    };

    // fallback seguro que nunca dá erro
    const fundo =
        fundos[evento][type] ||
        fundos[evento].big ||
        fundos[evento].small;

    // aplica imagem
    img.style.backgroundImage = `url('${fundo}')`;

    // ajusta tamanho da "folha"
    img.style.width = type === "big" ? "297mm" : "210mm";
    img.style.height = type === "big" ? "210mm" : "297mm";

    montaPrisma();
}

function montaPrisma() {
    const name = document.getElementById('name').value;
    const organ = document.getElementById('organ').value;
    const position = document.getElementById('position').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const evento = document.querySelector('input[name="evento"]:checked').value;
    const distanciaNome = Number(document.getElementById('distancia').value);

    const page = document.getElementById('a4Content');
    const spaceCenter = document.getElementById('space-center');

    const [name1, name2] = [document.getElementById('name1'), document.getElementById('name2')];
    const [position1, position2] = [document.getElementById('position1'), document.getElementById('position2')];
    const [organ1, organ2] = [document.getElementById('organ1'), document.getElementById('organ2')];

    const fontPosition = document.querySelector('#fontPosition').value;
    const fontOrgan = document.querySelector('#fontOrgan').value;
    const fontName = document.querySelector('#fontName').value;

    function aplicarFontSize(valor, elementos, fallback) {
        const tamanho = parseInt(valor) || fallback;
        elementos.forEach(el => el.style.fontSize = `${tamanho}px`);
    }

    // define tamanho inicial do nome
    const fontNameSelect = document.querySelector('#fontName');
    let tamanhoInicialNome = type === "big" ? 70 : 50;
    fontNameSelect.value = String(tamanhoInicialNome);

    aplicarFontSize(fontPosition, [position1, position2], 40);
    aplicarFontSize(fontName, [name1, name2], tamanhoInicialNome);
    aplicarFontSize(fontOrgan, [organ1, organ2], 30);

    document.getElementById('distancia').disabled = false;

    // limpa textos
    [name1, position1, organ1, name2, position2, organ2].forEach(el => el.innerText = '');

    // textos (espelhado)
    [name1, position1, organ1].forEach(el => el.style.transform = 'rotate(180deg)');

    name1.innerText = name;
    position1.innerText = position;
    organ1.innerText = organ;

    name2.innerText = name;
    position2.innerText = position;
    organ2.innerText = organ;

    // define altura do espaço central
    const alturas = {
        big: { sudeco: 340, condel: 230, criff: 230 },
        small: { sudeco: 300, coaride: 190, condel: 200 }
    };

    const alturaBase = (alturas[type]?.[evento]) ?? 300;
    spaceCenter.style.height = (alturaBase + distanciaNome) + 'px';

    if (type === 'small')
        page.style.paddingInline = '70px';
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
            sudeco: `prisma grande sudeco - ${name}.pdf`,
            criff: `prisma grande criff - ${name}.pdf`
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
document.addEventListener("load", trocaImagem());
