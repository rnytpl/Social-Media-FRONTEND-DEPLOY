import { Typography, useTheme } from "@mui/material";
import { FlexBetween } from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://firebasestorage.googleapis.com/v0/b/social-media-app-f5543.appspot.com/o/freestock_151700096.jpg?alt=media&token=baa2fd31-9f54-4804-9094-7be5fb8dc592"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi culpa
        explicabo eveniet! Architecto reiciendis esse placeat animi optio
        cupiditate ratione!
      </Typography>
    </WidgetWrapper>
  );
};
export default AdvertWidget;
