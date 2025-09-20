import { Container } from "react-bootstrap";
import styles from './settings.module.scss';
import { Text } from "~/components/ui/Text";
import Button from "~/components/ui/Button";
import TextInput from "~/components/ui/input/TextInput/TextInput";
import { useUserInfoQuery } from "~/queries/userInfo";
import { useCallback } from "react";
import Link from "~/components/ui/Link";
import { useModal } from "~/components/ui/Modal/useModal";

const Page = () => {
    const userInfoQ = useUserInfoQuery();
    const copyKey = useCallback(() => {
        navigator.clipboard.writeText(userInfoQ.data?.data?.apiKey ?? '');
    }, [userInfoQ.data?.data?.apiKey]);

    const reviewModal = useModal();

    return <Container className={styles.container}>
        <Text variant='display'>Settings</Text>
        <Button variant='secondary' fullWidth href='/pricing'>
            Manage subscriptions
        </Button>
        <div className={styles.apiKeySection}>
            <Text variant='header'> API Key</Text>
            <div className={styles.apiKeyCopySection}>
                <TextInput disabled value={userInfoQ.data?.data?.apiKey} />
                <Button
                    variant='secondary'
                    onClick={copyKey}
                    disabled={userInfoQ.data?.data?.apiKey === undefined}
                >Copy</Button>
            </div>
            <Link href='/ducs/api' className={styles.apiKeyLink} typColor='accent'>
                Read API Documentation
            </Link>
        </div>
        <Button variant='primary' onClick={reviewModal.openModal}>
            Send review
        </Button>
        <reviewModal.Component>
            <div>
                TODO
            </div>
        </reviewModal.Component>
    </Container>
}

export default Page;
