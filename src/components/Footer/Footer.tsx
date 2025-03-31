import * as Styled from "./Footer.style";

const Footer = () => {
  return (
    <>
      <Styled.FooterContainer>
        <Styled.Divider />
        <Styled.FooterWrapper>
          <Styled.PolicyText>이용약관</Styled.PolicyText>
          <Styled.CopyRightText>
            Copyright © Dugout. All rights reserved.
          </Styled.CopyRightText>
          <Styled.EmailText>
            <a href="mailto:support@dugout.com">support@dugout.com</a>
          </Styled.EmailText>
        </Styled.FooterWrapper>
      </Styled.FooterContainer>
    </>
  );
};

export default Footer;
