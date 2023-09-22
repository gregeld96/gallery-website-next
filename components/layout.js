import { useRouter } from "next/router";
import { MdOutlineAccountCircle, MdOutlineLogout } from 'react-icons/md';
import { LuPlusSquare } from 'react-icons/lu';
import { useEffect, useState } from "react";
import axios from 'axios';
import UploadImageModal from "./modal/UploadImage";
import Link from 'next/link'

function HeaderLayout({children}) {
    const router = useRouter();
    const [auth, setAuth] = useState(false);
    const [account, setAccount] = useState(false);
    const [category, setCategory] = useState([]);
    const [modal, setModal] = useState(false);

    async function fetchCategory(){
        try {
            let res = await axios.get('http://localhost:3000/api/images/category');

            setCategory(res.data.data.list);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        fetchCategory();

        if (token) {
            let path = location.pathname.split("/")[1];
            if(path === 'accounts') setAccount(true);
            else setAccount(false)
            setAuth(true)
        };
    }, [])

    function logout() {
        localStorage.removeItem("accessToken");
        setAuth(false);
        router.back();
    }

    return (
        <div className="min-h-screen">
            <div className="flex justify-between items-center bg-gradient-to-tl from-[#fcb502] to-[#06384a] p-4">
              {/* 
                  In React people depend on useNavigate when we want to move to other page.
                  Link has many built-in features that help improve application performance and SEO ranking.
              */}
              <Link href={'/'}>
                <p className="text-2xl font-bold text-white">Gallery GWP</p>
              </Link>
              <div className="flex">
                    {
                        auth && account ? <div className="border p-2 border-white h-[50px] w-[150px] items-center flex justify-center" onClick={() => setModal(true)}>
                            <LuPlusSquare size={25} color="white" />
                            <p className="text-sm ml-3 text-white">
                                Add Image
                            </p>
                        </div> : category.map((data) => {
                            return (
                              <Link href={`/categories/${data.value.replace(' ', '-').toLowerCase()}`} key={data.value}>
                                <p className="mx-2 text-white capitalize">
                                  {data.value}
                                </p>
                              </Link>
                            )
                        })
                    }
                </div>
                {
                    auth && account ? <div className="border p-2 border-white h-[50px] w-[150px] items-center justify-center flex" onClick={() => logout()}>
                        <MdOutlineLogout size={25} color="white" />
                        <p className="text-sm ml-3 text-white">Logout</p>
                    </div> : <Link href={auth ? '/accounts' : '/auths/sign-in'}>
                      <div className="border p-2 border-white h-[50px] w-[170px] items-center flex justify-center">
                          <MdOutlineAccountCircle size={25} color="white" />
                          <p className="text-sm ml-3 text-white">
                              {
                                  auth && !account ? "Account" : "Login / Register"
                              }
                          </p>
                      </div>
                    </Link>
                }
            </div>
            {children}
            <UploadImageModal 
                open={modal} 
                onClick={(e) => {
                    setModal(false);
                    console.log(e);
                    if(e.e === 'success') router.push('/accounts?create=success')
                }} 
                fileId={null} 
                section={"create"} 
            /> 
        </div>
    )
};

export default HeaderLayout;