const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Определяем путь к запрашиваемому файлу
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Определяем тип контента на основе расширения файла
  const extname = path.extname(filePath);
  const contentType = getContentType(extname);

  // Чтение файла
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Если файл не найден, возвращаем 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Страница не найдена');
      } else {
        // В случае других ошибок возвращаем 500
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Внутренняя ошибка сервера: ${err.code}`);
      }
    } else {
      // Успешное чтение файла, возвращаем контент
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 3100;

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

// Определяем тип контента на основе расширения файла
function getContentType(ext) {
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'text/plain';
  }
}
