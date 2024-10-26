import { useNavigate } from "react-router-dom";
import SmallButton from "../components/SmallButton";
import useColors from "../hooks/util/useColors";

const NotFound = () => {
  const nvigate = useNavigate();
  const { neutralMain } = useColors();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ color: neutralMain }}>Page not found</h1>
      <SmallButton onClick={() => nvigate(-1)}>Go Back</SmallButton>
    </div>
  );
};

export default NotFound;
