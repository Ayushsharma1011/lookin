import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnClick = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    // Only scroll if the pathname has changed
    if (prevPath.current !== location.pathname) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTopOnClick;
