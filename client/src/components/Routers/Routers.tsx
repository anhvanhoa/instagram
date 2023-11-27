import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutMain from '~/layouts/LayoutMain';
import LayoutNotAuth from '~/layouts/LayoutNotAuth';
import LayoutFooter from '~/layouts/LayoutFooter';
import OnlyFooter from '~/layouts/OnlyFooter';
import { Router } from '~/types/router';
interface Props {
    data: Router[];
}
const Routers: React.FC<Props> = ({ data }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    {data.map((item, index) => {
                        if (item.layout === 'main') {
                            return (
                                <Route key={index} element={<LayoutMain />}>
                                    <Route path={item.path} element={item.element} />
                                </Route>
                            );
                        } else if (item.layout === 'footer') {
                            return (
                                <Route key={index} element={<LayoutFooter />}>
                                    <Route path={item.path} element={item.element} />
                                </Route>
                            );
                        } else if (item.layout === 'onlyFooter') {
                            return (
                                <Route key={index} element={<OnlyFooter />}>
                                    <Route path={item.path} element={item.element} />
                                </Route>
                            );
                        } else {
                            return (
                                <Route key={index} element={<LayoutNotAuth />}>
                                    <Route path={item.path} element={item.element} />
                                </Route>
                            );
                        }
                    })}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
