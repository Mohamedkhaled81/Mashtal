import Box from "@mui/material/Box";
import { Link } from "react-router";

export default function Header() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding:'15px'}}>
      <Link to={'/'}>
        <img
            src="https://www.mashtalegypt.com/wp-content/themes/mashtal/img/logo.png?h=UCet"
            style={{ width: "200px" }}
        />
      </Link>
    </Box>
  )
}
