import React from "react";
import { Bars } from 'react-loader-spinner'
import { styled } from '@mui/system'

const Mdiv = styled('div')({
    position: "relative",
  });
const Bdiv = styled('div')({
    backgroundColor: '#00796b08',
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    
    backdropFilter: 'blur(5px)',
  });
  const Spin = styled('div')({
    position: 'fixed',
    top: "50%",
    left: "50%",
    transform: "ms-translate(-50%, -50%)",
    textAlign: 'center'

  });

  function Loading() {
    const types = [
      "Audio",
      "ThreeDots",
      "TailSpin",
      "Rings",
      "Puff",
      "Oval",
      "Hearts",
      "Grid",
      "Circles",
      "Bars",
      "Ball-Triangle",
    ];
  
    return (
      
      <Mdiv>
        <Bdiv>
          <Spin>
            <Bars type={types[9]} color='#94131b' height="25%" width="25%"/>
          </Spin>
        </Bdiv>
      </Mdiv>
        
  
    );
  }
  
  export default Loading;
