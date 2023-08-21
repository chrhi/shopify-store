import Image from "next/image";

import { footerLinks, socialMedia } from "../../constants/footer";

const Footer = () => {
  return (
    <footer className="max-container">
      <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
        <div className="flex flex-col items-start">
          <Image src="/assets/brand.png" alt="logo" width={150} height={80} />

          <p className="mt-6 text-base leading-7 text-white font-montserrat text-white-400 sm:max-w-sm">
            Get shoes ready for the new term at your nearest Nike store. Find
            Your perfect Size In Store. Get Rewards
          </p>
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((item) => (
              <div
                className="flex justify-center items-center w-12 h-12 bg-white rounded-full"
                key={item.alt}
              >
                <item.src className="w-4 h-4 mx-4" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-montserrat text-2xl leading-normal font-medium mb-6 text-white">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className="mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray"
                    key={link.name}
                  >
                    <a className="text-white" href={link.link}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center">
        <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
          <img
            src={"/svg/copyright-sign.svg"}
            alt="copyright sign"
            width={20}
            height={20}
            className="rounded-full m-0"
          />
          <p className="text-white">Copyright. All rights reserved.</p>
        </div>
        <p className="font-montserrat text-white cursor-pointer">
          Terms & Conditions
        </p>
      </div>
    </footer>
  );
};

export default Footer;
