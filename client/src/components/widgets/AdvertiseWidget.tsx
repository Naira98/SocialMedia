import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

import WidgetWrapper from "../styledComponents/WidgetWrapper";
import FlexBetween from "../styledComponents/FlexBetween";
import { palette } from "../../types/ThemeWithPalette";

const AdvertiseWidget = () => {
  const { palette } = useTheme() as { palette: palette };
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper palette={palette} mb="1.5rem" style={{position: 'sticky', top:'6rem', left:'0', zIndex: '99', height:'20rem', cursor:"pointer"}}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3000/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertiseWidget;
