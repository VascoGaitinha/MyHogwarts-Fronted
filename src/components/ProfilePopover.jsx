import React, { useContext } from "react";
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";
import { useState } from "react";
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import teams from "../assets/teams.json"
import { AuthContext } from "../Context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePopOver = (props) => {

    const {BACKEND} = useContext(AuthContext);
    const navigate = useNavigate();

    const {loggedUser} = props;
    const [convertedImage, setConvertedImage] = useState("");
    const [form, setForm] = useState({
        name: "",
        team: "",
        image: convertedImage,
        firstLoggin: false
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
    
        const handleFile = async (e) => {
            try {
                if (e.target.files && e.target.files.length > 0) {
                    const convImg = await imgToB64(e.target.files[0]);
                    setForm((prev) => ({
                        ...prev, ["image"]: convImg
                    }))
                }
            } catch (error) {
                console.error(error);
            }
        };

    const handleTyping = (e, field) => {
        setForm((prev)=>({
            ...prev,[field]:e
        }))
    };

    const handleSelect = (e, field) => {
        setForm((prev)=>({
            ...prev,[field]:e
        }))
    };  

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = form;
/* 
        console.log("POSTING", requestBody)
        console.log("TO", `${BACKEND}/api/users/${loggedUser._id}` ) */

        axios.put(`${BACKEND}/api/users/${loggedUser._id}`, requestBody)
        .then((response)=>{ 
            console.log("done with response:", response.data)
            navigate('/homepage');
        })
        .catch((error)=>{ console.log(error)})
    };

  const content = (
    <PopoverContent className="w-[240px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          {loggedUser.firstLoggin?
          <p className="text-small font-bold text-foreground" {...titleProps}>  
          This is your first loggin, add some info about you so people can know you better!
          </p>
          :
          <p>Edit Profile</p>}
            <form onSubmit={(e)=> handleFormSubmit(e)}>
                <Input value={form.name} label="Name" size="sm" variant="flat" onChange={(e)=>handleTyping(e.target.value, 'name')}/>
                <Select size="sm" label="Team" onChange={(e)=> handleSelect(e.target.value, "team")}>
                    {teams.houses.map((team)=>{
                        return(
                            <SelectItem value={team} key={team}>{team}</SelectItem>
                        )
                    })}
                </Select>
                <Input type="file" onChange={handleFile}>Profile Picture</Input>
                <Button type="submit" size="sm">Join Us!</Button>
                <Button size="sm" onClick={()=> navigate('/homepage')}>Skip</Button>
            </form>
        </div>
      )}
    </PopoverContent>
  )

  return (
    <div className="flex gap-500 space-y-10">
        <Popover
          key="blur"
          showArrow
          offset={50}
          placement="bottom"
          backdrop="blur"
        >
          {content}
        </Popover>
      
    </div>
  );
}

export default ProfilePopOver;
