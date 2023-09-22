import { useEffect, useState } from "react";
import axios from 'axios';
import Image from "next/image";
import { useRouter } from "next/router";
import { useParams } from 'next/navigation';

function CategoryComponent(){
    // Next already have their own router
    const router = useRouter();
    const { slug } = router.query;
    const [images, setImages] = useState([]);

    async function fetchImages(){
        try {
            let res = await axios.get(`http://localhost:3000/api/images?category=${slug}`);
    
            setImages(res.data.data.list);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(slug) fetchImages();
    }, [slug]);


    return(
            <div className="columns-4 gap-8 p-2">
                {
                    images.map((data) => {
                        return (
                            <Image 
                                key={data.id}
                                className="w-full rounded m-2" 
                                alt={data.name} 
                                height={100}
                                width={100}
                                src={`http://localhost:3000/${data.path.replace('public/', "")}`}  
                            />
                        )
                    })
                }    
            </div>
    )
}

export default CategoryComponent;