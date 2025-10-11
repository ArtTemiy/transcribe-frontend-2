import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

import Logo from '@/../src/icons/logo.svg';
import Button from '@/components/ui/Button';
import { useAuthLogoutMutation } from '@/mutations/auth/logout';
import { useUserInfoQuery } from '@/queries/userInfo';
import type { AuthResponse } from '@/types/auth/authResponse';

import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import Link from '../Link';
import { useModal } from '../Modal/useModal';
import RoundLabel from '../RoundLabel';
import { Text } from '../Text';

import styles from './index.module.scss';

const menuItems = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Documents', href: '/documents' },
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
        [queryClient, registerModal, loginModal],
    );

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
                        <Nav className='mx-auto gap-4 mb-5 mb-lg-0 mt-4 mt-lg-0'>
                            {userInfoQuery.data?.data !== undefined && (
                                <Nav.Item className={styles.navlink}>
                                    <Text variant='body-s'>
                                        Pages{' '}
                                        <RoundLabel variant='caption'>
                                            {userInfoQuery.data.data.pages}
                                        </RoundLabel>
                                    </Text>
                                </Nav.Item>
                            )}
                            {menuItems.map(item => (
                                <Nav.Item key={item.href} className={styles.navlink}>
                                    <Link variant='body-s' href={item.href}>
                                        {item.label}
                                    </Link>
                                </Nav.Item>
                            ))}
                            {userInfoQuery.data?.data && (
                                <Nav.Item className={styles.navlink}>
                                    <Link variant='body-s' href='/settings'>
                                        Settings
                                    </Link>
                                </Nav.Item>
                            )}
                        </Nav>
                        <Nav className='gap-3 mb-3 mb-lg-0'>
                            {userInfoQuery.data?.data ? (
                                <>
                                    <Nav.Item className='w-100'>
                                        <Button
                                            variant='secondary'
                                            onClick={handleLogout}
                                            fullWidth
                                        >
                                            Logout
                                        </Button>
                                    </Nav.Item>
                                </>
                            ) : (
                                <>
                                    <Nav.Item className='w-100'>
                                        <Button variant='secondary' onClick={openSignIn} fullWidth>
                                            Login
                                        </Button>
                                    </Nav.Item>
                                    <Nav.Item className='w-100'>
                                        <Button variant='primary' onClick={openRegister} fullWidth>
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
                            onSignInClick={openSignIn}
                        />
                    </registerModal.Component>
                    <loginModal.Component>
                        <LoginForm
                            onClose={loginModal.closeModal}
                            onSubmit={handleSuccessAuthSubmit}
                            onRegisterClick={openRegister}
                        />
                    </loginModal.Component>
                </>
            )}
        </>
    );
};

export default NavBar;
