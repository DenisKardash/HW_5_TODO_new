import React from 'react';
import styles from './app.module.css';

// import { Component1 } from './components/component1';
// import { Component2 } from './components/component2';
import { Component3 } from './components/component3';

export const App = () => {
	return (
		<>
			<div className={styles.info}>1_Routes-Route-Link</div>
			{/* <Component1 /> */}
			<div className={styles.info}>2-5_Outlet, динамические сегменты, useParams()</div>
			{/* <Component2 /> */}
			<div className={styles.info}>6_Программная навигация</div>
			<Component3 />
		</>
	);
};
