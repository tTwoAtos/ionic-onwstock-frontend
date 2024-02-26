Ce service a pour rôle d'enregistrer toutes les données de l'utilisateur cad :
- l'intégralité des données de sa communauté (membres/stocks/...)

Il s'intialise à chaque démarrage de l'application
Vérifie s'il n'éxiste déjà pas de base de données locale
Et agit à chaque opération sur un produit (ajout/suppression/modification/...)

API :
Doit se comporter comme une base de données en back
Fonctionne en parallèle des opérations destinées au back-end 
Donc doit posseder les opérations CRUD (Create - Read - Update - Delete)