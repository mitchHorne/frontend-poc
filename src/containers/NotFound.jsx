import { Link } from "react-router";
import styled from "styled-components";

const NotFound = styled.div`
  background: lightcoral;
  color: white;
  text-align: center;
`;

export default function NotFoundPage() {
  return (
    <NotFound>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go back to home page</Link>
    </NotFound>
  );
}
