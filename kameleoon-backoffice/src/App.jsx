import React, { useState } from 'react';


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


const itemData = null;

function App() {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard__container">
        <div className="navigation">
          <div className="navigation__search">
            <div className="searchbar">
              <div className="searchbar__field">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                  <path d="M12.802 12.751L9.59779 9.28668C10.4217 8.26764 10.8735 6.98629 10.8735 5.65218C10.8735 2.53599 8.43501 0 5.43575 0C2.43851 0 0 2.53529 0 5.65218C0 8.76978 2.43851 11.3051 5.43575 11.3051C6.56132 11.3051 7.6348 10.9527 8.55068 10.2818L11.7799 13.7735C11.9152 13.9198 12.0958 14 12.2913 14C12.4746 14 12.6491 13.9269 12.7817 13.7939C13.0651 13.5119 13.0733 13.045 12.802 12.751ZM5.43575 1.47476C7.65171 1.47476 9.45506 3.34897 9.45506 5.65218C9.45506 7.95609 7.65239 9.83031 5.43575 9.83031C3.22113 9.83031 1.41846 7.95609 1.41846 5.65218C1.41846 3.34968 3.22113 1.47476 5.43575 1.47476Z" fill="#222222"/>
                </svg>
                <input autoComplete="off" className="searchbar__field-text" placeholder="What test are you looking for?" spellCheck="false" type="text"></input>
                <button className="searchbar__field-info" type="button">7 tests</button>
              </div>
            </div>
          </div>
          <div className="navigation__info">
            <div className="textfield">
              <div className="textfield__item textfield__item-name">Name</div>
              <div className="textfield__item textfield__item-type">Type</div>
              <div className="textfield__item textfield__item-status">Status</div>
              <div className="textfield__item textfield__item-site">Site</div>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="table__wrapper">
            <div className="table__item">
              <div className="table__item__info">
                <div className="table__item__info table__info-indicator"></div>
                <div className="table__item__info table__info-name">Order basket redesing</div>
                <div className="table__item__info table__info-type">Classic</div>
                <div className="table__item__info table__info-status">Online</div>
                <div className="table__item__info table__info-site">market.company.com</div>
                <div className="table__item__info table__info-button">
                  <button>Result</button>
                </div>
              </div>
            </div>
            <div className="table__item"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; // и экспортируем эту фукнцию в index.js
