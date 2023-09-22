import HeaderLayout from "@/components/layout";
import HomeComponent from "@/components/modules/Home";
import axios from "axios";

export default function HomePage(props) {
    return <HeaderLayout><HomeComponent props={props.images} /></HeaderLayout> 
}

// In Next we could do something like this
export async function getStaticProps() {
    let res = await axios.get('http://localhost:3000/api/images/');
    
    return {
        props: {
            images: res.data.data.list
        }
    }
}