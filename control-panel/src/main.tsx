import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.tsx';
import './index.css';
import ProductsList from './pages/product/ProductsList.tsx';
import AddProduct from './pages/product/AddProduct.tsx';
import EditProduct from './pages/product/EditProduct.tsx';
import CategoriesList from './pages/category/CategoriesList.tsx';
import AddCategory from './pages/category/AddCategory.tsx';
import EditCategory from './pages/category/EditCategory.tsx';
import Auth from './pages/auth/Auth.tsx';
import Signup from './pages/auth/Signup.tsx';
import Login from './pages/auth/Login.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<App />}
					>
						<Route
							path="/dashboard"
							element={<div>dashboard</div>}
						/>
						<Route
							path="/product"
							element={<ProductsList />}
						/>
						<Route
							path="/product/add"
							element={<AddProduct />}
						/>
						<Route
							path="/product/:productId"
							element={<EditProduct />}
						/>
						<Route
							path="/category"
							element={<CategoriesList />}
						/>
						<Route
							path="/category/add"
							element={<AddCategory />}
						/>
						<Route
							path="/category/:categoryId"
							element={<EditCategory />}
						/>
						<Route
							path="/auth"
							element={<Auth />}
						>
							<Route
								path="/auth/signup"
								element={<Signup />}
							/>
							<Route
								path="/auth/login"
								element={<Login />}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>
);
