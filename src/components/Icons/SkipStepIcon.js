import DoubleArrowIcon from "@mui/icons-material/DoubleArrow"
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
        ? <DoubleArrowIcon sx={{ color: '#079f07', zIndex: 1, fontSize: 26 }} />
        : <div style={{ width: 16, height: 16, borderRadius: '10%', backgroundColor: 'currentColor' }} />
      }
    </div>
  );
}
