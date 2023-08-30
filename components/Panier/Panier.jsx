import { useContext } from "react";
import { BoutiqueContext } from "../../BoutiqueContext";
import { MenuContext } from "../../MenuContext";
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from "react-native-paper";



const Panier = (props) => {
  const boutiqueContext = useContext(BoutiqueContext);
  const paniertmp = [];

  if (boutiqueContext.tabPanier.length > 0) {
    const tabPanier = boutiqueContext.tabPanier.sort();
    let i = 0;
    tabPanier.map((valeur, index) => {
      i++;
      if (valeur !== tabPanier[index + 1]) {
        paniertmp.push([valeur, i]);
        i = 0;
      }
    });
  }

  let totalPanier = 0;
  paniertmp.map((valeur) => {
    const article = boutiqueContext.articles[valeur[0]];
    totalPanier += article.price * valeur[1];
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cartContainer}>
          <Text style={styles.title}>Votre panier</Text>
          <Text style={styles.total}>
            {boutiqueContext.tabPanier.length > 0 ? (
              `Total des achats : ${totalPanier} €`
            ) : (
              'Rien à afficher'
            )}
          </Text>
          {boutiqueContext.tabPanier.length > 0 ? (
            paniertmp.map((valeur, index) => {
              const name = boutiqueContext.articles[valeur[0]].name;
              const priceU = boutiqueContext.articles[valeur[0]].price;
              const priceT = boutiqueContext.articles[valeur[0]].price * valeur[1];
              const qteA = valeur[1];
              const url = boutiqueContext.articles[valeur[0]].url;
              const isActivePlus = boutiqueContext.articles[valeur[0]].qte === 0;

              return (
                <View style={styles.itemContainer} key={index}>
                  <Image source={{ uri: url }} style={styles.image} />
                  <Text style={styles.itemName}>{name}</Text>
                  <View style={styles.buttonsContainer}>
                    <Button
                      style={[styles.button, isActivePlus && styles.disabledButton]}
                      disabled={isActivePlus}
                      onPress={() => {
                        boutiqueContext.decrementeQte(valeur[0]);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      style={styles.button}
                      onPress={() => {
                        boutiqueContext.incrementeQte(valeur[0]);
                      }}
                    >
                      -
                    </Button>
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemInfo}>
                      Quantité : {qteA}, prix : {priceU} € par unité
                    </Text>
                    <Text style={styles.itemTotal}>
                      Total pour cet article : {priceT} €
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.empty}>Votre panier est actuellement vide.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    cartContainer: {
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
      padding: 20,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    total: {
      fontSize: 16,
      marginBottom: 20,
      color: '#666',
    },
    empty: {
      textAlign: 'center',
      fontSize: 18,
      color: '#999',
    },
    itemContainer: {
      marginBottom: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingBottom: 15,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: '#3498db',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    disabledButton: {
      backgroundColor: '#ccc',
    },
    itemDetails: {
      alignItems: 'center',
    },
    itemInfo: {
      fontSize: 16,
      color: '#666',
      marginBottom: 5,
    },
    itemTotal: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
  });
  
  export { Panier };
  
  
  
  
  
  