function trocaImagem() {
    const img = document.querySelector(".a4-page");
    const evento = document.querySelector('input[name="evento"]:checked').value;

    // banco de fundos
    const fundos = {
        sudeco: "./assets/papel/sudeco.png",
        condel: "./assets/papel/condel.png",
        coaride: "./assets/papel/coaride.png",
        criff: "./assets/papel/criff.png",
        sudecoP: "./assets/papel/sudecoP.png"
    };

    //esconde o campo Nome da Reunião caso for Sudeco
    if (evento == 'sudeco' || evento == 'sudecoP') {
        document.getElementById('divReuniao').style.display = "none"
        document.getElementById('reuniao').value = ''
    } else {
        document.getElementById('divReuniao').style.display = "block"
    }

    //altera o tamanho da div se for imagem na vertical
    img.style.width = evento === 'sudecoP' ? "210mm" : "297mm";
    img.style.height = evento === 'sudecoP' ? "296mm" : "210mm";

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
    const vertical = evento === "sudecoP";
    const tamanho = name.length;

    const fontSize = vertical
        ? (tamanho > 32 ? "30px" : tamanho > 25 ? "40px" : tamanho > 18 ? "50px" : "65px")
        : (tamanho > 45 ? "30px" : tamanho > 35 ? "40px" : tamanho > 25 ? "50px" : "65px");

    name1.style.fontSize = fontSize;
    name2.style.fontSize = fontSize;

    // limpa textos
    [reuniao1, name1, cargo1, organ1, reuniao2, name2, cargo2, organ2].forEach(el => el.innerText = '');

    // textos (espelhado)
    [reuniao1, name1, cargo1, organ1].forEach(el => el.style.transform = 'rotate(180deg)');

    [reuniao1, reuniao2].forEach(el => el.innerText = reuniao);
    [name1, name2].forEach(el => el.innerText = name);
    [cargo1, cargo2].forEach(el => el.innerText = cargo);
    [organ1, organ2].forEach(el => el.innerText = organ);

    // define altura do espaço central
    const alturas = { sudeco: 155, condel: 110, criff: 110, coaride: 130, sudecoP: 150 };
    spaceCenter.style.height = alturas[evento] + 'px';

}


function generatePrisma() {
    montaPrisma();

    const evento = document.querySelector('input[name="evento"]:checked').value;
    const name = document.getElementById('name').value;

    const orientation = evento === "sudecoP" ? "portrait" : "landscape";

    const nameFile = `prisma - ${name}.pdf`;

    html2pdf().set({
        margin: 0,
        filename: nameFile,
        image: { type: 'png', quality: 1.0 },
        html2canvas: {
            scale: 2,
            scrollX: 0,
            scrollY: 0,
            useCORS: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: orientation
        }
    }).from(document.getElementById('a4Content')).save();
}

function printPrisma() {
    const evento = document.querySelector('input[name="evento"]:checked').value;

    const orientation = evento === "sudecoP" ? "portrait" : "landscape";

    html2pdf().set({
        margin: 0,
        image: { type: 'png', quality: 1.0 },
        html2canvas: {
            scale: 2,
            scrollX: 0,
            scrollY: 0,
            useCORS: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: orientation
        }
    })
        .from(document.getElementById('a4Content'))
        .toPdf()
        .get('pdf')
        .then(pdf => {
            const pdfUrl = pdf.output('bloburl');
            const printWindow = window.open(pdfUrl);

            if (printWindow) {
                printWindow.addEventListener('load', () => {
                    printWindow.print();
                });
            } else {
                alert('Permita pop-ups para imprimir o documento.');
            }
        });
}

document.addEventListener("load", trocaImagem());
