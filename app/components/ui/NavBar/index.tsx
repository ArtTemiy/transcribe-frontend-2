import React, { useCallback, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from '@/../src/icons/logo.svg';
import Button from '~/components/ui/Button';
import Link from '../Link';
import { useUserInfoQuery } from '~/queries/userInfo';
import RoundLabel from '../RoundLabel';
import Modal from '../Modal/Modal';
import RegisterForm from '../forms/RegisterForm';

import styles from './index.module.scss';
import { Text } from '../Text';
import type { AuthResponse } from '~/types/auth/authResponse';
import { useModal } from '../Modal/useModal';
import LoginForm from '../forms/LoginForm';
import { useAuthLogoutMutation } from '~/mutations/auth/logout';
import { useQueryClient } from '@tanstack/react-query';

const menuItems = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Documents', href: '/documents' },
    { label: 'Settings', href: '/settings' },
];

const NavBar: React.FC = () => {
    const queryClient = useQueryClient();

    const userInfoQuery = useUserInfoQuery();
    const logoutMutation = useAuthLogoutMutation();

    const registerModal = useModal();
    const loginModal = useModal();

    const openSignIn = useCallback(() => {
        registerModal.closeModal();
        loginModal.openModal();
    }, [registerModal, loginModal]);

    const openRegister = useCallback(() => {
        loginModal.closeModal();
        registerModal.openModal();
    }, [loginModal, registerModal]);

    const handleSuccessAuthSubmit = useCallback(
        (_: AuthResponse) => {
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
            registerModal.closeModal();
            loginModal.closeModal();
        },
        [queryClient, registerModal],
    );

    const handleGoogleSignUp = useCallback(() => {
        alert('Register with Google');
        registerModal.closeModal();
    }, [registerModal]);

    const handleGoogleLogin = useCallback(() => {
        alert('Login with Google');
        registerModal.closeModal();
    }, [registerModal]);

    const handleLogout = useCallback(() => {
        logoutMutation.mutate();
    }, [logoutMutation]);
    useEffect(() => {
        if (logoutMutation.isSuccess) {
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
        }
    }, [logoutMutation, queryClient]);

    return (
        <>
            <Navbar
                expand='lg'
                bg='white'
                className='shadow-sm py-2'
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                <Container>
                    <Navbar.Brand href='/' className='d-flex align-items-center gap-2'>
                        <Logo />
                        <Text variant='header'>AI Bank Statement Converter</Text>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='main-navbar' />
                    <Navbar.Collapse id='main-navbar'>
                        <Nav className='mx-auto gap-3'>
                            {userInfoQuery.data?.data?.pages !== undefined && (
                                <Nav.Item>
                                    <Link variant='body-s' href='/pages'>
                                        Pages{' '}
                                        <RoundLabel variant='caption' className={styles.pagesLabel}>
                                            {userInfoQuery.data.data.pages}
                                        </RoundLabel>
                                    </Link>
                                </Nav.Item>
                            )}
                            {menuItems.map(item => (
                                <Nav.Item key={item.href}>
                                    <Link variant='body-s' href={item.href}>
                                        {item.label}
                                    </Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                        <Nav className='gap-2'>
                            {userInfoQuery.data?.data ? (
                                <>
                                    <Nav.Item>
                                        <Button variant='secondary' onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    </Nav.Item>
                                </>
                            ) : (
                                <>
                                    <Nav.Item>
                                        <Button variant='secondary' onClick={openSignIn}>
                                            Login
                                        </Button>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Button variant='primary' onClick={openRegister}>
                                            Get started
                                        </Button>
                                    </Nav.Item>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {!userInfoQuery.data?.data && (
                <>
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
                </>
            )}
        </>
    );
};

export default NavBar;
