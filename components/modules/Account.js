import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import ActivityCard from "../card/ActivityCard";

function AccountProfileComponent() {

    const [images, setImages] = useState([]);
    const router = useRouter();
    const [modalUpdate, setModalUpdate] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState("");

    async function fetchImages(){
        const token = localStorage.getItem("accessToken");

        try {
            let res = await axios.get('http://localhost:3000/api/images/user', {
                headers: {
                    access_token: token
                }
            });
    
            setImages(res.data.data.list);
        } catch (error) {
            console.log(error)
        }
    }

    async function onDeleteImage({id}){
        try {
            const token = localStorage.getItem("accessToken");

            await axios.delete(`http://localhost:3000/api/images/${id}`, {
                headers: {
                    access_token: token
                }
            });

            fetchImages();
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) router.push("/auths/sign-in");
        fetchImages();
    }, [router.query]);

    useEffect(() => {
        fetchImages();
    }, [modalUpdate]);
    
    return(
        <div className="grid grid-cols-4 gap-4 px-2 py-3">
            {
                images.map((data) => {
                    return (
                        <ActivityCard 
                            key={data.id} 
                            backgroundImage={data.path} 
                            name={data.name} 
                            selectedSlug={selectedSlug} 
                            id={data.id} 
                            onDelete={() => onDeleteImage({id: data.id})} 
                            open={modalUpdate} 
                            onModal={(e) => {
                                console.log(e);
                                if(!modalUpdate) setSelectedSlug(e);
                                setModalUpdate(!modalUpdate)
                            }} 
                            slug={data.slug}
                        />
                    )
                })
            }
        </div>
    )

}

export default AccountProfileComponent;