import Home from '../../views/seller/pages/Home'
import Orders from '../../views/seller/pages/Orders';
import Posters from '../../views/seller/pages/Posters';
import Product from '../../views/seller/pages/Product';
import Settings from '../../views/seller/pages/Settings';
import Sales from '../../views/seller/pages/Sales';
import Wallet from '../../views/seller/pages/Wallet';

const sideBarElements = [
    {
        'name': 'Tableau de Bord',
        'route': <Home/>,
        'icon': 'bi bi-speedometer2'
    },
    {
        'name': 'Sponsorisation',
        'icon': 'bi bi-lightning-fill',
        'children': [
            {
                'name': 'Affiches',
                'route': <Posters/>,
                'icon': 'bi bi-box2-heart',
            },
            {
                'name': 'Produits',
                'route': <Product/>,
                'icon': 'bi bi-box',
            },
        ]
    },
    {
        'name': 'Boutique',
        'icon': 'bi bi-shop',
        'children': [
            {
                'name': 'Commandes',
                'route': <Orders/>,
                'icon': 'bi bi-box2-heart',
            },
            {
                'name': 'Produits',
                'route': <Product/>,
                'icon': 'bi bi-box'
            },
            {
                'name': 'Paramètres',
                'route': <Settings/>,
                'icon': 'bi bi-gear-wide-connected',
            },
        ]
    },
    {
        'name': 'Finances',
        'icon': 'bi bi-cash-coin',
        'children': [
            {
                'name': 'Mes ventes',
                'route': <Sales/>,
                'icon': 'bi bi-minecart-loaded',
            },
            {
                'name': 'Portefeuille',
                'route': <Wallet/>,
                'icon': 'bi bi-wallet2',
            },
        ]
    },
]

export default sideBarElements;