const Footer = () => {
  return (
    <div className="font-kbo_medium h-full w-full text-left text-[12px] text-black">
      <hr className="border-0 border-t border-t-[#c5c5c5]" />
      <div className="mx-auto flex h-full w-full max-w-[1080px] flex-col px-[5px] py-5 leading-5">
        <p>이용약관</p>
        <p>Copyright © Dugout. All rights reserved.</p>
        <p className="no-underline hover:underline">
          <a href="mailto:support@dugout.com">support@dugout.com</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
