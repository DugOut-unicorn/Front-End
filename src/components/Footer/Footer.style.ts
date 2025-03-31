import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  font-family: "KBO-Dia-Gothic_medium";
  font-size: 12px;
  color: rgb(0, 0, 0);
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #c5c5c5;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 5px 20px 5px;
  max-width: 1080px;
  margin: 0 auto;
  line-height: 1.25rem;
`;

export const PolicyText = styled.p``;

export const CopyRightText = styled.p``;

export const EmailText = styled.p`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
