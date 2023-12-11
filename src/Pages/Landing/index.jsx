import { useNavigate } from "react-router-dom";
import {Button} from "@nextui-org/button"
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import LogInPopover from "../../components/LoginPopOver";
import SignUpPopover from "../../components/SignUpPopover";

function LandingPage() {

    const navigate = useNavigate();


  return (
    <div>
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
    </div>
  );
}

export default LandingPage;
