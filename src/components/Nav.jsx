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

export default function Nav() {
  return (
    <StyledNav>
      <img src={Logo} style={{ width: "100px" }} />
      <StyledNavLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/"
      >
        Certifications
      </StyledNavLink>
    </StyledNav>
  );
}
