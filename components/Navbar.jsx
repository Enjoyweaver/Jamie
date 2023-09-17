import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="navList">
        <li className="navItem">
          <Link href="/">Home</Link>
        </li>
        <li className="navItem">
          <Link href="/about">About Jamie</Link>
        </li>
        <li className="navItem">
          <Link href="/future-art">Future Art</Link>
        </li>
        <li className="navItem">
          <Link href="/previous-art">Previous Art</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
