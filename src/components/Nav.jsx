import { NavLink } from "react-router";
import styled from "styled-components";

import theme from "../constants/theme";
import Logo from "/public/logo.jpg";

const StyledNav = styled.nav`
  background: ${theme.colors.backgroundNavColor};
  display: flex;
  left: 0;
  margin: 0;
  padding: 0 10px;
  padding-left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  div {
    display: flex;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: black;

  &.active {
    background: ${theme.colors.accentColor};
    color: ${theme.colors.backgroundNavColor};
    cursor: default;
  }
`;

const Image = styled.img`
  height: 44px;
  left: calc(50% - 50px);
  position: absolute;
  width: 100px;
`;

export default function Nav() {
  return (
    <StyledNav>
      <div>
        <StyledNavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/"
        >
          Certifications
        </StyledNavLink>
        <StyledNavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/vehicles"
        >
          Vehicles
        </StyledNavLink>
      </div>
      <Image src={Logo} />
    </StyledNav>
  );
}
