import React from "react";
import Link from "next/link";
import "../index.scss";

const Navigation: React.FC = () => {
  return (
    <div className="mainNav">
      <ul className="mainNav__List">
        <li className="mainNav__item">
          <Link href="/">Logo</Link>
        </li>
        <li className="mainNav__item">
          <Link href="/">Logo</Link>
        </li>
        <li className="mainNav__item">
          <Link href="/">Logo</Link>
        </li>
        <li className="mainNav__item">
          <Link href="/">Logo</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
