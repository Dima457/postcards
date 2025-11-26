import  type { GreetingText, Addressee } from '../../App';
import './CardText.css';

interface CardTextProps {
  greetingTexts: GreetingText[];
  addressees: Addressee[];
  selectedText: GreetingText | null;
  selectedAddressee: Addressee | null;
  onSelectText: (text: GreetingText) => void;
  onSelectAddressee: (addressee: Addressee) => void;
}

const CardText = ({
  greetingTexts,
  addressees,
  selectedText,
  selectedAddressee,
  onSelectText,
  onSelectAddressee,
}: CardTextProps) => {
  return (
    <div className="card-text">
      {/* Выбор адресата */}
      <div className="addressee-section">
        <h3>Кому адресовано поздравление?</h3>
        <div className="addressees-grid">
          {addressees.map((addressee) => (
            <button
              key={addressee.id}
              className={`addressee-btn ${selectedAddressee?.id === addressee.id ? 'selected' : ''}`}
              onClick={() => onSelectAddressee(addressee)}
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
                {selectedAddressee 
                  ? text.text.replace('[Адресат]', selectedAddressee.name)
                  : text.text.replace('[Адресат]', '...')
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardText;