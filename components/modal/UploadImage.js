import { useEffect, useState } from "react";
import { InputSingleField } from "../field/InputField";
import { DropdownField } from "../field/DropdownField";
import axios from 'axios';
import { TextAreaField } from "../field/TextAreaField";
import { MdFileUpload } from 'react-icons/md';
import Image from "next/image";

function UploadImageModal({ open, onClick, fileId, id, section }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  
  async function fetchCategory(){
    try {
        let res = await axios.get('http://localhost:3000/api/images/category');

        setCategories(res.data.data.list);
    } catch (error) {
        console.log(error)
    }
  }

  async function fetchDetail(){
    try {
       const token = localStorage.getItem("accessToken");

        let res = await axios.get(`http://localhost:3000/api/images/${fileId}`, {
          headers: {
            access_token: token
          }
        });

        setImage(res.data.data?.detail);
        setCategory(res.data.data?.detail?.category);
        setName(res.data.data?.detail?.name);
        setDescription(res.data.data?.detail?.description);
    } catch (error) {
        console.log(error)
    }
  }

  async function submit() {
    try {
        const token = localStorage.getItem("accessToken");

        const payload = new FormData();

        console.log(image);

        payload.append('photo', image?.path ? null : image );
        payload.append('title', name);
        payload.append('description', description);
        payload.append('category', category.toLowerCase());

        if(section !== 'update'){
          await axios.post('http://localhost:3000/api/images/', payload, {
            headers: {
              access_token: token
            }
          })
        } else {
          await axios.put(`http://localhost:3000/api/images/${id}`, payload, {
            headers: {
              access_token: token
            }
          })
        }


        onClick({e: "success"})
    } catch (error) {
        console.log(error);
    }
  }

  function reset(){
    setImage(null);
    setName("");
    setCategory(null);
    setDescription("");
  }

  useEffect(() => {
    fetchCategory();
    section === 'update' ? fetchDetail() : reset();
  }, [open])

  return (
    <div
      className={`fixed ${
        open ? "" : "hidden"
      } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
    >
      <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-2xl text-center leading-6 font-medium text-gray-900">
            Upload Image
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500 text-center">
              Please upload your Image below:
            </p>
          </div>
          <div className="mt-4 text-black">
            <div className="border h-[150px] w-[150px] mx-auto mb-5">
              {image ? (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-${'image'}`}
                >
                  <Image
                    src={image?.path ? `http://localhost:3000/${image.path.replace('public/', "")}` : URL.createObjectURL(image)}
                    width={100}
                    height={100}
                    alt=""
                  />
                </label>
              ) : (
                <label
                  className="flex justify-center items-center h-[100%]"
                  htmlFor={`file-${'image'.replace(/ /g, '-')}`}
                >
                  <MdFileUpload sx={{ marginRight: "10px" }} />
                  Image
                </label>
              )}
              <input type="file" hidden id={"file-image"} onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="mb-2">
              <InputSingleField
                placeholder={"Nature Healing"}
                required={true}
                label={"Nama Photo"}
                value={name}
                type={"text"}
                textColor={"black"}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <TextAreaField label={"Description"} value={description} textColor={"black"} onChange={(e) => setDescription(e.target.value)} />
            <div className="mb-2">
              <DropdownField
                collectionList={categories}
                value={category || ""}
                label={"File Type"}
                keyField={"value"}
                labelField={"value"}
                valueField={"value"}
                required={true}
                textColor={"black"}
                placeholder={"Pilih tipe kategori..."}
                onChange={(e) => setCategory(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          <div className="items-center mt-3 py-3 text-center" onClick={() => submit()}>
            <div
              id="ok-btn"
              className={`cursor-pointer px-4 py-2 bg-[#07638d] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#07638d] focus:outline-none focus:ring-2 focus:ring-[#07638d]`}
            >
              <p>Submit</p>
            </div>
          </div>
          <div className="items-center mt-3 py-3 text-center" onClick={onClick}>
            <div
              id={`section`}
              className={`cursor-pointer px-4 py-2 bg-[transparent] text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-[transparent] focus:outline-none focus:ring-2 focus:ring-[transparent]`}
            >
              <p>Close</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImageModal;
