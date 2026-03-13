import React from "react"
export default function SkipStepIcon(props) {
  const { active, completed } = props;

  return (
    <div style={{
      color: active ? '#717172' : '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    }}>
      {completed
        ? (
          <span style={{ color: '#079f07', zIndex: 1, fontSize: 18, lineHeight: 1 }}>
            »
          </span>
        )
        : <div style={{ width: 16, height: 16, borderRadius: '10%', backgroundColor: 'currentColor' }} />
      }
    </div>
  );
}
