import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <p className="my-40 text-4xl">Sorry, this page doesn't exist!</p>
      <Button onClick={() => navigate("/")} label="Back to Homepage"></Button>
    </div>
  );
};

export default NotFound;
