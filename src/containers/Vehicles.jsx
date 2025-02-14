import { LocalShipping } from "@mui/icons-material";
import theme from "../constants/theme";

const Vehicles = () => {
  return (
    <div>
      <LocalShipping
        sx={{ color: theme.colors.accentColor, fontSize: "50px" }}
      />
      <h2>Your vehicles would go here</h2>
    </div>
  );
};

export default Vehicles;
