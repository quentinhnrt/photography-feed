import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import FeedForm from "../components/FeedForm";
import Image from "../components/Image";

export default function Form() {

    const [previews, setPreviews] = useState([]);
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState(Object());

    function getImages() {
        axios.get('http://localhost:3000/images').then((response) => {
            setExistingImages(response.data);
        });
    }

    function addImage(event) {
        event.preventDefault();

        for (let i = 0; i < images.length; i++) {
            const file = images[i];
            let id = uuidv4();

            let formData = new FormData();

            formData.append('id', id);
            formData.append('media', file);


            axios.post('http://localhost:3000/images', formData, { headers: { "Content-Type": "multipart/form-data" } }).then((response) => {
                if (response.status === 200) {
                    setExistingImages(getImages());
                    setImages([]);
                    setPreviews([]);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    function handleChange(event) {
        let files = event.target.files;
        setImages(files);
        let imgList = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const url = URL.createObjectURL(file);

            imgList.push(url);

        }
        setPreviews(imgList);
    }

    function removeImage(index: number) {
        let imgList = [...previews];
        imgList.splice(index, 1);
        setPreviews(imgList);

        let fileList = [...images];
        fileList.splice(index, 1);
        setImages(fileList);
    }

    useEffect(() => {
        getImages();
    }, [])

    return (
        <div className="flex">
            <div className="w-3/5 pt-4 flex flex-col">
                <form className="flex px-2">
                    <label htmlFor="image_input" className="w-4/5 border hover:bg-black hover:text-white duration-200 border-black cursor-pointer h-12 flex items-center justify-center">
                        Upload images
                    </label>
                    <input className="hidden" id="image_input" type={'file'} multiple onChange={handleChange}></input>
                    <button className="w-1/5 cursor-pointer bg-black text-white" onClick={addImage}>Envoyer</button>
                </form>
                <div className="flex flex-wrap pt-8">
                    {existingImages && Object.keys(existingImages).length > 0 ?  <FeedForm images={existingImages} /> : <p>test</p>}
                </div>
            </div>


            <div className="flex flex-row flex-wrap w-2/5 pl-8">
                {previews.map((preview, index) => {
                    return (
                        <div key={index} className="w-1/2 p-4 aspect-square">
                            <div className="relative w-full h-full">
                                <div className="h-8 bg-white w-full relative z-10">
                                    <button onClick={() => removeImage(index)} className="absolute right-0 top-0 bg-red-500 text-white h-full w-8">X</button>
                                </div>
                                <img key={index} src={preview} alt="preview" className="w-full h-full object-cover absolute top-0 left-0" />
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}