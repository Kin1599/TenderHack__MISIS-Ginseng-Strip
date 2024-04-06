import React, {useState} from 'react'

import sliderArrow from "../../assets/slider_arrow.svg"
import emptyFile from "../../assets/emptyFile.svg"
import './ImgSlider.css'

function ImgSlider({uploaded}) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {uploadedFiles, setUploadedFiles} = uploaded

    function onNextImg(){
        if (currentImageIndex < uploadedFiles.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }

    function onPrevImg(){
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }
  return (
    <div>
        { 
        !uploadedFiles || uploadedFiles.length > 0 
            ? 
            <div className='imgFile'>
                <div className='imgFileContainer'>
                    <img 
                    src={URL.createObjectURL(uploadedFiles[currentImageIndex])} 
                    alt={`Загруженное изображение ${currentImageIndex + 1}`} 
                    className='imgFileContainer__img' />
                </div>
                {
                uploadedFiles.length > 1 && (
                    <div className='imgFile__sliderBtns'>
                    <button onClick={() => onPrevImg()} className='imgFile-sliderBtns__prev'>
                        <img src={sliderArrow} alt="sliderArrow-prev" />
                    </button>
                    <button onClick={() => onNextImg()} className='imgFile-sliderBtns__next'>
                        <img src={sliderArrow} alt="sliderArrow-next" />
                    </button>
                </div>
                )
                }              
            </div>
            : <div className='imgFileEmpty'>
                <img src={emptyFile} alt="emptyFile" />
            </div>
        }
    </div>
  )
}

export default ImgSlider