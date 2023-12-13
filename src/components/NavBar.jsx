import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Image} from "@nextui-org/react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/auth.context";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";
import axios from "axios";



export default function NavBar() {

    const { isLoggedIn, user, logOut, BACKEND } = useContext(AuthContext);
    const[loading,setLoading] = useState(true);
    const[loggedUser, setLoggedUser] = useState(null);
    
    
    useEffect(() => {
      if (user && user._id) {
        axios.get(`${BACKEND}/api/users/${user._id}`)
          .then((response) => {
            setLoggedUser(response.data)
            setLoading(false);

          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setLoading(true);
          });
      } else {
        // Handle the case where user or user._id is not available
        setLoading(true);
      }
    }, [loading]); 

  return (
    <Navbar className="nav">
      {!loading &&
      <NavbarContent >
      <NavbarBrand>
        <img src="/menu.png" className="menu-small"/>
        <h1>MyHogwarts</h1>
      </NavbarBrand>
        <NavbarItem >
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar src={`/${loggedUser.team?.name}-badge.png`} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Team Actions" variant="flat">
              <DropdownItem key="team" className="h-8 gap-1" href='/users/:userId'>
                {loggedUser.team?.name}
              </DropdownItem>
              <DropdownItem key="teams" className="h-8 gap-1" href="/teams/">
                Teams
              </DropdownItem>
              <DropdownItem key="members" className="h-8 gap-1" href="/users/">
                Members
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar src={loggedUser.image} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-8 gap-1" href={`/users/${loggedUser._id}`}>
                Profile
              </DropdownItem>
              <DropdownItem key="logout" className="h-8 gap-1" onAction={logOut}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        </NavbarContent>
        }
    </Navbar>
  );
}

