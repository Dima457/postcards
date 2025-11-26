import type { Frame } from '../../App';
import './FrameSelector.css';

interface FrameSelectorProps {
  frames: Frame[];
  selectedFrame: Frame | null;
  onSelectFrame: (frame: Frame) => void;
}

const FrameSelector = ({ frames, selectedFrame, onSelectFrame }: FrameSelectorProps) => {
  return (
    <div className="frame-selector">
      <div className="frames-grid">
        {frames.map((frame) => (
          <div
            key={frame.id}
            className={`frame-card ${selectedFrame?.id === frame.id ? 'selected' : ''}`}
            onClick={() => onSelectFrame(frame)}
          >
            <img 
              src={frame.url} 
              alt={frame.name}
              className="frame-image"
            />
            <div className="frame-name">{frame.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrameSelector;