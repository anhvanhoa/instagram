import Footer from './Footer';
import SuggestUser from './SuggestUser';
import AccountMe from './AccountMe';

const Suggest = () => {
    return (
        <div className="pt-8 max-w-[300px]">
            <AccountMe />
            <SuggestUser />
            <Footer />
        </div>
    );
};

export default Suggest;
