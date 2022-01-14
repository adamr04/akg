import React, { Fragment, useEffect, useState } from "react";
import { Link } from "gatsby";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Logo, Nav, ThemeSwitch } from "@/components";
import { EmptyProps } from "@/definitions";

import "./Header.styles.css";

const navigation = {
  links: [
    { name: "Home", to: "/" },
    { name: "Über uns", to: "/about" },
    { name: "Ballzeitung", to: "/ballzeitung" },
    { name: "Preise & Karten", to: "/reservation" },
  ],
};

export const Header: React.FC<EmptyProps> = () => {
  const { links } = navigation;
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <Popover className={`headerWrapper ${!top && "keep"}`}>
      <header className="header">
        <div className="header__left">
          <Link to="/" className="brand">
            <Logo />
          </Link>
        </div>
        <div className="header__center">
          <div className="hidden lg:flex">
            <Nav links={links} />
          </div>
        </div>
        <div className="header__right">
          <ThemeSwitch />
          <div className="lg:hidden">
            <Popover.Button className="btn --icon">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </header>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="header--mobile">
          <div className="rounded-lg shadow-lg ring-1 ring-skin-header ring-opacity-5 bg-skin-header border">
            <div className="p-4">
              <div className="z-50 flex items-center justify-between">
                <div className="-mr-2 -mt-2 order-2">
                  <Popover.Button className="btn --icon">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <Link to="/" className="brand">
                  <Logo />
                </Link>
              </div>
            </div>
            <div className="py-6 px-4 space-y-6">
              <Nav links={links} />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
