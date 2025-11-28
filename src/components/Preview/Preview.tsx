import { useRef } from 'react';
import type { Frame, GreetingText, Addressee } from '../../App';
import { toPng } from 'html-to-image';
import './Preview.css';

// Импортируем изображение
import ecoToyImage from '../../assets/logo.png';
// Импортируем иконки социальных сетей
import vkIcon from '../../assets/vk-icon.jpg';
import wtsIcon from '../../assets/wts-icon.jpg';

interface PreviewProps {
  selectedFrame: Frame | null;
  selectedText: GreetingText | null;
  selectedAddressee: Addressee | null;
  getAdjustedText: (text: string, addressee: Addressee | null) => string;
}

const Preview = ({ selectedFrame, selectedText, selectedAddressee, getAdjustedText }: PreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const getFinalText = () => {
    if (!selectedText) return 'Выберите текст поздравления';
    if (!selectedAddressee) return 'Выберите адресата';
   
    return getAdjustedText(selectedText.text, selectedAddressee);
  };

  // Функция для определения класса рамки в зависимости от ID
  const getFrameClass = () => {
    if (!selectedFrame) return '';
   
    switch (selectedFrame.id) {
      case 1:
        return 'frame-1'; // Темно-красная рамка
      case 3:
        return 'frame-3'; // Темно-зеленая рамка
      default:
        return '';
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current || !canDownload) return;
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      link.download = `new-year-card-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Ошибка при создании изображения:', error);
      alert('Произошла ошибка при создании открытки. Попробуйте еще раз.');
    }
  };

  const canDownload = selectedFrame && selectedText && selectedAddressee;

  return (
    <div className="preview">
      <div
        ref={previewRef}
        className={`preview-card ${selectedFrame ? 'with-frame' : 'placeholder'}`}
      >
        {selectedFrame ? (
          <>
            <img
              src={selectedFrame.url}
              alt="Выбранная рамка"
              className="preview-frame"
            />
            <div className="preview-text-content">
              <div className={`text-container ${getFrameClass()}`}>
                {/* Добавляем изображение эко-игрушки */}
                <img
                  src={ecoToyImage}
                  alt="Эко игрушка"
                  className="eco-toy-image"
                  style={{
                    
                    height: '40px',
                    display: 'block',
                    margin: '0 auto 10px auto'
                  }}
                />
                <p className="greeting-text">{getFinalText()}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="preview-placeholder">
            <div className="placeholder-icon">🎄</div>
            <div className="placeholder-message">
              <p>Выберите рамку, текст и адресата чтобы создать открытку</p>
            </div>
          </div>
        )}
      </div>
     
      <div className="preview-actions">
        <button
          className={`download-btn ${!canDownload ? 'disabled' : ''}`}
          onClick={handleDownload}
          disabled={!canDownload}
        >
          🎁 Скачать открытку
        </button>
       
        <div className="preview-info">
          {!selectedFrame && '🖼️ Выберите рамку • '}
          {!selectedText && '📝 Выберите текст • '}
          {!selectedAddressee && '👤 Выберите адресата'}
          {canDownload && '✅ Всё готово! Можно скачивать открытку'}
          
          {/* Добавляем иконки соцсетей и пригласительную надпись */}
          <div className="social-section">
            <span className="invitation-text">Присоединяйтесь к нам: </span>
            <a 
              href="https://vk.com/ekoluxe?from=search" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <img 
                src={vkIcon} 
                alt="ВКонтакте" 
                className="social-icon"
              />
            </a>
            <a 
              href="https://chat.whatsapp.com/I9XRGIOxO9A8Xu2xkeUd5l?mode=hqrt3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <img 
                src={wtsIcon} 
                alt="WhatsApp" 
                className="social-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;