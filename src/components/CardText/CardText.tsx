import type { GreetingText, Addressee } from '../../App';
import './CardText.css';
import { useState } from 'react';

interface CardTextProps {
  greetingTexts: GreetingText[];
  addressees: Addressee[];
  selectedText: GreetingText | null;
  selectedAddressee: Addressee | null;
  onSelectText: (text: GreetingText) => void;
  onSelectAddressee: (addressee: Addressee) => void;
  getAdjustedText: (text: string, addressee: Addressee | null) => string;
}

const CardText = ({
  greetingTexts,
  addressees,
  selectedText,
  selectedAddressee,
  onSelectText,
  onSelectAddressee,
  getAdjustedText,
}: CardTextProps) => {
  const [customAddressee, setCustomAddressee] = useState<string>('');
  const [customGender, setCustomGender] = useState<'male' | 'female' | 'plural'>('male');

  // Функция для обработки выбора кастомного адресата
  const handleCustomAddresseeSelect = () => {
    if (customAddressee.trim()) {
      const customAddresseeObj: Addressee = {
        id: Date.now(),
        name: customAddressee.trim(),
        gender: customGender
      };
      onSelectAddressee(customAddresseeObj);
    }
  };

  // Функция для сброса выбора при начале ввода
  const handleCustomInputChange = (value: string) => {
    setCustomAddressee(value);
    // УБИРАЕМ передачу null - просто очищаем поле ввода
    if (value.trim() && selectedAddressee) {
      // Не вызываем onSelectAddressee с null
      // Вместо этого можно добавить кнопку "Очистить" если нужно
    }
  };

  // НОВАЯ ФУНКЦИЯ: безопасный сброс адресата
  const handleClearAddressee = () => {
    // Вместо передачи null, выбираем первый адресат из списка или ничего не делаем
    if (addressees.length > 0) {
      onSelectAddressee(addressees[0]);
    }
    setCustomAddressee('');
  };

  return (
    <div className="card-text">
      {/* Выбор адресата */}
      <div className="addressee-section">
        <h3>Кому адресовано поздравление?</h3>
        
        {/* Блок для ручного ввода адресата */}
        <div className="custom-addressee-section">
          <h4>Или введите свой вариант:</h4>
          <div className="custom-addressee-inputs">
            <input
              type="text"
              placeholder="Например: Дорогая тётя Люда"
              value={customAddressee}
              onChange={(e) => handleCustomInputChange(e.target.value)}
              className="custom-addressee-input"
            />
            <select 
              value={customGender}
              onChange={(e) => setCustomGender(e.target.value as 'male' | 'female' | 'plural')}
              className="gender-select"
            >
              <option value="male">Мужской род</option>
              <option value="female">Женский род</option>
              <option value="plural">Множественное число</option>
            </select>
            <button 
              onClick={handleCustomAddresseeSelect}
              disabled={!customAddressee.trim()}
              className="custom-addressee-btn"
            >
              Использовать
            </button>
            {/* Дополнительная кнопка для очистки */}
            {selectedAddressee && (
              <button 
                onClick={handleClearAddressee}
                className="custom-addressee-btn"
                style={{backgroundColor: '#6c757d'}}
              >
                Очистить
              </button>
            )}
          </div>
        </div>

        <div className="addressees-grid">
          {addressees.map((addressee) => (
            <button
              key={addressee.id}
              className={`addressee-btn ${selectedAddressee?.id === addressee.id ? 'selected' : ''}`}
              onClick={() => {
                onSelectAddressee(addressee); // Здесь передается Addressee, все ок
                setCustomAddressee(''); // Очищаем кастомный ввод при выборе из списка
              }}
            >
              {addressee.name}
            </button>
          ))}
        </div>
      </div>

      {/* Выбор текста */}
      <div className="texts-section">
        <h3>Выберите текст поздравления</h3>
        <div className="texts-grid">
          {greetingTexts.map((text) => (
            <div
              key={text.id}
              className={`text-card ${selectedText?.id === text.id ? 'selected' : ''}`}
              onClick={() => onSelectText(text)}
            >
              <div className="text-preview">
                {getAdjustedText(text.text, selectedAddressee)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardText;