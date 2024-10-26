import { Typography } from "@mui/material";
import WidgetWrapper from "../styledComponents/WidgetWrapper";
import FlexBetween from "../styledComponents/FlexBetween";
import useColors from "../../hooks/util/useColors";
import advertiseImage from "../../assets/advertise.jpeg";

const AdvertiseWidget = () => {
  const { neutralDark, neutralMain, neutralMed, palette } = useColors();

  return (
    <WidgetWrapper
      palette={palette}
      mb="1.5rem"
      style={{
        position: "fixed",
        width: "279px",
        top: "7.5rem",
        height: "20rem",
        cursor: "pointer",
      }}
    >
      <FlexBetween>
        <Typography color={neutralDark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={neutralMed}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={advertiseImage}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={neutralMain}>MikaCosmetics</Typography>
      </FlexBetween>
      <Typography color={neutralMed} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertiseWidget;
