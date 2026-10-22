import { useDevicePosture, useViewportSegments } from '@foldable-ts/react';
import './App.css';

export default function App() {
  const posture = useDevicePosture();
  const segments = useViewportSegments();

  return (
    <div className="app">
      <div className="info-panel">
        <h1>⚛️ React Foldable Demo</h1>
        <p><strong>Device Posture:</strong> <code>{posture}</code></p>
        <p><strong>Total Segments:</strong> {segments.length}</p>
        
        <pre>
          {JSON.stringify(
            segments.map(s => ({ left: s.left, top: s.top, width: s.width, height: s.height })), 
            null, 
            2
          )}
        </pre>
      </div>

      <div className="segments-container">
        {segments.map((rect, index) => (
          <div
            key={index}
            className="segment-visual"
            style={{
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
            }}
          >
            Segment {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}