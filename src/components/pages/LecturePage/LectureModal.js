import React from 'react'

import classes from './LectureModal.module.css';

const LectureModal = props => {


    return(
        <>
            <div className={classes.backdrop} />
            <div className={classes.modal}>
                {/* <iframe width="100%" height="360" src={props.videoUrl}
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen="allowfullscreen">
                </iframe> */}
                <iframe src={props.videoUrl} width="100%" height="360" frameborder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="01 Structura cursului 6 FEB">
                </iframe>
                <button className="btn btn-light" onClick={props.toggleShowLecture} style={{width: '100%'}}>
                    {props.showLecture ? 'Ascunde lectia' : 'Arata lectia'}                        
                </button>
            </div>
        </>

    )
}

export default LectureModal