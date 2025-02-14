"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]); // Typed state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        console.log("Fetched Data:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <Header />
      <h1 className="text-3xl font-bold text-center mb-5 pt-5">Product List</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-3"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
