import React, { useContext } from "react";
import { useState } from "react";
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
        const requestBody = form;
        const teamId = form.team;
        const payload = {
            memberId: loggedUser._id
        }

        axios.put(`${BACKEND}/api/users/${loggedUser._id}`, requestBody)
        .then((response)=>{ 
            console.log("done with response:", response.data)
        })
        .catch((error)=>{ console.log(error)})

        axios.put(`${BACKEND}/api/teams/${teamId}/adduser`, payload)
        .then(()=>{
            console.log("Put with", payload, "to Team")
        })
        .catch((error)=> console.log(error))
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

                <label className="w-full">Profile Picture (max 16mb)</label>
                <input className="file-button" type="file" onChange={(e) => handleFile(e, "image")}/>
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
