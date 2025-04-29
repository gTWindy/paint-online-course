import React from 'react';
import '../styles/toolbar.scss';
import toolState from '../store/toolState';
import canvasState from '../store/canvasState';

import Brush from '../tools/Brush';
import Rect from '../tools/Rect';

const Toolbar = () => {
    
    const changeColor = e => {
        toolState.setFillColor(e.target.value);
        toolState.setStrokeColor(e.target.value);
    }

    return (
        <div className='toolbar'>
            <button className='toolbar__btn brush'
                onClick={() => {
                toolState.setTool(new Brush(canvasState.canvas))
            }}>
            </button>
            <button className='toolbar__btn rect'
                onClick={() => {
                toolState.setTool(new Rect(canvasState.canvas))
            }}>
            </button>
            <input 
                style={{marginLeft: 10}} 
                onChange={e => changeColor(e)}
                type="color"/>
        </div>
    )
}

export default Toolbar;