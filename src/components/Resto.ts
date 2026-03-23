export type Plat = {
  nom: string;
  image: string;
};

export type Resto = {
  id: number;
  image: string;
  restaurantName: string;
  restaurantInfo: string;
  stars: number;
  speciality: string;
  opening: string;
  closing: string;
  priceFrom: number;
  plats: Plat[];
};
