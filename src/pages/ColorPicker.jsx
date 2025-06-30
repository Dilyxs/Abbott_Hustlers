import React, { useEffect, useState } from 'react'
import ColorStart from '../components/ColorP/ColorStart'
import ColorWheelSelect from '../components/ColorP/ColorWheelSelect'
import ColorOnImage from '../components/ColorP/ColorOnImage'
import ReviewImage from '../components/ColorP/ReviewImage'


const ColorPicker = () => {
    const [SelectType , setSelectType ] = useState(true)
    const [SelectColor , setSelectColor ] = useState(false)
    const [VisualizeElement , setVisualizeElement ] = useState(false)
    const [Review , setReview ] = useState(false)
    const sharedProps = {
    SelectType,
    setSelectType,
    SelectColor,
    setSelectColor,
    VisualizeElement,
    setVisualizeElement,
    Review,
    setReview,
    }


    if (SelectType){
        return(
            <ColorStart {...sharedProps}></ColorStart>
    )}else if (SelectColor){
        return(
            <ColorWheelSelect  {...sharedProps}></ColorWheelSelect>
        )

    }else if(VisualizeElement){
        return(
            <ColorOnImage {...sharedProps}></ColorOnImage>
        )
    }else if (Review){
        return(
            <ReviewImage {...sharedProps}></ReviewImage>
        )
    }

}

export default ColorPicker