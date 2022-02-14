import { getLoggedUser } from "./getLoggedUser";
import { Typography } from "@mui/material";
import institute_logo from "../../images/institute_logo.png";

export const UserProfile = (props: any) => {
  return (
    <div>
      <Typography>
        <img src={institute_logo} width="200px" alt="Logo Instituto" />
      </Typography>
    </div>
  );
};
