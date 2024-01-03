import { useState, useEffect } from 'react';
import {
	Routes,
	Route,
	Outlet,
	useParams,
	NavLink,
	useNavigate,
	Navigate,
	useRoutes
} from 'react-router-dom';
import styles from '../app.module.css';

const database = {
	productList: [
		{ id: 1, name: 'Телевизор' },
		{ id: 2, name: 'Смартфон' },
		{ id: 3, name: 'Планшет' },
	],
	products: {
		1: { id: 1, name: 'Телевизор', price: 29900, amount: 15 },
		2: { id: 2, name: 'Смартфон', price: 13900, amount: 48 },
		3: { id: 3, name: 'Планшет', price: 18400, amount: 23 },
	},
};

const LOADING_TIMEOUT = 3000;

const fetchProductList = () => database.productList;

const fetchProduct = (id) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(database.products[id]);
		}, 2500);
	});

const MainPage = () => <div>--- Контент главной страницы ---</div>;

const Catalog = () => (
	<div>
		<h3>Каталог товаров</h3>
		<ul>
			{fetchProductList().map(({ id, name }) => (
				<li key={id}>
					<NavLink to={`product/${id}`}>{name}</NavLink>
				</li>
			))}
			<Outlet />
		</ul>
	</div>
);

const ProductNotFound = () => <div>!!! Такого товара не существует !!!</div>;
const ProductLoadError = () => (
	<div>Ошибка загрузки товара, попробуйте ещё раз позднее</div>
);

const Product = () => {
	const [product, setProduct] = useState(null);
	const params = useParams();
	const navigate = useNavigate(); // возвращает функцию `navigate()`, для программной навиг

	useEffect(() => {
		let isLoadingTimeout = false;
		let isProductLoaded = false;

		setTimeout(() => {
			isLoadingTimeout = true;

			if (!isProductLoaded) {
				navigate('/product-load-error', { replace: true });
			}
		}, LOADING_TIMEOUT);

		fetchProduct(params.id).then((loadedProduct) => {
			isProductLoaded = true;

			if (!isLoadingTimeout) {
				// проверка на существования товара
				if (!loadedProduct) {
					navigate('/product-not-exist');
					return;
				}

				setProduct(loadedProduct);
			}
		});
	}, [params.id, navigate]);

	// проверка на загрузку товара
	if (!product) {
		return null; // null потому что он может загружаться useState(null) (наличие выше проверим)
	}

	const { name, price, amount } = product;

	return (
		<div>
			<h3>Товар - {name}</h3>
			<div>Цена: {price}</div>
			<div>Наличие: {amount} шт.</div>
		</div>
	);
};

const Contacts = () => <div>--- Контент контактов ---</div>;
const NotFound = () => <div>!!! Такая страница не существует !!!</div>;

const ExtendedLink = ({ to, children }) => (
	<NavLink to={to}>
		{({ isActive }) =>
			isActive ? (
				<>
					<span>{children}</span>
					<span> *a*</span>
				</>
			) : (
				children
			)
		}
	</NavLink>
);

export const Component3 = () => {

	// const routes = useRoutes([
	// 	{ path: '/', element: <MainPage /> },
	// 	{
	// 		path: '/catalog',
	// 		element: <Catalog />,
	// 		children: [
	// 			{ path: 'product/:id', element: <Product /> },
	// 			{ path: 'product/:id', element: <Product /> },
	// 		],
	// 	},
	// 	{ path: '/contacts', element: <Contacts /> },
	// 	{ path: '/product-load-error', element: <ProductLoadError /> },
	// 	{ path: '/404', element: <NotFound /> },
	// 	{ path: '*', element: <Navigate to="/404" /> },
	// ]);

	return (
		<div className={styles.app}>
			<div>
				<h3>Меню</h3>
				<ul>
					<li>
						<ExtendedLink to="/">Главная</ExtendedLink>
					</li>
					<li>
						<ExtendedLink to="/Catalog">Каталог</ExtendedLink>
					</li>
					<li>
						<ExtendedLink to="/contacts">Контакты</ExtendedLink>
					</li>
				</ul>
			</div>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/catalog" element={<Catalog />}>
					<Route path="product/:id" element={<Product />} />
					<Route path="service/:id" element={<Product />} />
				</Route>
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/product-load-error" element={<ProductLoadError />} />
				<Route path="/product-not-exist" element={<ProductNotFound />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" raplace={true} />} />
			</Routes>
			{/* {routes} */}
			{/* мы просто заменить можем этой константой все пути <Routes> .... </Routes> */}
			<hr />
		</div>
	);
};
