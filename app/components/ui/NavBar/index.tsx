import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "@/../src/icons/logo.svg";
import Button from "~/components/ui/Button";
import Link from "../Link";
import { useUserInfoQuery } from "~/queries/userInfo";
import RoundLabel from "../RoundLabel";

import styles from './index.module.scss'

const menuItems = [
    { label: "Pricing", href: "/pricing" },
    { label: "Documents", href: "/documents" },
    { label: "Settings", href: "/settings" },
];

const NavBar: React.FC = () => {
    const userInfoQuery = useUserInfoQuery();
    return <Navbar expand="lg" bg="white" className="shadow-sm py-2" style={{ fontFamily: "Inter, sans-serif" }}>
        <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
                <Logo />
                <span style={{ fontWeight: 600, fontSize: 18, color: "#313131" }}>AI Bank Statement Converter</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
                <Nav className="mx-auto gap-3">
                    {userInfoQuery.data?.pagesCount !== undefined && <Nav.Item>
                        <Link variant='body-s' href="/pages">Pages <RoundLabel variant='caption' className={styles.pagesLabel}>{userInfoQuery.data.pagesCount}</RoundLabel></Link>
                    </Nav.Item>}
                    {menuItems.map((item) => (
                        <Nav.Item key={item.href}>
                            <Link variant='body-s' href={item.href}>{item.label}</Link>
                        </Nav.Item>
                    ))}
                </Nav>
                <Nav className="gap-2">
                    <Nav.Item>
                        <Button href='/login' variant='secondary' buttonLabel="Login" />
                    </Nav.Item>
                    <Nav.Item>
                        <Button href="/register" variant='primary' buttonLabel="Get Started" />
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default NavBar;