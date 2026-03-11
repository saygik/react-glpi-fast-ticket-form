import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import React from "react"

export default function ReviewStepIcon(props) {
    const {active, completed} = props;

    return (
        <div style={{
          color: active ? '#784af4' : '#eaeaf0',
          display: 'flex',
          height: 22,
          alignItems: 'center',
        }}>
            {completed
              ? <CheckCircleOutlineOutlinedIcon sx={{ color: '#079f07', zIndex: 1, fontSize: 30 }} />
              : <CachedOutlinedIcon sx={{ color: active ? '#784af4' : '#eaeaf0', zIndex: 1, fontSize: 30 }} />
            }
        </div>
    );
}
