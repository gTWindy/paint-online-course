import React, { useEffect, useRef, useState } from 'react';
import "../styles/canvas.scss"
import { observer } from 'mobx-react-lite';

import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';

import {Modal, Button} from 'react-bootstrap'
import { useParams } from 'react-router';

const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();
    const [modal, setModal] = useState(true);
    const params = useParams();
    useEffect(() => {
       canvasState.setCanvas(canvasRef.current)
       toolState.setTool(new Brush(canvasRef.current))
    },[])

    useEffect(() => {
        if(canvasState.username) { 
            const socket = new WebSocket('ws://localhost:5000/');
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }));
            }
        }
     },[canvasState.username])

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    };
    
    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value);
        setModal(false);
    }

    return (
        <div className='canvas'>
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header closeButton>
                <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}></input>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => connectionHandler()}>
                    Войти
                </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={ ()=> {
                mouseDownHandler();
            }}
            ref={canvasRef} width={600} height={400}></canvas>
        </div>
    )
});

export default Canvas;