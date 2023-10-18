import React from 'react';
import Sidebar from './Sidebar';
import OperatorList from './OperatorList';
import Header from './Header';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCurrentOperator } from '../redux/features/operator-slice';
import Footer from './Footer';
import Styles from './Layout.module.scss';

const Layout = () => {
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.operators.currentIndex);
  return (
    <div
      className={Styles.layout}
      onClick={() => dispatch(setCurrentOperator(null))}
    >
      <div className={Styles.header}>
        <Header disabled={currentIndex === null} />
      </div>
      <div className={Styles.main}>
        <div className={Styles.sidebar}>
          <Sidebar />
        </div>
        <div className={Styles.blocksWrapper}>
          <div className={Styles.blocks}>
            <OperatorList />
          </div>
          <div className={Styles.footer}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
