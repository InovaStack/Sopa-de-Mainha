
import { MenuDay, Soup } from './types';

export const COLORS = {
  primary: '#6b3e26', // Brown
  secondary: '#d2691e', // Chocolate
  accent: '#228b22', // ForestGreen (Cactus vibe)
  background: '#fdf6e3', // Creamy
};

export const STORE_PHONE = '5581999999999'; // Substitua pelo número real da loja

const defaultSoups: Soup[] = [
  {
    id: '1',
    name: 'Sopa de Carne',
    description: 'Tradicional, com pedaços suculentos de carne e legumes da terra.',
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
    rating: 5,
    category: 'sopa',
    ingredients: ['Carne de Sol', 'Batata', 'Cenoura', 'Chuchu', 'Temperos Regionais']
  },
  {
    id: '2',
    name: 'Sopa de Alho-Poró',
    description: 'Cremosa e suave, com o toque especial da casa e ervas finas.',
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=1000&auto=format&fit=crop',
    rating: 4,
    category: 'creme',
    ingredients: ['Alho-poró', 'Creme de Leite', 'Batata Doce', 'Parmesão']
  },
  {
    id: '3',
    name: 'Caldo de Macaxeira',
    description: 'Bem grosso, do jeito que o sertanejo gosta. Acompanha charque desfiada.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1613844237701-8f3664fc2393?q=80&w=1000&auto=format&fit=crop',
    rating: 5,
    category: 'caldo',
    ingredients: ['Macaxeira', 'Charque', 'Leite de Coco', 'Coentro']
  },
  {
    id: '4',
    name: 'Canja de Galinha',
    description: 'A clássica que cura qualquer mal-estar. Frango caipira selecionado.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=1000&auto=format&fit=crop',
    rating: 5,
    category: 'sopa',
    ingredients: ['Frango', 'Arroz', 'Legumes', 'Salsinha']
  }
];

export const WEEKLY_MENU: MenuDay[] = [
  { day: 'Segunda', soups: [defaultSoups[0], defaultSoups[1], defaultSoups[2]] },
  { day: 'Terça', soups: [defaultSoups[3], defaultSoups[2], defaultSoups[1]] },
  { day: 'Quarta', soups: [defaultSoups[0], defaultSoups[3], defaultSoups[2]] },
  { day: 'Quinta', soups: [defaultSoups[1], defaultSoups[2], defaultSoups[0]] },
  { day: 'Sexta', soups: [defaultSoups[2], defaultSoups[3], defaultSoups[1]] },
  { day: 'Sábado', soups: defaultSoups },
  { day: 'Domingo', soups: defaultSoups.slice(0, 2) },
];
