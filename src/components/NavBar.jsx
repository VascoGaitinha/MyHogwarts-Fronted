import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Image} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/auth.context";
import {Popover, PopoverTrigger, PopoverContent, Button,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import LogInPopover from "./LoginPopOver";
import SignUpPopover from "./SignUpPopover";
import axios from "axios";



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
    <Navbar position="static">
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        {!isLoggedIn ? (
        <NavbarItem>
            <Popover placement="bottom" showArrow offset={10}>
                <PopoverTrigger>
                    <Button color="primary">LogIn</Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    <LogInPopover/>
                </PopoverContent>
            </Popover>
            <Popover placement="bottom" showArrow offset={10}>
                <PopoverTrigger>
                    <Button color="primary">SignUp</Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    <SignUpPopover/>
                </PopoverContent>
            </Popover>
        </NavbarItem>
        ):(
        <NavbarItem style={{display: "flex"}}>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar src="/menu.png" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="team" className="h-14 gap-2" href='/users/:userId'>
                {loggedUser?.team?.name}
              </DropdownItem>
              <DropdownItem key="settings" className="h-14 gap-2" onAction={logOut}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar src={loggedUser?.image} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" href='/users/:userId'>
                Profile
              </DropdownItem>
              <DropdownItem key="logout" className="h-14 gap-2" onAction={logOut}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}

