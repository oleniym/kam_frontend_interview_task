
import React, { useState } from 'react';

type Props = {
    content: string;
    className: string;
};
  
function InfoButton({ content, className }: Props): JSX.Element {return (<div className={className}>{content}</div>)}

const TwoStateButton: React.FC = () => {
  // Состояния для кнопки
  const [isStateOne, setIsStateOne] = useState(true);
  // тут не на клик, а в зависимости от текста, мб классы

  // Обработчик события для переключения состояния кнопки
  const handleButtonClick = () => {
    setIsStateOne((prevState) => !prevState);
  };

  return (
    <button onClick={handleButtonClick}>
      {isStateOne ? 'Состояние 1' : 'Состояние 2'}
    </button>
  );
};
