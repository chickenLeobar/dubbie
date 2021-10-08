import styled from "styled-components";
import Auth from "../components/Auth";
export function Index() {
  return (
    <Auth fallback={<h1> no molestar</h1>} roles={["admin", ":o"]}>
      <h1>Hello world</h1>
    </Auth>
  );
}

export default Index;
