function trocaImagem() {
    const img = document.querySelector(".a4-page");
    const evento = document.querySelector('input[name="evento"]:checked').value;

    // banco de fundos
    const fundos = {
        sudeco: "./assets/papel/sudeco.png",
        condel: "./assets/papel/condel.png",
        coaride: "./assets/papel/coaride.png",
        criff: "./assets/papel/criff.png"
    };

    //esconde o campo Nome da Reunião caso for Sudeco
    if (evento == 'sudeco') {
        document.getElementById('divReuniao').style.display = "none"
        document.getElementById('reuniao').value = ''
    } else {
        document.getElementById('divReuniao').style.display = "block"
    }

    // aplica imagem de fundo
    img.style.backgroundImage = `url('${fundos[evento]}')`;

    montaPrisma();
}

function montaPrisma() {

    const evento = document.querySelector('input[name="evento"]:checked').value;
    const reuniao = document.getElementById('reuniao').value;
    const name = document.getElementById('name').value;
    const organ = document.getElementById('organ').value;
    const cargo = document.getElementById('cargo').value;

    //define os trem
    const [reuniao1, reuniao2] = [document.getElementById('reuniao1'), document.getElementById('reuniao2')];
    const [name1, name2] = [document.getElementById('name1'), document.getElementById('name2')];
    const [cargo1, cargo2] = [document.getElementById('cargo1'), document.getElementById('cargo2')];
    const [organ1, organ2] = [document.getElementById('organ1'), document.getElementById('organ2')];

    const spaceCenter = document.getElementById('space-center');

    //altera o tamanho da fonte do nome de acordo com o tamanho do nome
    console.log(name.length)
    if (name.length > 45) {
        name1.style.fontSize = "30px"
        name2.style.fontSize = "30px"
    } else if (name.length > 35) {
        name1.style.fontSize = "40px"
        name2.style.fontSize = "40px"
    } else if (name.length > 25) {
        name1.style.fontSize = "50px"
        name2.style.fontSize = "50px"
    } else {
        name1.style.fontSize = "65px"
        name2.style.fontSize = "65px"
    }

    // limpa textos
    [reuniao1, name1, cargo1, organ1, reuniao2, name2, cargo2, organ2].forEach(el => el.innerText = '');

    // textos (espelhado)
    [reuniao1, name1, cargo1, organ1].forEach(el => el.style.transform = 'rotate(180deg)');

    [reuniao1, reuniao2].forEach(el => el.innerText = reuniao);
    [name1, name2].forEach(el => el.innerText = name);
    [cargo1, cargo2].forEach(el => el.innerText = cargo);
    [organ1, organ2].forEach(el => el.innerText = organ);

    // define altura do espaço central
    const alturas = { sudeco: 155, condel: 110, criff: 110, coaride: 130 };
    spaceCenter.style.height = alturas[evento] + 'px';

}

function generatePrisma() {
    montaPrisma();
    const name = document.getElementById('name').value;
    const orientation = 'landscape'
    const nameFile = `prisma - ${name}.pdf`;

    html2pdf().set({
        margin: 0,
        filename: nameFile,
        image: { type: 'png', quality: 1.0 },
        html2canvas: { scale: 2, scrollX: 0, scrollY: 0, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation }
    }).from(document.getElementById('a4Content')).save();
}

function printPrisma() {
    const orientation = 'landscape'
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
