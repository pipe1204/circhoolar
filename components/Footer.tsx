import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinksSection {
  title: string;
  links: FooterLink[];
}

const Footer = () => {
  const FooterColumn = ({ title, links }: FooterLinksSection) => {
    return (
      <div className="footer_column">
        <h4 className="font-semibold text-white">{title}</h4>
        <ul className="flex flex-col gap-2 font-normal">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className="text-paragraph-color"
            >
              {link.name}
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
            The innovative platform transforming how parenting communities share
            and access pre-loved items, fostering sustainability and
            collaboration across families.
          </p>
        </div>
        <div className="flex flex-col xl:flex-row xl:flex-wrap gap-12">
          {footerLinks.map((footerLink) => (
            <FooterColumn title={footerLink.title} links={footerLink.links} />
          ))}
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
