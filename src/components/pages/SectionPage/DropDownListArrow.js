import React from 'react'

import classes from './SectionPage.module.css'
import DropDownArrow from './down-arrow-svgrepo-com.svg'
import FallUpArrow from './up-arrow-svgrepo-com.svg'


const DropDownListArrow = props => {

    const {showLectures, toggleShowLectures} = props
 

    return(
        <div className={classes.block}>            
            <div className={classes.smallPicContainer} onClick={toggleShowLectures}>
                <img className={classes.smallPic} src={showLectures ? FallUpArrow : DropDownArrow} alt="DropDownArrow"/>
            </div>
        </div>
    )
}

export default DropDownListArrow