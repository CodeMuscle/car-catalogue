import { manufacturers } from "@/constants";
import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    
    const { manufacturer, year, model, limit, fuel } = filters;

    const headers = {
        'X-RapidAPI-Key': 'b30441e430msh8d6dc4b5a71bc67p10a06ejsnd9f7b8c8f325',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
      }

      const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
        headers: headers,
      });

      const result = await response.json();

      return result;
}

export const calculateCarRent =  (city_mpg: number, year: number) => {
  
  // Base rental price per day in USD
  const basePricePerDay = 50;
  
  // Additional rate per mile driven
  const mileageFactor = 0.1;

  //Additional Rate per year of vehicle age
  const ageFactor = 0.05;

  //Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;  

  // Calculate Total Rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, year, model } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
      
      const searchParams = new URLSearchParams(window.location.search);

      searchParams.set(type, value);

      const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

      return newPathName;
}
