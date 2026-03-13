import React from "react"

export default function ReviewStepIcon(props) {
  const { active, completed } = props;

  return (
    <div
      style={{
        color: active ? '#784af4' : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
      }}
    >
      {completed ? (
        <span style={{ color: '#079f07', zIndex: 1, fontSize: 18, lineHeight: 1 }}>
          ✓
        </span>
      ) : (
        <span style={{ color: active ? '#784af4' : '#eaeaf0', zIndex: 1, fontSize: 16, lineHeight: 1 }}>
          ↻
        </span>
      )}
    </div>
  );
}

