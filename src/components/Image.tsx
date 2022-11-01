import axios from "axios";

interface ImageProps {
    id: string;
    url: string;
}

export default function Image(props:ImageProps) {

    function deleteImage() {
        axios.delete('http://localhost:3000/images/' + props.id).then((response) => {
            if (response.status === 200) {
                window.location.reload();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="w-1/4 aspect-square p-2 relative">
            <div className="w-full items-center absolute h-12 left-0 top-0 flex justify-end py-2 px-4">
                <button onClick={deleteImage} className="bg-white rounded-full hover:invert duration-500 flex items-center justify-center text-black text-[10px] h-4 w-4">X</button>
            </div>
            <img className="w-full h-full object-cover" src={props.url} />
        </div>
    );
}