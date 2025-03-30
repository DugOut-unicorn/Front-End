import * as Styled from "./Header.styles";
import Logo from "../../assets/main_logo.png";
import Notification from "../../assets/notification_icon.png";

const Header = () => {
  return (
    <Styled.HeaderContainer>
      <Styled.HeaderWrapper>
        <Styled.LogoContainer>
          <Styled.Logo src={Logo} alt="logo" />
          <Styled.LogoText>Dugout</Styled.LogoText>
        </Styled.LogoContainer>
        <Styled.MenuContainer>
          <Styled.MenuItem>직관 매칭</Styled.MenuItem>
          <Styled.MenuItem>경기 일정</Styled.MenuItem>
          <Styled.MenuItem>순위/기록</Styled.MenuItem>
        </Styled.MenuContainer>
        <Styled.UserContainer>
          <Styled.UserText>로그아웃</Styled.UserText>
          <Styled.DividerText>|</Styled.DividerText>
          <Styled.UserText>마이페이지</Styled.UserText>
          <Styled.DividerText>|</Styled.DividerText>
          <Styled.NotificationIcon src={Notification} alt="notification" />
        </Styled.UserContainer>
      </Styled.HeaderWrapper>
    </Styled.HeaderContainer>
  );
};

export default Header;
