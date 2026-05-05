import React from 'react';
import './BentoGrid.css';

export default function ExportedProject() {
  return (
    <div className="bento-wrapper">
      {/* Ambient Glow */}
      

      <div className="bento-container">
        <div className="bento-item item-1">
          <div className="glass-card">ONEDESIGN V2.0<br/>Ecosystem.</div>
        </div>
        <div className="bento-item item-2">
          <h1 className="heading">Bento Grid<br/>Builder.</h1>
        </div>
        <div className="bento-item item-3">
          <p className="paragraph">INI HANYA UJI COBA </p>
        </div>
        <div className="bento-item item-4">
          <button className="button">Eksplorasi</button>
        </div>
        <div className="bento-item item-5">
          <button className="button">Click Me</button>
        </div>
        <div className="bento-item item-6">
          <div className="glass-card">Glass Card</div>
        </div>
        <div className="bento-item item-7">
          <button className="button">Click Me</button>
        </div>
      </div>
    </div>
  );
}