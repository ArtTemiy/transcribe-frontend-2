import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "@/../src/icons/logo.svg";
import Button from "~/components/ui/Button";
import Link from "../Link";
import { useUserInfoQuery } from "~/queries/userInfo";
import RoundLabel from "../RoundLabel";
import Modal from "../Modal/Modal";
import RegisterForm from "../forms/RegisterForm";

import styles from './index.module.scss'
import { Text } from "../Text";
import type { AuthResponse } from "~/types/auth/authResponse";
import { useModal } from "../Modal/useModal";
import LoginForm from "../forms/LoginForm";

const menuItems = [
    { label: "Pricing", href: "/pricing" },
    { label: "Documents", href: "/documents" },
    { label: "Settings", href: "/settings" },
];

const NavBar: React.FC = () => {
    const userInfoQuery = useUserInfoQuery();

    const registerModal = useModal();
    const loginModal = useModal();

    const openSignIn = () => {
        registerModal.closeModal();
        loginModal.openModal();
    };

    const openRegister = () => {
        loginModal.closeModal();
        registerModal.openModal();
    };

    const handleSuccessAuthSubmit = (data: AuthResponse) => {
        console.log("Registration data:", data);
        // Здесь можно добавить логику отправки данных на сервер
        alert(`Регистрация успешна!\nToken: '${data.accessToken}'`);
        registerModal.closeModal();
    };

    const handleGoogleSignUp = () => {
        alert("Register with Google");
        registerModal.closeModal();
    };

    const handleGoogleLogin = () => {
        alert("Login with Google");
        registerModal.closeModal();
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
                        {!userInfoQuery.data && <>
                            <Nav.Item>
                                <Button
                                    variant='secondary'
                                    onClick={openSignIn}
                                >Login</Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    variant='primary'
                                    onClick={openRegister}
                                >Get started</Button>
                            </Nav.Item>
                        </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        {!userInfoQuery.data && <>
            <registerModal.Component>
                <RegisterForm
                    onClose={registerModal.closeModal}
                    onSubmit={handleSuccessAuthSubmit}
                    onGoogleSignUp={handleGoogleSignUp}
                    onSignInClick={openSignIn}
                />
            </registerModal.Component>
            <loginModal.Component>
                <LoginForm
                    onClose={loginModal.closeModal}
                    onSubmit={handleSuccessAuthSubmit}
                    onGoogleLogin={handleGoogleLogin}
                    onRegisterClick={openRegister}
                />
            </loginModal.Component>
        </>}
    </>;
};

export default NavBar;