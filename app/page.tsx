'use client';

import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, SearchBar, CustomFilter, Hero } from "@/components";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search states
  const [manufacturer, setManuFacturer] = useState('');
  const [model, setModel] = useState('');

  // filter states
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2024);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2024,
        fuel: fuel || "",
        model: model || "",
      });
      setAllCars(result)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getCars();
  }, [manufacturer, model, fuel, year]);

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManuFacturer={setManuFacturer} setModel={setModel} />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            {!loading ? (<div className='home__cars-wrapper'>
              {allCars?.map((car, i) => (
                <CarCard car={car} key={i} />
              ))}
            </div>) : (
              <div className="flex-center mt-16 w-full">
                <Image src={'./loader.svg'} alt={'loader'} className="object-contain animate-spin invert" width={50} height={50} />
              </div>
            )}
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}