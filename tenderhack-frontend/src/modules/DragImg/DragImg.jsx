import React, { useState } from 'react'
import './styles/DragImg.css'

import addIcon from '../../assets/addIcon.svg'
import deleteImage from '../../assets/deleteImage.svg'
import sliderArrow from '../../assets/slider_arrow.svg'
import addImage from '../../assets/addImage.svg'

function DragImg({ uploaded }) {
    const [drag, setDrag] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {uploadedFiles, setUploadedFiles} = uploaded
    
    if (!uploaded) {
        return <div>Loading...</div>;
    }

    function dragStartHandler(e){
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e){
        e.preventDefault()
        setDrag(false)
    }

    function onDropHandler(e){
        e.preventDefault()
        let files = [...e.dataTransfer.files]

        const formData = new FormData()
        formData.append('file', files[0])

        // Добавление загруженных файлов в массив
        setUploadedFiles(prevFiles => (prevFiles ? prevFiles.concat(files) : files))

        setDrag(false)
    }

    function onDeleteHandler(index){
        const newFiles = [...uploadedFiles];
        newFiles.splice(index, 1);
        setUploadedFiles(newFiles);

        if (index === currentImageIndex && newFiles.length > 0) {
            setCurrentImageIndex(Math.max(0, index - 1));
        }
    }

    function onAddHandler(index){
        const newFiles = [...uploadedFiles];
        newFiles.splice(index + 1, 0, null);
        setUploadedFiles(newFiles);
        setCurrentImageIndex(index + 1);
    }

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

    function onFileInputChange(event) {
        const files = [...event.target.files];
        setUploadedFiles(prevFiles => (prevFiles ? prevFiles.concat(files) : files));
    }

  return (
    <div>
        <div className='drop-area__title'>Изображение товара</div>
        {drag
            ? <div className='drop-area'
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e => onDropHandler(e)}
            >Отпустите файлы</div>        
            : uploadedFiles.length > 0 
                ? 
                <div className='uploadedFile'>
                    <div className='uploadedImgContainer'>
                        <img 
                        src={URL.createObjectURL(uploadedFiles[currentImageIndex])} 
                        alt={`Загруженное изображение ${currentImageIndex + 1}`} 
                        className='uploadedImg' />
                        <label htmlFor="fileInput">
                            <img src={addImage} alt='addIconImage' className='newFile__add' />
                        </label>
                        <input 
                        type='file' 
                        accept="image/*" 
                        id="fileInput" 
                        name="file" 
                        multiple onChange={onFileInputChange} 
                        style={{ display: "none" }}/>
                        <img src={deleteImage} alt='deleteIconImage' className='uploadedFile__delete' onClick={() => onDeleteHandler(currentImageIndex)} />
                    </div>
                    {
                        uploadedFiles.length > 1 && (
                            <div className='uploadedFiles__sliderBtns'>
                                <button onClick={() => onPrevImg()} className='uploadedFiles-sliderBtns__prev'>
                                    <img src={sliderArrow} alt="sliderArrow-prev" />
                                </button>
                                <button onClick={() => onNextImg()} className='uploadedFiles-sliderBtns__next'>
                                    <img src={sliderArrow} alt="sliderArrow-next" />
                                </button>
                            </div>
                        )
                    }
                    
                </div>
                :           
                <div className='drop-area'
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >
                    <label htmlFor="fileInput">
                        <div className='drop-area-add__wrapper'>
                            <img src={addIcon} alt='addImg' className='drop-area__add'/>
                        </div>
                    </label>
                    <input 
                    type='file' 
                    accept="image/*" 
                    id="fileInput" 
                    name="file" 
                    multiple onChange={onFileInputChange} 
                    style={{ display: "none" }}/>
                    
                </div>        
        }

    </div>
  )
}

export default DragImg