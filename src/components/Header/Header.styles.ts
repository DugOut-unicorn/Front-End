import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  color: #000000;
  padding-top: 10px;
  font-family: "KBO-Dia-Gothic_bold";
`;

export const HeaderWrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  width: 100%;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 200px;
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const LogoText = styled.a`
  font-size: 20px;
`;

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 50px;
  width: 650px;
`;

export const MenuItem = styled.a`
  font-size: 16px;
  text-decoration: none;

  &:hover {
    color: #007bff;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DividerText = styled.p`
  font-size: 12px;
`;

export const UserText = styled.a`
  font-size: 12px;
  text-decoration: none;

  &:hover {
    color: #007bff;
  }
`;
export const NotificationIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
