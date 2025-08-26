function trocaImagem() {
    const img = document.querySelector(".a4-page");
    const evento = document.querySelector('input[name="evento"]:checked').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const typeBig = document.getElementById('big')
    const typeSmall = document.getElementById('small')
    const txtPequeno = document.getElementById('prismaPequeno')
    const txtGrande = document.getElementById('prismaGrande')
    if (evento == 'sudeco') {
        document.getElementById('organ').disabled = true
        document.getElementById('organ').value = ""
        document.getElementById('fontOrgan').disabled = true
        txtPequeno.style.textDecoration = 'none'
        txtGrande.style.textDecoration = 'none'
        if (type === "small") {
            img.style.backgroundImage = "url('./assets/papel/small.png')"; // Fundo prisma pequeno
            img.style.width = '210mm'
            img.style.height = '296mm'
        } else {
            img.style.backgroundImage = "url('./assets/papel/big.jpeg')"; // Fundo prisma grande
            img.style.width = '296mm'
            img.style.height = '210mm'
        }
    } else if (evento == 'condel') {
        document.getElementById('organ').disabled = false
        document.getElementById('fontOrgan').disabled = false
        img.style.backgroundImage = "url('./assets/papel/condel.png')"; // Fundo prisma grande
        img.style.width = '296mm'
        img.style.height = '210mm'
        typeBig.checked = true
        txtPequeno.style.textDecoration = 'line-through'
        txtGrande.style.textDecoration = 'none'
    } else if (evento == 'coaride') {
        document.getElementById('organ').disabled = false
        document.getElementById('fontOrgan').disabled = false
        img.style.backgroundImage = "url('./assets/papel/coaride.png')"; // Fundo prisma pequeno
        img.style.width = '210mm'
        img.style.height = '296mm'
        typeSmall.checked = true
        txtGrande.style.textDecoration = 'line-through'
        txtPequeno.style.textDecoration = 'none'
    }
    montaPrisma()
}

