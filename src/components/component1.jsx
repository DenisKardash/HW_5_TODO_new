import { Routes, Route, Link } from 'react-router-dom';
import styles from '../app.module.css';

const MainPage = () => <div>--- Контент главной страницы ---</div>;
const Catalog = () => <div>--- Контент каталога ---</div>;
const Contacts = () => <div>--- Контент контактов ---</div>;

export const Component1 = () => {
	return (
		<div className={styles.app}>
			<div>
				<h3>Меню</h3>
				<ul>
					<li>
						{/* без Link все еще перезагружается */}
						{/* <a href="/">Главная</a> */}
						<Link to="/">Главная</Link>
					</li>
					<li>
						<Link to="/Catalog">Каталог</Link>
					</li>
					<li>
						<Link to="/contacts">Контакты</Link>
					</li>
				</ul>
			</div>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/catalog" element={<Catalog />} />
				<Route path="/contacts" element={<Contacts />} />
			</Routes>
			<hr />
		</div>
	);
};
