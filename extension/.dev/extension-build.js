const fs = require('fs');
const path = require('path');
const archiver = require('archiver');


const packageJson = JSON.parse(fs.readFileSync('./package.json'));
const manifestJson = JSON.parse(fs.readFileSync('./manifest.json'));
let versionNumbers = manifestJson.version.split('.').map(Number);
versionNumbers[2]++;
packageJson.version = versionNumbers.join('.');
manifestJson.version = packageJson.version;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
fs.writeFileSync('./manifest.json', JSON.stringify(manifestJson, null, 2));





const output = fs.createWriteStream(path.join(__dirname, '../.dist/extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

archive.on('entry', function (entry) {
    console.log(`Adicionando ${entry.name}...`);
});

output.on('close', function () {
    console.log('Arquivo ZIP criado com sucesso!');
});

archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

// Lê o arquivo .zipignore e cria um array com os itens a serem ignorados
const ignoreFilePath = path.join(__dirname, 'extension-build.ignore');
let ignoreItems = [];
if (fs.existsSync(ignoreFilePath)) {
    const ignoreContent = fs.readFileSync(ignoreFilePath, 'utf8');
    ignoreItems = ignoreContent.split('\n').filter(item => item.trim() !== '');
}

// Adiciona todos os arquivos e pastas do projeto, ignorando os itens definidos no .zipignore
archive.glob('**/*', {
    cwd: path.join(__dirname, '..'),
    ignore: ignoreItems
});

archive.finalize();
