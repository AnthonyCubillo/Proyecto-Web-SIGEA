import React from 'react';
import styled from 'styled-components';

const Modal = ({children, funcionVentana, tituloModal }) =>{

  return (
    <>
        <Overlay onClick={funcionVentana}>
          <ContenedorModal>
          <HeaderModal>
            <h3>{tituloModal}</h3>

            <BotonCerrar onClick={funcionVentana}>
              <i className="fas fa-times"></i>
            </BotonCerrar>
          </HeaderModal>

          <BodyModal>
            {children}
          </BodyModal>
       
          <FooterModal>
            <Boton onClick={funcionVentana}>Aceptar</Boton> 
          </FooterModal>
					
          </ContenedorModal>
        </Overlay>
    </>
  )
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  padding: 40px;
	display: flex;
  align-items:center;
	justify-content: center;
	z-index: 100;
`;

const ContenedorModal = styled.div`
	width: 500px;
	min-height: 100px;
	background: #FFFFFF;
	position: relative;
	border-radius: 5px;
	box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;

const HeaderModal = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid #E8E8E8;

	h3 {
		font-weight: 500;
    margin: 0;
    padding: 0;
		font-size: 24px;
		color: #212F3D;
	}
  
`;

const BodyModal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const FooterModal = styled.div`
  margin-top: 50px;
  display: flex;
	align-items: center;
  justify-content: space-around;
`;

const BotonCerrar = styled.button`
	position: absolute;
	top: 15px;
	right: 20px;
	width: 30px;
	height: 30px;
	border: none;
	background: none;
	cursor: pointer;
	transition: .3s ease all;
	border-radius: 5px;
	color: #95A5A6;

	&:hover {
		background: #E74C3C;
    color: #FFFFFF;
	}
  
`;

const Boton = styled.button`
	display: block;
	padding: 5px 20px;
	border-radius: 10px;
	color: #fff;
	border: none;
	background: #1766DC;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-weight: 500;
	transition: .3s ease all;

	&:hover {
		background: #0066FF;
	}
`;


export default Modal