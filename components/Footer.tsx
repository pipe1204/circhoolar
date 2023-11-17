import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ColumnProps {
  title: string;
  links: Array<string>;
}

const Footer = () => {
  const FooterColumn = ({ title, links }: ColumnProps) => {
    return (
      <div className="footer_column">
        <h4 className="font-semibold text-white">{title}</h4>
        <ul className="flex flex-col gap-2 font-normal">
          {links.map((link) => (
            <Link href={"/"} key={link} className="text-paragraph-color">
              {link}
            </Link>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-x-12 w-full">
        <div className="flex items-start flex-col">
          <Image src={"/Logo-light.png"} alt={"Logo"} width={130} height={50} />
          <p className="text-start text-sm font-normal mb-5 mt-2 max-w-xs text-paragraph-color">
            The innovative marketplace dedicated to transforming the way we
            approach school uniforms and essentials
          </p>
        </div>
        <div className="flex flex-col xl:flex-row xl:flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
          <FooterColumn
            title={footerLinks[1].title}
            links={footerLinks[1].links}
          />

          <FooterColumn
            title={footerLinks[2].title}
            links={footerLinks[2].links}
          />
        </div>
      </div>
      <div className="flexBetween footer_copyright">
        <p className="text-paragraph-color">@ 2023 Circhoolar. All rights</p>
        <p className="text-paragraph-color font-semibold">
          3,252 items circulated
        </p>
      </div>
    </footer>
  );
};

export default Footer;
