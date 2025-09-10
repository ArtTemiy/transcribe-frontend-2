import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "@/../src/icons/logo.svg";
import Button from "~/components/ui/Button";
import Link from "../Link";
import { useUserInfoQuery } from "~/queries/userInfo";
import RoundLabel from "../RoundLabel";
import Modal from "../Modal";
import RegisterForm from "../RegisterForm";

import styles from './index.module.scss'
import { Text } from "../Text";
import type { RegisterResponseData } from "~/mutations/auth/register";

const menuItems = [
    { label: "Pricing", href: "/pricing" },
    { label: "Documents", href: "/documents" },
    { label: "Settings", href: "/settings" },
];

const NavBar: React.FC = () => {
    const userInfoQuery = useUserInfoQuery();
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleGetStartedClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsRegisterModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsRegisterModalOpen(false);
    };

    const handleRegisterSubmit = (data: RegisterResponseData) => {
        console.log("Registration data:", data);
        // Здесь можно добавить логику отправки данных на сервер
        alert(`Регистрация успешна!\nToken: '${data.token}'`);
        setIsRegisterModalOpen(false);
    };

    const handleGoogleSignUp = () => {
        console.log("Google sign up clicked");
        // Здесь можно добавить логику регистрации через Google
        alert("Регистрация через Google");
        setIsRegisterModalOpen(false);
    };

    const handleSignInClick = () => {
        console.log("Sign in clicked");
        // Здесь можно добавить логику перехода на страницу входа
        setIsRegisterModalOpen(false);
        // Например: navigate('/login');
    };

    return <>
        <Navbar expand="lg" bg="white" className="shadow-sm py-2" style={{ fontFamily: "Inter, sans-serif" }}>
        <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
                <Logo />
                <Text variant='header'>AI Bank Statement Converter</Text>
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
                        <Button
                            variant='primary'
                            buttonLabel="Get Started"
                            onClick={handleGetStartedClick}
                        />
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>

        <Modal isOpen={isRegisterModalOpen} onClose={handleCloseModal}>
            <RegisterForm
                onClose={handleCloseModal}
                onSubmit={handleRegisterSubmit}
                onGoogleSignUp={handleGoogleSignUp}
                onSignInClick={handleSignInClick}
            />
        </Modal>
    </>;
};

export default NavBar;