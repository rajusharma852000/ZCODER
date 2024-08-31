import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCroper = () => {
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [croppedImage, setCroppedImage] = useState(null);

    const handleFileChange = (event) => {
        selectFile(URL?.createObjectURL(event?.target?.files[0]));
    }

    const getCroppedImage = () => {
        if (!image || !crop.width || !crop.height) {
            return;
        }

        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY 
        );

        const base64Image = canvas.toDataURL('image/jpeg');
        setCroppedImage(base64Image);
        selectFile(null); 
    };

    return (
        <div className='container absolute top-0 left-0 translate-y-14'>
            <div className='flex flex-col'>
                <div className="col-6">
                    <input type="file" accept='image/*' onChange={handleFileChange} />
                </div>
                {src && <div className="col-6 flex flex-col mt-6">
                    <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} className='w-96 h-auto' />
                    <button className='bg-red-500 w-36 h-10 hover:bg-red-700 active:bg-green-600' onClick={getCroppedImage}>Crop Image</button>
                </div>}
                {croppedImage && <div className='col-6 w-96 h-48 bg-sky-500 mt-6'>
                    <img src={croppedImage} alt="Cropped" className='img-fluid' />
                </div>}
            </div>
        </div>
    )
}

export default ImageCroper;
