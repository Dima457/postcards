/// Компонент модального окна
import vkIcon from '/src/assets/vk-icon.jpg';
import wtsIcon from '/src/assets/wts-icon.jpg';
import "./WelcomeModal.css"
const WelcomeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="welcome-header">
          <h2>🎄 Присоединяйтесь к нам в социальных сетях 🎅</h2>
        </div>
        
        <div className="welcome-body">
          
          <div className="social-section">
            <div className="social-links">
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
            <p className="welcome-text">
            Создайте уникальные и душевные новогодние открытки для ваших близких, 
            друзей и коллег! Выбирайте красивые рамки, персонализируйте тексты 
            и делитесь праздничным настроением.
          </p>
          <button className="start-button" onClick={onClose}>
            Создать открытку 🎁
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;