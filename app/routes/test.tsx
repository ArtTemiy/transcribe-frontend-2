import LoadingSpinner from "~/components/ui/LoadingSpinner";

const Page = () => {
    return <div>
        <h1>Spinner</h1>
        <p>clockwise</p>
        <LoadingSpinner direction="clockwise"  />
        <p>counterclockwise</p>
        <LoadingSpinner direction="counterclockwise"  />

    </div>;
};

export default Page;