function montaPrisma() {
    //formulário
    const name = document.getElementById('name').value;
    const organ = document.getElementById('organ').value;
    const position = document.getElementById('position').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const evento = document.querySelector('input[name="evento"]:checked').value;
    const fontPosition = document.querySelector('#fontePosition').value
    const fontOrgan = document.querySelector('#fontOrgan').value
    const distanciaNome = Number(document.getElementById('distancia').value)

    console.log(distanciaNome)

    //elementos da página
    const page = document.getElementById('a4-page')
    const name1 = document.getElementById('name1');
    const position1 = document.getElementById('position1');
    const name2 = document.getElementById('name2');
    const position2 = document.getElementById('position2');
    const spaceCenter = document.getElementById('space-center');
    const organ1 = document.getElementById('organ1');
    const organ2 = document.getElementById('organ2');

    switch (fontPosition) {
        case "5":
            position1.style.fontSize = "5px";
            position2.style.fontSize = "5px";
            break;
        case "10":
            position1.style.fontSize = "10px";
            position2.style.fontSize = "10px";
            break;
        case "15":
            position1.style.fontSize = "15px";
            position2.style.fontSize = "15px";
            break;
        case "20":
            position1.style.fontSize = "20px";
            position2.style.fontSize = "20px";
            break;
        case "25":
            position1.style.fontSize = "25px";
            position2.style.fontSize = "25px";
            break;
        case "30":
            position1.style.fontSize = "30px";
            position2.style.fontSize = "30px";
            break;
        case "35":
            position1.style.fontSize = "35px";
            position2.style.fontSize = "35px";
            break;
        case "40":
            position1.style.fontSize = "40px";
            position2.style.fontSize = "40px";
            break;
        case "45":
            position1.style.fontSize = "45px";
            position2.style.fontSize = "45px";
            break;
        default:
            // fallback (se der algum valor inesperado → aplica 40px)
            position1.style.fontSize = "40px";
            position2.style.fontSize = "40px";
    }

    switch (fontOrgan) {
        case "5":
            organ1.style.fontSize = "5px";
            organ2.style.fontSize = "5px";
            break;
        case "10":
            organ1.style.fontSize = "10px";
            organ2.style.fontSize = "10px";
            break;
        case "15":
            organ1.style.fontSize = "15px";
            organ2.style.fontSize = "15px";
            break;
        case "20":
            organ1.style.fontSize = "20px";
            organ2.style.fontSize = "20px";
            break;
        case "25":
            organ1.style.fontSize = "25px";
            organ2.style.fontSize = "25px";
            break;
        case "30":
            organ1.style.fontSize = "30px";
            organ2.style.fontSize = "30px";
            break;
        case "35":
            organ1.style.fontSize = "35px";
            organ2.style.fontSize = "35px";
            break;
        case "40":
            organ1.style.fontSize = "40px";
            organ2.style.fontSize = "40px";
            break;
        case "45":
            organ1.style.fontSize = "45px";
            organ2.style.fontSize = "45px";
            break;
        default:
            // fallback (se der algum valor inesperado → aplica 40px)
            organ1.style.fontSize = "30px";
            organ2.style.fontSize = "30px";
    }

    //muda o estado do input:range para enabled
    const rangeCoaride = document.getElementById('distancia')
    rangeCoaride.disabled = false

    //limpa todos os campos
    name1.innerText = ''
    position1.innerText = ''
    organ1.innerText = ''
    name2.innerText = ''
    position2.innerText = ''
    organ2.innerText = ''
    name1.style.fontSize = '70px'
    name2.style.fontSize = '70px'

    //monta o prisma
    if (type === 'big') {

        // Prisma grande → texto na vertical, espelhado na horizontal
        name1.innerText = name
        position1.innerText = position
        name1.style.transform = 'rotate(180deg)'
        position1.style.transform = 'rotate(180deg)'
        position2.innerText = position
        name2.innerText = name
        spaceCenter.style.height = 330 + distanciaNome + 'px'
        position1.style.margin = '0 60px'
        position2.style.margin = '0 60px'

        //prisma do condel - somente tamanho grande
        if (evento == 'condel') {
            //desabilita o input:range
            rangeCoaride.disabled = true
            rangeCoaride.value = 0
            rangeOutput.textContent = 0
            //configurações do prisma do condel
            spaceCenter.style.height = '310px'
            position1.style.margin = '0 80px'
            position2.style.margin = '0 80px'
            //se o campo orgão for preenchido
            if (organ != '') {
                organ1.innerText = organ
                organ1.style.transform = 'rotate(180deg)'
                organ2.innerText = organ
                spaceCenter.style.height = '270px'
            }
        }
    } else {
        // Prisma pequeno → texto na horizontal, espelhado na vertical
        name1.innerText = name
        position1.innerText = position
        name1.style.transform = 'rotate(180deg)'
        position1.style.transform = 'rotate(180deg)'
        position2.innerText = position
        name2.innerText = name
        spaceCenter.style.height = 340 + distanciaNome + 'px'
        position1.style.margin = '0 55px'
        position2.style.margin = '0 55px'
        name1.style.fontSize = '55px'
        name2.style.fontSize = '55px'

        //se o evento for coaride - somente prisma pequeno
        if (evento == 'coaride') {
            //desabilita o input:range
            rangeCoaride.disabled = true
            rangeCoaride.value = 0
            rangeOutput.textContent = 0
            //configurações do coaride
            organ1.innerText = organ
            organ1.style.transform = 'rotate(180deg)'
            organ2.innerText = organ
            spaceCenter.style.height = '210px'
            position1.style.margin = '0 75px'
            position2.style.margin = '0 75px'
            //se o campo orgão for preenchido
            if (organ == '') {
                spaceCenter.style.height = '270px'
            }
        }
    }
}

function generatePrisma() {
    montaPrisma()

    const type = document.querySelector('input[name="type"]:checked').value;
    const name = document.getElementById('name').value;
    const evento = document.querySelector('input[name="evento"]:checked').value;

    let orientation
    let nameFile

    if (type == 'big') {
        orientation = 'landscape'
        if (evento == 'condel') {
            nameFile = 'prisma grande condel - ' + name + '.pdf'
        } else if (evento == 'sudeco') {
            nameFile = 'prisma grande sudeco - ' + name + '.pdf'
        }
    } else {
        orientation = 'portrait'
        if (evento == 'sudeco') {
            nameFile = 'prisma pequeno sudeco - ' + name + '.pdf'
        }
        else if (evento == 'coaride') {
            nameFile = 'prisma pequeno coaride - ' + name + '.pdf'
        }
    }

    const element = document.getElementById('a4Content');
    const opt = {
        margin: 0,
        filename: nameFile,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, scrollX: 0, scrollY: 0, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: orientation }
    };
    html2pdf().set(opt).from(element).save();
}

//imprimir prisma
function printPrisma() {
    const type = document.querySelector('input[name="type"]:checked').value;
    const element = document.getElementById('a4Content');
    let orientation

    if (type == 'big') {
        orientation = 'landscape'
    } else {
        orientation = 'portrait'

    }
    const opt = {
        margin: 0,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, scrollX: 0, scrollY: 0, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: orientation }
    };
    html2pdf().set(opt).from(element).outputPdf('bloburl').then((pdfUrl) => {
        const win = window.open(pdfUrl)
        win.print()
    });
}