import React from 'react';
import "../styles/styles.css";

const InfiniteScroll = () => {
  const links = [
    'Log In',
    'Iniciar sesión',
    'Se connecter',
    'लॉग इन',
    'ログイン',
    '로그인',
    'Đăng nhập',
    '登录',
  ];

  return (
    <div className="scroll-wrapper">
      <div className="scroll-container">
        {links.map((link, index) => (
          <p key={index} className="scroll-item">
            {link}
          </p>
        ))}
        {/* Repeat the list to make the scroll effect more seamless */}
        {links.map((link, index) => (
          <p key={`repeat-${index}`} className="scroll-item">
            {link}
          </p>
        ))}
        {links.map((link, index) => (
          <p key={`repeat-${index}`} className="scroll-item">
            {link}
          </p>
        ))}
        {links.map((link, index) => (
          <p key={`repeat-${index}`} className="scroll-item">
            {link}
          </p>
        ))}
      </div>
      <div className="scroll-mask"></div>
    </div>
  );
};

export default InfiniteScroll;
