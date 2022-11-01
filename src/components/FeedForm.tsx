import { useEffect, useState } from "react";
import Image from "./Image";

interface FeedFormProps {
    images: string[];
}  

export default function FeedForm(props: FeedFormProps) {

    const [data, setData] = useState(Array());

    function getImages() {
        let test = [];

        for(const property in props.images){
            test.push({
                id: property,
                url: props.images[property]
            });
        }

        setData(test);
    }


    useEffect(() => {
        getImages();
    }, []);

    return (
        <>
            {data.length ? (
                data.map((image) => {
                    return (
                        <Image key={image.id} id={image.id} url={image.url} />
                    );
                })

            ): <p>No images</p> }
        </>

    )
}