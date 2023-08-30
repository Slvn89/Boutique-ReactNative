import { BoutiqueContext } from '../../BoutiqueContext';
import React from 'react';
import { View, } from 'react-native';
import { Card, Text, Button, Avatar } from 'react-native-paper'




const CardArticle = (props) => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="cart" />;
  const boutiqueContext = React.useContext(BoutiqueContext);

  return (
    <Card>
      <Card.Title title={props.article.name} subtitle={props.article.description} left={LeftContent} />
      <Card.Content>
      
        <Text variant="bodyLarge">Prix : {props.article.price} Clochettes</Text>
       
      </Card.Content>
      <View>
      <Card.Cover resizeMode='cover' source={ props.article.url } />
      {
        props.article.promo ? <Text  >PROMO</Text> : <></>
      }

      </View>
      <Card.Actions>
      <Text variant="bodyMedium">il en reste {props.article.qte}</Text>

        <Button onPress={() =>{boutiqueContext.decrementeQte(props.article.id)} } >Acquérir</Button>
      </Card.Actions>
    </Card>
  );
};

export default CardArticle;


/*const Card = (props) => {
  const boutiqueContext = useContext(BoutiqueContext);
  return (
    <div className={styles.Card}>

      <img src={props.article.url} alt="" />
        {
          props.article.promo ? <p className={styles.promo} >PROMO</p> : <></>
        }
      <div className={styles.cardDetails}>

        <div><h2 className={styles.name}>{props.article.name}</h2></div>
        <div><strong className={styles.price}>{props.article.price} <i class="fas fa-euro-sign"></i></strong></div>


        <p className={styles.description}>{props.article.description}</p>
      </div>
      <div className={styles.Asaisir} >
        <p >A saisir : <i className={styles.qte}> {boutiqueContext.articles[props.article.id].qte}</i> exemplaires</p>
        <Bouton id={props.article.id} action={false} label={props.article.qte} />
      </div>

    </div>
  );
}

//function Card(props){
//  return (<div className={styles.Card}>
//  Card Component
//</div>)
// }

Card.propTypes = {};

Card.defaultProps = {};*/

