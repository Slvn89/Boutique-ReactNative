/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

export default App;
import { useState } from 'react';
import NavMenu from './components/Menu/Menu';
import Boutique from './components/Boutique/Boutique';
import articles from './articles';
import { BoutiqueContext } from './BoutiqueContext';
import { MenuContext } from './MenuContext';
import { Panier } from './components/Panier/Panier';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



function App(): JSX.Element {
  const [stateMenu, setStateMenu] = React.useState(
    {
      "displayPanier": false,
      "tabMenuNav": [
        {
          text: "Magasin",
          url: "#",
          isActive: false
        },
        {
          text: "Panier",
          url: "#",
          isActive: false
        },
        {
          text: "Contact",
          url: "#",
          isActive: false
        }
      ],
      "burgerButton": burgerButton,
      "fonctDisplayPanier": fonctDisplayPanier
    }
  )

  const [stateArticles, setStateArticles] = useState(

    {
      "tabPanier": [],
      "totalPanier": 0,

      "articles": articles,
      "decrementeQte": decrementeQte,
      "incrementeQte": incrementeQte
    }
  );

  function burgerButton(disp: Boolean) {
    //let displayUlTmp = !stateMenu.displayUl
    setStateMenu({
      ...stateMenu,
      "displayUl": !disp
    })
  }
  function fonctDisplayPanier(disp: Boolean) {
    /*if (disp){
      document.body.style.height = 'auto';
      document.body.style.overflow = 'visible'
    } else {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden'
    }
 */
    setStateMenu({
      ...stateMenu,
      "displayPanier": !disp
    })
  }
  function decrementeQte(id: Number) {
    // je fais une copie de mon tableau stateArticles car il est en lecture seule
    // et je ne peux pas le modfifier directement.
    // je modifie la qte de l'article correspondant à l'id transmis par mon component Bouton
    let articlesTmp = stateArticles.articles;
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        valeur.qte > 0 && --valeur.qte;
        //valeur.qte === 0 ? valeur.qte = 0 : valeur.qte -= 1;
        // if (valeur.qte === 0) {
        //   valeur.qte = 0;
        // } else {
        //   valeur.qte -= 1;
        // }
      }
    })
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.push(id)

    // je réassigne le nouveau tableau article modifié à mon stateArticles
    // grace à sa fonction setStateArticles
    setStateArticles(
      {
        ...stateArticles,// le ...objet, rappelle toutes les propriétés:valeur de l'objet
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
  }
  function incrementeQte(id: Number) {
    let supprIndex: Number;
    stateArticles.tabPanier.find((value, index) => {
      if (value === id) {
        //je récupère dans mon tableau stateArticles.tabPanier l'index
        //de l'article à supprimer
        supprIndex = index;

      }
    })
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.splice(supprIndex, 1);
    let articlesTmp = stateArticles.articles;
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        ++valeur.qte;
        //valeur.qte === 0 ? valeur.qte = 0 : valeur.qte -= 1;
        // if (valeur.qte === 0) {
        //   valeur.qte = 0;
        // } else {
        //   valeur.qte -= 1;
        // }
      }
    })
    setStateArticles(
      {
        ...stateArticles,// le ...objet, rappelle toutes les propriétés:valeur de l'objet
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    // calculTotal();
  }
  /*function calculTotal() {
    let totalTmp = 0;
    stateArticles.tabPanier.map((valeur) => {

      totalTmp += stateArticles.articles[valeur].price;
    })


    setStateArticles({
      ...stateArticles
    })
  }*/
  return (
    <MenuContext.Provider value={stateMenu}>
      <BoutiqueContext.Provider value={stateArticles}>
        <SafeAreaView>
          <StatusBar />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.background}>
            <View>
              <NavMenu></NavMenu>
              <Panier></Panier>
              <Boutique articles={stateArticles.articles}></Boutique>
            </View>

          </ScrollView>
        </SafeAreaView>
      </BoutiqueContext.Provider>
    </MenuContext.Provider>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: "gray",
    height: "auto"
  }

});


