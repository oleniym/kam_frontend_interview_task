import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigation, Table } from './components/Markup';
// const YourComponent = () => {
//   const [sites, setSites] = useState([]);
//   const [tests, setTests] = useState([]);

//   useEffect(() => {
//     // Получение списка сайтов
//     axios.get('/sites')
//       .then(response => setSites(response.data))
//       .catch(error => console.error('Error fetching sites:', error));

//     // Получение списка тестов
//     axios.get('/tests')
//       .then(response => setTests(response.data))
//       .catch(error => console.error('Error fetching tests:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Sites</h2>
//       <ul>
//         {sites.map(site => (
//           <li key={site.id}>{site.url}</li>
//         ))}
//       </ul>

//       <h2>Tests</h2>
//       <ul>
//         {tests.map(test => (
//           <li key={test.id}>{test.name} - {test.type} - {test.status}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// YourComponent();

// fetch('http://localhost:3100/sites', { // http://localhost:3100/tests
//   method: 'GET', // Метод запроса (GET, POST, и т. д.)
//   // Другие опции могут быть добавлены сюда, например, заголовки или тело запроса
// })
//   .then(response => {
//     // Обработка успешного ответа
//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.status}`);
//     }
//     return response.json(); // или response.text(), response.blob(), и т. д.
//   })
//   .then(data => {
//     // Обработка данных из успешного ответа
//     console.log(data);
//   })
//   .catch(error => {
//     // Обработка ошибок при выполнении запроса
//     console.error('Fetch error:', error);
//   });


// const itemData = null;


function App() {

  const [data, setData] = useState('');

  useEffect(() => {
    // Обращение к серверу
    fetch('http://localhost:3100', {
      method: 'GET',
    })
      .then(response => {
        console.log('response', response);
        response.text()
      })
      .then(data => {
        console.log('data', data);
        setData(data)
      })
      .catch(error => console.error('Ошибка при запросе к серверу:', error));
  }, []);

  console.log('{data}', {data});

  // return (
  //   <div>
  //     <p>Ответ от сервера: {data}</p>
  //   </div>
  // );


  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard__container">
        <Navigation />
        <Table />
      </div>
    </div>
  );
}

export default App; // и экспортируем эту фукнцию в index.js
