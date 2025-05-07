import React, { useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import HomePageLogo from "../Secret_Sips_Home_Page_V2.png";
import BannerLogo from "../Secret_Sips_Banner.png";

import { Outlet, useLocation } from 'react-router-dom';

function GameStyleWrapper() {
 

    const location = useLocation();

    const getLogo = () => {
        const isHomePage = location.pathname === '/';
        return isHomePage ? HomePageLogo : BannerLogo;
    }

  return (
    
        <Container component="main"  maxWidth={false}>
            <img src={getLogo()} alt="logo" height="100%" width="100%" />
            <Outlet />
        </Container>

  );
}

export default GameStyleWrapper;
