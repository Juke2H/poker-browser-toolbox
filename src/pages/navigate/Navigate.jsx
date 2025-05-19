import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Simply navigates to Ranges on useEffect
const Navigate = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Navigated")
        navigate("/ranges");
    });
};

export default Navigate;