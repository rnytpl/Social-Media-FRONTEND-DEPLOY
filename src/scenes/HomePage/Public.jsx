import { Box } from "@mui/material";
import { FlexBetween } from "components/FlexBetween";

const Public = () => {
  return (
    <FlexBetween width="100vw" height="70vh" gap="0.5rem" m="auto">
      <Box flexBasis="50%" m="auto">
        <img
          style={{ objectFit: "cover" }}
          width="100%"
          className="index-image"
          src="https://s3.amazonaws.com/freestock-prod/450/freestock_431080030.jpg"
          alt="social-media"
        />
      </Box>
      <Box flexBasis="20%" m="auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, nam
        expedita. Qui laborum veniam quasi perferendis, repellat vero natus
        labore?
      </Box>
    </FlexBetween>
  );
};
export default Public;
