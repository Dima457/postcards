import { useRef } from 'react';
import type { Frame, GreetingText, Addressee } from '../../App';
import { toPng } from 'html-to-image';
import './Preview.css';

interface PreviewProps {
  selectedFrame: Frame | null;
  selectedText: GreetingText | null;
  selectedAddressee: Addressee | null;
}

const Preview = ({ selectedFrame, selectedText, selectedAddressee }: PreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const getFinalText = () => {
    if (!selectedText) return 'Выберите текст поздравления';
    if (!selectedAddressee) return 'Выберите адресата';
    
    return selectedText.text.replace('[Адресат]', selectedAddressee.name);
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
              <div className="text-container">
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
        </div>
      </div>
    </div>
  );
};

export default Preview;