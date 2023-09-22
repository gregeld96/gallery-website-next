import { useEffect, useState } from "react";
import { BsChevronCompactLeft } from "react-icons/bs";
import axios from 'axios';
import { useRouter } from "next/router";
import { InputSingleField } from "../field/InputField";
import { TextAreaField } from "../field/TextAreaField";
import TextButton from "../button/TextButton";
import Link from "next/link";

function SignUpComponent() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [biodata, setBiodata] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) router.push("/");
  }, []);

  async function submit() {
    setLoading(true);
    
    try {
        let data = {
            email,
            password,
            name,
            biodata,
            confirmPassword
        };
    
        let res = await axios.post('http://localhost:3000/api/auths/register', data);
    
        localStorage.setItem("accessToken", res.data.data.accessToken);
    
        router.back();
        setLoading(false)
    } catch (error) {
        setLoading(false)
    }
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="max-w-[550px] p-10 border bg-white rounded w-full">
        <div className="overflow-auto">
          <InputSingleField
            textColor={"black"}
            value={name}
            type={"text"}
            placeholder={""}
            required={true}
            label={"Nama"}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="my-4">
          <InputSingleField
            textColor={"black"}
            value={email}
            type={"email"}
            placeholder={""}
            required={true}
            label={"Email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <TextAreaField
              textColor={"black"}
              value={biodata}
              label={"Bio Data"}
              onChange={(e) => setBiodata(e.target.value)}
            />
          <div className="my-4">
          <InputSingleField
            textColor={"black"}
            value={password}
            type={"password"}
            placeholder={""}
            required={true}
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
            <InputSingleField
              textColor={"black"}
              value={confirmPassword}
              type={"password"}
              placeholder={""}
              required={true}
              label={"Konfirmasi Password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          <div className="mt-4">
            <TextButton title={"Daftar"} onClick={() => submit()} loading={loading} />
          </div>
        </div>
        <p className="text-xs text-black text-center my-2 mt-5">
          Sudah memiliki akun ?{" "}
          <Link href={'/auths/sign-in'}>
            <span className="hover:text-[#07638d] font-bold" >
                Masuk
            </span>
          </Link>
        </p>
        <Link href={'/'}>
            <p className="flex  text-black justify-center items-center text-xs my-4" >
                <BsChevronCompactLeft size={15} /> Kembali ke awal
            </p>
        </Link>
      </div>
    </div>
  );
}

export default SignUpComponent;
