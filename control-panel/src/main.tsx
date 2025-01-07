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
							path="/product/list"
							element={<ProductsList />}
						/>
						<Route
							path="/product/add"
							element={<AddProduct />}
						/>
						<Route
							path="/product/edit/:productId"
							element={<EditProduct />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>
);
