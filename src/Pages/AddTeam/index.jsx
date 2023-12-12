import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";

const AddTeam = () => {
    const {BACKEND} = useContext(AuthContext);
    const [form, setForm] = useState({
        name: "",
        logo: "",
        badge: "",
        banner:""
    });

    const  imgToB64 = (file) =>{
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) =>{
                reject(error)
            }
        })
        } 

        const handleFile = async (e, field) => {
            try {
                if (e.target.files && e.target.files.length > 0) {
                    const convImg = await imgToB64(e.target.files[0]);
                    setForm((prev) => ({
                        ...prev, [field]: convImg
                    }))
                }
            } catch (error) {
                console.error(error);
            }
        };

        const handleTyping = (e, field) => {
            setForm((prev) => ({
                ...prev, [field]: e
            }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            const requestBody =  form;
            console.log(requestBody)

            axios.post(`${BACKEND}/api/teams`, requestBody)
                .then((response)=> {
                    res.status(200).json(response)
                })
                .catch((error)=>{
                   console.log(error)
                })
        }

        


    return(
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input label="name" onChange={(e)=> handleTyping(e.target.value, "name")}></input>
            <label>logo</label>
            <input type="file" onChange={(e) => handleFile(e, "logo")}></input>
            <label>badge</label>
            <input type="file" onChange={(e) => handleFile(e, "badge")}></input>
            <label>banner</label>
            <input type="file" onChange={(e) => handleFile(e, "banner")}></input>
            <button type="submit">ADD</button>
        </form>
    )
}

export default AddTeam;