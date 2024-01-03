import {
	Routes,
	Route,
	Link,
	Outlet,
	useParams,
	NavLink,
	useMatch,
} from 'react-router-dom';
import styles from '../app.module.css';

const fetchProductList = () => [
	{ id: 1, name: 'TV' },
	{ id: 2, name: 'Phone' },
	{ id: 3, name: 'Tablet' },
];

const fetchProduct = (id) =>
	({
		1: { id: 1, name: 'TV', price: 2990, amount: 10 },
		2: { id: 2, name: 'Phone', price: 900, amount: 105 },
		3: { id: 3, name: 'Tablet', price: 1200, amount: 56 },
	})[id];
// [id] - по этому (переданному) параметру выбирается объект для отображения
// если нет такого свойства - вернет undefined

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
		{/* вывод контента вложенного (дочернего) РОУТА (Outlet можем поместить там где надо) */}
	</div>
);

const ProductNotFound = () => <div>!!! Такого товара не существует !!!</div>;
const Product = () => {
	const params = useParams(); // позволяет узнать ID например
	// const { name, price, amount } = fetchProduct(params.id) || {};
	// пустой объект  {} страховка от ошибки (показывает без данных)

	const urlMatchData = useMatch('/catalog/:type/:id');
	console.log(urlMatchData);
	console.log(urlMatchData.params.type);

	const product = fetchProduct(params.id);

	if (!product) {
		return <ProductNotFound />;
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

export const Component2 = () => {
	return (
		<div className={styles.app}>
			<div>
				<h3>Меню</h3>
				<ul>
					<li>
						<NavLink to="/">
							{({ isActive }) =>
								isActive ? (
									<>
										<span>Главная</span>
										<span> *a*</span>
									</>
								) : (
									'Главная'
								)
							}
						</NavLink>
						{/* выше довольно много кода - переделаем в константу ExtendedLink  */}
						{/* ExtendedLink - компонент обертка */}
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
					{/* вложенный route - /catalog/produt  !!! path="produt  "/" - не надо !!!*/}
					<Route path="product/:id" element={<Product />} />
					{/* /:id - динамический сегмент шаблона пути - ПАРАМЕТР */}
					<Route path="service/:id" element={<Product />} />
				</Route>
				<Route path="/contacts" element={<Contacts />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<hr />
		</div>
	);
};
