import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Image} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/auth.context";
import {Popover, PopoverTrigger, PopoverContent, Button,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import LogInPopover from "./LoginPopOver";
import SignUpPopover from "./SignUpPopover";
import axios from "axios";
import teams from '../assets/teams.json'



export default function NavBar() {

    const { isLoggedIn, user, logOut, BACKEND } = useContext(AuthContext);
    const[loading,setLoading] = useState(true);
    const[loggedUser, setLoggedUser] = useState(null);
    const[imgUrl, setImgUrl] = useState("");
    const navigate = useNavigate();
    
    
    useEffect(() => {
      if (user && user._id) {
        axios.get(`${BACKEND}/api/users/${user._id}`)
          .then((response) => {
            setLoggedUser(response.data)
            setImgUrl(response.data.image)
            setLoading(false);
            console.log(response.data)
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
          });
      } else {
        // Handle the case where user or user._id is not available
        setLoading(false);
      }
    }, [user]); 

  return (
    <Navbar position="static" className="nav" maxWidth={'full'}>
      <NavbarBrand>
        <img src="/menu.png" className="menu-small"/>
        <h1>MyHogwarts</h1>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar src={`/${loggedUser?.team?.name}-badge.png`} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Team Actions" variant="flat">
              <DropdownItem key="team" className="h-14 gap-2" href='/users/:userId'>
                {loggedUser?.team?.name}
              </DropdownItem>
              <DropdownItem key="teams" className="h-14 gap-2" href="/teams/">
                Teams
              </DropdownItem>
              <DropdownItem key="members" className="h-14 gap-2" href="/users/">
                Members
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar src={loggedUser?.image} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" href={`/users/${loggedUser?._id}`}>
                Profile
              </DropdownItem>
              <DropdownItem key="logout" className="h-14 gap-2" onAction={logOut}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

